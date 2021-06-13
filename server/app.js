/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');

const port = 9000;
const app = express();

app.use(cors());

const io = require('socket.io')(
  app.listen(port, () => {
    console.log(`listening on *:${port}`);
  }),
  {
    cors: {
      origin: 'http://localhost:3000',
    },
  }
);

const users = {};

io.on('connection', (socket) => {
  if (!users[socket.id]) {
    users[socket.id] = { x: 0, y: 0 };
  }
  const username = `User${socket.id}`;

  console.log(username);

  socket.emit('connection', username);
  socket.emit(
    'products',
    JSON.parse(fs.readFileSync(`${path.join(__dirname)}/db.json`, 'utf-8'))
  );

  socket.on('cursor', (data) => {
    users[socket.id] = data;
    socket.broadcast.emit('cursor', users);
  });

  socket.on('update', (data) => {
    console.log(data);
    const { id, value, replace } = data;
    const products = JSON.parse(
      fs.readFileSync(`${path.join(__dirname)}/db.json`, 'utf-8')
    );

    products.map((item) => {
      if (item.id === id) {
        item[replace] = value;
      }

      return item;
    });

    fs.writeFileSync(
      `${path.join(__dirname)}/db.json`,
      JSON.stringify(products)
    );
    socket.broadcast.emit('products', products);
  });

  socket.broadcast.emit('message', `Пользователь ${username} соединился`);

  socket.on('disconnect', () => {
    socket.broadcast.emit(
      'message',
      `Пользователь ${username} завершил работу`
    );
  });
});
