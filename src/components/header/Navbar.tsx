import { Link, useLocation } from "react-router";

interface NavItem {
  label: string;
  to: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  activeLinkClassName?: string;
  linkClassName?: string;
}

export const Navbar = ({
  items,
  className = "hidden items-center gap-3 text-sm 2xl:flex",
  activeLinkClassName = "bg-[#1f1f1f] text-white border-transparent",
  linkClassName = "border border-dashed border-zinc-800 bg-transparent text-zinc-400 hover:bg-[#232323] hover:text-white hover:border-transparent",
}: NavBarProps) => {
  const { pathname } = useLocation();

  return (
    <nav className={className}>
      {items.map((item) => {
        const isActive = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`inline-flex h-11 items-center justify-center
               rounded-lg px-7 text-[15px] border
              font-medium tracking-[0.01em] transition-all duration-200
              ${isActive ? activeLinkClassName : linkClassName} `}
            style={{ minWidth: 92, textAlign: "center" }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
