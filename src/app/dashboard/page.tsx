import CustomMap from "@/components/views/custom-map";
import SideDashboard from "@/components/views/side-dashboard";

function Page() {
  return (
    <div className="h-full w-full  flex flex-col md:flex-row gap-4">
      <div className="p-4 rounded-xl bg-gradient-to-b from-[#FFCEB7] dark:from-emerald-700 dark:to-orange-900 to-[#E3D8D6]">
        <SideDashboard />
      </div>
      <div className="flex-1 rounded-xl overflow-hidden">
        <CustomMap />
      </div>
    </div>
  );
}

export default Page;
