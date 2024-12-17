import type { Node, BuiltInNode } from '@xyflow/react';

// Extend Node 'type' to include new custom types
export type CustomNodeType =
  | 'position-logger'
  | 'ellipse'
  | 'rootIf'
  | 'add'
  | 'else';

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

// Allow BuiltInNode and CustomNode in AppNode
export type AppNode = BuiltInNode | PositionLoggerNode | CustomNode;
