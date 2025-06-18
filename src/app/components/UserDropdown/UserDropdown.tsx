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
    <div className="" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-[46px] h-[46px] flex items-center justify-center"
      >
        {/* Aquí puedes usar el <svg> directamente o importar un ícono */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 46 46"
          fill="none"
        >
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M39.3449 39.3449H36.9491V33.3553C36.9472 31.7674 36.3155 30.245 35.1927 29.1221C34.0698 27.9993 32.5475 27.3676 30.9595 27.3657V24.9699C33.1827 24.9724 35.3141 25.8567 36.8861 27.4287C38.4581 29.0007 39.3424 31.1321 39.3449 33.3553V39.3449ZM29.7616 39.3449H27.3658V33.3553C27.3639 31.7674 26.7322 30.245 25.6093 29.1221C24.4865 27.9993 22.9641 27.3676 21.3762 27.3657H14.1887C12.6007 27.3676 11.0783 27.9993 9.9555 29.1221C8.83264 30.245 8.20099 31.7674 8.19909 33.3553V39.3449H5.80325V33.3553C5.80579 31.1321 6.69007 29.0007 8.26209 27.4287C9.83411 25.8567 11.9655 24.9724 14.1887 24.9699H21.3762C23.5993 24.9724 25.7307 25.8567 27.3028 27.4287C28.8748 29.0007 29.7591 31.1321 29.7616 33.3553V39.3449ZM27.3658 5.80322V8.19906C28.9543 8.19906 30.4778 8.8301 31.601 9.95336C32.7243 11.0766 33.3553 12.6001 33.3553 14.1886C33.3553 15.7772 32.7243 17.3007 31.601 18.4239C30.4778 19.5472 28.9543 20.1782 27.3658 20.1782V22.5741C29.5897 22.5741 31.7226 21.6906 33.2951 20.118C34.8677 18.5455 35.7512 16.4126 35.7512 14.1886C35.7512 11.9647 34.8677 9.83183 33.2951 8.25925C31.7226 6.68668 29.5897 5.80322 27.3658 5.80322ZM17.7824 8.19906C18.967 8.19906 20.1251 8.55034 21.1101 9.20848C22.095 9.86663 22.8627 10.8021 23.3161 11.8965C23.7694 12.991 23.888 14.1953 23.6569 15.3571C23.4258 16.519 22.8554 17.5863 22.0177 18.4239C21.18 19.2616 20.1128 19.832 18.9509 20.0631C17.7891 20.2942 16.5848 20.1756 15.4903 19.7223C14.3959 19.269 13.4604 18.5013 12.8023 17.5163C12.1441 16.5313 11.7928 15.3733 11.7928 14.1886C11.7928 12.6001 12.4239 11.0766 13.5471 9.95336C14.6704 8.8301 16.1939 8.19906 17.7824 8.19906ZM17.7824 5.80322C16.1239 5.80322 14.5027 6.29502 13.1237 7.21642C11.7448 8.13782 10.67 9.44745 10.0353 10.9797C9.40063 12.5119 9.23457 14.1979 9.55813 15.8246C9.88168 17.4512 10.6803 18.9453 11.853 20.118C13.0258 21.2907 14.5199 22.0894 16.1465 22.4129C17.7731 22.7365 19.4591 22.5704 20.9914 21.9358C22.5236 21.3011 23.8332 20.2263 24.7546 18.8473C25.676 17.4684 26.1678 15.8471 26.1678 14.1886C26.1678 11.9647 25.2844 9.83183 23.7118 8.25925C22.1392 6.68668 20.0064 5.80322 17.7824 5.80322Z"
            fill="#2A2A2A"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 right-[54px] top-[67px] bg-white shadow-md rounded-md w-60  p-4 space-y-2">
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
