"use client";
import SignIn from "@/components/sign-in";
import { signInSchema } from "@/utils/zod/schemas";
import { useState, useEffect } from "react";
import { z } from "zod";
import { loginAction } from "@/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type ApiResponse = {
  message?: string;
  status?: number;
  success?: boolean;
};

function LoginContainer() {
  const { status } = useSession();
  const [resApi, setResApi] = useState<ApiResponse | undefined>(undefined);
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/dashboard");

  // Obtener el callbackUrl solo en el cliente
  useEffect(() => {
    const callbackUrlParam = new URLSearchParams(window.location.search).get("callbackUrl");
    setCallbackUrl(callbackUrlParam === "/" ? "/dashboard" : callbackUrlParam || "/dashboard");
  }, []);

  // Si ya hay sesión activa, redirigir al usuario automáticamente
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const res = await loginAction(values);
    console.log(res);
    setResApi(res);

    // Verifica si la respuesta es exitosa y redirige
    if (res.success) {
      setResApi({ status: 200, message: "Login correcto, redirigiendo ..." });
      // Esperar un breve tiempo para asegurar que las cookies se guarden
      setTimeout(() => {
        router.push(callbackUrl);
      }, 1000); // Ajusta el tiempo según lo que consideres apropiado
    }
  };

  // Evita mostrar el formulario de login si ya hay una sesión
  if (status === "authenticated") {
    return (
      <div className="flex-col gap-4 w-full h-screen flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return <SignIn onSubmit={onSubmit} serverError={resApi?.message} status={resApi?.status} />;
}

export default LoginContainer;