import type { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Heading: FC<HeadingProps> = ({ title, subtitle, className = "" }) => {
  return (
    <div className={`space-y-8 md:space-y-10 ${className}  p-8 rounded-xl`}>
      <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-tight md:leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-[#555555] text-4xl
        md:text-lg leading-relaxed mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}