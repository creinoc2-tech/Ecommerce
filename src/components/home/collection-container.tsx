import { useState } from "react";
import { Section } from "../common/section";
import StarSolidIcon from "../ui/icons/star-solid";
import { CollectionContainer } from "../cart/CollectionContainer";

export const Collections = () => {
  const tabs = ["All", "Mens", "Womens", "Kids"] as const;
  type Tab = (typeof tabs)[number];
  const [active, setActive] = useState<Tab>("Womens");
  return (
    <Section
      title="Elevate Your Style with Our Latest Collection"
      description="Each piece is crafted to enhance your fashion statement."
      rightAsset={
        <StarSolidIcon className="h-20 w-20 xl:h-72 xl:w-72 2xl:h-96 2xl:w-60" />
      }
    >
      <div className="px-5 pb-8 xl:px-12 2xl:px-16">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={`h-12 xl:h-14 px-5 xl:px-6 py-4 text-lg rounded-lg items-center transition text-center
                  ${
                    active === tab
                      ? "bg-[#2A2A2A] text-white border border-dashed border-gray-600 hover:bg-[#2A2A2A] hover:text-white"
                      : "bg-transparent text-white border border-dashed border-gray-600 hover:bg-[#2A2A2A] hover:text-white"
                  }`}
              >
                {tab}
              </button>
          ))}
        </div>
      </div>

        <CollectionContainer />
    </Section>
  );
};
