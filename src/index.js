import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import SalasPage from './components/Pages/SalasPage';
import SalaJogoPage from './components/Pages/SalaJogoPage';
import NotFoundPage from './components/Pages/NotFoundPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/salas" element={<SalasPage />} />
        <Route path="/salas/:id" element={<SalaJogoPage />} />
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
      <App>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);