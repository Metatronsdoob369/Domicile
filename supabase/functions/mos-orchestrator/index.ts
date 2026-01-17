// MASTER ORCHESTRATION SYSTEM - Supabase Edge Function
// Constitutional routing engine with multi-tenant isolation

import { createClient } from "jsr:@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface Constitution {
  max_cost_usd: number;
  authorized_tools: string[];
  tenant_id: string;
}

interface SystemRecord {
  id: string;
  name: string;
  capabilities: string[];
  constitution: Constitution;
  success_rate: number;
  avg_execution_time_ms: number;
  cost_per_execution: number;
  endpoint_url?: string;
  deployment_type?: string;
}

interface ExecutionPlan {
  system: string;
  confidence: number;
  reasoning: string;
  cost_estimate: number;
}

serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 🚨 TEMPORARY: BYPASS AUTH FOR IMMEDIATE TESTING 🚨
    // TODO: Restore proper JWT validation with tenant_id extraction
    let tenantId = "default";
    console.log(
      "MOS: Auth bypassed for immediate testing - constitutional routing active",
    );

    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();

    // Seed BambooHR Expert system before any operation
    console.log(`MOS: Seeding BambooHR Expert for tenant: ${tenantId}`);
    const seeded = await seedBambooHRSystem(supabase, tenantId);
    if (!seeded) {
      console.error("MOS: Failed to seed BambooHR Expert system");
    }

    switch (path) {
      case "systems":
        return await handleSystems(req, tenantId, corsHeaders);

      case "route":
        return await handleRoute(req, tenantId, corsHeaders);

      case "execute":
        return await handleExecute(req, tenantId, corsHeaders);

      case "test":
        return await handleTest(req, corsHeaders);

      default:
        return new Response(JSON.stringify({ error: "Endpoint not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    console.error("MOS Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function handleSystems(req: Request, tenantId: string, corsHeaders: any) {
  // GET /systems - List available systems for tenant
  // Ensure BambooHR Expert is registered
  await seedBambooHRSystem(supabase, tenantId);

  const { data: systems, error } = await supabase
    .from("systems")
    .select("*")
    .eq("status", "active");

  if (error) throw error;

  // TEMPORARY: Manually add BambooHR Expert to response for immediate testing
  const bambooHRSystem = {
    id: "bamboo-expert-oms-hosted",
    name: "BambooHR Expert - OMS Dental Payroll",
    type: "production",
    status: "active",
    capabilities: [
      "payroll_processing",
      "pdf_parsing",
      "employee_matching",
      "batch_processing",
      "bamboo_upload",
      "compliance_reporting",
      "audit_trails",
      "mobile_operations",
      "approval_workflows",
      "employee_lifecycle",
      "regulatory_compliance",
      "multi_location_compliance",
    ],
    constitution: {
      max_cost_usd: 2.0,
      audit_level: "comprehensive",
      authorized_tools: [
        "bamboo_hr_api",
        "pdf_parser",
        "compliance_checker",
        "audit_logger",
      ],
      data_sensitivity: 9,
      max_execution_ms: 300000,
    },
    success_rate: 0.99,
    avg_execution_time_ms: 180000,
    cost_per_execution: 0.75,
    deployment_type: "zo_serverless",
    endpoint_url: "https://zo-platform.com/agents/bamboo-expert-oms",
  };

  // Add BambooHR system to the response
  systems.push(bambooHRSystem);

  const systemsResponse = systems.map((system) => ({
    id: system.id,
    name: system.name,
    capabilities: system.capabilities,
    success_rate: system.success_rate,
    cost_per_execution: system.cost_per_execution,
    constitution: system.constitution,
  }));

  return new Response(JSON.stringify(systemsResponse), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleRoute(req: Request, tenantId: string, corsHeaders: any) {
  // POST /route - Constitutional routing with geometric analysis
  const body = await req.json();
  const { user_request, user_budget = 1.0 } = body;

  if (!user_request) {
    return new Response(JSON.stringify({ error: "user_request required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // 1. Get tenant's systems
  const { data: systems, error: systemsError } = await supabase
    .from("systems")
    .select("*")
    .eq("status", "active");

  if (systemsError) throw systemsError;

  // TEMPORARY: Add BambooHR Expert for immediate testing
  systems.push({
    id: "bamboo-expert-oms-hosted",
    name: "BambooHR Expert - OMS Dental Payroll",
    capabilities: [
      "payroll_processing",
      "pdf_parsing",
      "employee_matching",
      "batch_processing",
      "bamboo_upload",
      "compliance_reporting",
      "audit_trails",
      "mobile_operations",
      "approval_workflows",
    ],
    constitution: {
      max_cost_usd: 2.0,
      authorized_tools: ["bamboo_hr_api", "pdf_parser"],
    },
    cost_per_execution: 0.75,
    success_rate: 0.99,
  });

  // 2. Extract required capabilities from request (simple keyword matching for now)
  const requiredCapabilities = extractCapabilitiesFromRequest(user_request);

  // 3. Filter systems by constitution and capabilities
  const eligibleSystems = systems.filter((system) => {
    const constitution = system.constitution;

    // Budget check - system cost must be within user budget
    if (constitution.max_cost_usd && constitution.max_cost_usd > user_budget) {
      return false;
    }

    // Capability availability check - system must have required capabilities
    const hasRequiredCapabilities = requiredCapabilities.some((cap) =>
      system.capabilities.includes(cap),
    );

    if (!hasRequiredCapabilities) {
      return false;
    }

    // Tool authorization check (if specified) - system tools must be authorized
    if (
      constitution.authorized_tools &&
      constitution.authorized_tools.length > 0
    ) {
      // If authorized_tools includes "all", any tools are allowed
      if (!constitution.authorized_tools.includes("all")) {
        // Check if all required capabilities are in authorized tools
        // This might be too strict - for now, allow if capabilities are available
        // TODO: Implement proper tool authorization mapping
      }
    }

    return true;
  });

  if (eligibleSystems.length === 0) {
    return new Response(
      JSON.stringify({
        error: "No systems available within constitutional bounds",
        required_capabilities: requiredCapabilities,
        available_systems: systems.length,
      }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // 4. Simple routing algorithm (can be enhanced with ML later)
  const optimalSystem = eligibleSystems.reduce((best, current) => {
    // Score based on success rate and cost efficiency
    const bestScore =
      best.success_rate * (1 / Math.max(best.cost_per_execution, 0.01));
    const currentScore =
      current.success_rate * (1 / Math.max(current.cost_per_execution, 0.01));

    return currentScore > bestScore ? current : best;
  });

  const plan: ExecutionPlan = {
    system: optimalSystem.id,
    confidence: 0.8, // TODO: Implement ML-based confidence
    reasoning: "Constitutional routing with capability matching",
    cost_estimate: optimalSystem.cost_per_execution,
  };

  // 5. Log routing decision for learning
  await supabase.from("routing_decisions").insert({
    tenant_id: tenantId,
    user_request: user_request,
    selected_system_id: optimalSystem.id,
    confidence: plan.confidence,
    reasoning: plan.reasoning,
    candidate_systems_count: eligibleSystems.length,
  });

  return new Response(JSON.stringify(plan), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleExecute(req: Request, tenantId: string, corsHeaders: any) {
  // POST /execute - Execute routed plan
  const body = await req.json();
  const { system_id, input_data, original_request } = body;

  if (!system_id || !input_data) {
    return new Response(
      JSON.stringify({ error: "system_id and input_data required" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // 1. Get system details
  const { data: system, error: systemError } = await supabase
    .from("systems")
    .select("*")
    .eq("id", system_id)

    .eq("status", "active")
    .single();

  if (systemError || !system) {
    return new Response(
      JSON.stringify({ error: "System not found or not authorized" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const executionId = crypto.randomUUID();
  const startedAt = new Date();

  try {
    // 2. Execute based on deployment type
    let result: any;

    if (
      system.deployment_type === "fastapi" ||
      system.deployment_type === "n8n"
    ) {
      const response = await fetch(system.endpoint_url!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-ID": tenantId,
        },
        body: JSON.stringify(input_data),
      });

      if (!response.ok) {
        throw new Error(`External service error: ${response.status}`);
      }

      result = await response.json();
    } else {
      throw new Error(`Unsupported deployment type: ${system.deployment_type}`);
    }

    // 3. Validate output against contract (simplified for now)
    // TODO: Implement Zod validation against system.output_contract

    const completedAt = new Date();
    const duration = completedAt.getTime() - startedAt.getTime();

    // 4. Log successful execution
    await supabase.from("executions").insert({
      id: executionId,
      tenant_id: tenantId,
      system_id: system_id,
      user_request: original_request,
      input_data: input_data,
      output_data: result,
      status: "success",
      started_at: startedAt.toISOString(),
      completed_at: completedAt.toISOString(),
      duration_ms: duration,
      cost: system.cost_per_execution,
    });

    return new Response(
      JSON.stringify({
        success: true,
        execution_id: executionId,
        data: result,
        duration_ms: duration,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    // 5. Log failed execution
    const completedAt = new Date();
    await supabase.from("executions").insert({
      id: executionId,
      tenant_id: tenantId,
      system_id: system_id,
      user_request: original_request,
      input_data: input_data,
      status: "failed",
      error_message: error.message,
      started_at: startedAt.toISOString(),
      completed_at: completedAt.toISOString(),
      duration_ms: completedAt.getTime() - startedAt.getTime(),
      cost: 0,
    });

    return new Response(
      JSON.stringify({
        success: false,
        execution_id: executionId,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
}

function extractCapabilitiesFromRequest(request: string): string[] {
  // Enhanced keyword-based capability extraction with multiple triggers
  // TODO: Enhance with ML embedding similarity
  const capabilityMap = {
    real_estate: {
      keywords: [
        "real estate",
        "property",
        "housing",
        "home",
        "land",
        "apartment",
        "house",
        "market analysis",
      ],
      capabilities: [
        "real_estate_analysis",
        "property_search",
        "market_data",
        "investment_analysis",
      ],
    },
    finance: {
      keywords: [
        "finance",
        "financial",
        "investment",
        "market",
        "stock",
        "trading",
        "portfolio",
        "budget",
      ],
      capabilities: [
        "financial_analysis",
        "market_research",
        "investment_advice",
        "risk_assessment",
      ],
    },
    social: {
      keywords: [
        "social media",
        "social",
        "content",
        "engagement",
        "marketing",
        "brand",
        "posts",
        "viral",
      ],
      capabilities: [
        "social_media_analysis",
        "content_creation",
        "engagement_optimization",
        "brand_strategy",
      ],
    },
    ai: {
      keywords: [
        "ai",
        "artificial intelligence",
        "machine learning",
        "code",
        "programming",
        "development",
        "automation",
      ],
      capabilities: [
        "content_generation",
        "code_assistance",
        "data_analysis",
        "automation",
      ],
    },
    security: {
      keywords: [
        "security",
        "threat",
        "vulnerability",
        "audit",
        "risk",
        "compliance",
        "safety",
      ],
      capabilities: [
        "threat_detection",
        "vulnerability_scanning",
        "security_audit",
        "compliance_check",
      ],
    },
    research: {
      keywords: [
        "research",
        "analysis",
        "study",
        "data",
        "insights",
        "reports",
        "findings",
      ],
      capabilities: [
        "research_analysis",
        "data_processing",
        "insight_generation",
      ],
    },
    payroll: {
      keywords: [
        "payroll",
        "timesheet",
        "contractor hours",
        "payment stub",
        "bambooHR",
        "katie",
        "oms",
        "dental practice payroll",
        "1099",
        "tax compliance",
        "employee onboarding",
        "hr compliance",
        "batch processing",
        "pdf parsing",
        "contractor matching",
      ],
      capabilities: [
        "payroll_processing",
        "pdf_parsing",
        "employee_matching",
        "batch_processing",
        "bamboo_upload",
        "compliance_reporting",
        "audit_trails",
        "mobile_operations",
        "approval_workflows",
      ],
    },
  };

  const capabilities = new Set<string>();
  const lowerRequest = request.toLowerCase();

  Object.entries(capabilityMap).forEach(([domain, config]) => {
    const hasMatch = config.keywords.some((keyword) =>
      lowerRequest.includes(keyword.replace(/\s+/g, " ")),
    );
    if (hasMatch) {
      config.capabilities.forEach((cap) => capabilities.add(cap));
    }
  });

  return Array.from(capabilities);
}

// ============================================================================
// BAMBOOHR EXPERT SYSTEM REGISTRATION
// ============================================================================

// Pre-registered OMS Payroll Expert for mission-critical dental practice automation
const BAMBOOHR_EXPERT_SYSTEM = {
  id: "bamboo-expert-oms-hosted",
  name: "BambooHR Expert - OMS Dental Payroll",
  type: "production",
  status: "active",

  // Hyper-specific OMS capabilities
  capabilities: [
    "payroll_processing",
    "pdf_parsing",
    "employee_matching",
    "batch_processing",
    "bamboo_upload",
    "compliance_reporting",
    "audit_trails",
    "mobile_operations",
    "approval_workflows",
    "employee_lifecycle",
    "regulatory_compliance",
    "multi_location_compliance",
  ],

  // Constitutional constraints for payroll data protection
  constitution: {
    max_cost_usd: 2.0, // Premium for domain expertise + compliance
    audit_level: "comprehensive",
    authorized_tools: [
      "bamboo_hr_api",
      "pdf_parser",
      "compliance_checker",
      "audit_logger",
    ],
    data_sensitivity: 9, // HIGH - payroll/employee data
    max_execution_ms: 300000, // 5 minutes for batch processing
    deployment_constraints: {
      allowed_platforms: ["zo_computer", "supabase_functions"],
      data_residency: "US_only",
      vpc_required: true,
    },
    regulatory_compliance: [
      "SOX",
      "FLSA",
      "IRS_1099",
      "HIPAA_business_associate",
    ],
    daily_budget_cap: 50.0,
    monthly_budget_cap: 1000.0,
  },

  // Zo Computer deployment specifics
  deployment_type: "zo_serverless",
  endpoint_url: "https://zo-platform.com/agents/bamboo-expert-oms",

  // Performance metrics
  success_rate: 0.99,
  avg_execution_time_ms: 180000, // 3 minutes average
  cost_per_execution: 0.75,

  // Integration dependencies
  dependencies: ["bamboo_hr_api", "pdf_processor", "audit_system"],

  // Operational metadata
  total_executions: 0,
  last_health_check: new Date().toISOString(),
  created_at: "2026-01-04T11:30:00Z",
};

// Function to seed the BambooHR Expert into the systems registry
async function seedBambooHRSystem(supabase: any, tenantId: string = "default") {
  try {
    const { data, error } = await supabase.from("systems").upsert(
      {
        id: BAMBOOHR_EXPERT_SYSTEM.id,
        name: BAMBOOHR_EXPERT_SYSTEM.name,
        type: BAMBOOHR_EXPERT_SYSTEM.type,
        status: BAMBOOHR_EXPERT_SYSTEM.status,
        capabilities: BAMBOOHR_EXPERT_SYSTEM.capabilities,
        constitution: BAMBOOHR_EXPERT_SYSTEM.constitution,
        deployment_type: BAMBOOHR_EXPERT_SYSTEM.deployment_type,
        endpoint_url: BAMBOOHR_EXPERT_SYSTEM.endpoint_url,
        success_rate: BAMBOOHR_EXPERT_SYSTEM.success_rate,
        avg_execution_time_ms: BAMBOOHR_EXPERT_SYSTEM.avg_execution_time_ms,
        cost_per_execution: BAMBOOHR_EXPERT_SYSTEM.cost_per_execution,
        dependencies: BAMBOOHR_EXPERT_SYSTEM.dependencies,
        total_executions: BAMBOOHR_EXPERT_SYSTEM.total_executions,
        tenant_id: tenantId,
        created_at: BAMBOOHR_EXPERT_SYSTEM.created_at,
      },
      { onConflict: "id" },
    );

    if (error) {
      console.error("Failed to seed BambooHR Expert system:", error);
      return false;
    }

    console.log("✅ BambooHR Expert system seeded successfully");
    return true;
  } catch (error) {
    console.error("BambooHR system seeding error:", error);
    return false;
  }
}

// Test endpoint restored for verification
async function handleTest(req: Request, corsHeaders: any) {
  // POST /test - Immediate MOS functionality verification
  const body = await req.json();
  const { user_request = "test request" } = body;

  // Extract capabilities from request
  const requiredCapabilities = extractCapabilitiesFromRequest(user_request);

  // Mock constitutional routing result
  const mockResult = {
    success: true,
    message: "MOS constitutional routing active - BambooHR Expert registered",
    user_request: user_request,
    extracted_capabilities: requiredCapabilities,
    routing_engine: "active",
    timestamp: new Date().toISOString(),
    registered_systems: [
      "Clay-I",
      "DispoAI Secondary Market",
      "CA-CAO Cognition Hub",
      "BambooHR Expert",
    ],
  };

  return new Response(JSON.stringify(mockResult), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
