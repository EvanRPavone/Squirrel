import { Handle, Position, NodeProps } from '@xyflow/react';
import type { CustomNode } from '../types';

export default function AddNode({ data }: NodeProps<CustomNode>) {
  const label = data?.label || 'Add Node';
  const background = data?.background || '#d4edda';
  const border = data?.border || '2px solid #000000';

  return (
    <div
      style={{
        width: '120px',
        height: '60px',
        background,
        border,
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#155724',
        fontWeight: 'bold',
      }}
    >
      {label}
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}
