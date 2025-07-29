"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import FilePdfIcon from "@/../public/icons/FilePdfIcon";
import axiosInstance from "@/lib/axiosInstance";
import InvoicesTableSkeleton from "./InvoiceTableSkeleton";

export default function InvoicesTable() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token, collaboratorId } = useAuth();
  const [loader, setLoader] = useState(true);

  // Función para obtener las facturas
  const fetchInvoices = async () => {
    setLoader(true);
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
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (collaboratorId) {
      fetchInvoices();
    }
  }, [collaboratorId, currentPage]);

  return (
    <>
      {loader ? (
        <InvoicesTableSkeleton />
      ) : (
        <div className="h-[69vh] w-full rounded-xl overflow-hidden bg-white flex flex-col">
          {/* Table Header */}
          <div className="bg-azul">
            <table className="min-w-full table-fixed">
              <thead className="bg-azul text-white">
                <tr>
                  <th className="w-[10%] text-center px-4 py-2 pl-5">Año</th>
                  <th className="w-[20%] text-start px-4 py-2">
                    Número factura
                  </th>
                  <th className="w-[35%] text-start px-4 py-2">Concepto</th>
                  <th className="w-[10%] text-start px-4 py-2">Subtotal</th>
                  <th className="w-[10%] text-start px-4 py-2">Total</th>
                  <th className="w-[15%] text-start py-2">Descargar</th>
                </tr>
              </thead>
            </table>
          </div>

          {/* Table Body Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <table className="min-w-full table-fixed">
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-t">
                    <td className="w-[10%] text-center px-4 py-2">
                      {invoice.year || "N/A"}
                    </td>
                    <td
                      className="w-[20%] text-start px-4 py-2 truncate"
                      title={invoice.billNumber}
                    >
                      {invoice.billNumber || "N/A"}
                    </td>
                    <td
                      className="w-[35%] text-start px-4 py-2 truncate"
                      title={invoice.concept}
                    >
                      {invoice.concept || "N/A"}
                    </td>
                    <td className="w-[10%] text-start px-4 py-2">
                      {invoice.subtotal || "N/A"}
                    </td>
                    <td className="w-[10%] text-start px-4 py-2">
                      {invoice.total || "N/A"}
                    </td>
                    <td className="w-[15%] text-center px-4 py-2 flex items-center justify-center">
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_URL}/bills/download/${invoice.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FilePdfIcon />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="w-full bg-white flex items-center justify-between px-6 py-4 text-sm">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </>
  );
}
