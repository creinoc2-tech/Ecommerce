import { Link } from "react-router";
import { CheckoutAddressSection } from "../../components/checkout/checkout-address-section";
import { CheckoutOrderSummary } from "../../components/checkout/checkout-order-summary";
import { useCartStore } from "../../store/carrito.store";

export const CheckoutPage = () => {
  const totalItems = useCartStore((state) => state.totalItemsInCart);
  return (
    <div style={{ minHeight: "calc(100vh - 100px)" }}>
      <main className="w-full h-full flex relative">
        {totalItems === 0 ? (
          <div
            className="flex flex-col items-center justify-center gap-5 w-full"
            style={{
              height: "calc(100vh - 100px)",
            }}
          >
            <p className="text-sm font-medium tracking-tight">
              Su carro esta vacío
            </p>
            <Link
              to="/productos"
              className="py-4 bg-black rounded-full text-white px-7 text-xs uppercase tracking-widest font-semibold"
            >
              Empezar a comprar
            </Link>
          </div>
        ) : (
          <>
            <div
              className=" w-[60%] sticky top-0 right-0 py-10 px-5 hidden md:block   "
              style={{
                minHeight: "calc(100vh - 100px)",
              }}
            >
              <CheckoutAddressSection />
            </div>

            <div className="w-full md:w-[40%] py-10 px-5 ">
              <CheckoutOrderSummary />
            </div>
          </>
        )}
      </main>
    </div>
  );
};
