import { Outlet } from "react-router";
import Header from "../components/header/Header";
import { Sheet } from "../components/Sheet/Sheet";
import { useGlobalStore } from "../store/global.store";
import { Brand } from "../components/home/brand";
import { Footer } from "../components/home/footer";

export const Layout = () => {
  const isSheetOpen = useGlobalStore((state) => state.isSheetOpen);
  return (
    <div>
      <Header />
      <Outlet />
      <Brand />
      <Footer />
      {isSheetOpen && <Sheet />}
    </div>
  );
};
