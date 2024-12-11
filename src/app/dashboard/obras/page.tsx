import { getProyectos } from "@/actions/obras-actions";
import ObrasContainer from "./obras-container";

async function Page() {
  const proyectos = await getProyectos();
  
  const options = proyectos.map((proyecto) => ({
    value: proyecto.nombre,
    label: proyecto.nombre,
  }));

  return (
    <div className="gap-4">
      <ObrasContainer options={options} />
    </div>
  );
}

export default Page;
