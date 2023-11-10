import React from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Link to={`/products/${product?._id}`}>
      <div className="flex flex-col justify-start items-center gap-4 w-full max-w-[350px]">
        <img
          style={{ height: "200px", width: "auto" }}
          src={product?.image}
          alt={product?.description}
        />
        <h3 className="text-blue-500 underline">{product?.titre}</h3>
        <h3 className="text-blue-500 underline">{product?.price}</h3>
      </div>
    </Link>
  );
}

export default Product;