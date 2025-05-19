import React from "react";
import PayBridgePayPop from "paybridge-pop";

export default function Cart({ cartItems, clearCart }) {
    if (cartItems.length === 0) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const checkout = () => {
    const payPop = new PayBridgePayPop();
    const transactionId = `trx_${Date.now()}`;

    payPop.newTransaction({
      onSuccess: (transaction) => {
        alert("Payment successful!");
        clearCart();
        console.log("Success:", transaction);
      },
      onError: (error) => {
        alert("Payment failed.");
        console.error("Error:", error);
      },
      onCancel: () => {
        alert("Transaction cancelled.");
      },
      request: {
        amount: total,
        transactionId,
        email: "customer@mail.com",
        publicKey: "YOUR_PUBLIC_KEY", //  replace with your actual key or use import.meta.env
        currency: "NGN",
        mode: "Test", // switch to "Live" for production
        productId: cartItems.map((item) => item.id).join(","),
        applyConviniencyCharge: true,
        productDescription: cartItems.map((item) => item.name).join(", "),
        bodyColor: "#000000",
        buttonColor: "#000000",
        footerText: "Powered by PayBridge Store",
        footerLink: "http://paybridge.africa",
        footerLogo: "http://paybridge.africa/logo.png",
        metadata: [
          { name: "cart_items", value: JSON.stringify(cartItems) },
        ],
      },
    });
  };

  if (cartItems.length === 0) return <p className="p-4">Cart is empty</p>;

  return (
    <div className="p-4 border-t mt-6">
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      <ul className="list-disc pl-5 space-y-1">
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ₦{item.price.toLocaleString()}
          </li>
        ))}
      </ul>
      <p className="mt-2 font-semibold">Total: ₦{total.toLocaleString()}</p>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={checkout}
      >
        Checkout
      </button>
    </div>
  );
}
