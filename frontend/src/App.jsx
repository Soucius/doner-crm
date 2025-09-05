import { Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import SigninPage from "./pages/SigninPage";
import BranchesPage from "./pages/BranchesPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import MyAccountPage from "./pages/MyAccountPage";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import ProductAddPage from "./pages/ProductAddPage";
import ProductEditPage from "./pages/ProductEditPage";

function App() {
  return (
    <div className="h-screen w-full bg-gray-100 font-montserrat">
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/new" element={<ProductAddPage />} />
          <Route
            path="products/edit/:productId"
            element={<ProductEditPage />}
          />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="my-account" element={<MyAccountPage />} />
        </Route>
      </Routes>

      <ScrollToTopButton />
    </div>
  );
}

export default App;
