import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";

export default function App() {

  const [cart, setCart] = useState(() => {
    // passing a function to useState means we need to set the state only once for the first render of the component
    try {
      // ?? is called Nullish coalecsing operator:
      // if the left-hand side is null or undefined, use the value on the right
      return JSON.parse(localStorage.getItem("cart")) ?? []
    } catch (error) {
      console.log("couldn't parse cart data")
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])// anytime cart changes, run useEffect function

  function addToCart(id, sku) {
    // previous state for cart aliased as items
    setCart(items => {
      const itemInCart = items.find(i => i.sku === sku)
      if (itemInCart) {
        // return new array with the matching item replaced
        return items.map(i => i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i)
      } else {
        return [...items, { id, sku, quantity: 1 }]
      }
    })
  }

  // immutable update & immutable delete approach
  function updateQuantity(sku, quantity) {
    setCart(items => {
      return quantity !== 0
        ? items.map((i) => i.sku === sku ? { ...i, quantity } : i)
        : items.filter((i) => i.sku !== sku)
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            {/* <Route path="/" element={<Products />} /> */}
            <Route path="/:category" element={<Products />} />
            <Route path="/:category/:id" element={<Detail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
