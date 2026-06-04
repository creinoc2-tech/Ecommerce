import React, { type FC } from "react";
import type { Product } from "../../../interfaces/product.interface";
import { ProductImageGallery } from "../details/product-image-gallery";
import { ProductHeader } from "../details/product-header";
import { ProductPrice } from "../details/product-price";
import { ProductoColor } from "../details/producto-color";
 import { ProductoInformation } from "../details/producto-information";
 
interface ProductMainSectionProps {
  product: Product | null;
}

export const ProductMainSection: FC<ProductMainSectionProps> = ({
  product,
}) => {
  console.log("Producto en MainSection:", product);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
      <div className="xl:col-span-7">
        <ProductImageGallery
          images={(product?.images || []).map((url, idx) => ({
            id: `${product?.id || ""}-${idx}`,
            url,
            alt: product?.name || "Imagen del producto",
          }))}
        />
      </div>

      <div className="xl:col-span-5 flex flex-col gap-8">
        <div className="space-y-6">
          <ProductHeader
            title={product?.name ?? ""}
            slug={product?.slug || ""}
            features={product?.features || []}
            isOnSale={
              product?.variants?.[0]?.price &&
              product?.variants?.[0]?.price < 2200
                ? true
                : false
            }
          />

          <ProductPrice
            currentPrice={product?.variants?.[0]?.price ?? 0}
            currency={ "$"}
            inStock={(product?.variants?.[0]?.stock ?? 0) > 0}
          />
          <ProductoColor
             product={product}
          />

          
            <ProductoInformation />

        </div>
      </div>
    </div>
  );
};
