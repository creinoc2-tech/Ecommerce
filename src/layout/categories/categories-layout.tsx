import { Outlet } from "react-router";
import SidebarCategoryTree from "../../components/container/store/sidebar-category-tree";



export default function CategoryTemplate() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="mb-8">
        <h1 className="mt-4 text-3xl text-white font-bold tracking-tight">
          All Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Browse our wide range of product categories
        </p>
      </nav>

      <div className="grid gap-8 xl:grid-cols-12">
        {/* Sidebar */}
        <aside className="xl:col-span-3">
           <SidebarCategoryTree />
        </aside>

        {/* Main Content */}
        <main className="space-y-8 xl:col-span-9">
            <Outlet />
        </main>
      </div>
    </div>
  );
}
