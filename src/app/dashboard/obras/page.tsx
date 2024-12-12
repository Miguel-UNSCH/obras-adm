import { getProyectos } from "@/actions/obras-actions";
import ObrasContainer from "./obras-container";

async function Page() {

  const proyectos = await getProyectos();

  const obras = proyectos.map((proyecto: any) => ({
    nombre: proyecto.nombre,
    codigo_CUI: proyecto.codigo_CUI,
  }));

  return (
    <div className="gap-4">
      <ObrasContainer obras={obras} />
    </div>
  );
}

export default Page;
