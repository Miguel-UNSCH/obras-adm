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
    <div className="flex flex-col sm:flex-row h-full w-full gap-4">

      <div className="overflow-y-auto p-4 h-full w-fit rounded-xl bg-gradient-to-b from-[#ececec] dark:from-[#2D2D2D] dark:to-[#2D2D2D] to-[#eba77a]">
        <SideDashboard obrasT={obras} />
      </div>

      <div className="rounded-xl overflow-hidden h-full w-full">
        <CustomMap obrasT={queryResult} />
      </div>
    </div>

  );
}

export default Page;
