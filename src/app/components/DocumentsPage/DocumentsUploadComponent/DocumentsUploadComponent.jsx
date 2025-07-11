"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@/../public/icons/UploadFileIcon";
import UploadModal from "@/app/components/DocumentsPage/UploadModal/UploadModal";

export default function DocumentsUploadComponent({ fetchDocumentsData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);

  // Handler para abrir el modal cuando se seleccione un archivo
  const openModal = (acceptedFile) => {
    setFile(acceptedFile);
    setIsModalOpen(true);
  };

  // Configuración del hook useDropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => openModal(acceptedFiles[0]),
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  return (
    <div>
      {/* Área de Drop */}
      <div
        {...getRootProps()}
        className="rounded-lg border-[1px] border-blanco-roto p-[10px] text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <div>
          <UploadFileIcon className="mx-auto w-16 h-16 text-negro" />{" "}
          <p className="mt-4">Subir documentación</p>
          <small>
            (Arrastrar cualquier Documento Pendiente y nuestra IA procederá a
            validarlo)
          </small>
        </div>
      </div>

      {/* Modal para subir archivo */}
      {isModalOpen && (
        <UploadModal
          file={file}
          onClose={() => setIsModalOpen(false)}
          fetchDocumentsData={fetchDocumentsData}
        />
      )}
    </div>
  );
}
