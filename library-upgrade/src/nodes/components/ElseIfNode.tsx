import { Handle, Position } from '@xyflow/react';
import type { NodeProps } from '@xyflow/react';
import type { CustomNode } from '../types';

export default function IfNode({ data }: NodeProps<CustomNode>) {
  const { label, border, background } = data || {};

  return (
    <div
      style={{
        width: '120px',
        height: '80px',
        border: border || '1px solid #9F3501',
        background: background || '#ffe2d5',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
        color: '#333',
        fontWeight: 'bold',
      }}
    >
      <div>{label || 'If Node'}</div>
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Right} id="ifright" />
      <Handle type="source" position={Position.Right} id="elseifright" />
      <Handle type="source" position={Position.Bottom} id="ifbottom" />
    </div>
  );
}
