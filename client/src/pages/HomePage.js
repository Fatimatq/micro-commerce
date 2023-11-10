import React from 'react';
import ProductList from '../components/ProductList';

const HomePage = () => {
  return (
    <>
      <div className="bg-teal-400 text-gray-800 text-center py-10">
        <h1 className="text-4xl font-bold">Bienvenue sur MCommerce</h1>
      </div>

      <div className="container mx-auto my-8">
        <ProductList />
      </div>
    </>
  );
};

export default HomePage;
