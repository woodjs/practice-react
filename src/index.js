import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/_base.scss';

import socket from './socket';
import store from './redux/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
  document.getElementById('root')
);
