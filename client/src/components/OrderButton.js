import React, { useState } from 'react';
import OrderService from '../services/OrderService';

const OrderButton = ({ quantity, onQuantityChange, onOrderButtonClick }) => {
  const [successMessage, setSuccessMessage] = useState(null);

  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(newQuantity);
  };

  const handleOrderButtonClick = async () => {
    try {
      const orderId = await OrderService.placeOrder(quantity);

      console.log('Order placed with ID:', orderId);

      setSuccessMessage('Votre commande a été ajoutée avec succès.');
      onQuantityChange(0);

      if (onOrderButtonClick) {
        onOrderButtonClick();
      }

      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className="text-gray-700">Quantité:</label>
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <button
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={() => onQuantityChange(Math.max(quantity - 1, 1))}
          >
            -
          </button>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="px-2 py-1 w-12 text-center focus:outline-none"
          />
          <button
            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={handleOrderButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
      >
        Commander
      </button>
      {successMessage && (
        <p className="text-green-500 bg-green-100 p-2 rounded-md border border-green-300">
          {successMessage}
        </p>
      )}
    </div>
  );
};

export default OrderButton;
