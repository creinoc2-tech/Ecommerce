import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useGlobalStore } from "../store/global.store";
import type { Product } from "../interfaces/product.interface";
import { useBuscarProducto } from "../stack/producto/producto-search-Stack";
import { Link } from "react-router";
import { formatPrice } from "../utils/productos";

export const Search = () => {
  const closeSheet = useGlobalStore((state) => state.closeSheet);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: products } = useBuscarProducto(searchTerm);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Productos encontrados:", searchTerm);
      await setSearchResults(products as Product[]);
    }
  };

  return (
    <>
      <div className="flex items-center bg-[#181818] rounded-xl px-4 py-2 w-full max-w-md border border-[#23201c]">
        <form className="flex items-center flex-1" onSubmit={handleSearch}>
          <HiOutlineSearch
            size={20}
            className="text-[#b3a58a] opacity-80 ml-1 mr-2"
          />
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none w-full text-base text-[#b3a58a] placeholder:text-[#6e6657]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <button
          onClick={closeSheet}
          className="ml-2 flex items-center justify-center w-8 h-8 rounded border border-[#23201c] hover:bg-[#23201c] transition-colors"
        >
          <IoMdClose size={18} className="text-[#b3a58a]" />
        </button>
      </div>

      <div className="p-4">
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          <ul>
            {searchResults.map((product) => (
              <li className="mb-4 group" key={product.id}>
                <Link
                  to={`/product/${product.slug}`}
                  onClick={closeSheet}
                  className="flex items-center gap-5 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 hover:bg-zinc-800 transition-colors"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-14 w-14 rounded-md object-cover border border-zinc-800 bg-zinc-800"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold text-base text-white truncate group-hover:underline">{product.name}</div>
                        <div className="text-xs text-zinc-400 truncate">GadgetWorld Hub</div>
                      </div>
                      <div className="text-[15px] font-semibold text-white whitespace-nowrap">{formatPrice(product.variants[0].price)}</div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-zinc-500">{product.variants[0].storage}</span>
                      <span className="text-xs text-zinc-700">/</span>
                      <span className="text-xs text-zinc-500">{product.variants[0].color_name}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-600">No se encontraron resultados</p>
        )}
      </div>
    </>
  );
};
