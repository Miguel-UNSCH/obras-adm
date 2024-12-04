"use client";

import { FormProvider, useForm, Controller } from "react-hook-form"; // Usar FormProvider para envolver el formulario
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

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
  contrasenia: string;
  nuevacontrasenia: string;
  confirmarnuevacontrasenia: string; 
};

export function CuentaContainer({ session }: CuentaContainerProps) {
  const form = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const onSubmit = async (data: FormData) => {
    console.log("Datos enviados:", data);
  };

  return (
    <FormProvider {...form}> 
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4 w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Mi Cuenta</h2>

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

        {/* Contraseña */}
        <FormField
          control={form.control}
          name="contrasenia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña:</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="****************" 
                    {...field} 
                  />
                  <button 
                    type="button" 
                    onClick={toggleShowPassword} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />
        
        {/* Nueva Contraseña */}
        <FormField
          control={form.control}
          name="nuevacontrasenia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva Contraseña:</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="****************" 
                    {...field} 
                  />
                  <button 
                    type="button" 
                    onClick={toggleShowNewPassword} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        {/* Confirmar Nueva Contraseña */}
        <FormField
          control={form.control}
          name="confirmarnuevacontrasenia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Nueva Contraseña:</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="****************" 
                    {...field} 
                  />
                  <button 
                    type="button" 
                    onClick={toggleShowConfirmPassword} 
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
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
