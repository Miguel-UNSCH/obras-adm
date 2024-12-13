"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import toasterCustom from "@/components/toaster-custom";
import { updateUser } from "@/actions/user-actions";
import { updateUserSchema } from "@/utils/zod/schemas";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { signOut } from "next-auth/react";

type Session = {
  user: {
    name: string;
    email: string;
    id: string;
    user: string;
  };
  expires: string;
};

type CuentaContainerProps = {
  session: Session;
};

export function CuentaContainer({ session }: CuentaContainerProps) {

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmNewPassword = () => setShowConfirmNewPassword(!showConfirmNewPassword);

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email || "",
      user: session.user.user,
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof updateUserSchema>) {

    toasterCustom(0);

    const data = await updateUser(values);

    if (!data) {
      toasterCustom(500, "Ocurrió un error inesperado");
      return;
    }

    if (data.status === 200) {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      setIsSubmitting(false);
      router.refresh();
      setTimeout(() => {
        signOut({ callbackUrl: "/" });
      }, 2000);
    } else {
      toast.dismiss();
      toasterCustom(data.status, data.message);
      if (data.field) {
        form.setError(data.field === 1 ? "password" : "confirmNewPassword", { type: "error", message: data.message });
        form.setFocus(data.field === 1 ? "password" : "confirmNewPassword");
      }
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4 w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Mi Cuenta</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre:</FormLabel>
              <FormControl>
                <Input placeholder="Administrador" {...field} disabled />
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
                <Input placeholder="admin@admin.com" {...field} disabled />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario:</FormLabel>
              <FormControl>
                <Input placeholder="Admin" {...field} disabled />
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="****************" {...field} disabled={isSubmitting} />
                  <button type="button" onClick={toggleShowPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showNewPassword ? "text" : "password"} placeholder="****************" {...field} disabled={isSubmitting} />
                  <button type="button" onClick={toggleShowNewPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Nueva Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showConfirmNewPassword ? "text" : "password"} placeholder="****************" {...field} disabled={isSubmitting} />
                  <button type="button" onClick={toggleShowConfirmNewPassword} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-end" />
            </FormItem>
          )}
        />

        <div className="flex justify-center py-3">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Actualizando..." : "Actualizar Datos"}
          </Button>
        </div>

      </form>
    </Form>
  );
}

export default CuentaContainer;
