import React, { useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await axios.get(`http://localhost:8000/products/`);
    setProducts(data);
  };

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <HomePage products={products} fetchProducts={fetchProducts} />
              }
            />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/update/:id"
              element={<EditProduct fetchProducts={fetchProducts} />}
            />
            <Route path="/add" element={<AddProduct />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
