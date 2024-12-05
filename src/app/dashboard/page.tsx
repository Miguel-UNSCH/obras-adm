import { getObras } from "@/actions/obras-actions";
import CustomMap from "@/components/views/custom-map";
import SideDashboard from "@/components/views/side-dashboard";

async function Page() {
  
  const queryResult = await getObras();

  const obras = queryResult.map((row) => ({
    id: row.id,
    tipo_proyecto: row.tipo_proyecto,
    abreviatura: row.abreviatura,
    nombre: row.nombre,
    codigo_CUI: row.codigo_CUI,
  }));
  
  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-4">
      <div className="p-4 rounded-xl bg-gradient-to-b from-[#ececec] dark:from-[#2D2D2D] dark:to-[#2D2D2D] to-[#eba77a] w-full md:w-1/6">
        <SideDashboard obrasT={obras} />
      </div>
      <div className="flex-1 rounded-xl overflow-hidden">
        <CustomMap />
      </div>
    </div>
  );
}

export default Page;
