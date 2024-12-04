"use client";

import { FormProvider, useForm, Controller } from "react-hook-form"; // Usar FormProvider para envolver el formulario
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  role: string;
};

export function CuentaContainer({ session }: CuentaContainerProps) {
  // Inicializa el formulario con useForm
  const form = useForm<FormData>({
    defaultValues: {
      name: session.name,
      email: session.email,
      role: session.role,
    },
  });

  // onSubmit para manejar el envío del formulario
  const onSubmit = async (data: FormData) => {
    console.log("Datos enviados:", data);
    // Aquí puedes hacer la lógica de actualización de datos o envío a la API
  };

  return (
    <FormProvider {...form}> {/* FormProvider para pasar el contexto de useForm a los campos */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre:</FormLabel>
              <FormControl>
                <Input placeholder="Administrador" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico:</FormLabel>
              <FormControl>
                <Input placeholder="admin@admin.com" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario:</FormLabel>
              <FormControl>
                <Input placeholder="Admin" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario:</FormLabel>
              <FormControl>
                <Input placeholder="Admin" {...field} />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <div className="flex justify-center py-3">
          <Button type="submit">Actualizar</Button>
        </div>
      </form>
    </FormProvider>
  );
}

export default CuentaContainer;
