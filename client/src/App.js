import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import OrderDetails from './pages/OrderDetails';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/command/:orderId" element={<OrderDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
