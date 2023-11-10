import React, { useState, useEffect } from 'react';
import ProductService from '../services/ProductService'; 
import Product from "../components/Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await ProductService.getAllProducts();
        console.log(productsData); 
        setProducts(productsData);
        console.log(products); 
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
        setError('Une erreur s\'est produite lors de la récupération des produits.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start w-full">

      <div className="flex justify-start items-center w-full my-6">
        <div className="grid grid-cols-3 w-full justify-items-center gap-8">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
