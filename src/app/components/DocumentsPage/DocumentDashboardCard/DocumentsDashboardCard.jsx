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
      className={`${
        totalPending === 0 &&
        totalReceived === 0 &&
        "pointer-events-none opacity-60"
      } cursor-pointer font-bricolage bg-gris-claro-3 rounded-[12px] p-6  flex flex-col gap-3 hover:bg-[#ebecf0]`}
      onClick={() => openModal(title)}
    >
      <h2 className="text-[17px] font-normal text-negro">{title}</h2>
      <div className="flex flex-col gap-[0.7rem]">
        <div className=" flex flex-row justify-between">
          <div className="flex flex-row gap-5 content-center items-center">
            <div className="bg-naranja p-2 rounded-full">
              <ClockIcon />
            </div>
            <p className="text-naranja text-[16px] font-normal">Pendientes</p>
          </div>
          <p className="text-naranja text-2xl font-[300]">{totalPending}</p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-5 content-center items-center">
            <div className="bg-azul p-2 rounded-full">
              <EyeIcon />
            </div>
            <p className="text-azul text-[16px] font-normal">Recibidos</p>
          </div>
          <p className="text-azul text-2xl font-[300]">{totalReceived}</p>
        </div>
      </div>
    </div>
  );
}
