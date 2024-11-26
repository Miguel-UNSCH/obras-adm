import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { IoSettings, IoNotifications } from "react-icons/io5";
import { BsDatabaseFillCheck } from "react-icons/bs";


function SidebarOptions() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <Link href={'/dashboard'} className="bg-[#CDCDCD] dark:bg-[#40404B] p-2 rounded-full dark:text-white">
        <GoHomeFill className="text-xl dark:text-white" />
      </Link>
      <Link href={'/dashboard/obras'}>
        <BsDatabaseFillCheck className="text-xl text-[#030303] dark:text-[#8E8EA8]" />
      </Link>
      <Link href={'/dashboard'}>
        <IoNotifications className="text-xl text-[#030303] dark:text-[#8E8EA8]" />
      </Link>
      <Link href={'/dashboard'}>
        <IoSettings className="text-xl text-[#030303] dark:text-[#8E8EA8]" />
      </Link>
    </div>
  )
}

export default SidebarOptions;
