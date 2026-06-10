import type { FC } from "react";

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  sectionClassName?: string;
  headingClassName?: string;
  descriptionClassName?: string;
  rightAsset?: React.ReactNode;
  rightAssetClassName?: string;
  containerClassName?: string;
  rightAction?: React.ReactNode;
  rightActionClassName?: string;
}

export const Section: FC<SectionProps> = ({
  title,
  description,
  children,
  sectionClassName,
  headingClassName,
  descriptionClassName,
  rightAsset,
  rightAssetClassName,
  containerClassName,
  rightAction,
  rightActionClassName,
}) => {
   return (
    <section className={`container mx-auto my-20 px-4 ${sectionClassName}`}>
      <div
        className={`
          relative z-10 overflow-hidden rounded-2xl
          border-2 border-dashed border-zinc-800
          
          ${containerClassName}
        `}
      >
        {rightAsset && (
          <div
            className={`
              -z-10 pointer-events-none absolute top-0 right-0
              ${rightAssetClassName}
            `}
          >
            {rightAsset}
          </div>
        )}

        <div
          className={`
            p-5 md:p-10 lg:p-14 xl:p-20
            ${rightAction ? "md:flex md:items-center md:justify-between md:gap-6" : ""}
            space-y-7
          `}
        >
          <div className="max-w-[804px] space-y-7">
            <h2
              className={`
                text-[28px] md:text-3xl lg:text-4xl xl:text-5xl
                uppercase text-white
                ${headingClassName}
              `}
            >
              {title}
            </h2>

            {description && (
              <p className={`text-zinc-400 ${descriptionClassName}`}>
                {description}
              </p>
            )}
          </div>

          {rightAction && (
            <div
              className={`
                flex justify-center md:justify-end
                ${rightActionClassName}
              `}
            >
              {rightAction}
            </div>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}