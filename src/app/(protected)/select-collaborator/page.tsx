"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function SelectCollaborator() {
  const { user, setCollaborator } = useAuth();
  const router = useRouter();

  const handleSelect = (id: string) => {
    setCollaborator(id);
    localStorage.setItem("collaboratorId", id);
    router.push("/"); // o la ruta principal
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Selecciona un colaborador</h2>
      <ul className="space-y-2">
        {user?.collaborators.map((collab) => (
          <li key={collab.id}>
            <button
              onClick={() => handleSelect(collab.id)}
              className="w-full bg-gray-100 hover:bg-gray-200 p-2 rounded text-left"
            >
              {collab.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
