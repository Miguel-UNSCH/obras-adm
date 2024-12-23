import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ModeChange } from "@/components/mode-change-portafolio";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col">
      
      <nav className="absolute w-full container mx-auto px-4 py-6 flex items-center justify-between z-50">
        <div className="flex items-center">
          <Image
            src="/logos/inicio_claro.png"
            alt="Logo claro"
            width={250}
            height={32}
            className="cursor-pointer dark:hidden"
          />
          <Image
            src="/logos/inicio_oscuro.png"
            alt="Logo oscuro"
            width={250}
            height={32}
            className="cursor-pointer hidden dark:block"
          />
        </div>
        <ModeChange />
      </nav>

      <main className="flex-1 container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Bienvenido a <br />
            <span className="text-primary">GeoObras</span>
          </h1>
          <p className="text-lg text-gray-600">
            Tu Asistente para la Gestión de Geolocalización que simplifica tu trabajo.{" "}
            <span className="text-primary font-bold">¡Empieza hoy mismo!</span>
          </p>
          <div className="flex space-x-4">
            <Link
              href="/dashboard"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 flex items-center"
            >
              Iniciar sesión
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/tutorial"
              className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-100 transition-all duration-300 flex items-center"
            >
              Ver tutorial
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <Image
            src="/imagenes/prueba.png"
            width={500}
            height={300}
            alt="Dashboard Preview"
            className="w-full h-auto rounded-lg shadow-lg drop-shadow-lg"
          />
        </div>
      </main>

      <footer className="text-center text-sm py-4 mt-auto border-t border-gray-300">
        © 2024 Oficina de Tecnologías de la Información y Comunicaciones. Todos los derechos reservados.
      </footer>
    </div>
  );
}
