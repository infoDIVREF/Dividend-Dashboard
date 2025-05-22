"use client";
import Link from "next/link";
import UserDropdown from "../UserDropdown/UserDropdown";
import { usePathname } from "next/navigation";
import { DividendLogo } from "@/app/components/NavBar/Logos/DividendLogo"

export default function NavBar() {
  const pathname = usePathname();

  const hideElements =
    pathname === "/login" || pathname === "/select-collaborator";

  return (
    <div className="h-20 w-full bg-blanco-roto flex flex-row justify-between items-center py-4 px-8 z-20 fixed">
      <div className="flex flex-row items-center gap-24">
        <DividendLogo height={45} width={130} />
        {!hideElements && (
          <div className="flex flex-row gap-[35px]">
            <Link
              href="/dashboard"
              className={`${
                pathname === "/dashboard" ? "text-[#234a76] font-bold" : "text-black"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/documentacion"
              className={`${
                pathname === "/documentacion" ? "text-[#234a76] font-bold" : "text-black"
              }`}
            >
              Documentación
            </Link>
            <Link
              href="/facturas"
              className={`${
                pathname === "/facturas" ? "text-[#234a76] font-bold" : "text-black"
              }`}
            >
              Facturas
            </Link>
          </div>
        )}
      </div>
      {!hideElements && <UserDropdown />}
    </div>
  );
}
