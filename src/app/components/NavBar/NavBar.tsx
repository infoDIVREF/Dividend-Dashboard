"use client";
import Link from "next/link";
import UserDropdown from "../UserDropdown/UserDropdown";
import { usePathname } from "next/navigation";
import { DividendLogo } from "@/app/components/NavBar/Logos/DividendLogo";
import { useScroll } from "@/contexts/ScrollContext";
// No longer need useState or useEffect here

export default function NavBar() {
  const pathname = usePathname();
  // 1. Destructure the new state directly from the context
  const { isNavBarVisible } = useScroll();

  // The local state and useEffect for scroll tracking are GONE!

  const hideElements =
    pathname === "/login" || pathname === "/select-collaborator";

  return (
    <div
      className={`
        h-20 w-full bg-blanco-roto flex flex-row justify-between items-center py-4 px-8 pr-[54px] 
        z-20 fixed
        transition-transform duration-300 ease-in-out
        ${isNavBarVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {/*  // Note: We removed opacity for simplicity, but you can add it back:
      // transition-opacity
      // ${isNavBarVisible ? "opacity-100" : "opacity-0 pointer-events-none"} */}

      <div className="flex flex-row items-center gap-24">
        <Link href="/dashboard">
          <DividendLogo height={45} width={130} />
        </Link>
        {!hideElements && (
          <div className="flex flex-row gap-[35px]">
            <Link
              href="/dashboard"
              className={`hover-reduce-opacity ${
                pathname === "/dashboard"
                  ? "text-[#4e84a6] font-bold"
                  : "text-black"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/documentacion"
              className={`hover-reduce-opacity ${
                pathname === "/documentacion"
                  ? "text-[#4e84a6] font-bold"
                  : "text-black"
              }`}
            >
              Documentación
            </Link>
            <Link
              href="/facturas"
              className={`hover-reduce-opacity ${
                pathname === "/facturas"
                  ? "text-[#4e84a6] font-bold"
                  : "text-black"
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
