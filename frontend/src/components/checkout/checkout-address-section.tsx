import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  type AddressFormValues,
} from "../../schema/address.schema";
import { useCartStore } from "../../store/cart-store";
import { ShippingMethodSelector } from "./shipping-method-selector";
import { useCreateOrder } from "../../stack/orders/orders-create-Stack";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import type { OrderInput } from "../../interfaces/order.interface";
import type z from "zod";

export const CheckoutAddressSection = () => {
  const { mutate, isPending } = useCreateOrder();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
  });

  const cartItems = useCartStore((state) => state.items);
  const totalAmount = useCartStore((state) => state.totalAmount);

  const onSubmit = handleSubmit((data: z.infer<typeof addressSchema>) => {
    try {
      const orderInput: OrderInput = {
        address: data,
        cartItems: cartItems.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
      };

      mutate(orderInput);
    } catch (error) {
      console.error("Error al procesar el formulario:", error);
    }
  });

  if (isPending) {
    return (
      <div className="flex flex-col gap-3 h-screen items-center justify-center text-white">
        <ImSpinner2 className="animate-spin h-10 w-10 text-white" />

        <p className="text-sm font-medium text-white">
          Estamos procesando tu pedido
        </p>
      </div>
    );
  }

  return (
    <div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold tracking-normal text-white">
            Shipping Address
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-white">
              Direccion principal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Tu dirección principal"
              className="border border-[#222] bg-[#181818] text-[#e5e5e5]
               px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789]
                focus:ring-2 focus:ring-[#bca789] transition"
              {...register("addressLine1")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-white">
              Direccion secundaria (Opcional)
            </label>
            <input
              type="text"
              placeholder="Tu dirección secundaria"
              className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
              {...register("addressLine2")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-white">
              Estado / Provincia <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Tu estado o provincia"
              className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 
              placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
              {...register("state")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-white">
              Ciudad <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Tu ciudad"
              className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
              {...register("city")}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-white">
              Codigo Postal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Tu código postal"
              className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
              {...register("postalCode")}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              País <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] 
            focus:ring-2 focus:ring-[#bca789] transition"
              {...register("country")}
            >
              <option value="">Selecciona un país</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Canadá">Canadá</option>
              <option value="Estados Unidos">Estados Unidos</option>
              <option value="México">México</option>
              <option value="Argentina">Argentina</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 bg-[#bca789] text-[#181818] font-semibold py-3 rounded-xl transition hover:bg-[#a68c6d]"
        >
          Save & Continue
        </button>

        <ShippingMethodSelector />
      </form>
    </div>
  );
};
