import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import OrderDetails from './pages/OrderDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthService from "./services/AuthService";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());

  const handleLogout = () => {
    // Perform logout logic (clear token, redirect, etc.)
    AuthService.logout();
    // Update the state to reflect the user being logged out
    setIsLoggedIn(false);
  };

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/command/:orderId" element={<OrderDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
