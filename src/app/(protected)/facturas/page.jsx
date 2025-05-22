import InvoicesHeader from "@/app/components/InvoicesPage/InvoicesHeader/InvoicesHeader";
import InvoicesTable from "@/app/components/InvoicesPage/InvoicesTable/InvoicesTable";

export default function page() {
  return (
    <div className="flex flex-col gap-12 py-[53px] px-[53px]">
      <InvoicesHeader />
      <InvoicesTable />
    </div>
  );
}
