import { ArrowRight } from "lucide-react";
import { Tags } from "./tags";
import { Heading } from "./heading";
import { CounterBox } from "./counter/counter-box";
import { Link } from "react-router";

export const Hero = () => {
  const counters = [
    { value: "1,500 +", label: "Fashion Products" },
    { value: "50 +", label: "New arrivals every month" },
    { value: "30%", label: "OFF on select items" },
    { value: "95%", label: "Customer Satisfaction Rate" },
  ];

  return (
    <section className="container mx-auto px-4 pt-16 space-y-8">
      <div
        className="relative border border-dashed border-gray-600 
      rounded-2xl overflow-hidden pb-16"
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1974&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-[400px] object-cover rounded-t-2xl"
          />

          <div
            className="absolute left-1/2 -bottom-8 transform 
  -translate-x-1/2 z-50"
          >
            <div
              className="bg-[#0f0f10] text-white 
    rounded-xl shadow p-3"
            >
              <Link
                to="/product"
                className="flex items-center gap-2 
      text-base px-6 py-4 
      bg-[#1F1F1F] rounded-lg 
      hover:bg-zinc-800 transition shadow-md"
              >
                Shop now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 pt-16 md:p-8 lg:p-12">
          <div className="space-y-6">
            <Tags items={["All", "Mens", "Womens", "Kids"]} />
            <Heading
              title="ELEVATE YOUR STYLE WITH SHOPSTACK"
              subtitle="Explore a world of fashion at Shop.Stack, where trends
               meet affordability. Immerse yourself in the latest styles and seize exclusive promotions."
            />
          </div>
          <CounterBox items={counters} />
        </div>
      </div>
    </section>
  );
};
