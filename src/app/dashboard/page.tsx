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
    <div className="grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[1fr_3fr] h-full gap-4">

      <div className="p-4 rounded-xl bg-gradient-to-b from-[#ececec] dark:from-[#2D2D2D] dark:to-[#2D2D2D] to-[#eba77a]">
        <SideDashboard obrasT={obras} />
      </div>

      <div className="rounded-xl overflow-hidden h-64 md:h-auto">
        <CustomMap obrasT={queryResult} />
      </div>
    </div>

  );
}

export default Page;
