import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './AppRoutes';
import axios from 'axios';

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
  'MMK-Auth': 'MmkAuthKey_0e2b1a6b-db65-4b67-a6dc-1980cae217b3', // development
};

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_DOMAIN;
axios.defaults.headers = header;

ReactDOM.render(<AppRouter />, document.getElementById('root'));

serviceWorker.unregister();
