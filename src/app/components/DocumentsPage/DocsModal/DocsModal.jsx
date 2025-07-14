import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axiosInstance from "@/lib/axiosInstance";
import { CircleCheck } from "lucide-react";
import DocumentsUploadComponent from "@/app/components/DocumentsPage/DocumentsUploadComponent/DocumentsUploadComponent";

export default function DocsModal({ category, onClose, fetchDocumentsData }) {
  const [documents, setDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token, collaboratorId } = useAuth();

  const modalRef = useRef(null);
  const scrollRef = useRef(null); // 1️⃣  Nuevo ref

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [currentPage]);

  const fetchDocuments = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/invoices/${collaboratorId}?page=${currentPage}&per_page=10&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDocuments(response.data.documents);
      setTotalPages(response.data.pagination.lastPage);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    if (category) {
      fetchDocuments();
    }
  }, [category, currentPage]);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="min-h-[80vh] max-h-[80vh] bg-white rounded-xl w-3/4 flex flex-col shadow-2xl p-0 overflow-hidden"
      >
        {/* Table Header separada */}
        <div className="bg-azul pr-2">
          <table className="min-w-full table-fixed">
            <thead className="text-white text-left text-sm">
              <tr>
                <th className="px-4 py-3 w-2/5">Nombre del archivo</th>
                <th className="px-4 py-3 w-1/5">Tipo de archivo</th>
                <th className="px-4 py-3 w-1/5">Subido por</th>
                <th className="px-4 py-3 w-1/5">Fecha</th>
                <th className="px-4 py-3 w-1/5">Estado</th>
                <th
                  onClick={onClose}
                  className="px-4 py-3 cursor-pointer text-center w-[40px]"
                >
                  X
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Table Body Scrollable */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <table className="min-w-full table-fixed">
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-50 text-sm">
                  <td
                    className="px-4 py-2 truncate w-2/5 max-w-xs"
                    title={doc.fileName}
                  >
                    {doc.fileName || "N/A"}
                  </td>
                  <td className="px-4 py-2 w-1/5">
                    {doc.type || "Tipo de archivo"}
                  </td>
                  <td
                    className="px-4 py-2 w-1/5 truncate max-w-[150px]"
                    title={doc.uploaded_by}
                  >
                    {doc.uploaded_by || "Desconocido"}
                  </td>
                  <td className="px-4 py-2 w-1/5">
                    {doc.upload_date || "N/A"}
                  </td>
                  <td className="px-4 py-2 w-1/5">
                    {doc.status === "completed" ? (
                      <CircleCheck size={26} strokeWidth={1} />
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase font-bricolage ${
                          doc.status === "pending"
                            ? "bg-orange-100 text-naranja"
                            : "bg-blue-100 text-azul"
                        }`}
                      >
                        {doc.status === "pending"
                          ? "Pendiente"
                          : doc.status === "review"
                          ? "En revisión"
                          : doc.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 w-[40px]"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upload */}
        <div className="px-6 py-3">
          <DocumentsUploadComponent fetchDocumentsData={fetchDocumentsData} />
        </div>

        {/* Pagination */}
        <div className="w-full bg-white flex items-center justify-between px-6 py-4 sticky bottom-0 z-10 text-sm">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          >
            Anterior
          </button>
          <span className="text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
