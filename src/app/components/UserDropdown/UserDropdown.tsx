"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, collaboratorId, setCollaborator, logout } = useAuthContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  const handleSelect = (id: string) => {
    setCollaborator(id);
    setOpen(false);
  };

  // Detectar clics fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-[32px] h-[32px] flex items-center justify-center bg-azul rounded-full hover-reduce-opacity"
      >
        {/* Aquí puedes usar el <svg> directamente o importar un ícono */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10 13.375C13.3137 13.375 16 10.6887 16 7.375C16 4.06129 13.3137 1.375 10 1.375C6.68629 1.375 4 4.06129 4 7.375C4 10.6887 6.68629 13.375 10 13.375Z"
            stroke="#E1E4EB"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 18.625C2.81594 15.4872 6.11406 13.375 10 13.375C13.8859 13.375 17.1841 15.4872 19 18.625"
            stroke="#E1E4EB"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 right-[10px] top-[37px] bg-white shadow-md rounded-md w-60  p-4 space-y-2">
          <ul className="space-y-1">
            {user?.collaborators.map((collab) => (
              <li key={collab.id}>
                <button
                  onClick={() => handleSelect(collab.id)}
                  className={`w-full text-left px-3 py-1 rounded hover:bg-gray-100 ${
                    collaboratorId === collab.id ? "font-bold text-azul" : ""
                  }`}
                >
                  {collab.name}
                </button>
              </li>
            ))}
          </ul>
          <hr />
          <button
            onClick={handleLogout}
            className="w-full text-left text-gray-500 px-3 py-1 hover:text-black hover:bg-gray-100 rounded flex items-center gap-2"
          >
            <span>×</span> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
