interface FeatureGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconClassName?: string;
  outlineIcon: React.ReactNode;
  outlineIconClassName?: string;
  className?: string;
}

export default function FeatureGridItem({
  title,
  description,
  icon,
  iconClassName = "",
  outlineIcon,
  outlineIconClassName = "",
  className = "",
}: FeatureGridItemProps) {
  return (
    <div
      className={`
        relative
        border border-dashed border-[#2A2A2A]
        p-6 md:p-10 lg:p-12 xl:p-14
        ${className}
      `}
    >
      {/* Icon */}
      <div
        className={`
          mb-6 md:mb-8 lg:mb-10
          w-[76px] h-[76px] md:w-20 md:h-20 lg:w-24 lg:h-24
          ${iconClassName}
        `}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">
          {title}
        </h4>
        <p className="text-gray-400 text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* Outline Icon */}
      <div
        className={`
          absolute top-0 right-0
          w-[120px] h-[120px] md:w-[150px] 
          md:h-[150px] lg:w-[173px] lg:h-[173px]
          opacity-10 pointer-events-none  
          ${outlineIconClassName}
        `}
      >
        {outlineIcon}
      </div>
    </div>
  );
}