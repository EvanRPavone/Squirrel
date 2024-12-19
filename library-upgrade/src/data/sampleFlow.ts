import type { AppNode } from '../nodes/types';
import type { Edge } from '@xyflow/react';

// Updated Sample Nodes
export const sampleNodes: AppNode[] = [
  { id: '0', type: 'ellipse', position: { x: 25, y: 15 }, data: { label: 'Start', logic: {}, parentId: 'none', ifParentId: '' }, draggable: true },
  { id: '1', type: 'rootIf', position: { x: 170, y: 110 }, data: { label: '', logic: {}, border: '1px solid #9F3501', parentId: '0', background: '#ffe2d5', ifParentId: '0', ifSequenceNo: 1 }, draggable: true },
  { id: '2', type: 'add', position: { x: 420, y: 123 }, data: { label: '', logic: {}, parentId: '1', ifParentId: '0' }, draggable: true },
  { id: '3', type: 'else', position: { x: 585, y: 110 }, data: { label: '', logic: {}, border: '1px solid #FDDA23', parentId: '1', background: 'white', ifParentId: '0' }, draggable: true },
  { id: '4', type: 'if', position: { x: 180, y: 255 }, data: { label: '', logic: {}, border: '1px solid #9F3501', parentId: '1', background: '#ffe2d5', ifParentId: '1' }, draggable: true },
  { id: '5', type: 'add', position: { x: 610, y: 283 }, data: { label: '', logic: {}, parentId: '4', ifParentId: '1' }, draggable: true },
  { id: '6', type: 'else', position: { x: 730, y: 270 }, data: { label: '', logic: {}, border: '1px solid #FDDA23', parentId: '4', background: 'white', ifParentId: '1', commandHandle: [] }, draggable: true },
  { id: '7', type: 'elseif', position: { x: 430, y: 225 }, data: { label: '', logic: {}, border: '1px solid #16a74a', parentId: '4', background: '#e4ffe4', ifParentId: '1' }, draggable: true },
  { id: '8', type: 'rootIf', position: { x: 200, y: 433 }, data: { label: '', logic: {}, border: '1px solid #9F3501', parentId: '0', background: '#ffe2d5', ifParentId: '0', ifSequenceNo: 2 }, draggable: true },
  { id: '9', type: 'add', position: { x: 420, y: 446 }, data: { label: '', logic: {}, parentId: '8', ifParentId: '0' }, draggable: true },
  { id: '10', type: 'else', position: { x: 540, y: 433 }, data: { label: '', logic: {}, border: '1px solid #FDDA23', parentId: '8', background: 'white', ifParentId: '0' }, draggable: true },
];

// Updated Sample Edges
export const sampleEdges: Edge[] = [
  { id: 'reactflow__edge-0bottom-1top', source: '0', target: '1', animated: false, style: { stroke: 'grey' }, type: 'custom', sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'reactflow__edge-1rootIfright-2left', source: '1', target: '2', animated: false, style: { stroke: 'grey' }, type: 'default', sourceHandle: 'rootIfright', targetHandle: 'left' },
  { id: 'reactflow__edge-2right-3left', source: '2', target: '3', animated: false, style: { stroke: 'grey' }, type: 'default', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'reactflow__edge-5right-6left', source: '5', target: '6', animated: false, style: { stroke: 'grey' }, type: 'default', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'reactflow__edge-1rootIfbottom-4null', source: '1', target: '4', animated: false, style: { stroke: 'grey' }, type: 'default', sourceHandle: 'rootIfbottom', targetHandle: null },
  { id: 'reactflow__edge-4ifright-7undefined', source: '4', target: '7', animated: false, style: { stroke: 'grey' }, type: 'default', sourceHandle: 'ifright', targetHandle: null },
  { id: 'reactflow__edge-7elseifright-5left', source: '7', target: '5', animated: false, style: { stroke: 'grey' }, type: 'default', sourceHandle: 'elseifright', targetHandle: 'left' },
  { id: 'reactflow__edge-8rootIfright-9left', source: '8', target: '9', animated: false, style: { stroke: 'grey' }, type: 'default', sourceHandle: 'rootIfright', targetHandle: 'left' },
  { id: 'reactflow__edge-9right-10left', source: '9', target: '10', animated: false, style: { stroke: 'grey' }, type: 'default', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'reactflow__edge-0bottom-8top', source: '0', target: '8', animated: false, style: { stroke: 'grey' }, type: 'custom', sourceHandle: 'bottom', targetHandle: 'top' },
];
