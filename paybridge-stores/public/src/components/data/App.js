import React, { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import products from "./data/products";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <main className="font-sans">
      <h1 className="text-3xl text-center mt-4 font-bold">PayBridge Store</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cartItems={cart} clearCart={clearCart} />
    </main>
  );
}

export default App;