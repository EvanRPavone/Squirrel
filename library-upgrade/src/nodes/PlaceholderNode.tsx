import { Handle, Position, NodeProps } from '@xyflow/react';
import type { CustomNode } from '../nodes/types';

export default function PlaceholderNode({ data }: NodeProps<CustomNode>) {
  const label = data?.label || 'Ellipse Node';
  const border = data?.border || '2px solid #000000';
  const background = data?.background || '#89CFF0';

  return (
    <div
      style={{
        width: '120px',
        height: '80px',
        borderRadius: '50%',
        background,
        border,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        fontWeight: 'bold',
      }}
    >
      {label}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
