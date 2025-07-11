import DocumentsHeader from "@/app/components/DocumentsPage/DocumentsHeader/DocumentsHeader";
import DocumentsDashboard from "@/app/components/DocumentsPage/DocumentsDashboard/DocumentsDashboard";
export default function page() {
  return (
    <div className="flex flex-col gap-[1rem] pt-[25px] pb-[25px] px-[53px]">
      <DocumentsHeader />
      <DocumentsDashboard />
    </div>
  );
}
