"use client"


import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useMediaQuery } from 'react-responsive';
import { navLinks } from "@/lib/constants";
import UserButton from "../shared/UserButton";

const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery({ maxWidth: 768 }); // 768px is typically the breakpoint for mobile screens

  useEffect(() => {
    if (!isMobile) {
      setDropdownMenu(false);
    }
  }, [isMobile]);

  return (
    <div className="sticky top-0 left-0 z-20 w-full flex justify-between items-center px-8 py-4  shadow-xl lg:hidden bg-white">
      <Image src="/logo2.jpg" priority alt="logo" width={50} height={50} />

      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${ pathname === link.url ? "text-blue-600" : "text-grey-400"}`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="relative flex gap-4 items-center">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className={`flex gap-4 text-body-medium ${ pathname === link.url ? "text-blue-600" : "text-grey-400"} `}
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;