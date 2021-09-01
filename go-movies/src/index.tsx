// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'
import { configureStore } from './redux/configureStore'
import { Provider } from 'react-redux';

// store
const store = configureStore()

axios.defaults.baseURL = 'http://localhost:4000/v1/'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
