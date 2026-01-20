/**
 * World Tools: describe_world and list_constraints
 * These tools expose the world's capabilities, boundaries, and constraints
 */

import {
  WORLD_IDENTITY,
  WORLD_PURPOSE,
  WORLD_BOUNDARIES,
  AFFORDANCES,
  CITATION_REQUIREMENTS,
  MUTATION_PROHIBITIONS,
  SCOPE_LIMITS,
  REFUSAL_CONDITIONS,
  INTERPRETATION_RULES,
} from '../constants/constraints.js';

/**
 * Tool: describe_world
 * Returns the purpose, boundaries, prohibitions, and requirements of the Open Notebook world
 */
export function describeWorld() {
  return {
    world: WORLD_IDENTITY,
    purpose: WORLD_PURPOSE,
    boundaries: WORLD_BOUNDARIES,
    available_affordances: AFFORDANCES,
    citation_requirements: CITATION_REQUIREMENTS,
    provenance_available: true,
  };
}

/**
 * Tool: list_constraints
 * Returns mutation prohibitions, scope limits, citation requirements, and refusal conditions
 * Must always be complete and truthful
 */
export function listConstraints() {
  return {
    mutation_prohibitions: MUTATION_PROHIBITIONS,
    scope_limits: SCOPE_LIMITS,
    citation_requirements: CITATION_REQUIREMENTS,
    refusal_conditions: REFUSAL_CONDITIONS,
    interpretation_rule: INTERPRETATION_RULES,
  };
}
