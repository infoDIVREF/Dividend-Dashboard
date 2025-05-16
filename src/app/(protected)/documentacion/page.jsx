import React from "react";
import DocumentsHeader from "@/app/components/DocumentsPage/DocumentsHeader/DocumentsHeader";
import DocumentsDashboard from "@/app/components/DocumentsPage/DocumentsDashboard/DocumentsDashboard";
export default function page() {
  return (
    <div className="flex flex-col gap-12 py-[53px] px-[53px]">
      <DocumentsHeader />
      <DocumentsDashboard />
    </div>
  );
}
