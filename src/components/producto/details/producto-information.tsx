import React from "react";
import { Link } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsChatLeftText } from "react-icons/bs";

export const ProductoInformation = () => {
  return (
    <div className="flex gap-3 pt-2">
      
      {/* Envío gratis */}
      <div
        className="flex flex-1 items-center justify-center gap-2
        border border-[#23201c] rounded-lg h-14 bg-[#1a1919] 
        text-[#b3a58a] cursor-pointer"
      >
        <CiDeliveryTruck size={22} className="opacity-70" />
        <p className="text-sm font-medium tracking-wide leading-none">
          Envío gratis
        </p>
      </div>

      {/* Contacto */}
      <Link
        to="#"
        className="flex flex-1 items-center justify-center gap-2
        border border-[#23201c] rounded-lg h-14 bg-[#1a1919]
        text-[#b3a58a]"
      >
        <BsChatLeftText size={20} className="opacity-70" />

        <p className="flex flex-col leading-tight text-sm font-medium tracking-wide">
          <span>¿Necesitas ayuda?</span>
          <span className="text-xs font-normal">
            Contáctanos aquí
          </span>
        </p>
      </Link>

      
    </div>
  );
};