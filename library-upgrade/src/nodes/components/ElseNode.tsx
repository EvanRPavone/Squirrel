import { Handle, Position, NodeProps } from '@xyflow/react';
import type { CustomNode } from '../types';

export default function ElseNode({ data }: NodeProps<CustomNode>) {
  const label = data?.label || 'Else Node';
  const border = data?.border || '2px solid #000000';
  const background = data?.background || '#fcf8e3';

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
        color: '#856404',
        fontWeight: 'bold',
      }}
    >
      {label}
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
