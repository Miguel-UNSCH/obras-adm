import { getDoc } from "@/actions/obras-actions";
import CuentaContainer from "./cuenta-container";


async function Page() {

  const Doc = await getDoc()
  console.log(Doc)

  const formattedSession = {
      name: "Juan",
      email: "juan@gmail.com",
      role: "usuario",
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <CuentaContainer session={formattedSession} />
    </div>
  );
}

export default Page;