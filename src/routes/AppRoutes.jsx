import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Layout from "../components/layout/Layout.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import EmployeesPage from "../pages/EmployeesPage.jsx";
import EmployeeDetailsPage from "../pages/EmployeeDetailsPage.jsx";
import AddEmployeePage from "../pages/AddEmployeePage.jsx";
import EditEmployeePage from "../pages/EditEmployeePage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="employees/new" element={<AddEmployeePage />} />
          <Route path="employees/:id" element={<EmployeeDetailsPage />} />
          <Route path="employees/:id/edit" element={<EditEmployeePage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
