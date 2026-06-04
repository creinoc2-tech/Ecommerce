import React, { useEffect, useState, type FC } from "react";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router";

interface props {
  user: any;
}

export const UserMenu: FC<props> = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { cerrarSesion } = useAuthStore();
  const handleLogout = () => {
    cerrarSesion();
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById("user-menu-dropdown");
      const btn = document.getElementById("user-menu-btn");
      if (
        open &&
        menu &&
        btn &&
        !menu.contains(e.target as Node) &&
        !btn.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      <button
        id="user-menu-btn"
        className="text-white bg-amber-600 rounded-full w-8 h-8 flex items-center justify-center font-medium p-2 hover:bg-amber-700 transition-colors cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {user.user_metadata.full_name.charAt(0).toUpperCase()}
      </button>
      {open && (
        <div
          id="user-menu-dropdown"
          className="absolute right-0 mt-2 w-60 bg-neutral-900 border
           border-neutral-900 rounded-lg shadow-lg z-50"
        >
          <div className="px-4 py-3 border-b border-neutral-800">
            <div className="font-bold text-white leading-tight text-sm">
              {user.user_metadata.full_name?.toUpperCase()}
            </div>
            <div className="text-neutral-400 text-xs truncate">
              {user.email}
            </div>
          </div>
          <div className="py-1">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-800 transition-colors"
              onClick={() => navigate("/account/profile")}
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-800 transition-colors"
              onClick={() => navigate("/account/orders")}
            >
              My Orders
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-800 transition-colors">
              My Wishlists
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-white
             hover:bg-neutral-800 transition-colors "
            >
              Checkout
            </button>
          </div>
          <div className="border-t border-neutral-800">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-500
             hover:bg-neutral-800 transition-colors font-bold"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
