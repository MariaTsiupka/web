import React from "react";
import ReactDOM from 'react-dom';
import * as ReactDOMClient from "react-dom/client";
import App from './App.js';

import "./css/styles.css";
import { Provider } from "react-redux";
import store from './redux/store.js';



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
