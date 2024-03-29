import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './ParamEditor.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Корневой элемент не найден в документе");
}