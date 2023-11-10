import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Product ID:', productId);

    const fetchProduct = async () => {
      try {
        const productData = await ProductService.getProduct(productId);
        console.log('Product Data:', productData);
        setProduct(productData);
      } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);

        if (error.response && error.response.status === 404) {
          setError('Produit non trouvé. Veuillez vérifier l\'ID du produit.');
        } else if (error.message === 'Network Error') {
          setError('Erreur réseau. Veuillez vérifier votre connexion Internet.');
        } else {
          setError('Une erreur s\'est produite lors de la récupération du produit.');
        }
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return (
    <div>
      <h2>Détails du produit</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          {product ? (
            <div>
              <h3>{product.titre}</h3>
              <p>{product.description}</p>
              <img src={product.image} alt={product.titre} />
              <p>Prix: {product.price} €</p>
            </div>
          ) : (
            <p>Chargement...</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
