import EyeIcon from "@/../public/icons/EyeIcon";
import ClockIcon from "@/../public/icons/ClockIcon";
export default function DocumentsDashboardCard({
  title,
  totalPending,
  totalReceived,
  openModal,
}) {
  return (
    <div
      className="cursor-pointer font-bricolage bg-gris-claro-3 rounded-[12px] p-4  flex flex-col gap-2 hover:bg-[#ebecf0]"
      onClick={() => openModal(title)}
    >
      <h2 className="text-[18px] font-semibold text-negro">{title}</h2>
      <div className=" flex flex-row justify-between">
        <div className="flex flex-row gap-5 content-center items-center">
          <div className="bg-naranja p-2 rounded-md">
            <ClockIcon />
          </div>

          <p className="text-negro text-[16px] font-semibold">Pendientes</p>
        </div>
        <p className="text-naranja text-2xl">{totalPending}</p>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5 content-center items-center">
          <div className="bg-azul p-2 rounded-md">
            <EyeIcon />
          </div>
          <p className="text-negro text-[16px] font-semibold">Recibidos</p>
        </div>
        <p className="text-azul text-2xl">{totalReceived}</p>
      </div>
    </div>
  );
}
