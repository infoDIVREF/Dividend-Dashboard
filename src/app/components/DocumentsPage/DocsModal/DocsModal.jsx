import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

export default function DocsModal({ category, onClose }) {
  const [documents, setDocuments] = useState([]);
  console.log("DOCUMENTS EN MODAL", documents);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token, collaboratorId } = useAuth();

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `https://pre-dividend.dseos.com/api/invoices/${collaboratorId}?page=${currentPage}&per_page=100&category=${category}`,
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
      <div className="min-h-[80vh] max-h-[80vh] bg-white rounded-lg w-3/4 overflow-scroll flex flex-col">
        <table className="min-w-full table-auto rounded-lg">
          <thead className="bg-azul rounded-lg sticky top-0 z-10">
            <tr className="text-white rounded-lg">
              <th className="text-start px-4 py-2">Nombre del archivo</th>
              <th className="text-start px-4 py-2">Subido por</th>
              <th className="text-start px-4 py-2">Fecha</th>
              <th className="text-start px-4 py-2">Estado</th>
              <th onClick={onClose} className="px-4 py-2">
                X
              </th>
            </tr>
          </thead>

          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="text-start px-4 py-2">
                  {doc.fileName || "N/A"}
                </td>
                <td className="text-start px-4 py-2">
                  {doc.uploaded_by || "Desconocido"}
                </td>
                <td className="text-start px-4 py-2">
                  {doc.upload_date || "N/A"}
                </td>
                <td className="text-start px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      doc.status === "pending" ? "text-naranja" : "text-azul"
                    } font-bold uppercase font-bricolage`}
                  >
                    {doc.status === "pending" ? "Pendiente" : "Recibido"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full bg-white flex items-center justify-around px-[25%] py-4 sticky bottom-0 z-10">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
