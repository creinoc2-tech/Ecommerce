import { useState } from "react";

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
  className = "hidden items-center gap-4 text-sm 2xl:flex",
  activeLinkClassName = "bg-[#232323] text-white border border-[#bca789] shadow-sm",
  linkClassName = "border border-dashed border-[#bca789] bg-transparent text-white hover:bg-[#232323] hover:text-white",
}: NavBarProps) => {
  const [currentPath] = useState(() => window.location.pathname);

  return (
    <nav className={className}>
      {items.map((item) => {
        const isActive = currentPath === item.to;
        return (
          <a
            key={item.to}
            href={item.to}
            className={`flex 2xl:h-12 items-center justify-center
               rounded-lg px-4 text-[14px]  py-3 border
              font-medium transition-all duration-200
              ${isActive ? activeLinkClassName : linkClassName} `}
            style={{ minWidth: 80, minHeight: 50, textAlign: "center" }}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
};
