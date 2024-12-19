import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useState } from 'react';
import type { CustomNode } from '../types';

export default function RootIfNode({ data }: NodeProps<CustomNode>) {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div
      style={{
        width: '150px',
        height: '100px',
        background: data.background || '#ffe2d5',
        border: data.border || '2px solid #9F3501',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#333',
        fontWeight: 'bold',
        position: 'relative',
      }}
    >
      <div>{data.label || 'Root If Node'}</div>
      <div style={{ fontSize: '0.8em', marginTop: '5px', color: '#555' }}>
        Parent: {data.parentId || 'None'}
      </div>
      <div style={{ fontSize: '0.8em', marginTop: '5px', color: '#555' }}>
        If Parent: {data.ifParentId || 'None'}
      </div>
      <button
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontSize: '0.8em',
        }}
        onClick={openModal}
      >
        Edit Logic
      </button>

      <Handle type="source" position={Position.Right} id="rootIfright" />
      <Handle type="source" position={Position.Bottom} id="rootIfbottom" />
      <Handle type="target" position={Position.Top} id="top" />

      {/* Modal for editing logic */}
      {isModalOpen && (
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '60%',
            height: '60%',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <h3>Edit Logic</h3>
          <textarea
            rows={5}
            style={{ width: '100%', padding: '10px', fontSize: '0.9em' }}
            placeholder="Enter logic here..."
            defaultValue={JSON.stringify(data.logic || {}, null, 2)}
          />
          <button
            style={{
              marginTop: '10px',
              padding: '10px',
              background: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9em',
            }}
            onClick={closeModal}
          >
            Save Logic
          </button>
        </div>
      )}
    </div>
  );
}
