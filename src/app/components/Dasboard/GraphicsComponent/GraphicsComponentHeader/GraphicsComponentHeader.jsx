import StatusFiltersComponent from "./StatusFiltersComponent/StatusFiltersComponent";

export default function GraphicsComponentHeader({
  isSidebarOpen,
  pageToShow,
  setPageToShow,
}) {
  return (
    <div
      className={`flex  items-center w-full ${
        pageToShow === "map" ? "justify-end" : "justify-between"
      }`}
    >
      <StatusFiltersComponent
        pageToShow={pageToShow}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}
