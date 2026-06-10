import { type FC } from "react";
import { formatPrice } from "../../utils/productos";
import { useNavigate } from "react-router";
import { formatDateLong, getStatus } from "../../utils/helpers";
interface Props {
  orders: any[];
}
const tableHeaders = ["Order ID", "Date", "Status", "Total" , "Actions"];
export const OrderTable: FC<Props> = ({ orders }: Props) => {
  const navigate = useNavigate();

  // Badge de estado
  const statusBadge = (status: string) => {
    let bg = "";
    let text = "";
    switch (status) {
      case "delivered":
      case "Delivered":
        bg = "bg-[#d1fae5]";
        text = "text-[#065f46]";
        break;
      case "processing":
      case "Processing":
        bg = "bg-[#fef3c7]";
        text = "text-[#92400e]";
        break;
      case "cancelled":
      case "Cancelled":
        bg = "bg-[#fca5a5]";
        text = "text-[#991b1b]";
        break;
      default:
        bg = "bg-[#23232a]";
        text = "text-[#e4e4e7]";
    }
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${bg} ${text} border border-[#39332a]`}
      >
        {getStatus(status)}
      </span>
    );
  };

  return (
    <div className="relative w-full h-full">
      <table className="w-full text-sm bg-[#27272a] rounded-xl overflow-hidden">
        <thead>
          <tr className="text-[15px] font-bold text-[#e4e4e7] bg-[#1a1a1a] border border-[#262626]">
            {tableHeaders.map((header) => (
              <th key={header} className="h-12 px-4 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-[#23232a] transition-colors duration-150 bg-[#1a1a1a] border border-[#262626] group"
              onClick={() => navigate(`/cuenta/ordenes/pedido/${order.id}`)}
              style={{ cursor: "pointer" }}
            >
              <td className="p-4 font-semibold text-[#ffe082]">
                ORD-{order.id.toString().padStart(3, "0")}
              </td>
              <td className="p-4 text-[#e4e4e7]">
                {formatDateLong(order.created_at)}
              </td>
              <td className="p-4">{statusBadge(order.status)}</td>
              <td className="p-4 font-bold text-[#e4e4e7]">
                {formatPrice(order.total_amount)}
              </td>
              <td className="p-4">
                <button
                  className="bg-[#23232a] border border-[#23232a] text-[#e4e4e7] rounded-md px-2 py-1 opacity-80 group-hover:opacity-100 transition"
                  onClick={(e) => {
                    e.stopPropagation(); /* Aquí puedes abrir un menú de acciones si lo deseas */
                  }}
                  aria-label="Acciones"
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="5" cy="12" r="2" fill="#e4e4e7" />
                    <circle cx="12" cy="12" r="2" fill="#e4e4e7" />
                    <circle cx="19" cy="12" r="2" fill="#e4e4e7" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         
    </div>
  );
};
