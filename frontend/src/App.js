import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/Header.js";
import Footer from "../src/components/Footer.js";
import AdminPanel from "../src/components/AdminPanel.js";
import Home from "./pages/Home.js";
import PackageDetail from "./pages/PackageDetail.js";
import AdminContacts from "./pages/AdminContacts.js";
import AdminConsultas from "./pages/AdminConsultas.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  return (
    
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/package/:packageId" element={<PackageDetail />} />
          <Route path="/admin/consultas" element={<AdminConsultas />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </div>
    
  );
}

export default App;