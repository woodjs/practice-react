import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import TableContainer from './containers/TableContainer';
import Cursor from './components/Cursor';
import { addCursor } from './redux/actions/cursors';

const App = ({ socket }) => {
  const dispatch = useDispatch();

  socket.on('connection', (username) => {
    dispatch(addCursor(username));
    console.log(`Привет, ${username}`);
  });

  socket.on('cursor', (data) => {
    console.log(data);
  });

  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
  });

  const handleMouse = (e) => {
    const posY = e.clientY;
    const posX = e.clientX;
    setCursor({ ...cursor, x: posX, y: posY });
    socket.emit('cursor', cursor);
  };

  return (
    <div
      className="w-100 vh-100 d-flex align-items-center"
      onMouseMove={(e) => handleMouse(e)}
    >
      <div className="container">
        <div className="row">
          <TableContainer socket={socket} />
        </div>
      </div>
      {/* {cursors.map((item) => (
        <Cursor key={item.id} x={item.posX} y={item.posY} />
      ))} */}
    </div>
  );
};

export default App;
