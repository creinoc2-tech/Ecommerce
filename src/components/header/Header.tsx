import { Link } from "react-router";
import { Navbar } from "./Navbar";
import { ShoppingBag } from "lucide-react";
import { useGlobalStore } from "../../store/global.store";
import { HiOutlineSearch } from "react-icons/hi";
import { useCartStore } from "../../store/carrito.store";
import { useAuthStore } from "../../store/auth.store";
import { UserMenu } from "../common/user-menu";
const navigationItems = [
  { to: "/", label: "Home" },
  { to: "/productos", label: "Products" },
  { to: "/category", label: "Categories" },
];

export default function Header() {
  const openSheet = useGlobalStore((state) => state.openSheet);
  const totalItemsEnCarrito = useCartStore((state) => state.totalItemsEnCarrito);
  const { usuario } = useAuthStore();
 
  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-zinc-800
       bg-[rgba(8,9,10,0.92)] backdrop-blur-md  text-white shadow-sm"
    >
      <div
        className="container mx-auto grid grid-cols-2 
      lg:grid-cols-3 items-center px-4 py-4"
      >
        <Navbar
          items={navigationItems}
          className="flex items-center gap-3 text-sm"
          activeLinkClassName="bg-[#1f1f1f] text-white border-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
          linkClassName="border border-dashed border-zinc-800 bg-transparent text-zinc-400 hover:bg-[#232323] hover:text-white hover:border-transparent"
        />

        <div className="flex justify-center items-center">
          <Link
            to="/"
            className="font-bold text-2xl lg:text-3xl tracking-tight text-white"
          >
            Shop<span className="text-[#bca789] text-3xl">.</span>Stack
          </Link>
        </div>
        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => openSheet("cart")}
              className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-[#232323] text-white border border-dashed border-zinc-800 hover:bg-[#2c2c2c] hover:border-transparent transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {/* Badge (hidden if empty) */}
              {totalItemsEnCarrito > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#bca789] text-[10px] text-black border-2 border-[#232323]">
                  {totalItemsEnCarrito}
                </span>
              )}
            </button>

            <button
              onClick={() => openSheet("search")}
              className="relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg bg-[#232323] text-white border border-dashed border-zinc-800 hover:bg-[#2c2c2c] hover:border-transparent transition-colors"
            >
              <HiOutlineSearch className="w-5 h-5 text-white" />
              {/* Badge (hidden if empty) */}
              {[].length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#bca789] text-[10px] text-black">
                  {[].length}
                </span>
              )}
            </button>

            {usuario ? (
              <UserMenu user={usuario} />
            ) : (
              <Link
                to="/auth/iniciar-sesion"
                className="inline-flex h-11 items-center rounded-lg bg-[#bca789] px-8 text-sm font-semibold text-black hover:bg-[#a68c6d] transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
