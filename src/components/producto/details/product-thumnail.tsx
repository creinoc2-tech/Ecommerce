interface ProductThumbnailProps {
  image: string;
  alt: string;
  isActive: boolean;
  onClick: () => void;
}

export default function ProductThumbnail({
  image,
  alt,
  isActive,
  onClick,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative aspect-square w-full overflow-hidden rounded-md border-2 bg-white transition-all 
        hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400
        ${isActive ? "border-black" : "border-transparent"}`}
      aria-label={`View ${alt}`}
      aria-current={isActive ? "true" : undefined}
    >
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
    </button>
  );
}