/**
 * Provenance Tool: explain_provenance
 * Returns origin, transformation steps, tools, and confidence notes
 * No new interpretation permitted
 */

import type { ArtifactStorageAdapter } from '../storage/artifacts.js';
import type { NotebookStorageAdapter } from '../storage/notebooks.js';
import { DISCLAIMERS } from '../constants/constraints.js';

/**
 * Tool: explain_provenance
 * Returns origin, transformation steps, tools, and confidence notes for a source or artifact
 */
export async function explainProvenance(
  id: string,
  idType: 'source' | 'artifact',
  notebookStorage: NotebookStorageAdapter,
  artifactStorage: ArtifactStorageAdapter,
) {
  if (idType === 'source') {
    // Get passage data to extract provenance
    const passageData = await notebookStorage.fetchPassage(id);

    return {
      id,
      id_type: 'source' as const,
      provenance: {
        origin_notebook: {
          notebook_id: passageData.provenance.notebook_id,
          title: passageData.provenance.notebook_title,
          author: null,
          created_at: passageData.provenance.timestamp || 0,
        },
        transformation_steps: [
          {
            step_order: 1,
            tool: passageData.provenance.export_method,
            parameters: {},
            timestamp: passageData.provenance.last_verified,
          },
        ],
        tools_involved: [passageData.provenance.export_method],
        confidence_notes: [
          `Verified at ${new Date(passageData.provenance.last_verified).toISOString()}`,
          `Checksum: ${passageData.integrity.checksum}`,
        ],
      },
      interpretation_note: DISCLAIMERS.provenance,
    };
  } else {
    // Get artifact provenance
    const provenance = await artifactStorage.getProvenance(id);

    return {
      id,
      id_type: 'artifact' as const,
      provenance: {
        origin_notebook: {
          notebook_id: provenance.source_notebooks[0] || 'unknown',
          title: 'Source Notebook',
          author: null,
          created_at: provenance.created_at,
        },
        transformation_steps: provenance.transformation_steps,
        tools_involved: provenance.transformation_steps.map((s) => s.tool),
        confidence_notes: [
          `Created by: ${provenance.created_by}`,
          `Source notebooks: ${provenance.source_notebooks.join(', ')}`,
          `Transformation steps: ${provenance.transformation_steps.length}`,
        ],
      },
      interpretation_note: DISCLAIMERS.provenance,
    };
  }
}
