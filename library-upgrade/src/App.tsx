import { useCallback, useState, MouseEvent } from 'react';
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
  type Node,
  type Edge,
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

  const addNode = useCallback(() => {
    saveHistory();
    const nodeName = window.prompt('Enter the name of the new node:', 'New Node');
    const nodeColor = window.prompt('Enter a background color (e.g., #FF5733):', '#89CFF0');
    if (!nodeName) return;

    const newNode: AppNode = {
      id: `node-${Date.now()}`,
      type: 'ellipse',
      position: { x: Math.random() * 250, y: Math.random() * 250 },
      data: {
        label: nodeName,
        background: nodeColor || '#89CFF0',
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes, saveHistory]);

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

  const loadFlow = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const flow = JSON.parse(content);

      if (flow.nodes && flow.edges) {
        setNodes(flow.nodes);
        setEdges(flow.edges);
      }
    };

    reader.readAsText(file);
  }, [setNodes, setEdges]);

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

  const deleteNode = () => {
    if (contextMenu?.target === 'node') {
      saveHistory();
      setNodes((nds) => nds.filter((node) => node.id !== contextMenu.targetId));
      setEdges((eds) => eds.filter((edge) => edge.source !== contextMenu.targetId && edge.target !== contextMenu.targetId));
      setContextMenu(null);
    }
  };

  const deleteEdge = () => {
    if (contextMenu?.target === 'edge') {
      saveHistory();
      setEdges((eds) => eds.filter((edge) => edge.id !== contextMenu.targetId));
      setContextMenu(null);
    }
  };

  return (
    <div style={{ height: '100vh' }} onClick={() => setContextMenu(null)}>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
        <button
          onClick={saveFlow}
          style={{
            marginRight: '10px',
            padding: '8px 12px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save Flow
        </button>
        <label
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Load Flow
          <input type="file" accept="application/json" onChange={loadFlow} style={{ display: 'none' }} />
        </label>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChangeWithHistory}
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
          <ControlButton onClick={undo}>↩️ </ControlButton>
          <ControlButton onClick={redo}>↪️ </ControlButton>
          <ControlButton onClick={addNode}>➕ </ControlButton>
        </Controls>
      </ReactFlow>

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
          {contextMenu.target === 'node' && (
            <>
              <div>📝</div>
              <div>🎨</div>
              <div onClick={deleteNode}>🗑</div>
            </>
          )}
          {contextMenu.target === 'edge' && (
            <>
              <div>📝</div>
              <div>🎨</div>
              <div onClick={deleteEdge}>🗑</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
