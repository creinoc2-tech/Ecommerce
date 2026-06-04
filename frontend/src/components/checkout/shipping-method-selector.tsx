export const ShippingMethodSelector = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="text-base font-semibold text-white mb-1">Métodos de envío</p>

        <div className="flex justify-between items-center text-sm border border-[#39332a] bg-[#181716] py-4 rounded-lg px-6 shadow-sm transition-all duration-200">
          <span className="font-medium text-white">Standard</span>
          <span className="font-semibold text-[#e7c083]">Gratis</span>
        </div>

        <div className="flex justify-between items-center text-sm border border-[#39332a] bg-[#181716] py-4 rounded-t-lg px-6 shadow-sm transition-all duration-200">
          <span className="font-medium text-white">Depósito Bancario</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4">
        

        <div className="bg-[#181716] text-[13px] p-5 space-y-1 border border-[#39332a] border-t-0 rounded-b-lg text-[#e7e7e7] shadow-sm">
          <p>Compra a través de transferencia bancaria</p>
          <p className="font-semibold">BANCO PICHINCHA</p>
          <p>Razón Social: <span className="font-semibold">CelularesBaratos</span></p>
          <p>RUC: <span className="font-semibold">123456789000</span></p>
          <p>Tipo de cuenta: <span className="font-semibold">Corriente</span></p>
          <p>Número de cuenta: <span className="font-semibold">1234567890</span></p>
          <p className="text-xs text-[#b0a991] mt-2">
            La información será compartida nuevamente una vez que se haya finalizado la compra
          </p>
        </div>
      </div>
    </>
  );
};
