import type { AppNode } from '../nodes/types';
import type { Edge } from '@xyflow/react';

// Sample Nodes
export const sampleNodes: AppNode[] = [
  { id: '0', type: 'ellipse', position: { x: 25, y: 15 }, data: { label: 'Start' }, draggable: true },
  {
    id: '1',
    type: 'rootIf',
    position: { x: 170, y: 110 },
    data: { label: '', border: '1px solid #9F3501', background: '#ffe2d5' },
    draggable: true,
  },
  {
    id: '2',
    type: 'add',
    position: { x: 420, y: 123 },
    data: { label: '' },
    draggable: true,
  },
  {
    id: '3',
    type: 'else',
    position: { x: 585, y: 110 },
    data: { label: '', border: '1px solid #FDDA23', background: 'white' },
    draggable: true,
  },
];

// Sample Edges
export const sampleEdges: Edge[] = [
  {
    id: 'reactflow__edge-0bottom-1top',
    source: '0',
    target: '1',
    animated: false,
    style: { stroke: 'grey' },
    type: 'default',
    sourceHandle: 'bottom',
    targetHandle: 'top',
  },
  {
    id: 'reactflow__edge-1rootIfright-2left',
    source: '1',
    target: '2',
    animated: false,
    style: { stroke: 'grey' },
    type: 'default',
    sourceHandle: 'rootIfright',
    targetHandle: 'left',
  },
  {
    id: 'reactflow__edge-2right-3left',
    source: '2',
    target: '3',
    animated: false,
    style: { stroke: 'grey' },
    type: 'default',
    sourceHandle: 'right',
    targetHandle: 'left',
  },
];
