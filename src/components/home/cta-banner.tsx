import { Section } from "../common/section";
import BallCircleIcon from "../ui/icons/ball-circle";
import { CtaContainer } from "./cta-container";

export const CtaBanner = () => {
  return (
    <Section
      title="Elevate Your Wardrobe"
      description="Don't miss out - experience the epitome of fashion by clicking 'Buy Now' and embrace a world of chic elegance"
      containerClassName="bg-[--color-primary-subtle] border-transparent"
      rightAsset={
        <BallCircleIcon
          className="h-24 sm:h-40 lg:h-[316px] xl:h-[386px] w-24 sm:w-40 lg:w-[301px] xl:w-[506px] opacity-30"
        />
      }
      rightAssetClassName="translate-x-2 sm:translate-x-4 lg:translate-x-6 xl:translate-x-10"
      rightAction={<CtaContainer inline />}
      headingClassName="text-[--color-primary-fg]"
      descriptionClassName="text-[--color-primary-fg]"
    >
       <div />
    </Section>
  );
};