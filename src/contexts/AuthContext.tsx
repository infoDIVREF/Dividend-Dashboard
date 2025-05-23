"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Collaborator {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  roles: string[];
  collaborators: Collaborator[];
}

interface AuthContextProps {
  token: string | null;
  user: User | null;
  collaboratorId: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  setCollaborator: (id: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [collaboratorId, setCollaboratorId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedCollaboratorId = localStorage.getItem("collaboratorId");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setCollaboratorId(storedCollaboratorId);
    }

    setLoading(false);
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    setCollaboratorId(null);
  };

  const setCollaborator = (id: string) => {
    localStorage.setItem("collaboratorId", id);
    setCollaboratorId(id);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        collaboratorId,
        login,
        logout,
        setCollaborator,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
