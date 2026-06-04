import type { FC, ReactElement } from "react";

interface MarqueeProps {
  items: ReactElement[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

const speedMap: Record<NonNullable<MarqueeProps["speed"]>, string> = {
  slow: "animation-duration-[50s]",
  normal: "animation-duration-[35s]",
  fast: "animation-duration-[20s]",
};

export  const Marquee:  FC<MarqueeProps> = ({
  items,
  className = "",
  speed = "normal",
}) => {
  return (
    <div
      className={`relative overflow-hidden border-y-2 border-dashed ${className}`}
    >
      <div
        className={`marquee flex w-max min-w-full items-center gap-6 py-6 sm:py-8 lg:py-10 ${speedMap[speed]}`}
      >
        {[
          ...items.map((el) => ({ el, key: el.key ?? undefined })),
          ...items.map((el) => ({ el, key: `${el.key ?? "dup"}` })),
        ].map((n, idx) => (
          <div
            key={String(n.key ?? `mk-${idx}`)}
            className="flex items-center gap-3"
          >
            {n.el}
          </div>
        ))}
      </div>
    </div>
  );
}