interface CounterItemProps {
  label: string;
  value: string;
  extraTop?: boolean;
}

export default function CounterItem({
  label,
  value,
  extraTop = false,
}: CounterItemProps) {
  return (
    <div
      className={`
        border border-dashed border-[#2A2A2A]
        p-6 md:px-10 lg:px-12
        ${extraTop ? "md:border-t-0 md:pt-12 lg:pt-16" : "md:pt-12 lg:pt-10"}
      `}
    >
      <div className="font-extrabold text-4xl md:text-4xl lg:text-5xl text-white mb-1">
        {value}
      </div>

      <div className="text-2xl md:text-base  text-[#666666]">{label}</div>
    </div>
  );
}
