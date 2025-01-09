import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router";
import ProductList from "/src/components/ProductList";
import ProductDetails from "/src/components/ProductDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />

        <Route path="/products" element={<ProductList />} />

        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
