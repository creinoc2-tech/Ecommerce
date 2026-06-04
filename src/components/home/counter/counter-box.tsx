import type { FC } from "react";
import CounterItem from "./counter-item";

 
interface CounterItem {
  label: string;
  value: string;
}

interface CounterBoxProps {
  items: CounterItem[];
}

export const  CounterBox: FC<CounterBoxProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-2">
      {items.map((item, index) => (
        <CounterItem
          key={item.label}
          value={item.value}
          label={item.label}
          extraTop={index < 2}
        />
      ))}
    </div>
  );
}