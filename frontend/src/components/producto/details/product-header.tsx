  import type { FC } from "react";
import { Link } from "react-router";

interface ProductHeaderProps {
  title: string;
  slug: string;
  isOnSale: boolean;
  className?: string;
  features: string[];
}

export const ProductHeader: FC<ProductHeaderProps> = ({
  title,
  slug,
  isOnSale,
  className = "",
  features,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {isOnSale && (
        <span className="inline-block w-fit px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded mb-1">
          Sale
        </span>
      )}

      <h1 className="font-bold text-3xl xl:text-4xl text-white tracking-tight leading-tight">
        {title}
      </h1>

      <div className="flex  flex-wrap
       justify-start gap-x-4 gap-y-1 text-xs">
         <Link
          to={`/category/${slug}`}
          className="font-semibold text-[#bca789] hover:underline text-2xl uppercase"
        >
          {slug}
        </Link>

        
        {features.length > 0 && (
          <div className="flex items-center flex-wrap gap-x-2
           text-gray-300 text-[17px]">
            {features.map((feature, index) => (
              <span
                key={index}
                className={
                  index === 0
                    ? ""
                    : "before:content-['•'] before:mx-2"
                }
              >
                {feature}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}