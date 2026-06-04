import { Link } from "react-router";
import { Navbar } from "./Navbar";
import { ShoppingBag } from "lucide-react";
import { useGlobalStore } from "../../store/global.store";
import { HiOutlineSearch } from "react-icons/hi";
import { useCartStore } from "../../store/cart-store";
import { useSubcription } from "../../store/auth.store";
 import { UserMenu } from "../common/user-menu";
const navigationItems = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Products" },
  { to: "/category", label: "Categories" },
];

export default function Header() {
  const openSheet = useGlobalStore((state) => state.openSheet);
  const totalItemsInCart = useCartStore((state) => state.totalItemsInCart);
  const { user } = useSubcription();
 
  return (
    <header
      className="sticky top-0 z-40 w-full py-1 border-b border-neutral-800
       bg-[rgba(15,15,16,0.85)] backdrop-blur-md"
    >
      <div
        className="container mx-auto grid grid-cols-2 
      lg:grid-cols-3 items-center px-4 py-3"
      >
        <Navbar
          items={navigationItems}
          className="flex items-center gap-4 text-sm"
          activeLinkClassName="bg-[#232323] text-white border border-dashed border-[#444444] shadow-sm"
          linkClassName="border border-dashed border-[#444444] bg-transparent text-white hover:bg-[#232323] hover:text-white"
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
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => openSheet("cart")}
              className="relative cursor-pointer bg-[#232323] rounded-lg p-2"
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {/* Badge (hidden if empty) */}
              {totalItemsInCart > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#bca789] text-[10px] text-black border-2 border-[#232323]">
                  {totalItemsInCart}
                </span>
              )}
            </button>

            <button
              onClick={() => openSheet("search")}
              className="relative cursor-pointer bg-[#232323] rounded-lg p-2"
            >
              <HiOutlineSearch className="w-5 h-5 text-white" />
              {/* Badge (hidden if empty) */}
              {[].length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#bca789] text-[10px] text-black">
                  {[].length}
                </span>
              )}
            </button>

            {user ? (
             <UserMenu user={user} />
            ) : (
              <Link
                to="/auth/sign-in"
                className="rounded-lg bg-[#bca789] px-6
                 py-4 text-sm font-medium text-black hover:bg-[#a68c6d] transition-colors"
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
