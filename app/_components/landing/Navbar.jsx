import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
];

function Navbar({ signedIn }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/">
          <Image src="/logo.svg" width={140} height={40} alt="Mock AI Interviewer" priority />
        </Link>
        <ul className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="transition-colors hover:text-primary">{label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {!signedIn && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">Sign in</Link>
            </Button>
          )}
          <Button asChild size="sm">
            <Link href={signedIn ? "/dashboard" : "/sign-up"}>{signedIn ? "Dashboard" : "Get started"}</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
