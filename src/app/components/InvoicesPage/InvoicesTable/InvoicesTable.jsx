"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import FilePdfIcon from "@/../public/icons/FilePdfIcon";
import axiosInstance from "@/lib/axiosInstance";

export default function InvoicesTable() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token, collaboratorId } = useAuth();

  // Función para obtener las facturas
  const fetchInvoices = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/bills/getAllBills/${collaboratorId}?page=${currentPage}&per_page=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInvoices(response.data.bills);
      setTotalPages(response.data.pagination.lastPage); // Actualiza el número de páginas
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    if (collaboratorId) {
      fetchInvoices();
    }
  }, [collaboratorId, currentPage]);

  return (
    <div className="min-h-[80vh] max-h-[80vh] bg-white rounded-xl w-full overflow-scroll flex flex-col justify-between shadow-2xl">
      <table className="min-w-full table-auto rounded-lg">
        <thead className="bg-azul rounded-lg sticky top-0 z-10">
          <tr className="text-white rounded-lg">
            <th className="text-center px-4 py-2 pl-5">Año</th>
            <th className="text-start px-4 py-2">Número factura</th>
            <th className="text-start px-4 py-2">Concepto</th>
            <th className="text-start px-4 py-2">Subtotal</th>
            <th className="text-start px-4 py-2">Total</th>
            {/*             <th className="text-start px-4 py-2">Pendiente</th>
             */}
            <th className="text-center px-4 py-2">Descargar</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="text-center px-4 py-2">{invoice.year || "N/A"}</td>
              <td
                className="text-start px-4 py-2 truncate max-w-[150px]"
                title={invoice.billNumber}
              >
                {invoice.billNumber || "N/A"}
              </td>
              <td
                className="text-start px-4 py-2 truncate max-w-xs"
                title={invoice.concept}
              >
                {invoice.concept || "N/A"}
              </td>
              <td className="text-start px-4 py-2">
                {invoice.subtotal || "N/A"}
              </td>
              <td className="text-start px-4 py-2">{invoice.total || "N/A"}</td>
              {/*  Aún no disponemos de status de la factura  */}
              {/* <td className="text-start px-4 py-2">
                {invoice.status || "Pendiente"}
              </td> */}
              <td className="text-center px-4 py-2 flex items-center justify-center">
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}/bills/download/${invoice.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=""
                >
                  <FilePdfIcon />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full bg-white flex items-center justify-between px-6 py-4 sticky bottom-0 z-10 text-sm">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
          Anterior
        </button>
        <span>
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
  );
}
