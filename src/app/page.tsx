
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { ModeChange } from "@/components/mode-change";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-bgColor min-h-screen flex flex-col">
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-row mr-2">
            <Image
              src='/logos/inicio_claro.png'
              alt="logo"
              width={300}
              height={200}
              className="cursor-pointer dark:hidden"
            />
            <Image
              src='/logos/inicio_oscuro.png'
              alt="logo"
              width={300}
              height={200}
              className="cursor-pointer hidden dark:block"
            />
          </div>
        </div>
        <ModeChange />
      </nav>
      <main className="container mx-auto px-4 flex-1 flex flex-col gap-5 md:flex-row items-center justify-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-5xl font-bold text-foreground leading-tight mb-6">
            ¡Bienvenido a{" "}
            <span className="inline-block text-green-500">
              SysInv
            </span>!
            <br />
            <span className="relative">Tu Asistente para la Gestión</span>
            <br />
            de Geolocalización que
            <br />
            <span className="text-white bg-green-400 rounded-sm inline-block">Simplifica</span> tu Trabajo
          </h1>
          <p className="text-lg text-card-foreground mb-8">
            Te ofrecemos una solución eficiente para gestionar. Organiza tus productos de manera sencilla.
            <span className="text-orange-500 font-semibold"> ¡Empieza a mejorar tu flujo de trabajo hoy mismo!</span>
          </p>
          <div className="flex space-x-4">
            <Link href={'/dashboard'} className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 flex items-center">
              Iniciar sesión
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            {/* <button className="border border-green-500 text-green-500 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors duration-300 flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2-13v6l5-3-5-3z" />
              </svg>
              Tutorial de uso
            </button> */}
          </div>
        </div>
        <div className="md:w-1/2 relative hidden sm:block dark:hidden">
          <Image
            src="/imagenes/image_3_claro.png"
            width={800}
            height={400}
            alt="Dashboard Preview"
            className="w-full h-auto rounded-lg shadow-xl drop-shadow-lg"
          />
          <Image
            src="/imagenes/image_1_claro.png"
            width={800}
            height={400}
            alt="Card Preview"
            className="absolute top-1/4 left-8 w-48 h-auto transform -rotate-12 rounded-lg shadow-xl drop-shadow-lg"
          />
          <Image
            src="/imagenes/image_2_claro.png"
            width={800}
            height={400}
            alt="Stats Preview"
            className="absolute bottom-1/4 -right-10 w-96 h-auto transform rotate-12 rounded-lg shadow-xl drop-shadow-lg"
          />
        </div>
        <div className="md:w-1/2 relative hidden dark:sm:block">
          <Image
            src="/images/image_1_dark.png"
            width={800}
            height={400}
            alt="Dashboard Preview"
            className="w-full h-auto rounded-lg shadow-xl drop-shadow-lg"
          />
          <Image
            src="/images/image_3_dark.png"
            width={800}
            height={400}
            alt="Card Preview"
            className="absolute top-1/4 left-8 w-48 h-auto transform -rotate-12 rounded-lg shadow-xl drop-shadow-lg"
          />
          <Image
            src="/images/image_2_dark.png"
            width={800}
            height={400}
            alt="Stats Preview"
            className="absolute bottom-1/4 -right-10 w-96 h-auto transform rotate-12 rounded-lg shadow-xl drop-shadow-lg"
          />
        </div>
      </main>
      <h1 className="text-center">
        © 2024 Oficina de Tecnologías de la Información y Comunicaciones. Todos los derechos reservados.
        Aldahir knd UG
      </h1>
    </div>
  );
}

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <h1 className="font-bold text-2xl capitalize">hello peter</h1>
//       <Link href={'/dashboard'} className="bg-primary py-2 px-4 rounded-lg">Ingresar</Link>
//     </div>
//   );
// }
