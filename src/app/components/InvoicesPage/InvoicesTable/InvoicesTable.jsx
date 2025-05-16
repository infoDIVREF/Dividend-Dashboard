"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import FilePdfIcon from "@/../public/icons/FilePdfIcon";

export default function InvoicesTable() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { token, collaboratorId } = useAuth();

  // Función para obtener las facturas
  const fetchInvoices = async () => {
    try {
      const response = await axios.get(
        `https://pre-dividend.dseos.com/api/bills/getAllBills/${collaboratorId}?page=${currentPage}&per_page=10`,
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
    <div className="min-h-[80vh] bg-white rounded-lg w-full overflow-scroll flex flex-col">
      <table className="min-w-full table-auto rounded-lg">
        <thead className="bg-azul rounded-lg sticky top-0 z-10">
          <tr className="text-white rounded-lg">
            <th className="text-start px-4 py-2">Año</th>
            <th className="text-start px-4 py-2">Número factura</th>
            <th className="text-start px-4 py-2">Concepto</th>
            <th className="text-start px-4 py-2">Subtotal</th>
            <th className="text-start px-4 py-2">Total</th>
            {/*             <th className="text-start px-4 py-2">Pendiente</th>
             */}
            <th className="text-start px-4 py-2">Descargar</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="text-start px-4 py-2">{invoice.year || "N/A"}</td>
              <td className="text-start px-4 py-2">
                {invoice.billNumber || "N/A"}
              </td>
              <td className="text-start px-4 py-2">
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
              <td className="text-start px-4 py-2">
                <a
                  href={`https://pre-dividend.dseos.com/api/bills/download/${invoice.id}`}
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
  );
}
