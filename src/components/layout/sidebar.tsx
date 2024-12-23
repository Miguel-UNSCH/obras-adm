import Image from "next/image";
import { ModeChange } from "../mode-change";
import Link from "next/link";
import SidebarOptions from "./sidebar-options";
import AvatarUser from "./avatar-user";

function Sidebar() {
  return (
    <div className="flex flex-col justify-between items-center px-3 py-4 h-full border-r bg-card">
      <Link href={'/dashboard'}>
        <Image 
          src='/logos/barra_claro.png' 
          alt="logo_claro" 
          width={40} 
          height={100} 
          className="cursor-pointer dark:hidden"
        />
        <Image 
          src='/logos/barra_oscuro.png' 
          alt="logo_oscuro1" 
          width={40} 
          height={100} 
          className="cursor-pointer hidden dark:block" 
        />
      </Link>
      <SidebarOptions />
      <div className="space-y-4">
        <ModeChange />
        <AvatarUser />
      </div>
    </div>
  )
}

export default Sidebar;
