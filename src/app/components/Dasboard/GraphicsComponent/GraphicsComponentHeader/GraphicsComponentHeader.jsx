import StatusFiltersComponent from "./StatusFiltersComponent/StatusFiltersComponent";

export default function GraphicsComponentHeader({ isSidebarOpen }) {
  return (
    <div className="flex justify-center items-center">
      <StatusFiltersComponent isSidebarOpen={isSidebarOpen} />
    </div>
  );
}
