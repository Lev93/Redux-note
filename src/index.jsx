import '@babel/polyfill';
import ReactDOM from 'react-dom';
import React from 'react';

import TodoBox from './TodoBox';

ReactDOM.render(
  <TodoBox />,
  document.getElementById('container'),
);
