interface Imgs {
  id: string;
  url: string | null;
  latitud: string | null;
  longitud: string | null;
  date: Date | null;
}

const ImageWork: React.FC<{ imgs: Imgs[] | null }> = ({ imgs }) => {
  if (!imgs || imgs.length === 0) {
    return <div>No hay imágenes disponibles.</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-8 max-h-[300px] overflow-auto">
      {imgs.map((img) => (
        img.url ? (
          <div key={img.id} className="w-60 h-60 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <img src={img.url} alt={`Imagen de obra ${img.id}`} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div key={img.id} className="w-60 h-60 bg-gray-200 rounded-lg overflow-hidden shadow-md flex justify-center items-center">
            <span>No disponible</span>
          </div>
        )
      ))}
    </div>
  );
};

export default ImageWork;

