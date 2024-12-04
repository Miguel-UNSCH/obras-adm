import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function SideDashboard() {
  return (
    <div className="flex flex-col gap-4 h-full w-full">
      <div>
        <span>Obras</span>
      </div>
      <div className="flex flex-col gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="directa">Obras de administración directa</SelectItem>
            <SelectItem value="contrata">Obras de administración por contrata</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Buscar..." />
        <Button>
          Buscar
        </Button>
      </div>
      <div className="flex md:flex-col gap-4 overflow-auto ">
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
        <div className="bg-secondary p-2 rounded-lg space-y-2">
          <h1 className="text-center font-semibold">
            Obra N° 01
          </h1>
          <p className="text-secondary-foreground text-sm">
            descripcion de la Obra
          </p>
          <span className="text-sm text-gray-400">
            Nombre residente
          </span>
        </div>
      </div>
    </div>
  );
}

export default SideDashboard;