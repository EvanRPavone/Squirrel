import type { Node } from '@xyflow/react';

// Extend Node 'type' to include new custom types
export type CustomNodeType = 'position-logger' | 'ellipse' | 'rootIf' | 'add' | 'else' | 'if' | 'elseif';

// Extend the data structure for custom nodes
export type CustomNodeData = {
  label?: string;
  border?: string;
  background?: string;
  logic?: Record<string, unknown>; // Add logic property
  parentId?: string; // Add parentId property
  ifParentId?: string; // Add ifParentId property
  ifSequenceNo?: number; // Add ifSequenceNo property
  commandHandle?: unknown[]; // Add commandHandle for nodes like 'else' or 'elseif'
  [key: string]: unknown; // Allow dynamic indexing with string keys
};

// Define PositionLoggerNode with updated data type
export type PositionLoggerNode = Node<CustomNodeData, 'position-logger'>;

// Define a generic CustomNode that supports the new types
export type CustomNode = Node<CustomNodeData, CustomNodeType>;

// Final AppNode: Only includes CustomNode and PositionLoggerNode
export type AppNode = PositionLoggerNode | CustomNode;
