import { Link } from "react-router";

 
interface FooterNavProps {
  title: string;
  links: {
    label: string;
    to: string;
  }[];
}

export default function FooterNav({ title, links }: FooterNavProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-3xl font-medium text-gray-300">{title}</h4>

      <nav className="flex flex-wrap items-center gap-3">
        {links.map((item, index) => (
          <div key={item.label} className="flex items-center gap-3">
            <Link
              to={item.to}
              className="text-sm sm:text-base lg:text-lg transition-colors hover:text-gray-900"
            >
              {item.label}
            </Link>

            {index < links.length - 1 && (
              <span className="text-gray-500">•</span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}