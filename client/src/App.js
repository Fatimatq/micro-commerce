import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetail from "./pages/ProductDetail";


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' Component={HomePage}/>
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;