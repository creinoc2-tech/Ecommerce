import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Home } from "../pages/Home.page";
import { ProductoPage } from "../pages/Producto.Page";
import { ProductoPageViewPage } from "../pages/ProductoPageViewPage";
import { ProtectedRoute } from "../hooks/Protected.route";
import SignUpPage from "../pages/auth/Sign-up-page";
import { SignInPage } from "../pages/auth/Sign-in-page";
import { AccountLayout } from "../layout/account/account-layout";
import { ProfilePage } from "../pages/profile/profile.Page";
import { OrdersPage } from "../pages/orders/Orders.Page";
import { CartPage } from "../pages/Cart/CartPage";
import { CheckoutPage } from "../pages/Checkou/CheckoutPage";
import { ThankYouPage } from "../pages/ThankYou/ThankYouPage";
import { OrderPage } from "../pages/orders/Order.Page";

export const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/product" element={<ProductoPage />} />
          <Route path="/product/:slug" element={<ProductoPageViewPage />} />

          <Route
            path="/account/*"
            element={
              <ProtectedRoute authenticated={true}>
                <AccountLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<ProfilePage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/pedido/:id" element={<OrderPage />} />
          </Route>

          <Route
            path="/checkout"
            element={
              <ProtectedRoute authenticated={true}>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout/:id/thank-you"
            element={
              <ProtectedRoute authenticated={true}>
                <ThankYouPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute authenticated={true}>
                <CartPage />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/auth/sign-in"
          element={
            <ProtectedRoute authenticated={false}>
              <SignInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/sign-up"
          element={
            <ProtectedRoute authenticated={false}>
              <SignUpPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};
