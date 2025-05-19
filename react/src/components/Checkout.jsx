import React from "react";

export default function Checkout({ cartItems }) {
  if (cartItems.length === 0) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="p-4 border-t mt-6">
      <h2 className="text-xl font-bold mb-2">Order Summary</h2>
      <div className="space-y-2">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>₦{item.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <hr className="my-2" />
      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>₦{total.toLocaleString()}</span>
      </div>
    </div>
  );
}
