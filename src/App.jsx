import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/Login/login';
import RegisterPage from './pages/Register/register';
import HomePage from './pages/Home/home';
import { UserContext } from './context/UserContext';

function App() {

  const {user} = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ user ? <Navigate to="/"/> : <LoginPage />} />
        <Route path="/register" element={ user ? <Navigate to="/"/> : <RegisterPage />} />
        <Route path="/" element={ user ? <HomePage /> : <Navigate to="/login"/>} />
      </Routes>
    </Router>
  );
}

export default App;