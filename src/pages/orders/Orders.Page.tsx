import React, { useState } from "react";
import { useMostrarUsuarioAuthQuery } from "../../stack/user/user-get-Stack";
import { useGetOrderUsuarios } from "../../stack/orders/orders-usuarioId-Stack";
import { Link } from "react-router";
import { OrderTable } from "../../components/order/order-table";
import { useMostrarOrderFiltradoStack } from "../../stack/orders/orders.filter-Stack";
import { Pagination } from "../../components/producto/Pagination";

export const OrdersPage = () => {
  const { data: usuario } = useMostrarUsuarioAuthQuery();
  const customerId = usuario?.id;

  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string[]>([]);
  const { data: orders, isLoading } = useMostrarOrderFiltradoStack(
    customerId,
    page,
    status,
  );
  console.log("Orders data:", orders);

  return (
    <div className="py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h1
            className="font-bold text-3xl tracking-tight text-white"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            My Orders
          </h1>
        </div>

        <div className="rounded-2xl border border-[#39332a] bg-[#1e1e1e]  p-8 text-white shadow-xl">
          {/* Barra de acciones/filtros */}
          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            {/* Buscador */}
            <input
              type="text"
              placeholder="Search..."
              className="bg-[#1a1a1a] border border-[#262626] rounded-md px-4 py-2 text-[#e4e4e7] placeholder-[#52525b] focus:outline-none w-64 shadow-sm"
            />
            {/* Botones de acción */}
            <div className="flex gap-2">
              <button className="bg-[#121212] border border-[#1c1c1c] text-[#e4e4e7] font-semibold px-4 py-2 rounded-md shadow hover:bg-[#23232a]/80 transition text-sm">
                <span className="font-mono">Columns</span>
              </button>
              <button className="bg-[#121212] border border-[#1c1c1c] text-[#e4e4e7] font-semibold px-4 py-2 rounded-md shadow hover:bg-[#23232a]/80 transition text-sm flex items-center gap-1">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0A8.003 8.003 0 016.418 15m0 0H15"
                  />
                </svg>
                <span className="font-mono">Refresh</span>
              </button>
            </div>
          </div>

          {orders?.orders?.length === 0 ? (
            <div className="flex flex-col items-center py-10">
              <p className="text-[#a1a1aa] text-[15px] mb-4">
                Todavía no has hecho ningún pedido
              </p>
              <Link
                to="/products"
                className="bg-[#ffe082] text-[#18181b] uppercase font-semibold tracking-widest text-xs py-4 rounded-full px-8 shadow hover:bg-[#ffe9b3] border border-[#ffe082]"
              >
                Empezar a comprar
              </Link>
            </div>
          ) : (
            <>
              <OrderTable orders={orders?.orders ?? []} />
              <Pagination
                totalItems={orders?.count ?? 0}
                page={page}
                setPage={setPage}
                items={5}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
