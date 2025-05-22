import { useState } from "react";
import UploadFileIcon from "@/../public/icons/UploadFileIcon"; // Asegúrate de importar correctamente el icono
import { useAuth } from "@/hooks/useAuth"; // Asegúrate de que el hook useAuth esté correctamente implementado
import { useFilters } from "@/contexts/FiltersContext";
import axiosInstance from "@/lib/axiosInstance";

export default function UploadModal({ file, onClose, fetchDocumentsData }) {
  const [fileDescription, setFileDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFund, setSelectedFund] = useState(""); // Estado para el fondo seleccionado
  const [uploadSuccess, setUploadSuccess] = useState(false); // Estado para el mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const { token, collaboratorId } = useAuth();
  const {
    initialFilters: { funds },
  } = useFilters();

  // Lógica para subir el archivo
  const handleUpload = async () => {
    if (!file || !selectedFund) {
      setErrorMessage("Por favor, selecciona un fondo.");
      setTimeout(() => {
        setErrorMessage(""); // Ocultar el mensaje después de 3 segundos
      }, 3000);
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false); // Resetear el estado de éxito antes de la subida

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fundId", selectedFund); // Usar el fondo seleccionado
    formData.append("fileDescription", fileDescription);

    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/invoices/uploadFile/${collaboratorId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        // Si el status es 201 o 200, mostrar mensaje de éxito
        setUploadSuccess(true); // Mostrar mensaje de éxito

        // Llamamos a fetchDocumentsData para recargar la lista de documentos
        fetchDocumentsData();

        // Esperar segundos antes de cerrar el modal
        setTimeout(() => {
          onClose(); // Cerrar modal después de 2 segundos
        }, 2000);
      } else {
        // Si no es 200 o 201, mostrar mensaje de error
        setErrorMessage("Error al subir el archivo.");
        setTimeout(() => {
          setErrorMessage(""); // Ocultar el mensaje después de 3 segundos
        }, 3000);
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setErrorMessage("Error al subir el archivo.");
      setTimeout(() => {
        setErrorMessage(""); // Ocultar el mensaje después de 3 segundos
      }, 3000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-3/4 max-w-lg">
        <div className="flex items-center justify-center mb-4 p-8 gap-4">
          <UploadFileIcon />
          <div>
            <p>
              Estás a punto de subir un documento. Asegúrate de que sea el
              correcto.
            </p>
          </div>
        </div>

        <p className="px-8">
          <strong>Archivo:</strong> {file ? file.name : "Ninguno seleccionado"}
        </p>

        {/* Selector de fondos */}
        <div className="mt-4 px-8">
          <label htmlFor="fundSelector" className="block text-sm font-medium">
            Selecciona un fondo
          </label>
          <select
            id="fundSelector"
            value={selectedFund}
            onChange={(e) => setSelectedFund(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
          >
            <option value="">Seleccione un fondo</option>
            {funds.map((fund) => (
              <option key={fund.id} value={fund.id}>
                {fund.name}
              </option>
            ))}
          </select>
          {/* Mostrar el mensaje de error debajo del selector */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>

        {/* Campo de descripción */}
        <div className="mt-4 px-8">
          <label
            htmlFor="fileDescription"
            className="block text-sm font-medium"
          >
            Descripción del archivo
          </label>
          <textarea
            id="fileDescription"
            rows="4"
            value={fileDescription}
            onChange={(e) => setFileDescription(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
            placeholder="Escribe una descripción (opcional)"
          />
        </div>

        {/* Mensaje de éxito */}
        {uploadSuccess && (
          <p className="text-green-500 mt-4 text-center">
            ¡Documento subido con éxito!
          </p>
        )}

        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className={`${
              isUploading ? "bg-gray-300" : "bg-azul"
            } px-4 py-2 text-white rounded-md`}
          >
            {isUploading ? "Subiendo..." : "Subir Documento"}
          </button>
          <button
            onClick={onClose}
            className="bg-blanco-roto text-black px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
