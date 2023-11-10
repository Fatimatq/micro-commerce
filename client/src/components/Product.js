import React from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Link to={`/products/${product?._id}`}>
      <div className="bg-white p-4 rounded-md shadow-md transition-transform transform hover:scale-105">
        <img
          className="w-full h-40 object-cover rounded-md mb-4"
          src={product?.image}
          alt={product?.description}
        />
        <h3 className="text-gray-800 font-semibold mb-2">{product?.title}</h3>
        <p className="text-blue-500 text-lg font-bold mb-2">${product?.price}</p>
        <p className="text-gray-600">{product?.description}</p>
      </div>
    </Link>
  );
}

export default Product;
