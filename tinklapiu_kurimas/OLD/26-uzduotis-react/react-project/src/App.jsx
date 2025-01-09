import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuccessPage from "./components/SuccessPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
