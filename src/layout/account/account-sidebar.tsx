import { Heart, LogOut, Package, User } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../store/auth.store";

const sidebarItems = [
  {
    title: "Profile",
    href: "/account/profile",
    icon: User,
  },
  {
    title: "My Orders",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "My Reviews",
    href: "/account/my-reviews",
    icon: Package,
  },
  {
    title: "My Wishlists",
    href: "/account/wishlist",
    icon: Heart,
  },
];
export const AccountSidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { cerrarSesion } = useAuthStore();
  const handleLogout = () => {
    cerrarSesion();
  };

  return (
    <aside className=" w-full flex-col gap-2 2xl:flex 2xl:w-64">
      <div className="flex flex-col gap-2">
        <div className="px-4 py-2">
          <h2 className="mb-2 font-semibold text-lg tracking-tight text-white">
            My Account
          </h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-2 rounded-lg px-4 py-3
                     text-[14px] font-bold transition-all
      ${
        pathname === item.href
          ? "bg-[#212121] text-white"
          : "text-gray-500 hover:bg-[#212121] hover:text-white"
      }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4 py-2">
          <button
            className="flex w-full items-center justify-start 
            gap-2 rounded-lg px-4 py-3 text-[14px] font-medium
             text-gray-500 transition-all hover:bg-[#212121] hover:text-white
             border border-dashed border-[#444444]"
             
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};
