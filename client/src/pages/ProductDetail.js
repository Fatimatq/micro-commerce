import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import OrderButton from '../components/OrderButton';
import OrderService from '../services/OrderService';
import AuthService from '../services/AuthService';
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const productData = await ProductService.getProduct(productId);
        console.log('Product Data:', productData);

        if (!productData) {
          setError('Produit non trouvé. Veuillez vérifier l\'ID du produit.');
        } else {
          setProduct(productData);
        }
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
  
    if (error.response && error.response.status) {
      if (error.response.status === 404) {
        setError('Produit non trouvé. Veuillez vérifier l\'ID du produit.');
      } else if (error.isAxiosError && error.response.status === 500) {
        setError('Erreur serveur. Veuillez réessayer plus tard.');
      } else {
        setError('Une erreur s\'est produite lors de la récupération du produit.');
      }
    } else if (error.message === 'Network Error') {
      setError('Erreur réseau. Veuillez vérifier votre connexion Internet.');
    } else {
      setError('Une erreur s\'est produite lors de la récupération du produit.');
    }
  };
  

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const navigate = useNavigate();

  const handleOrderButtonClick = async () => {
    try {
      // Check if the user is authenticated
      const isAuthenticated = await AuthService.isAuthenticated();
      console.log('Is authenticated:', isAuthenticated);
  
      if (isAuthenticated) {
        // Check productId and quantity
        if (productId && quantity > 0) {
          // Place the order
          const response = await OrderService.placeOrder(
            productId,
            new Date(),
            quantity,
            false
          );
          const orderId = response._id;
          console.log('Order placed with ID:', orderId);
  
          // Display success message
          setSuccessMessage('Votre commande a été ajoutée avec succès.');
          setQuantity(0);
  
          // Redirect to the /command/${orderId} route
          navigate(`/command/${orderId}`);
  
          // Clear the success message after 5 seconds
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        } else {
          console.error('Invalid productId or quantity. Cannot place the order.');
        }
      } else {
        // Redirect to login page if the user is not authenticated
        console.log('Redirecting to login...');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during order placement:', error.message);
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
              <div className="flex items-center mb-4">
                <img className="w-1/2 h-48 object-cover rounded-md mr-4" src={product.image} alt={product.title} />
                <div className="flex flex-col">
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-blue-500 text-lg font-bold">Prix: {product.price} €</p>
                    <OrderButton
                      quantity={quantity}
                      onQuantityChange={handleQuantityChange}
                      onOrderButtonClick={handleOrderButtonClick}
                    />
                  </div>
                  <p className="text-gray-600 mt-2">Quantité sélectionnée: {quantity}</p>
                  {successMessage && (
                    <p className="text-green-500 bg-green-100 p-2 rounded-md border border-green-300 mt-2">
                      {successMessage}
                    </p>
                  )}
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