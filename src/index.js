import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";  // 1. Importación para la creación de rutas react-router-dom

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

// <BrowserRoutes> -> Se importa desde react-router-dom, se agrega nuestra App principal o pagina principal dentro de él
// Para así iniciar con la creación de las rutas. 