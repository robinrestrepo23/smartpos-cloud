import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import Inventory from "../pages/Inventory";
import Predictions from "../pages/Predictions";
import Menu from "../pages/Menu";
import Providers from "../pages/Providers";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/providers" element={<Providers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
