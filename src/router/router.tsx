import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RutaProtegida } from "../hooks/ruta-protegida";
import { Layout } from "../layout/Layout";
import { AccountLayout } from "../layout/account/account-layout";
import { Home } from "../pages/Home.page";
import { CartPage } from "../pages/Cart/CartPage";
import { CheckoutPage } from "../pages/Pago/CheckoutPage";
import { ThankYouPage } from "../pages/Gracias/ThankYouPage";
import { ProductoPage } from "../pages/Producto.Page";
import { ProductoPageViewPage } from "../pages/ProductoPageViewPage";
import SignUpPage from "../pages/auth/Sign-up-page";
import { SignInPage } from "../pages/auth/Sign-in-page";
import { OrderPage } from "../pages/orders/Order.Page";
import { OrdersPage } from "../pages/orders/Orders.Page";
import { ProfilePage } from "../pages/profile/profile.Page";
import CategoryTemplate from "../layout/categories/categories-layout";
import { CategoriaPage } from "../pages/categoria/Categoria.page";

export const MisRutas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/productos" element={<ProductoPage />} />
          <Route path="/productos/:slug" element={<ProductoPageViewPage />} />

          <Route
            path="/cuenta/*"
            element={
              <RutaProtegida autenticado={true}>
                <AccountLayout />
              </RutaProtegida>
            }
          >
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="ordenes" element={<OrdersPage />} />
            <Route path="ordenes/pedido/:id" element={<OrderPage />} />
          </Route>

          <Route
            path="/pago"
            element={
              <RutaProtegida autenticado={true}>
                <CheckoutPage />
              </RutaProtegida>
            }
          />

          <Route path="/category" element={<CategoryTemplate />}>
            <Route index element={<CategoriaPage />} />
          </Route>

          <Route
            path="/pago/:id/gracias"
            element={
              <RutaProtegida autenticado={true}>
                <ThankYouPage />
              </RutaProtegida>
            }
          />

          <Route
            path="/carrito"
            element={
              <RutaProtegida autenticado={true}>
                <CartPage />
              </RutaProtegida>
            }
          />
        </Route>

        <Route
          path="/auth/iniciar-sesion"
          element={
            <RutaProtegida autenticado={false}>
              <SignInPage />
            </RutaProtegida>
          }
        />
        <Route
          path="/auth/registrarse"
          element={
            <RutaProtegida autenticado={false}>
              <SignUpPage />
            </RutaProtegida>
          }
        />
      </Routes>
    </Router>
  );
};
