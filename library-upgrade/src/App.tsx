import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  ControlButton,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Edge,
  type Node,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { AppNode } from './nodes/types';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onEdgeDoubleClick = useCallback(
    (_: React.MouseEvent, edge: Edge) => {
      const confirmDelete = window.confirm(`Delete edge "${edge.id}"?`);
      if (confirmDelete) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }
    },
    [setEdges]
  );

  const onNodeDoubleClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      const confirmDelete = window.confirm(`Delete node "${node.id}" and all its connections?`);
      if (confirmDelete) {
        setNodes((nds) => nds.filter((n) => n.id !== node.id));
        setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id));
      }
    },
    [setNodes, setEdges]
  );

  const addNode = useCallback(() => {
    const nodeName = window.prompt('Enter the name of the new node:', 'New Node');
    if (!nodeName) return;

    const newNodeId = `node-${nodes.length + 1}`;
    const newNode: AppNode = {
      id: newNodeId,
      type: 'default',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: nodeName },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes]);

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
      >
        <Background />
        <MiniMap />
        {/* Custom Controls with Add Node Button */}
        <Controls>
          <ControlButton onClick={addNode} title="Add Node">
            ➕
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
}
