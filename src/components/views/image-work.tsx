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
      <div className='flex flex-col items-center text-center text-cyan-900 dark:text-teal-400 font-semibold'>
        <Image
          src='/imagenes/not_image.png'
          alt="NotImage"
          width={300}
          height={200}
        />
      </div>)
  }

  return (
    <div className="h-0 grid grid-cols-1 md:grid-cols-2 gap-2">
      {
        imgs &&
        imgs.map((img, i) => (
          <div key={i} className="h-60 w-full bg-red-200 rounded-lg overflow-hidden shadow-md">
            <img src={img.url || ''} alt={img.id} className="w-full h-full object-cover" />
          </div>
        ))
      }
    </div>
  );
};

export default ImageWork;

