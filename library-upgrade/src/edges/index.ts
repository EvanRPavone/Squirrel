import type { Edge, EdgeTypes } from '@xyflow/react';
import { sampleEdges } from '../data/sampleFlow';

// Merge sample edges with any additional custom edges
export const initialEdges: Edge[] = [
  ...sampleEdges,
];

// Custom edge types (empty for now but ready to extend)
export const edgeTypes = {
  // Add your custom edge types here!
} satisfies EdgeTypes;
