import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';

export default function CustomEdge({ sourceX, sourceY, targetX, targetY, style }: EdgeProps) {
  const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  return (
    <>
      <BaseEdge path={path} markerEnd="url(#arrowhead)" style={style} />
      <defs>
        <marker
          id="arrowhead"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 Z" fill="grey" />
        </marker>
      </defs>
    </>
  );
}
