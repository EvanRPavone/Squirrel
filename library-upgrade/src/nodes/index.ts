import type { NodeTypes } from '@xyflow/react';
import { PositionLoggerNode } from './components/PositionLoggerNode';
import { AppNode } from './types';
import { sampleNodes } from '../data/sampleFlow';
// import PlaceholderNode from './PlaceholderNode';
import EllipseNode from './components/EllipseNode';
import RootIfNode from './components/RootIfNode';
import AddNode from './components/AddNode';
import ElseNode from './components/ElseNode';
import ElseIfNode from './components/ElseIfNode';
import IfNode from './components/IfNode';

// Register all node types, including placeholders
export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  'ellipse': EllipseNode,
  'rootIf': RootIfNode,
  'add': AddNode,
  'else': ElseNode,
  'if': IfNode,
  'elseif': ElseIfNode,
} satisfies NodeTypes;

// Merge sample nodes with any additional custom nodes
export const initialNodes: AppNode[] = [
  ...sampleNodes,
  { id: 'custom-node', type: 'position-logger', position: { x: -100, y: 200 }, data: { label: 'Custom Node' } },
];
