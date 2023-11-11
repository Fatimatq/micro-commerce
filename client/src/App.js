import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import OrderDetails from './pages/OrderDetails';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/command/:orderId" element={<OrderDetails />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
