import { getObras } from "@/actions/obras-actions";
import CustomMap from "@/components/views/custom-map";
import SideDashboard from "@/components/views/side-dashboard";

async function Page() {
  
  const queryResult = await getObras();

  const obras = queryResult.map((row) => ({
    cui: row.cui,
    name: row.name,
    areaOrLength: row.areaOrLength,
    resident: row.resident,
    projectType: row.projectType,
  }));
  
  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-4">
      <div className="p-4 rounded-xl bg-gradient-to-b from-[#ececec] dark:from-[#2D2D2D] dark:to-[#2D2D2D] to-[#eba77a] w-full md:w-1/4">
        <SideDashboard obrasT={obras} />
      </div>
      <div className="flex-1 rounded-xl overflow-hidden">
        <CustomMap obrasT={queryResult}/>
      </div>
    </div>
  );
}

export default Page;
