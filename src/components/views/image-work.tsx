/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

interface Imgs {
  id: string;
  url: string | null;
  latitud: string | null;
  longitud: string | null;
  date: Date | null;
  update: string | null;
}

const ImageWork: React.FC<{ imgs: Imgs[] | null }> = ({ imgs }) => {
  if (!imgs || imgs.length === 0) {
    return (
      <div className="grid grid-cols-1 p-4 gap-4 text-center text-cyan-900 dark:text-teal-400 justify-items-center items-center">
        <p className="text-gray-800 dark:text-gray-400 font-semibold">No se encontraron imágenes</p>
        <Image
          src="/imagenes/not_image.png"
          alt="NotImage"
          width={300}
          height={200}
        />
      </div>

    )
  }

  return (
    <div className="h-0 grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
      {
        imgs &&
        imgs.map((img, i) => (
          <div key={i} className="h-60 w-full bg-red-200 rounded-lg overflow-hidden shadow-md">
            <img src={img.url || ''} alt={img.id} className="w-full h-full object-cover" width={500} height={500} />
          </div>
        ))
      }
    </div>
  );
};

export default ImageWork;

