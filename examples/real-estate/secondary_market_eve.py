"""
Secondary Market Eve
--------------------
FastAPI service that packages overflow real-estate leads and sells them to
investors. It consumes `PropertyIntelligence` objects (from the Zillow scraper)
and emits monetized lead packages. This shows how Domicile orchestrations can
span multiple agents/services inside a single vertical.
"""

from __future__ import annotations

import asyncio
import os
from datetime import datetime, timedelta
from enum import Enum
from typing import Any, Dict, List, Optional

import stripe
from fastapi import BackgroundTasks, FastAPI, HTTPException
from pydantic import BaseModel

try:  # pragma: no cover - support running as module or script
    from .zillow_visual_scraper import PropertyIntelligence
except ImportError:
    from zillow_visual_scraper import PropertyIntelligence  # type: ignore


class LeadTier(str, Enum):
    BRONZE = "bronze"
    SILVER = "silver"
    GOLD = "gold"
    PLATINUM = "platinum"


class InvestorProfile(BaseModel):
    investor_id: str
    name: str
    email: str
    phone: Optional[str]
    preferred_markets: List[str]
    price_range: Dict[str, int]
    property_types: List[str]
    investment_strategy: str
    risk_tolerance: str
    deal_velocity: int
    subscription_tier: LeadTier
    credit_balance: float
    last_purchase: Optional[datetime]


class LeadPackage(BaseModel):
    package_id: str
    property_intelligence: PropertyIntelligence
    lead_tier: LeadTier
    price: float
    geometric_analysis_included: bool
    contract_template_included: bool
    market_comps_included: bool
    roi_projection: Dict[str, Any]
    exclusive_period_hours: int
    created_at: datetime
    expires_at: datetime


class MarketplaceListing(BaseModel):
    listing_id: str
    title: str
    description: str
    location: str
    price_range: str
    distress_score: float
    roi_potential: str
    lead_tier: LeadTier
    package_price: float
    preview_data: Dict[str, Any]
    full_package_id: str


stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app = FastAPI(
    title="Secondary Market Eve",
    description="Autonomous real-estate lead monetization platform",
    version="1.0.0",
)


class SecondaryMarketEve:
    def __init__(self):
        self.investors: Dict[str, InvestorProfile] = {}
        self.lead_packages: Dict[str, LeadPackage] = {}
        self.marketplace_listings: Dict[str, MarketplaceListing] = {}
        self.revenue_metrics: Dict[str, float] = {
            "total_sales": 0,
            "packages_sold": 0,
            "avg_package_price": 0,
            "conversion_rate": 0,
            "monthly_recurring": 0,
        }
        self.pricing_ai = self._initialize_pricing()

    def _initialize_pricing(self) -> Dict[str, Any]:
        return {
            "base_prices": {
                LeadTier.BRONZE: 50,
                LeadTier.SILVER: 150,
                LeadTier.GOLD: 300,
                LeadTier.PLATINUM: 500,
            },
            "demand_multipliers": {},
            "market_adjustments": {},
            "conversion_tracking": {},
        }

    async def process_overflow_lead(
        self, property_intel: PropertyIntelligence
    ) -> Optional[LeadPackage]:
        distress_score = property_intel.distress_signals.overall_score
        roi_potential = property_intel.investment_opportunity.get("roi_percentage", 0)
        if distress_score < 40 or roi_potential < 10:
            return None

        tier = self._classify_lead_tier(property_intel)
        base_price = self.pricing_ai["base_prices"][tier]
        final_price = base_price * self._calculate_market_multiplier(property_intel.property.neighborhood)
        package_id = f"PKG_{property_intel.property.zpid}_{int(datetime.now().timestamp())}"

        package = LeadPackage(
            package_id=package_id,
            property_intelligence=property_intel,
            lead_tier=tier,
            price=final_price,
            geometric_analysis_included=tier in {LeadTier.GOLD, LeadTier.PLATINUM},
            contract_template_included=tier == LeadTier.PLATINUM,
            market_comps_included=tier != LeadTier.BRONZE,
            roi_projection=property_intel.investment_opportunity,
            exclusive_period_hours=24 if tier == LeadTier.PLATINUM else 12,
            created_at=datetime.now(),
            expires_at=datetime.now() + timedelta(days=7),
        )
        self.lead_packages[package_id] = package
        await asyncio.gather(
            self._create_marketplace_listing(package),
            self._match_with_investors(package),
        )
        return package

    def _classify_lead_tier(self, intel: PropertyIntelligence) -> LeadTier:
        distress = intel.distress_signals.overall_score
        roi = intel.investment_opportunity.get("roi_percentage", 0)
        has_photos = bool(intel.property.photos)
        geom_score = intel.geometric_analysis.get("overall_visual_score", 0)

        if distress > 70 and roi > 20 and intel.contract_recommendation == "IMMEDIATE_OFFER":
            return LeadTier.PLATINUM
        if distress > 60 and roi > 15 and geom_score > 0:
            return LeadTier.GOLD
        if distress > 50 and roi > 12 and has_photos:
            return LeadTier.SILVER
        return LeadTier.BRONZE

    def _calculate_market_multiplier(self, neighborhood: str) -> float:
        hot_markets = {"austin", "dallas", "houston", "atlanta", "phoenix"}
        if any(city in neighborhood.lower() for city in hot_markets):
            return 1.5
        return 1.0

    async def _create_marketplace_listing(self, package: LeadPackage) -> None:
        prop = package.property_intelligence.property
        listing = MarketplaceListing(
            listing_id=f"LIST_{package.package_id}",
            title=f"Distressed Property - {prop.address[:32]}",
            description=(
                f"{package.lead_tier.value.title()} tier lead "
                f"with {package.property_intelligence.distress_signals.overall_score:.0f}% distress score"
            ),
            location=prop.neighborhood,
            price_range=f"${prop.price:,}",
            distress_score=package.property_intelligence.distress_signals.overall_score,
            roi_potential=f"{package.property_intelligence.investment_opportunity.get('roi_percentage', 0):.1f}%",
            lead_tier=package.lead_tier,
            package_price=package.price,
            preview_data={
                "bedrooms": prop.bedrooms,
                "bathrooms": prop.bathrooms,
                "sqft": prop.sqft,
                "days_on_market": prop.days_on_market,
                "price_below_zestimate": package.property_intelligence.distress_signals.price_below_market,
            },
            full_package_id=package.package_id,
        )
        self.marketplace_listings[listing.listing_id] = listing

    async def _match_with_investors(self, package: LeadPackage) -> None:
        prop = package.property_intelligence.property
        matches = []
        for investor in self.investors.values():
            if not any(market.lower() in prop.address.lower() for market in investor.preferred_markets):
                continue
            if prop.price < investor.price_range["min"] or prop.price > investor.price_range["max"]:
                continue
            if prop.property_type not in investor.property_types:
                continue
            matches.append(investor)
        for investor in matches:
            await self._notify_investor(investor, package)

    async def _notify_investor(self, investor: InvestorProfile, package: LeadPackage) -> None:
        payload = {
            "investor_id": investor.investor_id,
            "package_id": package.package_id,
            "lead_tier": package.lead_tier.value,
            "price": package.price,
            "distress_score": package.property_intelligence.distress_signals.overall_score,
        }
        print(f"📧 Email to {investor.email}: {payload}")
        if investor.phone:
            print(f"📱 SMS to {investor.phone}: {payload}")

    async def process_purchase(
        self, investor_id: str, package_id: str, payment_method_id: str
    ) -> Dict[str, Any]:
        if package_id not in self.lead_packages:
            raise HTTPException(status_code=404, detail="Package not found")
        package = self.lead_packages[package_id]
        investor = self.investors.get(investor_id)
        if not investor:
            raise HTTPException(status_code=404, detail="Investor not found")

        if not stripe.api_key:
            raise HTTPException(status_code=500, detail="Stripe key missing")

        payment_intent = stripe.PaymentIntent.create(
            amount=int(package.price * 100),
            currency="usd",
            payment_method=payment_method_id,
            customer=investor.investor_id,
            description=f"Real Estate Lead Package: {package_id}",
            confirm=True,
        )

        if payment_intent.status != "succeeded":
            return {"purchase_successful": False, "error": "Payment failed"}

        lead_payload = await self._prepare_full_package(package)
        self.revenue_metrics["total_sales"] += package.price
        self.revenue_metrics["packages_sold"] += 1
        self._remove_from_marketplace(package_id)
        return {
            "purchase_successful": True,
            "payment_intent_id": payment_intent.id,
            "package_data": lead_payload,
            "exclusive_until": package.expires_at.isoformat(),
        }

    async def _prepare_full_package(self, package: LeadPackage) -> Dict[str, Any]:
        return {
            "property_details": package.property_intelligence.dict(),
            "geometric_analysis": package.property_intelligence.geometric_analysis
            if package.geometric_analysis_included
            else None,
            "contract_template": "Contract template generated...",
            "market_comps": [{"comp": "example"}] if package.market_comps_included else None,
            "roi_calculator": package.roi_projection,
        }

    def _remove_from_marketplace(self, package_id: str) -> None:
        for listing_id, listing in list(self.marketplace_listings.items()):
            if listing.full_package_id == package_id:
                del self.marketplace_listings[listing_id]
                break


secondary_eve = SecondaryMarketEve()


@app.post("/register-investor")
async def register_investor(investor: InvestorProfile):
    secondary_eve.investors[investor.investor_id] = investor
    return {
        "registration_successful": True,
        "investor_id": investor.investor_id,
        "subscription_tier": investor.subscription_tier.value,
    }


@app.post("/process-overflow-lead")
async def process_overflow_lead(payload: PropertyIntelligence):
    package = await secondary_eve.process_overflow_lead(payload)
    if not package:
        return {"package_created": False, "reason": "Lead quality below threshold"}
    return {
        "package_created": True,
        "package_id": package.package_id,
        "lead_tier": package.lead_tier.value,
        "price": package.price,
    }


@app.get("/marketplace")
async def marketplace():
    listings = sorted(
        secondary_eve.marketplace_listings.values(),
        key=lambda item: item.distress_score,
        reverse=True,
    )
    return {
        "total_listings": len(listings),
        "listings": [listing.dict() for listing in listings],
        "revenue_metrics": secondary_eve.revenue_metrics,
    }


@app.post("/purchase-lead")
async def purchase_lead(investor_id: str, package_id: str, payment_method_id: str):
    return await secondary_eve.process_purchase(investor_id, package_id, payment_method_id)


@app.get("/revenue-dashboard")
async def revenue_dashboard():
    metrics = secondary_eve.revenue_metrics
    avg = metrics["total_sales"] / metrics["packages_sold"] if metrics["packages_sold"] else 0
    metrics["avg_package_price"] = avg
    return {
        "revenue_metrics": metrics,
        "active_packages": len(secondary_eve.lead_packages),
        "marketplace_listings": len(secondary_eve.marketplace_listings),
        "registered_investors": len(secondary_eve.investors),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5053)
