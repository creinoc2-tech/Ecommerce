import Copyright from "../common/copyright";

 
export const FooterBottom = () => {
  return (
    <div className="px-5 sm:px-12 lg:px-16 xl:px-20 py-8">
      <Copyright
        brand="ShopStack"
        legalLinks={[
          { label: "Terms & Conditions", to: "/terms" },
          { label: "Privacy Policy", to: "/privacy" },
        ]}
      />
    </div>
  );
}