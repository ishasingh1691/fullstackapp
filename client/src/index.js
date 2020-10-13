import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

import {Provider} from 'react-redux'
import {store} from './store'

import axios from './axios'

axios.interceptors.request.use(request => {
  if(localStorage.getItem('token')){
    request.headers.common['x-auth-token'] = localStorage.getItem('token');
}
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});


ReactDOM.render(
<Provider store={store}><App /></Provider>,
  document.getElementById('root')
);


