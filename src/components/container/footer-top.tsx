import SocialLinks from "../common/social-links";

 
export const FooterTop = () => {
  return (
    <div className="px-5 sm:px-12 lg:px-16 xl:px-20 py-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 text-white">
        <h3 className="font-bold text-6xl sm:text-7xl lg:text-[100px] xl:text-[124px] ">
          Shop
          <span className="text-gray-800">.</span>
          Stack
        </h3>
        <SocialLinks />
      </div>
    </div>
  );
};