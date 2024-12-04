'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, OctagonAlert } from 'lucide-react'
import { signInSchema } from '@/utils/zod/schemas'

type SignInFormValues = z.infer<typeof signInSchema>

export default function SignIn({ onSubmit, serverError, status }: { onSubmit: (values: SignInFormValues) => void, serverError?: string, status?: number }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showServerError, setShowServerError] = useState(!!serverError)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleSubmit = async (values: SignInFormValues) => {
    setIsSubmitting(true)
    await onSubmit(values)
    setIsSubmitting(false)
    setShowServerError(true) // Muestra el error del servidor si ocurre
  }

  useEffect(() => {
    const subscription = form.watch(() => {
      if (showServerError) {
        setShowServerError(false)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, showServerError])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className='text-center'>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
        </CardHeader>
        <CardContent>
          {showServerError && (
            <Alert variant={status === 200 ? 'default' : 'destructive'} className="mb-6">
              <AlertDescription 
                className={`flex items-center gap-4 ${status === 200 ? 'text-primary' : ''}`}
              >
                <OctagonAlert />
                <span>{serverError}</span>
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuario o correo</FormLabel>
                    <FormControl>
                      <Input placeholder="juan@juan.com" {...field} />
                    </FormControl>
                    <FormMessage className='text-end'/>
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
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="**************"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                          <span className="sr-only">
                            {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                          </span>
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className='text-end'/>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}