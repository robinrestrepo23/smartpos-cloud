import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Inventory from "../pages/Inventory";
import Predictions from "../pages/Predictions";
import Menu from "../pages/Menu";
import Suppliers from "../pages/Suppliers";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import Kitchen from "@/pages/Kitchen";
import Register from "@/pages/Register";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/kitchen" element={<Kitchen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
