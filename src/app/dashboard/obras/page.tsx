import CalendarCustom from "@/components/views/calendar-custom";
import MapCustom from "@/components/views/map-custom";


function Page() {


  return (
    <div className="h-full grid gap-4 grid-cols-1 md:grid-cols-2 md:grid-rows-2">
      <div className="bg-gradient-to-tr from-[#FFCEB7] dark:from-emerald-800 dark:to-orange-950 to-[#E3D8D6] rounded-3xl shadow-xl">
        <CalendarCustom />
      </div>
      <div className="rounded-3xl bg-secondary p-4">
        
      </div>
      <div className="rounded-3xl overflow-hidden">
        <MapCustom />
      </div>
      <div className="rounded-3xl bg-secondary p-4"></div>
    </div>
  )
}

export default Page;
