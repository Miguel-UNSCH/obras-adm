"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
};

export function CuentaContainer({ session }: CuentaContainerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: session.name,
      email: session.email,
      user: "", // Puedes asignar un valor inicial si es necesario
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("Datos enviados:", data);
      // Aquí puedes realizar la lógica de actualización con una API u otra acción.
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4">Mi Cuenta</h2>

      {/* Nombre */}
      <FormItem>
        <FormLabel>Nombre</FormLabel>
        <FormControl>
          <Input
            placeholder="Ingresa tu nombre"
            {...register("name", { required: "El nombre es obligatorio" })}
            disabled
          />
        </FormControl>
        {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
      </FormItem>

      {/* Correo Electrónico */}
      <FormItem>
        <FormLabel>Correo Electrónico</FormLabel>
        <FormControl>
          <Input
            placeholder="Ingresa tu correo electrónico"
            {...register("email", { required: "El correo es obligatorio" })}
            disabled
          />
        </FormControl>
        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
      </FormItem>

      {/* Usuario */}
      <FormItem>
        <FormLabel>Usuario</FormLabel>
        <FormControl>
          <Input
            placeholder="Ingresa tu usuario"
            {...register("user", { required: "El usuario es obligatorio" })}
          />
        </FormControl>
        {errors.user && <FormMessage>{errors.user.message}</FormMessage>}
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
