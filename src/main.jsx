import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Login from "@/components/auth/Login.jsx";
import Register from "@/components/auth/Register.jsx";

import "./index.css";
import LenisProvider from "./providers/LenisProvider.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Sale from "./components/Dashboard/Sale.jsx";
import Withdrawal from "./components/Dashboard/Withdrawal.jsx";
import Kyc from "./components/Dashboard/Kyc.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <LenisProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/sale" element={<Sale />} />
          <Route path="/dashboard/withdrawal" element={<Withdrawal />} />
          <Route path="/dashboard/kyc" element={<Kyc />} />
          {/* opcional: fallback volta pra home */}
          <Route path="*" element={<App />} />
        </Routes>
      </LenisProvider>
    </BrowserRouter>
  </React.StrictMode>
);