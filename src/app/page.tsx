// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function RootRedirect() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (token) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [token, loading]);

  return <p className="text-center mt-10">Redirigiendo...</p>;
}
