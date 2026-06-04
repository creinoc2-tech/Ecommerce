 import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

interface CtaContainerProps {
  className?: string;
  inline?: boolean;
}

export const CtaContainer = ({
  className = "",
  inline,
}: CtaContainerProps) => {
  if (inline) {
    return (
      <div className={`flex w-full items-center  ${className}`}>
        <Link to="/" className="w-full sm:w-auto">
          <button
            type="button"
            className="w-full sm:w-auto text-xl font-bold
            inline-flex items-center justify-center gap-1.5 px-8 py-5
             rounded-xl bg-[#1a1a1a] text-white hover:bg-[#333333] transition"
          >
            Shop Now
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={`px-5 sm:px-12 lg:px-16 xl:px-20 pb-8 ${className}`}>
      <div className="flex w-full items-center justify-end">
        <Link to="/">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Shop Now
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}