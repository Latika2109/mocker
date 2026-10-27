"use client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/how", label: "How it Works?" },
];

function Header() {
  const path = usePathname();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Link href="/dashboard">
        <Image src="/logo.svg" width={160} height={100} alt="logo" />
      </Link>
      <ul className="hidden md:flex gap-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-primary hover:font-bold transition-all ${path === href ? "text-primary font-bold" : ""}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
