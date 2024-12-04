"use client";

import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import { signOut } from "next-auth/react";
import Link from "next/link";

function AvatarUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="border-2 border-primary rounded-full bg-white">
          <Avatar>
            <AvatarImage src="/user.png" alt="user" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4 mt-2 border absolute bottom-7 left-7">
        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-2 py-2">
          <DropdownMenuItem className="cursor-pointer w-full p-0">
            <Link href={"/dashboard/configuracion"} className="flex p-2">
              <User className="mr-2 h-4 w-4" />
              <span>Cuenta</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full p-0 mb-2">
          <Button onClick={() => signOut({
            callbackUrl: '/'
          })} className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sessión
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarUser;