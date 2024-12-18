import type { Node } from '@xyflow/react';

// Extend Node 'type' to include new custom types
export type CustomNodeType = 'position-logger' | 'ellipse' | 'rootIf' | 'add' | 'else';

// Extend the data structure for custom nodes
export type CustomNodeData = {
  label?: string;
  border?: string;
  background?: string;
};

// Define PositionLoggerNode with updated data type
export type PositionLoggerNode = Node<CustomNodeData, 'position-logger'>;

// Define a generic CustomNode that supports the new types
export type CustomNode = Node<CustomNodeData, CustomNodeType>;

// Final AppNode: Only includes CustomNode
export type AppNode = PositionLoggerNode | CustomNode;
