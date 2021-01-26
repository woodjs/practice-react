const express = require('express');
const cors = require('cors');

const port = 9000;
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/getProducts');
const updateRouter = require('./routes/updProducts');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/update', updateRouter);
app.use('*', (res) => {
  res.json({ status: 404, message: 'url не существует' }, 404);
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

let users = [];

io.on('connection', (socket) => {
  users.push(socket.id);
  const username = `User${socket.id}`;
  socket.emit('connection', username);
  socket.emit('products', [
    { id: 1, name: 'Молоко', count: 40, priceForOne: 50 },
    { id: 2, name: 'Банан', count: 30, priceForOne: 50 },
    { id: 3, name: 'Яблоко', count: 10, priceForOne: 100 },
    { id: 4, name: 'Хлеб', count: 1, priceForOne: 30 },
  ]);
  socket.broadcast.emit('message', `Пользователь ${username} соединился`);
  socket.on('disconnect', () => {
    users = users.filter((item) => item !== socket.id);
    socket.broadcast.emit(
      'message',
      `Пользователь ${username} завершил работу`
    );
  });
});
