import React from 'react';
import { Handle, Position } from '@xyflow/react';

const PlaceholderNode: React.FC<{ data: { label?: string } }> = ({ data }) => {
  return React.createElement(
    'div',
    {
      style: {
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        position: 'relative',
      },
    },
    [
      React.createElement('strong', { key: 'label' }, data?.label || 'Custom Node'),
      React.createElement(Handle, {
        key: 'handle-right',
        type: 'source',
        position: Position.Right,
        id: 'right',
      }),
      React.createElement(Handle, {
        key: 'handle-left',
        type: 'target',
        position: Position.Left,
        id: 'left',
      }),
      React.createElement(Handle, {
        key: 'handle-bottom',
        type: 'source',
        position: Position.Bottom,
        id: 'bottom',
      }),
      React.createElement(Handle, {
        key: 'handle-top',
        type: 'target',
        position: Position.Top,
        id: 'top',
      }),
      React.createElement(Handle, {
        key: 'handle-rootIfright',
        type: 'source',
        position: Position.Right,
        id: 'rootIfright',
      }),
    ]
  );
};

export default PlaceholderNode;
