import React from 'react';

const Cursor = ({ x, y }) => (
  <div
    className="position-absolute"
    style={{
      width: '50px',
      height: '50px',
      backgroundColor: 'lime',
      top: 20,
      left: 50,
    }}
  />
);

export default Cursor;
