import { getProyectos } from "@/actions/obras-actions";
import ObrasContainer from "./obras-container";

async function Page() {

  const proyectos = await getProyectos();

  const obras = proyectos.map((proyecto: any) => ({
    nombre: proyecto.nombre,
    codigo_CUI: proyecto.codigo_CUI,
    nombre_completo: proyecto.nombre_completo,
    propietario_id: proyecto.propietario_id
  }));

  return (
    <div className="h-full">
      <ObrasContainer obras={obras} />
    </div>
  );
}

export default Page;
