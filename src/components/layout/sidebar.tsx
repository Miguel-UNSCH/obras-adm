import Image from "next/image";
import { ModeChange } from "../mode-change";
import Link from "next/link";
import SidebarOptions from "./sidebar-options";

function Sidebar() {
  return (
    <div className="flex flex-col justify-between items-center px-3 py-4 h-full border-r bg-card">
      <Link href={'/dashboard'}>
        <Image 
          src='/logos/inicio_claro.png' 
          alt="logo" 
          width={40} 
          height={100} 
          className="cursor-pointer dark:hidden"
        />
        <Image 
          src='/logos/inicio_oscuro.png' 
          alt="logo" 
          width={40} 
          height={100} 
          className="cursor-pointer hidden dark:block" 
        />
      </Link>
      <SidebarOptions />
      <div className="space-y-4">
        <ModeChange />
        <Image 
          src='/user.png' 
          alt="user" 
          width={40} 
          height={40} 
          className="border-2 border-primary rounded-full cursor-pointer bg-white"
        />
      </div>
    </div>
  )
}

export default Sidebar;
