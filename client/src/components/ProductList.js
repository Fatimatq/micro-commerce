import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import Product from '../components/Product';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await ProductService.getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        setError('Une erreur s\'est produite lors de la récupération des produits.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Explorez nos Produits</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
