import { Link } from "react-router";

interface CopyrightProps {
  brand: string;
  legalLinks: { label: string; to: string }[];
  year?: number;
  className?: string;
}

export default function Copyright({
  brand,
  legalLinks,
  year = new Date().getFullYear(),
  className = "",
}: CopyrightProps) {
  return (
    <div
      className={`flex w-full flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${className}`}
    >
      <p className="font-mono text-gray-600">
        © {year} {brand}. All rights reserved.
      </p>

      {!!legalLinks.length && (
        <div className="flex flex-wrap items-center gap-3 text-gray-600">
          {legalLinks.map((l, i) => (
            <div key={l.label} className="flex items-center gap-3">
              {i > 0 && <span className="text-gray-500">|</span>}
              <Link
                to={l.to}
                className="hover:text-gray-900 transition-colors"
              >
                {l.label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}