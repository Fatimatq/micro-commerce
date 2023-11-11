import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrderButton from "./OrderButton";
import OrderService from "../services/OrderService";

function Product({ product }) {
  const [quantity, setQuantity] = useState(0);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleOrderButtonClick = async () => {
    if (product?._id && quantity > 0) {
      try {
        console.log('Attempting to place order...');
        const response = await OrderService.placeOrder(
          product?._id,
          new Date(),
          quantity,
          false
        );
        const orderId = response._id;

        console.log('Order placed with ID:', orderId);
        console.log(`Navigating to /command/${orderId}`);
        navigate(`/command/${orderId}`);
      } catch (error) {
        console.error('Error placing order:', error);
      }
    } else {
      console.error('Invalid productId or quantity. Cannot place the order.');
    }
  };

  console.log('Rendering Product component...');

  return (
    <div className="bg-white p-4 rounded-md shadow-md transition-transform transform hover:scale-105 flex flex-col">
      <Link to={`/products/${product?._id}`}>
        <div className="relative overflow-hidden rounded-md mb-4">
          <img
            className="w-full h-42 object-cover rounded-md"
            src={product?.image}
            alt={product?.titre}
          />
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-gray-800 font-semibold text-lg">{product?.titre}</h3>
          <p className="text-teal-500 text-lg font-bold">${product?.price}</p>
        </div>
      </Link>

      <div className="mx-auto mt-4">
        <OrderButton
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onOrderButtonClick={handleOrderButtonClick}
        />
      </div>
      <p className="text-gray-600 mt-2">Quantité sélectionnée: {quantity}</p>
    </div>
  );
}

export default Product;
