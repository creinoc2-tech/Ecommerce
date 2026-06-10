import { Link, useParams } from "react-router";
import { useMostrarUsuarioAuthQuery } from "../../stack/usuario/obtener-usuario.stack";
import { useGetOrdersByUserId } from "../../stack/ordenes/obtener-orden.stack";
import { CiCircleCheck } from "react-icons/ci";
import { OrdersDetails } from "../../components/thankyou/orders-details";

export const ThankYouPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: usuario } = useMostrarUsuarioAuthQuery();
  const orderId = Number(id);
  const customerId = usuario?.id;
  const { data: order } = useGetOrdersByUserId(orderId, customerId);

  return (
    <div className="bg-[#181716] flex flex-col items-center
     justify-center py-10 px-4 ">
      <div className="w-full max-w-md mx-auto">
        <header className="flex flex-col items-center mb-8">
          <Link
            to="/"
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Shop.Stack
          </Link>
        </header>

        <div className="bg-[#18181b] border border-[#39332a] rounded-2xl shadow-xl p-7 flex flex-col items-center mb-8">
          <div className="flex flex-col items-center gap-2 mb-6">
            <span className="bg-green-700 rounded-full p-2 mb-2">
              <CiCircleCheck size={36} className="text-white" />
            </span>
            <h1
              className="text-2xl md:text-3xl font-bold text-white mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              ¡Gracias, {order?.usuario?.full_name || "Cliente"}!
            </h1>
            <span className="text-base text-[#a1a1aa]">
              Tu pedido está confirmado
            </span>
          </div>

          <div className="w-full bg-[#23232a] border border-[#39332a] rounded-xl p-5 mb-6">
            <h3 className="font-semibold text-white mb-2">
              Datos para transferencia
            </h3>
            <ul className="text-[#e4e4e7] text-sm space-y-1">
              <li>
                <strong>BANCO:</strong> PICHINCHA
              </li>
              <li>
                <strong>Razón Social:</strong> CelularesBaratos
              </li>
              <li>
                <strong>RUC:</strong> 123456789000
              </li>
              <li>
                <strong>Tipo de cuenta:</strong> Corriente
              </li>
              <li>
                <strong>Número de cuenta:</strong> 1234567890
              </li>
            </ul>
            <p className="text-xs text-[#a1a1aa] mt-3">
              Una vez realizada la transferencia, comparte tu comprobante a{" "}
              <span className="underline">ventas@celularesbaratos.com</span>{" "}
              para procesarla y hacerte la entrega de tu dispositivo a
              domicilio.
            </p>
          </div>

         
         
        </div>
         <OrdersDetails order={order} />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full mt-2">
          <p className="text-[#a1a1aa] text-sm mb-2 md:mb-0">
            ¿Necesitas ayuda? Ponte en contacto con nosotros
          </p>
          <Link
            to="/productoss"
            className="bg-[#ffe082] text-[#18181b] font-semibold py-3 px-6 rounded-lg shadow transition hover:bg-[#ffe9b3] border border-[#ffe082]"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
};
