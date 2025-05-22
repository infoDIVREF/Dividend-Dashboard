import EyeIcon from "@/../public/icons/EyeIcon";
import ClockIcon from "@/../public/icons/ClockIcon";
export default function DocumentsDashboardCard({
  title,
  totalPending,
  totalReceived,
  openModal,
}) {
  return (
    <div className="cursor-pointer" onClick={() => openModal(title)}>
      <div className="font-bricolage bg-gris-claro-3 rounded-[12px] p-6  flex flex-col gap-3">
        <h2 className="text-2xl  font-semibold text-negro">{title}</h2>
        <div className="mt-3 flex flex-row justify-between">
          <div className="flex flex-row gap-2 content-center">
            <div className="bg-naranja p-2 rounded-md">
              <ClockIcon />
            </div>

            <p className="text-negro text-lg">Pendientes</p>
          </div>
          <p className="text-naranja text-2xl">{totalPending}</p>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 content-center">
            <div className="bg-azul p-2 rounded-md">
              <EyeIcon />
            </div>
            <p className="text-negro text-lg">Recibidos</p>
          </div>
          <p className="text-azul text-2xl">{totalReceived}</p>
        </div>
      </div>
    </div>
  );
}
