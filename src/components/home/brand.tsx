import type { FC } from "react";
import { Marquee } from "../container/marquee";
import { MarqueeBadge } from "../common/marquee-badge";

 
interface BrandProps {
  className?: string;
}

const brandsCategories = [
  "TANK TOP",
  "TSHIRT",
  "LONG-SLEEVE TSHIRT",
  "RAGLAN SLEEVE SHIRT",
  "CROP TOP",
  "V-NECK SHIRT",
  "MUSCLE SHIRT",
];

export const Brand: FC<BrandProps> = ({ className }) => {
  return (
     <section className={className}>
      <Marquee
        items={brandsCategories.map((c) => (
          <MarqueeBadge key={c} label={c} />
        ))}
        speed="slow"
        className="border-t-2"
      />
    </section>
  )
}

 