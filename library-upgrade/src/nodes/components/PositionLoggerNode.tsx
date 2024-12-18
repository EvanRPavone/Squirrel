import { Handle, Position, NodeProps } from '@xyflow/react';
import type { CustomNode } from '../types';

export function PositionLoggerNode({
  positionAbsoluteX,
  positionAbsoluteY,
  data,
}: NodeProps<CustomNode> & { positionAbsoluteX?: number; positionAbsoluteY?: number }) {
  const x = positionAbsoluteX !== undefined ? `${Math.round(positionAbsoluteX)}px` : 'N/A';
  const y = positionAbsoluteY !== undefined ? `${Math.round(positionAbsoluteY)}px` : 'N/A';
  const label = data?.label || 'Position Logger';

  return (
    <div
      style={{
        padding: '10px',
        border: '2px solid #000000',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        textAlign: 'center',
        color: '#333',
        fontWeight: 'bold',
      }}
    >
      <div>{label}</div>
      <div>
        X: {x}, Y: {y}
      </div>
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}
