import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import RootLayout from "./page/layouts/RootLayout";
import DashboardLayout from "./page/layouts/DashboardLayout";
import LoadingSpinner from "./page/shared/LoadingSpinner";
import WebsiteContent from "./components/dashboard/WebsiteContent";
import ProductManagement from "./components/dashboard/ProductManagement";
import OrderManagement from "./components/dashboard/OrderManagement";
import FaqManagement from "./components/dashboard/FaqManagement";
import UserManagement from "./components/dashboard/UserManagement";
import ReviewManagement from "./components/dashboard/ReviewManagement";
import PrivateRoute from "./hooks/PrIvateRoute";
import NotFound from "./page/shared/NotFound.";

let Home = lazy(() => import("./page/home/Home"));
let Login = lazy(() => import("./page/Login"));
let Dashboard = lazy(() => import("./components/dashboard/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <Dashboard />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "website-content",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <WebsiteContent />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ProductManagement />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <OrderManagement />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "faqs",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <FaqManagement />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <UserManagement />
            </Suspense>
          </PrivateRoute>
        ),
      },
      {
        path: "reviews",
        element: (
          <PrivateRoute>
            <Suspense fallback={<LoadingSpinner />}>
              <ReviewManagement />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
