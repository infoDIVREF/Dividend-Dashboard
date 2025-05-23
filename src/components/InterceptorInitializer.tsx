"use client";

import { useAxiosInterceptor } from "@/hooks/useAxiosInterceptor";

export function InterceptorInitializer() {
  useAxiosInterceptor();
  return null;
}
