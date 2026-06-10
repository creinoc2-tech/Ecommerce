import CategoryTree from "../../category/category-tree";
import type { CategoryWithChildren } from "../../../interfaces/categoria.interface";

const mockCategories: CategoryWithChildren[] = [
  {
    id: 1,
    name: "Fruits",
    icone: "fruit",
    color: "#22c55e",
    usuario_id: "demo-user",
    created_at: "2026-06-05T00:00:00Z",
    productCount: 12,
    subcategories: [
      {
        id: 11,
        name: "Citrus",
        icone: "citrus",
        color: "#f59e0b",
        usuario_id: "demo-user",
        created_at: "2026-06-05T00:00:00Z",
        productCount: 5,
        subcategories: [],
      },
      {
        id: 12,
        name: "Berries",
        icone: "berries",
        color: "#ef4444",
        usuario_id: "demo-user",
        created_at: "2026-06-05T00:00:00Z",
        productCount: 7,
        subcategories: [],
      },
    ],
  },
  {
    id: 2,
    name: "Smartphones",
    icone: "phone",
    color: "#3b82f6",
    usuario_id: "demo-user",
    created_at: "2026-06-05T00:00:00Z",
    productCount: 20,
    subcategories: [
      {
        id: 21,
        name: "Android",
        icone: "android",
        color: "#84cc16",
        usuario_id: "demo-user",
        created_at: "2026-06-05T00:00:00Z",
        productCount: 14,
        subcategories: [],
      },
      {
        id: 22,
        name: "iOS",
        icone: "ios",
        color: "#9ca3af",
        usuario_id: "demo-user",
        created_at: "2026-06-05T00:00:00Z",
        productCount: 6,
        subcategories: [],
      },
    ],
  },
  {
    id: 3,
    name: "Men's Wear",
    icone: "shirt",
    color: "#a855f7",
    usuario_id: "demo-user",
    created_at: "2026-06-05T00:00:00Z",
    productCount: 9,
    subcategories: [],
  },
];

export default function SidebarCategoryTree() {
  return (
    <div className="rounded-xl  shadow-sm  bg-[#1e1e1e] text-white">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">
          Browse Categories
        </h3>
      </div>

      <div className="p-6 pt-0">
        <CategoryTree categories={mockCategories} />
      </div>
    </div>
  );
}
