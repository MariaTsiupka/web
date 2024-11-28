import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from './App.js';
 // перевір, чи шлях правильний
import "./css/styles.css"; // підключення основного CSS
import { Provider } from "react-redux";
import store from './redux/store.js';
 // шлях до твого store

// Створюємо корінь додатка
const root = ReactDOMClient.createRoot(document.getElementById("root"));

// Рендеримо додаток
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
