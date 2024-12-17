import { Handle, Position } from '@xyflow/react';

// Manually type the props with only the fields we need
interface EllipseNodeProps {
  data: {
    label?: string; // Optional label for the node
  };
}

// EllipseNode component
export default function EllipseNode({ data }: EllipseNodeProps) {
  const label = data?.label ?? 'Ellipse Node';

  return (
    <div
      style={{
        width: '120px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#89CFF0',
        border: '2px solid #0077b6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        fontWeight: 'bold',
      }}
    >
      {label}
      {/* Handles */}
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
