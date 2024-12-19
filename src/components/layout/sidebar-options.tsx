'use client'

import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { IoSettings, IoNotifications } from "react-icons/io5";
import { BsDatabaseFillCheck } from "react-icons/bs";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SidebarOptions() {
  const pathname = usePathname();

  const links = [
    {
      href: "/dashboard",
      icon: <GoHomeFill className="text-xl" />,
      tooltip: "Inicio",
    },
    {
      href: "/dashboard/obras",
      icon: <BsDatabaseFillCheck className="text-xl" />,
      tooltip: "Obras",
    },
    {
      href: "/dashboard/notificaciones",
      icon: <IoNotifications className="text-xl" />,
      tooltip: "Notificaciones",
    },
    {
      href: "/dashboard/configuraciones",
      icon: <IoSettings className="text-xl" />,
      tooltip: "Configuraciones",
    },
  ];

  return (
    <div className="flex flex-col gap-6 items-center">
      <TooltipProvider>
        {links.map(({ href, icon, tooltip }) => (
          <Tooltip key={href}>
            <Link
              href={href}
              className={`relative p-2 rounded-full ${
                pathname === href
                  ? "bg-[#CDCDCD] dark:bg-[#40404B] text-[#030303] dark:text-white"
                  : "text-[#030303] dark:text-[#8E8EA8] "
              } hover:text-[#8E8EA8] dark:hover:text-white`}
            >
              <TooltipTrigger className="absolute top-0 left-0 w-full h-full" />
              {icon}
            </Link>
            <TooltipContent className="absolute left-5 bg-primary">
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}

export default SidebarOptions;
