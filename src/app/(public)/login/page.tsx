"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface LoginFormInputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.status === "success") {
      login(result.token, result.user);
      router.push("/select-collaborator");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-[#F9FAFB] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-md bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl font-bold text-azul-oscuro">Iniciar sesión</h1>
        <input
          {...register("email")}
          placeholder="Email"
          className="border w-full p-2 rounded"
        />
        <input
          {...register("password")}
          placeholder="Contraseña"
          type="password"
          className="border w-full p-2 rounded"
        />
        <button
          type="submit"
          className="bg-gris text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
