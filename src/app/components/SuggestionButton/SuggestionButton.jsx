"use client";
import { usePathname } from "next/navigation";
import { ChatIcon } from "@/components/icons/ClaimStatusIcons";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useAuth } from "@/hooks/useAuth";

export default function SuggestionButton() {
  const pathname = usePathname();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user, collaboratorId, loading } = useAuth();
  const selectedCollaborator = user?.collaborators.find(
    (c) => c.id === collaboratorId
  );

  console.log("collaboratorId", collaboratorId);
  console.log("user", user);
  console.log("loading", loading);

  const hide = pathname === "/login" || pathname === "/select-collaborator";

  if (hide) return null;

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  let toggleModal = () => {
    if (modalIsOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // "success" or "error"
  const [statusMessage, setStatusMessage] = useState("");

  const subject = `Sugerencia de mejora de ${
    selectedCollaborator?.name ?? "Colaborador"
  } - (${user?.name ?? "Usuario"})`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/send-suggestion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, subject }),
    });

    if (res.ok) {
      setStatus("success");
      setStatusMessage("Sugerencia enviada correctamente");

      // Wait 2 seconds, then close modal and reset
      setTimeout(() => {
        setStatus(null);
        setStatusMessage("");
        closeModal();
        setMessage("");
      }, 2000);
    } else {
      setStatus("error");
      setStatusMessage("Error al enviar la sugerencia");

      setTimeout(() => {
        setStatus(null);
        setStatusMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <button
        className="group flex bg-[#F86338] items-center text-white text-sm font-medium px-4 py-2 rounded-full shadow-md hover:bg-[#d44f2b] transition-colors"
        onClick={toggleModal}
      >
        <ChatIcon />
        <span className="overflow-hidden max-w-0 opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 group-hover:ml-2 transition-all duration-500 whitespace-nowrap">
          Déjanos tu sugerencia
        </span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        // onRequestClose={closeModal}
        contentLabel="Suggestion Modal"
        className="bg-white rounded-lg p-6 max-w-lg w-[50vw] shadow-lg relative z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40"
        ariaHideApp={false}
      >
        <h2>Sugerencia de mejora</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">Para:</label>
            <input
              type="email"
              value="info@dividendrefund.com"
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Asunto:</label>
            <input
              type="text"
              value={`Sugerencia de mejora de ${
                selectedCollaborator?.name ?? "Colaborador"
              } - (${user?.name ?? "Usuario"})`}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Mensaje:</label>
            <textarea
              placeholder="Escribe tu sugerencia aquí..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-32 resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            {statusMessage && (
              <p
                className={`text-sm mt-2 ${
                  status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {statusMessage}
              </p>
            )}
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#F86338] text-white rounded hover:bg-[#d44f2b]"
            >
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
