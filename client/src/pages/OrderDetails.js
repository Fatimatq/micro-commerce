import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OrderService from '../services/OrderService';
import PaiementService from '../services/PaiementService';

function OrderDetails() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaymentMode, setIsPaymentMode] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await OrderService.getOrderById(orderId);
        setOrderDetails(orderData);
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
    try {
      const paymentData = {
        idCommande: orderId,
        cardNumber: cardNumber,
        // Add other payment data as needed
      };

      const paymentResponse = await PaiementService.makePayment(paymentData);
      console.log('Payment successful:', paymentResponse);

      // Add any logic you need after a successful payment, such as redirecting or updating state

    } catch (error) {
      console.error('Error making payment:', error.message);
      // Handle the error, show a message to the user, etc.
    }
  };

  return (
    <div className="mt-4 mb-4 flex justify-center">
      <div className="p-8 bg-white shadow-md rounded-md text-center">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {orderDetails ? (
          <div>
            <p className="text-gray-800">Product ID: {orderDetails.productId}</p>
            <p className="text-gray-800">Order Date: {orderDetails.orderDate}</p>
            <p className="text-gray-800">Quantity: {orderDetails.quantity}</p>

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
