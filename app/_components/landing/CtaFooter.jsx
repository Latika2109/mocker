import Link from "next/link";
import { Button } from "@/components/ui/button";

function CtaFooter({ cta }) {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-blue-700 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready for your next interview?</h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Run your first mock interview in under two minutes.
          </p>
          <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-blue-50">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>
      </section>
      <footer className="border-t py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Mock AI Interviewer
      </footer>
    </>
  );
}

export default CtaFooter;
