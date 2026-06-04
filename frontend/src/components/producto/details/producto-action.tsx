import { LuMinus, LuPlus } from "react-icons/lu";
import { useCounterStore } from "../../../store/counter.store";
import { useCartStore } from "../../../store/cart-store";
import type { FC } from "react";
import type { Product } from "../../../interfaces/product.interface";

interface Props {
  id: string;
   product: Product | null;
   selectedVariant : any
}

export const ProductoAction: FC<Props> = ({ id, product, selectedVariant }) => {
  const count = useCounterStore((state) => state.counts[id] ?? 1);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const addItem = useCartStore((state) => state.addItem);

  const addToCart = () => {
		if (selectedVariant) {
			addItem({
				variantId: selectedVariant.id,
				productId: product?.id || '',
				name: product?.name || '',
				image: product?.images[0] || '',
				color: selectedVariant.color_name,
				storage: selectedVariant.storage,
				price: selectedVariant.price,
				quantity: count,
			});
 		}
	};


  return (
    <>
      <div className="space-y-3">
        <p className=" uppercase text-xs tracking-widest font-semibold text-gray-400 mb-4">Cantidad</p>
        <div className="flex items-center gap-2 px-2 py-1 rounded w-fit
         border border-[#3a3732]">
          <button
            onClick={() => decrement(id)}
            disabled={count === 1}
            className="w-7 h-7 flex items-center 
            justify-center rounded-lg bg-[#181612]
             text-[#b3a58a] hover:bg-[#2c2924] disabled:opacity-50  "
          >
            <LuMinus size={15} />
          </button>
          <span className="mx-2 w-6 text-center text-[#b3a58a] text-sm">{count}</span>
          <button
            onClick={() => increment(id)}
            className="w-7 h-7 flex items-center justify-center rounded bg-[#181612] text-[#b3a58a] hover:bg-[#2c2924]"
          >
            <LuPlus size={15} />
          </button>
        </div>
      </div>

      {/* BOTONES ACCIÓN */}
      <div className="flex gap-3 mt-4">
        <button
          className="flex-1 flex items-center justify-center gap-2 bg-[#b3a58a]
           text-[#23201c] font-semibold tracking-widest text-sm py-3.5 rounded-lg
           transition-all duration-200 hover:bg-[#a3937a] " 
            onClick={addToCart}
        >
          <span className="text-lg">🛒</span> Add to cart
        </button>


        <button
          className="flex-1 bg-[#1a1919] hover:bg-[#2c2924] text-white font-semibold
           tracking-widest text-sm py-3.5   rounded-lg transition-all duration-200 "
        >
          Buy Now
        </button>
      </div>
    </>
  );
};