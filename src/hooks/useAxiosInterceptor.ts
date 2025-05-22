// hooks/useAxiosInterceptor.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthContext } from "@/contexts/AuthContext";

export function useAxiosInterceptor() {
  const { token, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // Captura errores 401 en responses
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout(); 
          router.replace("/login");
        }
        return Promise.reject(error);
      }
    );

    // Limpia interceptores al desmontar
    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [token, logout, router]);
}
