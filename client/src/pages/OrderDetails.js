import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderService from '../services/OrderService';
import ProductService from '../services/ProductService';
import PaiementService from '../services/PaiementService';

function OrderDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaymentMode, setIsPaymentMode] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [montant, setMontant] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await OrderService.getOrderById(orderId);
        setOrderDetails(orderData);

        // Récupérer les détails du produit associé à la commande
        const productData = await ProductService.getProduct(orderData.productId);
        setProductDetails(productData);

        // Calculer le montant en utilisant le prix du produit
        setMontant(orderData.quantity * productData.price);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePaymentClick = () => {
    setIsPaymentMode(true);
  };

  const handleValidationClick = async () => {
    setIsPaymentMode(false);
    try {
      const paymentData = {
        idCommande: orderId,
        montant: montant,
        numeroCarte: cardNumber,
      };

      const paymentResponse = await PaiementService.makePayment(paymentData);
      console.log('Payment successful:', paymentResponse);

      // Définir le message de succès
      setSuccessMessage('Payment successful!');

      // Réinitialiser le message après 5 secondes
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

    } catch (error) {
      console.error('Error making payment:', error.message);
      // Gérer l'erreur, afficher un message à l'utilisateur, etc.
    }
  };

  return (
    <div className="mt-4 mb-4 flex justify-center">
      <div className="p-8 bg-white shadow-md rounded-md text-center">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {orderDetails && productDetails ? (
          <div>
            <p className="text-gray-800">Product ID: {orderDetails.productId}</p>
            <p className="text-gray-800">Order Date: {orderDetails.orderDate}</p>
            <p className="text-gray-800">Quantity: {orderDetails.quantity}</p>
            <p className="text-gray-800">Price per unit: ${productDetails.price}</p>
            <p className="text-gray-800">Montant: ${montant}</p>

            {successMessage && (
              <div className="text-green-500 mt-2">
                {successMessage}
              </div>
            )}

            {isPaymentMode ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter card number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="mt-4 p-2 rounded-md border"
                />
                <button
                  onClick={handleValidationClick}
                  className="mt-2 bg-blue-500 text-white p-2 rounded-md"
                >
                  Valider
                </button>
              </div>
            ) : (
              <button
                onClick={handlePaymentClick}
                className="mt-4 bg-blue-500 text-white p-2 rounded-md"
              >
                Payer
              </button>
            )}
          </div>
        ) : (
          <p className="text-gray-800">Order not found</p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
