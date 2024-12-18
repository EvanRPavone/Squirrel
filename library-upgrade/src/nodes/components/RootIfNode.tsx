import { Handle, Position, NodeProps } from '@xyflow/react';
import type { CustomNode } from '../types';

export default function RootIfNode({ data }: NodeProps<CustomNode>) {
  const label = data?.label || 'If Condition';
  const border = data?.border || '2px solid #000000';
  const background = data?.background || '#ffe2d5';

  return (
    <div
      style={{
        width: '140px',
        height: '80px',
        background,
        border,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        fontWeight: 'bold',
      }}
    >
      {label}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Right} id="rootIfright" /> {/* Correct ID */}
    </div>
  );
}
