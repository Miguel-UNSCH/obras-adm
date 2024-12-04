"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

type Session = {
  name: string;
  email: string;
  role: string;
};

type CuentaContainerProps = {
  session: Session;
};

type FormData = {
  name: string;
  email: string;
  user: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

export function CuentaContainer({ session }: CuentaContainerProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmNewPassword = () => setShowConfirmNewPassword(!showConfirmNewPassword);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      name: session.name,
      email: session.email,
      user: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Datos enviados:", data);
    // Aquí va la lógica de actualización (por ejemplo, llamada a una API).
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Mi Cuenta</h2>

      {/* Nombre */}
      <FormItem>
        <FormLabel>Nombre</FormLabel>
        <FormControl>
          <Input placeholder="Ingresa tu nombre" {...register("name", { required: "El nombre es obligatorio" })} disabled />
        </FormControl>
        {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
      </FormItem>

      {/* Correo Electrónico */}
      <FormItem>
        <FormLabel>Correo Electrónico</FormLabel>
        <FormControl>
          <Input placeholder="Ingresa tu correo electrónico" {...register("email", { required: "El correo es obligatorio" })} disabled />
        </FormControl>
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </FormItem>

      {/* Usuario */}
      <FormItem>
        <FormLabel>Usuario</FormLabel>
        <FormControl>
          <Input placeholder="Ingresa tu usuario" {...register("user", { required: "El usuario es obligatorio" })} />
        </FormControl>
        {errors.user && <FormMessage>{errors.user.message}</FormMessage>}
      </FormItem>

      {/* Contraseña */}
      <FormItem>
        <FormLabel>Contraseña</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="****************"
              {...register("password")}
            />
            <button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </FormControl>
      </FormItem>

      {/* Nueva Contraseña */}
      <FormItem>
        <FormLabel>Nueva Contraseña</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="****************"
              {...register("newPassword")}
            />
            <button type="button" onClick={toggleShowNewPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </FormControl>
      </FormItem>

      {/* Confirmar Nueva Contraseña */}
      <FormItem>
        <FormLabel>Confirmar Nueva Contraseña</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="****************"
              {...register("confirmNewPassword")}
            />
            <button type="button" onClick={toggleShowConfirmNewPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </FormControl>
      </FormItem>

      {/* Botón de Envío */}
      <div className="flex justify-center py-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Actualizando..." : "Actualizar Datos"}
        </Button>
      </div>
    </form>
  );
}

export default CuentaContainer;
