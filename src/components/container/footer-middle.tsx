import FooterNav from "../common/footer-nav";

 

const homeMenu = [
  { label: "Why Us", to: "/#why-us" },
  { label: "About Us", to: "/#about" },
  { label: "Testimonials", to: "/#testimonials" },
  { label: "FAQ’s", to: "/#faqs" },
];

const productsMenu = [
  { label: "Menswear", to: "/products?category=mens" },
  { label: "Womenswear", to: "/products?category=womens" },
  { label: "Kidswear", to: "/products?category=kids" },
];

export default function FooterMiddle() {
  return (
    <div className="border-y-2 border-dashed border-gray-300">
      <div className="px-4 sm:px-12 lg:px-16 xl:px-20 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Home Menu */}
          <div className="font-mono text-sm tracking-wide text-gray-600">
            <FooterNav title="Home" links={homeMenu} />
          </div>

          {/* Products Menu */}
          <div className="font-mono text-sm tracking-wide text-gray-600">
            <FooterNav title="Products" links={productsMenu} />
          </div>

          
        </div>
      </div>
    </div>
  );
}