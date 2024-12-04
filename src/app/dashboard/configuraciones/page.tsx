import CuentaContainer from "./cuenta-container";

async function Page() {

  const formattedSession = {
      name: "Nombre",
      email: "correo@gmail.com",
      role: "usuario",
  };


  return (
    <div className="w-full h-full flex items-center justify-center">
      <CuentaContainer session={formattedSession} />
    </div>
  );
}

export default Page;