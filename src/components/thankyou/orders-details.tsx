import React from "react";
import { formatPrice } from "../../utils/productos";

export const OrdersDetails = ({ order }: { order: any }) => {
  return (
    <div
      className="border border-slate-200 text-white w-full p-5 rounded-md space-y-3 md:w-[450px]
	
	"
    >
      <h3 className="font-medium">Detalles del pedido</h3>
      <div className="flex flex-col gap-5">
        <ul className="space-y-3">
          {order?.orderItems.map((item, index: number) => (
            <li key={index} className="flex justify-between items-center gap-3">
              <div className="flex">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between">
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-sm font-medium text-gray-600 mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex gap-3">
                  <p className="text-[13px] text-gray-600">
                    {item.storage} / {item.color_name}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">
            {formatPrice(order?.totalAmount)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col text-sm">
          <p className="font-semibold">Información de contacto:</p>
          <p>{order?.usuario?.email}</p>
        </div>

        <div className="flex flex-col text-sm">
          <p className="font-semibold">Métodos de pago:</p>
          <p>Deposito bancario - {formatPrice(order?.totalAmount)}</p>
        </div>

        <div className="flex flex-col text-sm">
          <p className="font-semibold">Dirección de envío</p>
          <p>{order?.address?.addressLine1}</p>
          <p>{order?.address?.addressLine2 && order.address.addressLine2}</p>
          <p>{order?.address?.city}</p>
          <p>{order?.address?.state}</p>
          <p>{order?.address?.postalCode}</p>
          <p>{order?.address?.country}</p>
        </div>

        <div className="flex flex-col text-sm">
          <p className="font-semibold">Método de envío</p>
          <p>Standard</p>
        </div>
      </div>
    </div>
  );
};
