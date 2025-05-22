"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DocsModal from "@/app/components/DocumentsPage/DocsModal/DocsModal";
import DocumentsDashboardCard from "@/app/components/DocumentsPage/DocumentDashboardCard/DocumentsDashboardCard";
import DocumentsUploadComponent from "@/app/components/DocumentsPage/DocumentsUploadComponent/DocumentsUploadComponent";
import axiosInstance from "@/lib/axiosInstance";

export default function DocumentsDashboard() {
  const { token, collaboratorId } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchDocumentsData = async () => {
    if (!token || !collaboratorId) return;
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/invoicesByCategory/${collaboratorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDocuments(response.data.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory("");
  };

  useEffect(() => {
    fetchDocumentsData();
  }, [token, collaboratorId]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map(({ category, pending, received }) => (
          <DocumentsDashboardCard
            key={category}
            title={category}
            totalPending={pending}
            totalReceived={received}
            openModal={openModal}
          />
        ))}
        {isModalOpen && (
          <DocsModal category={selectedCategory} onClose={closeModal} />
        )}
      </div>
      <DocumentsUploadComponent fetchDocumentsData={fetchDocumentsData} />
    </>
  );
}
