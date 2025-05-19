import React from "react";

export default function ProductList({ products, addToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-lg shadow-md bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-lg font-semibold mt-2">₦{product.price.toLocaleString()}</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}