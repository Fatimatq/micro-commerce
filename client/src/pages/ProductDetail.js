import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await ProductService.getProduct(productId);
        setProduct(productData);
      } catch (error) {
        handleFetchError(error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleFetchError = (error) => {
    console.error('Erreur lors de la récupération du produit :', error);

    if (error.response && error.response.status === 404) {
      setError('Produit non trouvé. Veuillez vérifier l\'ID du produit.');
    } else if (error.isAxiosError && error.response.status === 500) {
      setError('Erreur serveur. Veuillez réessayer plus tard.');
    } else if (error.message === 'Network Error') {
      setError('Erreur réseau. Veuillez vérifier votre connexion Internet.');
    } else {
      setError('Une erreur s\'est produite lors de la récupération du produit.');
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Détails du produit</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {product ? (
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
              <h3 className="text-2xl font-bold mb-4">{product.titre}</h3>
              <div className="flex items-center">
                <img className="w-1/2 h-48 object-cover rounded-md mb-4" src={product.image} alt={product.title} />
                <div className="ml-4">
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-blue-500 text-lg font-bold mt-4">Prix: {product.price} €</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Chargement...</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
