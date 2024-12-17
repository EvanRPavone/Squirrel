import type { NodeTypes } from '@xyflow/react';
import { PositionLoggerNode } from './PositionLoggerNode';
import { AppNode } from './types';
import { sampleNodes } from '../data/sampleFlow';
import PlaceholderNode from './PlaceholderNode';

// Register all node types, including placeholders
export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'ellipse': PlaceholderNode,
  'rootIf': PlaceholderNode,
  'add': PlaceholderNode,
  'else': PlaceholderNode,
} satisfies NodeTypes;

// Merge sample nodes with any additional custom nodes
export const initialNodes: AppNode[] = [
  ...sampleNodes,
  { id: 'custom-node', type: 'position-logger', position: { x: -100, y: 200 }, data: { label: 'Custom Node' } },
];
