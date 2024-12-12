import { getObras } from "@/actions/obras-actions";
import CustomMap from "@/components/views/custom-map";
import SideDashboard from "@/components/views/side-dashboard";

async function Page() {
  
  const queryResult = await getObras();

  const obras = queryResult.map((row) => ({
    tipo_proyecto: row.tipo_proyecto,
    nombre: row.nombre,
    codigo_CUI: row.codigo_CUI,
    propietario_id: row.propietario_id,
    nombre_completo: row.nombre_completo,
  }));

  const obra0 = {
    tipo_proyecto: 'OAD',
    nombre: 'MEJORAMIENTO DEL SISTEMA HIDRAULICO CACHI EN LA REGION AYACUCHO',
    codigo_CUI: '2398491',
    propietario_id: '42062279',
    nombre_completo: 'Fernandez Jeri Carlos',
    coordinates: [
      [-74.222602, -13.149612],
      [-74.217914, -13.150564],
      [-74.214760, -13.148406],
      [-74.215634, -13.146604],
      [-74.218606, -13.145063],
      [-74.221734, -13.142415],
      [-74.222726, -13.140733],
      [-74.222501, -13.139693],
      [-74.222817, -13.138841],
      [-74.222388, -13.137410],
      [-74.222576, -13.137013],
      [-74.223649, -13.136512],
      [-74.223761, -13.139190],
      [-74.224373, -13.139266],
      [-74.224230, -13.140496],
      [-74.226143, -13.141530],
      [-74.224333, -13.144073],
      [-74.224722, -13.144309],
      [-74.224124, -13.145134],
      [-74.223997, -13.146426],
      [-74.224287, -13.146644],
      [-74.222741, -13.148810],
      [-74.222575, -13.149254],
    ],
  };
  
  const obra1 = {
    tipo_proyecto: 'OC',
    nombre: 'MEJORAMIENTO DEL SISTEMA HIDRAULICO CACHI EN LA REGION AYACUCHO',
    codigo_CUI: '2308421',
    propietario_id: '43962289',
    nombre_completo: 'Aldahir Kenedin Ubilluz',
    coordinates: [
      [-74.206840, -13.162083],
      [-74.205835, -13.159642],
      [-74.201010, -13.160051],
      [-74.201484, -13.161868],
      [-74.203057, -13.162084],
    ],
  };
  
  const obra2 = {
    tipo_proyecto: 'SA',
    nombre: 'MEJORAMIENTO DEL SISTEMA HIDRAULICO CACHI EN LA REGION AYACUCHO',
    codigo_CUI: '2318421',
    propietario_id: '43962789',
    nombre_completo: 'Aldahir Kenedin Ubilluz',
    coordinates: [
      [-74.227160657484, -13.158315560785368],
      [-74.22763671949019, -13.160544218402535],
      [-74.22532964976827, -13.161150409767146],
      [-74.2247437272994, -13.158903928365334]
    ],
  };
  
  const obraT = [obra0, obra1, obra2];
  
  return (
    <div className="h-full w-full flex flex-col md:flex-row gap-4">
      <div className="p-4 rounded-xl bg-gradient-to-b from-[#ececec] dark:from-[#2D2D2D] dark:to-[#2D2D2D] to-[#eba77a] w-full md:w-1/4">
        <SideDashboard obrasT={obras} />
      </div>
      <div className="flex-1 rounded-xl overflow-hidden">
        <CustomMap obrasT={obraT}/>
      </div>
    </div>
  );
}

export default Page;
