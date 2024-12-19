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
  // type Node,
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
  const [selectedNode, setSelectedNode] = useState<AppNode | null>(null);

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
        logic: {},
        parentId: '',
        ifParentId: '',
      },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [setNodes, saveHistory]);

  const onNodeDoubleClick = useCallback((_: MouseEvent, node: AppNode) => {
    setSelectedNode(node);
  }, []);

  const closeNodePanel = () => setSelectedNode(null);

  const updateNodeData = (key: string, value: string) => {
    if (selectedNode) {
      saveHistory();
      const updatedNodes = nodes.map((node) =>
        node.id === selectedNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                [key]: value,
              },
            }
          : node
      );

      setNodes(updatedNodes);

      setSelectedNode((prevNode) =>
        prevNode
          ? {
              ...prevNode,
              data: {
                ...prevNode.data,
                [key]: value,
              },
            }
          : null
      );
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChangeWithHistory}
        onEdgesChange={onEdgesChangeWithHistory}
        onConnect={onConnect}
        onNodeDoubleClick={onNodeDoubleClick}
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

      {/* Node Panel */}
      {selectedNode && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '300px',
            height: '100%',
            background: '#f4f4f4',
            borderLeft: '1px solid #ccc',
            padding: '10px',
            boxShadow: '-2px 0 5px rgba(0, 0, 0, 0.1)',
            overflowY: 'auto',
          }}
        >
          <h3>Node Details</h3>
          {Object.keys(selectedNode.data || {}).map((key) => (
            <div key={key} style={{ marginBottom: '10px' }}>
              <label htmlFor={`${key}Input`} style={{ display: 'block' }}>
                {key}:
              </label>
              <input
                id={`${key}Input`}
                type="text"
                value={typeof selectedNode.data?.[key] === 'string' || typeof selectedNode.data?.[key] === 'number'
                  ? selectedNode.data[key]
                  : ''}
                onChange={(e) => updateNodeData(key, e.target.value)}
              />
            </div>
          ))}
          <button onClick={closeNodePanel} style={{ marginTop: '10px' }}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
