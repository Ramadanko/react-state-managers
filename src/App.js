import React, { useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import useFech from './services/useFetch'

export default function App() {
  const [size, setSize] = useState("");
  const { data: products, error, loading } = useFech("products?category=shoes")

  // Derived State Example
  const filteredProducts = size ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size))) : products;
  console.log(filteredProducts)

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  if (error) throw error// error is already handled by Error Boundary
  if (loading) return <h2>Loading.............</h2>

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          {/* derived state example */}
          {size && <h2>Found {filteredProducts.length} items</h2>}
          <section id="products">{filteredProducts.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
