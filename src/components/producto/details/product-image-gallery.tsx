import { Maximize2 } from "lucide-react";
import { useState, type FC } from "react";
import ProductThumbnail from "./product-thumnail";
 
interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  className?: string;
}

export const ProductImageGallery: FC<ProductImageGalleryProps> = ({
  images,
  className = "",
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = images[activeImageIndex];

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-gray-100">
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Main Image */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-lg border bg-white">
        <button
          type="button"
          onClick={() => setIsZoomed(!isZoomed)}
          className="relative h-full w-full overflow-hidden border-0 bg-transparent p-0"
          aria-label={isZoomed ? "Zoom out image" : "Zoom in image"}
        >
          <img
            src={activeImage.url}
            alt={activeImage.alt}
            className={`h-full w-full object-cover object-center transition-transform duration-500 ${
              isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
            }`}
          />
        </button>

        {/* Botón de zoom */}
        <button
          type="button"
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white shadow opacity-0 transition-opacity group-hover:opacity-100"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-4">
          {images.map((image, index) => (
            <ProductThumbnail
              key={image.id}
              image={image.url}
              alt={image.alt}
              isActive={index === activeImageIndex}
              onClick={() => {
                setActiveImageIndex(index);
                setIsZoomed(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}