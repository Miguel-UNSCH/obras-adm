'use client'

import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { IoSettings, IoNotifications } from "react-icons/io5";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { usePathname } from "next/navigation";

function SidebarOptions() {

  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-6 items-center">
      <Link href={'/dashboard'} 
        className={` p-2 rounded-full ${
          pathname === '/dashboard'? 'bg-[#CDCDCD] dark:bg-[#40404B] dark:text-white' : 'text-[#030303] dark:text-[#8E8EA8]'
        }`}
      >
        <GoHomeFill className="text-xl dark:hover:text-white" />
      </Link>
      <Link href={'/dashboard/obras'} 
        className={` p-2 rounded-full ${
          pathname === '/dashboard/obras'? 'bg-[#CDCDCD] dark:bg-[#40404B] dark:text-white' : 'text-[#030303] dark:text-[#8E8EA8]'
        }`}
      >
        <BsDatabaseFillCheck className="text-xl dark:hover:text-white" />
      </Link>
      <Link href={'/dashboard/notificaciones'} 
        className={` p-2 rounded-full ${
          pathname === '/dashboard/notificaciones'? 'bg-[#CDCDCD] dark:bg-[#40404B] dark:text-white' : 'text-[#030303] dark:text-[#8E8EA8]'
        }`}
      >
        <IoNotifications className="text-xl dark:hover:text-white" />
      </Link>
      <Link href={'/dashboard/configuraciones'} 
        className={` p-2 rounded-full ${
          pathname === '/dashboard/configuraciones'? 'bg-[#CDCDCD] dark:bg-[#40404B] dark:text-white' : 'text-[#030303] dark:text-[#8E8EA8]'
        }`}
      >
        <IoSettings className="text-xl dark:hover:text-white" />
      </Link>
    </div>
  )
}

export default SidebarOptions;