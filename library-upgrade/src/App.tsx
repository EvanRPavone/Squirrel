import { useCallback, useState, useEffect, MouseEvent } from 'react';
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
  type NodeChange,
  type EdgeChange,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { AppNode } from './nodes/types';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [history, setHistory] = useState<{ nodes: AppNode[]; edges: Edge[] }[]>([]);
  const [redoStack, setRedoStack] = useState<typeof history>([]);
  const [contextMenu, setContextMenu] = useState<{
    position: { x: number; y: number };
    target: 'node' | 'edge' | null;
    targetId: string | null;
  } | null>(null);

  const saveHistory = useCallback(() => {
    setHistory((prevHistory) => [...prevHistory, { nodes, edges }]);
    setRedoStack([]);
  }, [nodes, edges]);

  const undo = useCallback(() => {
    if (history.length > 0) {
      const previousState = history[history.length - 1];
      setRedoStack((prevRedo) => [...prevRedo, { nodes, edges }]);
      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
    }
  }, [history, nodes, edges, setNodes, setEdges]);

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setHistory((prevHistory) => [...prevHistory, { nodes, edges }]);
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setRedoStack((prevRedo) => prevRedo.slice(0, -1));
    }
  }, [redoStack, nodes, edges, setNodes, setEdges]);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      saveHistory();
      const label = window.prompt('Enter a label for the edge:', 'New Edge');
      const newEdge: Edge = {
        ...connection,
        id: `edge-${Date.now()}`,
        animated: true,
        label: label || '',
        style: { stroke: '#007bff' },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, saveHistory]
  );

  const onNodesChangeWithHistory = useCallback(
    (changes: NodeChange<AppNode>[]) => {
      saveHistory();
      onNodesChange(changes);
    },
    [onNodesChange, saveHistory]
  );

  const onEdgesChangeWithHistory = useCallback(
    (changes: EdgeChange[]) => {
      saveHistory();
      onEdgesChange(changes);
    },
    [onEdgesChange, saveHistory]
  );

  const addNode = useCallback(() => {
    saveHistory();
    const nodeName = window.prompt('Enter the name of the new node:', 'New Node');
    if (!nodeName) return;

    const newNode: AppNode = {
      id: `node-${nodes.length + 1}`,
      type: 'default',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: { label: nodeName },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes, setNodes, saveHistory]);

  const saveFlow = useCallback(() => {
    const flow = { nodes, edges };
    const flowJSON = JSON.stringify(flow, null, 2);
    const blob = new Blob([flowJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flow-state.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  // Keyboard listeners for Undo (Ctrl+Z) and Redo (Ctrl+Y)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 'z') {
          event.preventDefault();
          undo();
        } else if (event.key === 'y') {
          event.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo, redo]);

  // Context Menu
  const onNodeContextMenu = useCallback((event: MouseEvent, node: Node) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.clientX, y: event.clientY },
      target: 'node',
      targetId: node.id,
    });
  }, []);

  const onEdgeContextMenu = useCallback((event: MouseEvent, edge: Edge) => {
    event.preventDefault();
    setContextMenu({
      position: { x: event.clientX, y: event.clientY },
      target: 'edge',
      targetId: edge.id,
    });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  const deleteNode = () => {
    if (contextMenu?.target === 'node') {
      saveHistory();
      setNodes((nds) => nds.filter((node) => node.id !== contextMenu.targetId));
      setEdges((eds) => eds.filter((edge) => edge.source !== contextMenu.targetId && edge.target !== contextMenu.targetId));
      closeContextMenu();
    }
  };

  const deleteEdge = () => {
    if (contextMenu?.target === 'edge') {
      saveHistory();
      setEdges((eds) => eds.filter((edge) => edge.id !== contextMenu.targetId));
      closeContextMenu();
    }
  };

  return (
    <div style={{ height: '100vh' }} onClick={closeContextMenu}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChangeWithHistory}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChangeWithHistory}
        onConnect={onConnect}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        snapToGrid
        snapGrid={[20, 20]}
        fitView
      >
        <Background gap={20} size={1} />
        <MiniMap />
        <Controls>
          <ControlButton onClick={undo}>↩️ Undo</ControlButton>
          <ControlButton onClick={redo}>↪️ Redo</ControlButton>
          <ControlButton onClick={addNode}>➕ Add Node</ControlButton>
          <ControlButton onClick={saveFlow}>💾 Save Flow</ControlButton>
        </Controls>
      </ReactFlow>

      {/* Context Menu */}
      {contextMenu && (
        <div
          style={{
            position: 'absolute',
            top: contextMenu.position.y,
            left: contextMenu.position.x,
            background: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          {contextMenu.target === 'node' && <div onClick={deleteNode}>🗑 Delete Node</div>}
          {contextMenu.target === 'edge' && <div onClick={deleteEdge}>🗑 Delete Edge</div>}
        </div>
      )}
    </div>
  );
}
