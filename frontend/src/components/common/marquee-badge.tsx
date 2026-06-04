 import type { FC } from "react";
import StarburstIcon from "../ui/icons/starburst-icon";

interface MarqueeBadgeProps {
  label: string;
}

export const MarqueeBadge: FC<MarqueeBadgeProps> = ({ label }) => {
  return (
    <span className="flex items-center gap-3 sm:gap-4">
      <StarburstIcon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px] xl:w-[60px] lg:h-[50px] xl:h-[60px] text-gray-800" />
      <span className="text-xl sm:text-2xl lg:text-3xl uppercase text-gray-700">
        {label}
      </span>
    </span>
  );
};