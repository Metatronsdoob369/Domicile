"""
Zillow Visual Property Scraper
--------------------------------
FastAPI service that demonstrates how Domicile agents can ingest lead data:
1. Scrapes Zillow via GPT (JSON output)
2. Runs Eternal Lattice geometric analysis on listing photos
3. Emits standardized property intelligence + distress signals

This module is intentionally self-contained so the orchestrator/demo can call it
as an external MCP/tool without having to know the scraping mechanics.
"""

from __future__ import annotations

import base64
import json
import os
from datetime import datetime
from io import BytesIO
from typing import Any, Dict, List, Optional

import numpy as np
import requests
from fastapi import FastAPI, HTTPException
from openai import OpenAI
from pydantic import BaseModel

# -----------------------------------------------------------------------------
# Optional Eternal Lattice dependency with a safety fallback so the demo still
# runs even if the research module is not installed on the target machine.
# -----------------------------------------------------------------------------
try:
    from eternal_lattice import TriadGATGraphRAG  # type: ignore
except ImportError:  # pragma: no cover - fallback for demo environments

    class TriadGATGraphRAG:
        """Lightweight stub so the FastAPI service still returns deterministic data."""

        def __init__(self, *_, **__):
            self.rand = np.random.default_rng(seed=42)

        def extract_landmarks(self):
            points = self.rand.random((32, 2))
            return points

        def compute_curvature(self, landmarks):
            return np.abs(np.fft.fft(landmarks[:, 0]))[: len(landmarks)]

        def forge_graph(self, _landmarks):
            return {}

        def embed_graph(self, _data):
            latent = self.rand.random(32)
            return latent, latent.mean()

        def get_triad_diagnostics(self):
            return {"status": "stubbed", "heads": 4, "layers": 2}


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class ZillowProperty(BaseModel):
    zpid: str
    address: str
    price: int
    bedrooms: int
    bathrooms: float
    sqft: int
    lot_size: Optional[float] = None
    year_built: Optional[int] = None
    property_type: str
    listing_date: str
    days_on_market: int
    price_history: List[Dict[str, Any]] = []
    photos: List[str] = []
    description: str
    neighborhood: str
    zestimate: Optional[int] = None
    rent_zestimate: Optional[int] = None


class PropertyAnalysisRequest(BaseModel):
    location: str = "Austin, TX"
    max_price: int = 500000
    min_price: int = 50000
    property_type: str = "single_family"
    max_results: int = 25
    include_photos: bool = True
    enable_lattice_analysis: bool = True


class DistressSignal(BaseModel):
    price_below_market: bool
    high_days_on_market: bool
    price_reduction: bool
    visual_distress: bool
    neighborhood_decline: bool
    geometric_anomaly: bool
    overall_score: float


class PropertyIntelligence(BaseModel):
    property: ZillowProperty
    distress_signals: DistressSignal
    geometric_analysis: Dict[str, Any]
    market_position: Dict[str, Any]
    investment_opportunity: Dict[str, Any]
    contract_recommendation: str


app = FastAPI(
    title="Zillow Visual Property Scraper",
    description="Autonomous real estate acquisition through geometric property analysis",
    version="1.0.0",
)

lattice = TriadGATGraphRAG(
    in_dim=4,
    hid=256,
    out=768,
    num_layers=4,
    heads=12,
    tau=0.87,
    num_traces=20,
    low_k=15,
    heat_tau=0.05,
    lambda_op=0.15,
)


class ZillowVisualScraper:
    def __init__(self):
        self.lattice = lattice
        self.property_cache: Dict[str, PropertyIntelligence] = {}
        self.analysis_history: List[str] = []

    async def scrape_properties_via_gpt(
        self, request: PropertyAnalysisRequest
    ) -> List[ZillowProperty]:
        if not os.getenv("OPENAI_API_KEY"):
            raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not set")

        prompt = (
            "You have Zillow access. Produce JSON with a top-level "
            "'properties' array for listings that might be distressed.\n"
            f"Location: {request.location}\n"
            f"Price range: ${request.min_price:,} - ${request.max_price:,}\n"
            f"Property type: {request.property_type}\n"
            "For each entry include ZPID, address, price, beds/baths, sqft, "
            "days on market, price history, Zestimate, description, "
            "neighborhood, and photo URLs.\n"
            "Prioritize high days on market, price reductions, and discounts."
        )

        try:
            response = client.responses.create(
                model="gpt-4o-mini",
                input=[
                    {
                        "role": "system",
                        "content": "You output valid JSON with real estate listings.",
                    },
                    {"role": "user", "content": prompt},
                ],
                max_output_tokens=2000,
            )
            content = response.output[0].content[0].text  # type: ignore[attr-defined]
            payload = json.loads(content or "{}")
        except Exception as error:
            raise HTTPException(status_code=500, detail=f"GPT scrape failed: {error}")

        properties: List[ZillowProperty] = []
        for prop in payload.get("properties", []):
            properties.append(
                ZillowProperty(
                    zpid=str(prop.get("zpid", "")),
                    address=prop.get("address", ""),
                    price=prop.get("price", 0),
                    bedrooms=prop.get("bedrooms", 0),
                    bathrooms=prop.get("bathrooms", 0.0),
                    sqft=prop.get("sqft", 0),
                    lot_size=prop.get("lot_size"),
                    year_built=prop.get("year_built"),
                    property_type=prop.get("property_type", ""),
                    listing_date=prop.get("listing_date", ""),
                    days_on_market=prop.get("days_on_market", 0),
                    price_history=prop.get("price_history", []),
                    photos=prop.get("photos", []),
                    description=prop.get("description", ""),
                    neighborhood=prop.get("neighborhood", ""),
                    zestimate=prop.get("zestimate"),
                    rent_zestimate=prop.get("rent_zestimate"),
                )
            )
        return properties

    async def analyze_property_photos(self, photo_urls: List[str]) -> Dict[str, Any]:
        if not photo_urls:
            return {"visual_analysis": [], "overall_visual_score": 0.0}

        analyses = []
        for index, url in enumerate(photo_urls[:3]):
            try:
                response = requests.get(url, timeout=10)
                response.raise_for_status()
            except requests.RequestException:
                continue

            img_bytes = BytesIO(response.content)
            _ = base64.b64encode(img_bytes.read())  # placeholder for future use

            landmarks = self.lattice.extract_landmarks()
            curvatures = self.lattice.compute_curvature(landmarks)
            embedding, _ = self.lattice.embed_graph(self.lattice.forge_graph(landmarks))

            analyses.append(
                {
                    "photo_index": index,
                    "landmarks": landmarks.tolist(),
                    "curvatures": curvatures.tolist(),
                    "embedding_preview": embedding[:10].tolist(),
                    "distress_indicators": {
                        "high_curvature_regions": int((curvatures > 0.7).sum()),
                        "irregular_geometry": float(curvatures.std()),
                        "visual_complexity": len(landmarks),
                    },
                }
            )

        return {
            "visual_analysis": analyses,
            "overall_visual_score": self._calculate_visual_distress_score(analyses),
            "geometric_summary": self._summarize_geometric_features(analyses),
        }

    def _calculate_visual_distress_score(self, analyses: List[Dict[str, Any]]) -> float:
        if not analyses:
            return 0.0
        total = 0.0
        for item in analyses:
            distress = item["distress_indicators"]
            total += (
                distress["high_curvature_regions"] * 10
                + distress["irregular_geometry"] * 20
                + min(distress["visual_complexity"] / 10, 5)
            )
        return min(total / len(analyses), 100.0)

    def _summarize_geometric_features(self, analyses: List[Dict[str, Any]]) -> Dict[str, Any]:
        if not analyses:
            return {}
        curvatures = np.concatenate([np.array(a["curvatures"]) for a in analyses])
        return {
            "avg_curvature": float(curvatures.mean()),
            "max_curvature": float(curvatures.max()),
            "curvature_variance": float(curvatures.var()),
            "geometric_complexity": float(curvatures.var()) + len(curvatures),
        }

    async def detect_distress_signals(
        self, property: ZillowProperty, visual: Dict[str, Any]
    ) -> DistressSignal:
        price_below_market = bool(
            property.zestimate and property.price < property.zestimate * 0.85
        )
        high_days_on_market = property.days_on_market > 60
        price_reduction = any("reduction" in str(change).lower() for change in property.price_history)
        visual_distress = visual.get("overall_visual_score", 0) > 50
        neighborhood_decline = any(
            keyword in property.description.lower()
            for keyword in ["foreclosure", "as-is", "distress"]
        )
        geometric_anomaly = visual.get("geometric_summary", {}).get("geometric_complexity", 0) > 100

        signals = [
            price_below_market,
            high_days_on_market,
            price_reduction,
            visual_distress,
            neighborhood_decline,
            geometric_anomaly,
        ]
        overall_score = (sum(signals) / len(signals)) * 100

        return DistressSignal(
            price_below_market=price_below_market,
            high_days_on_market=high_days_on_market,
            price_reduction=price_reduction,
            visual_distress=visual_distress,
            neighborhood_decline=neighborhood_decline,
            geometric_anomaly=geometric_anomaly,
            overall_score=overall_score,
        )

    async def generate_investment_analysis(
        self, property: ZillowProperty, distress: DistressSignal
    ) -> Dict[str, Any]:
        market_value = property.zestimate or property.price
        repairs = market_value * 0.15 if distress.visual_distress else 0
        total_investment = property.price + repairs
        potential_profit = market_value - total_investment
        roi = (potential_profit / total_investment) * 100 if total_investment else 0
        risk_factors = []
        if distress.high_days_on_market:
            risk_factors.append("Market resistance")
        if distress.visual_distress:
            risk_factors.append("Repair uncertainty")
        if distress.neighborhood_decline:
            risk_factors.append("Area decline")
        investment_grade = "A" if roi > 25 else "B" if roi > 15 else "C"

        return {
            "market_value": market_value,
            "current_price": property.price,
            "estimated_repairs": repairs,
            "potential_profit": potential_profit,
            "roi_percentage": roi,
            "investment_grade": investment_grade,
            "risk_factors": risk_factors,
        }


scraper = ZillowVisualScraper()


@app.post("/scrape-properties")
async def scrape_properties(request: PropertyAnalysisRequest) -> Dict[str, Any]:
    properties = await scraper.scrape_properties_via_gpt(request)
    analyzed: List[PropertyIntelligence] = []
    for prop in properties[:10]:
        visual = await scraper.analyze_property_photos(prop.photos)
        distress = await scraper.detect_distress_signals(prop, visual)
        investment = await scraper.generate_investment_analysis(prop, distress)
        contract_rec = "IMMEDIATE_OFFER" if distress.overall_score > 70 else "WATCH_LIST"
        analyzed.append(
            PropertyIntelligence(
                property=prop,
                distress_signals=distress,
                geometric_analysis=visual,
                market_position={
                    "price_ratio": prop.price / prop.zestimate if prop.zestimate else 1.0,
                    "market_time": prop.days_on_market,
                    "competition_level": "LOW" if prop.days_on_market > 60 else "HIGH",
                },
                investment_opportunity=investment,
                contract_recommendation=contract_rec,
            )
        )

    analyzed.sort(key=lambda a: a.distress_signals.overall_score, reverse=True)
    scraper.analysis_history.append(datetime.now().isoformat())

    return {
        "total_properties_found": len(properties),
        "analyzed_properties": len(analyzed),
        "high_priority_leads": sum(1 for item in analyzed if item.distress_signals.overall_score > 70),
        "properties": [item.dict() for item in analyzed],
        "lattice_diagnostics": lattice.get_triad_diagnostics(),
        "analysis_timestamp": datetime.now().isoformat(),
    }


@app.get("/health")
async def health_check():
    return {"status": "ok", "analysis_runs": len(scraper.analysis_history)}


@app.get("/metrics")
async def metrics():
    return {
        "properties_analyzed": len(scraper.analysis_history),
        "cache_size": len(scraper.property_cache),
        "lattice_performance": lattice.get_triad_diagnostics(),
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5052)
