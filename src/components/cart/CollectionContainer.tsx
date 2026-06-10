import { gridCellBorderClasses } from "../../utils/gridCellBorderClasses";
import CollectionItem from "../common/collection-item";
import { prepareProducts } from "../../utils/productos";
import { useMostrarProductosStack } from "../../stack/producto/mostrar-productos.stack";
import { useCartStore } from "../../store/carrito.store";
import { useCounterStore } from "../../store/counter.store";

export const CollectionContainer = () => {
  const columns2 = 2;
  const columns3 = 3;
  const { recentCelulares } = useMostrarProductosStack();
  const preparedRecentProducts = prepareProducts(recentCelulares);
  const count = useCounterStore((state) => state.counts[preparedRecentProducts[0]?.id] ?? 1);

  const addItem = useCartStore((state) => state.addItem);

  const addToCart = () => {
    if (preparedRecentProducts[0]?.variants[0]) {
      addItem({
        variantId: preparedRecentProducts[0].variants[0].id,
        productId: preparedRecentProducts[0]?.id || "",
        name: preparedRecentProducts[0]?.name || "",
        image: preparedRecentProducts[0]?.images[0] || "",
        color: preparedRecentProducts[0]?.variants[0]?.color_name || "",
        storage: preparedRecentProducts[0]?.variants[0]?.storage || "",
        price: preparedRecentProducts[0]?.variants[0]?.price || 0,
        quantity: count,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
      {preparedRecentProducts.slice(0, 6).map((p, index) => (
        <CollectionItem
          key={p?.id}
          id={p?.id}
          image={p?.images[0]}
          title={p?.name}
          category={p?.slug}
          fit="Regular"
          price={`$${p?.variants[0]?.price}`}
          onAddToCart={addToCart}
          className={gridCellBorderClasses(index, columns2, columns3, true)}
        />
      ))}
    </div>
  );
};
