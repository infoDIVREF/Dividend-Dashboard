"use client";
import React from "react";
import DividendLogo from "@/../public/images/DividendLogo.png";
import Image from "next/image";
import Link from "next/link";
import UserDropdown from "./UserDropdown/UserDropdown";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const hideElements =
    pathname === "/login" || pathname === "/select-collaborator";

  return (
    <div className="h-20 w-full bg-blanco-roto flex flex-row justify-between items-center py-4 px-8 z-10 fixed">
      <div className="flex flex-row items-center">
        <Image src={DividendLogo} alt="Dividend-logo" />
        {!hideElements && (
          <div className="flex flex-row gap-[35px] ml-6">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/documentacion">Documentación</Link>
            <Link href="/facturas">Facturas</Link>
          </div>
        )}
      </div>
      {!hideElements && <UserDropdown />}
    </div>
  );
}
