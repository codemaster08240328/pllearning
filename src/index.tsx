import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './AppRoutes';
import axios from 'axios';
import store from 'redux/store';

import './index.scss';
import * as serviceWorker from './serviceWorker';

/** DUMMY APP Authorization Section */

localStorage.setItem(
  'mmk-auth',
  'MmkAuthKey_2cb64107-0686-4e0c-8e58-ee13812074b0'
);
localStorage.setItem('user-id', '324');
localStorage.setItem('campaign-code', 'CHESSKKIN11G');

/** */

const header = {
  'Content-Type': 'application/json',
  // 'MMK-Auth': localStorage.getItem('mmk-auth'), // production
  'MMK-Auth': 'MmkAuthKey_9416f6f7-887f-4c32-86e9-c46065b2891e', // development
};

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_DOMAIN;
axios.defaults.headers = header;

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
