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

  const changeNodeColor = () => {
    if (contextMenu?.target === 'node') {
      const newColor = window.prompt('Enter a color (e.g., #FF5733):', '#89CFF0');
      if (newColor) {
        saveHistory();
        setNodes((nds) =>
          nds.map((node) =>
            node.id === contextMenu.targetId
              ? { ...node, data: { ...node.data, background: newColor } }
              : node
          )
        );
      }
      setContextMenu(null);
    }
  };

  const editNodeLabel = () => {
    if (contextMenu?.target === 'node') {
      const newLabel = window.prompt('Enter a new label:', 'New Label');
      if (newLabel) {
        saveHistory();
        setNodes((nds) =>
          nds.map((node) =>
            node.id === contextMenu.targetId
              ? { ...node, data: { ...node.data, label: newLabel } }
              : node
          )
        );
      }
      setContextMenu(null);
    }
  };

  const changeEdgeColor = () => {
    if (contextMenu?.target === 'edge') {
      const newColor = window.prompt('Enter a color for the edge (e.g., #007bff):', '#007bff');
      if (newColor) {
        saveHistory();
        setEdges((eds) =>
          eds.map((edge) =>
            edge.id === contextMenu.targetId ? { ...edge, style: { ...edge.style, stroke: newColor } } : edge
          )
        );
      }
      setContextMenu(null);
    }
  };

  const editEdgeLabel = () => {
    if (contextMenu?.target === 'edge') {
      const newLabel = window.prompt('Enter a new label for the edge:', 'New Label');
      if (newLabel) {
        saveHistory();
        setEdges((eds) =>
          eds.map((edge) =>
            edge.id === contextMenu.targetId ? { ...edge, label: newLabel } : edge
          )
        );
      }
      setContextMenu(null);
    }
  };

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
          <ControlButton onClick={undo}>↩️ Undo</ControlButton>
          <ControlButton onClick={redo}>↪️ Redo</ControlButton>
          <ControlButton onClick={addNode}>➕ Add Node</ControlButton>
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
              <div onClick={editNodeLabel}>📝 Edit Node</div>
              <div onClick={changeNodeColor}>🎨 Change Color</div>
              <div onClick={deleteNode}>🗑 Delete Node</div>
            </>
          )}
          {contextMenu.target === 'edge' && (
            <>
              <div onClick={editEdgeLabel}>📝 Edit Edge Label</div>
              <div onClick={changeEdgeColor}>🎨 Change Edge Color</div>
              <div onClick={deleteEdge}>🗑 Delete Edge</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
