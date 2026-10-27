import { auth } from "@clerk/nextjs/server";
import Navbar from "./_components/landing/Navbar";
import Hero from "./_components/landing/Hero";
import Features from "./_components/landing/Features";
import HowItWorks from "./_components/landing/HowItWorks";
import CtaFooter from "./_components/landing/CtaFooter";

export default async function Home() {
  const { userId } = await auth();
  const cta = userId
    ? { href: "/dashboard", label: "Go to Dashboard" }
    : { href: "/sign-up", label: "Get started free" };

  return (
    <main>
      <Navbar signedIn={!!userId} />
      <Hero cta={cta} />
      <Features />
      <HowItWorks />
      <CtaFooter cta={cta} />
    </main>
  );
}
