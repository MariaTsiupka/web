import React from "react";
import ReactDOM from "react-dom/client"; // Використовуйте 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './css/styles.css';

// Отримуємо корінь елемента
const root = ReactDOM.createRoot(document.getElementById("root"));

// Використовуємо метод createRoot для рендерингу
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
