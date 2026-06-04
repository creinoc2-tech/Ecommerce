import { BadgeCheck  } from "lucide-react";
import { Link } from "react-router";

  
interface SocialLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
}

const defaultLinks: SocialLink[] = [
  { label: "Instagram", href: "/#instagram", icon: BadgeCheck },
  { label: "Dribbble", href: "/#dribbble", icon: BadgeCheck },
  { label: "Twitter", href: "https://x.com/home", icon: BadgeCheck },
  { label: "Behance", href: "/#behance", icon: BadgeCheck },
];

export default function SocialLinks({
  links = defaultLinks,
  className = "",
}: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 sm:gap-5 ${className}`}>
      {links.map((link) => (
        <Link
          to={link.href}
          key={link.label}
          aria-label={link.label}
          target="_blank"
          className="inline-flex w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 items-center
           justify-center rounded-xl bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300
            hover:text-gray-900"
        >
          <link.icon className="w-6 h-6 sm:w-7 sm:h-7" />
        </Link>
      ))}
    </div>
  );
}