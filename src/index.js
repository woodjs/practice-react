import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import io from 'socket.io-client';

// import { SocketContext, socket } from './socket';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/_base.scss';

import store from './redux/store';
import App from './App';

const socket = io('http://localhost:9000/');

ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
  document.getElementById('root')
);
