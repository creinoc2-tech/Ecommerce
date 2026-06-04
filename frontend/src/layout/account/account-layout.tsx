import { Outlet } from "react-router";
import { AccountSidebar } from "./account-sidebar";

export const AccountLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8 2xl:flex-row">
        <div className="w-[25%]">
             <AccountSidebar />
        </div>
        <main className="flex-1 w-[25%]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
