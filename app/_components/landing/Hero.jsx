import Link from "next/link";
import { ArrowRight, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const bars = [30, 55, 40, 75, 50, 90, 60, 80, 45, 70, 35, 65, 50, 85, 40, 60, 30, 55];

// Illustrative preview of the interview screen, built with CSS only.
function PreviewCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-sky-300/30 blur-2xl" />
      <div className="rounded-2xl border bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">Question 2 of 5</span>
          <span className="text-gray-400">Sample</span>
        </div>
        <p className="mt-5 font-medium leading-snug text-gray-900">
          Explain the difference between server and client components in React.
        </p>
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-secondary p-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
            <Mic className="size-4" />
          </span>
          <div className="flex h-8 flex-1 items-center gap-[3px]">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-1 animate-pulse rounded-full bg-primary/70"
                style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-green-800">AI feedback</span>
            <span className="rounded-full bg-green-600 px-2.5 py-0.5 text-xs font-bold text-white">8/10</span>
          </div>
          <p className="mt-2 text-sm text-green-900/80">
            Clear explanation of the rendering model. Add a concrete example of when to pick each.
          </p>
        </div>
      </div>
    </div>
  );
}

function Hero({ cta }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs font-medium text-primary shadow-sm">
            <Sparkles className="size-3.5" /> Powered by Google Gemini
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Ace your next interview with{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">AI practice</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
            Tell us the role you want. Get tailored questions, answer out loud on camera, and receive a rating and
            clear feedback on every answer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={cta.href}>
                {cta.label} <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-500">Free to try. No setup, just your browser and a microphone.</p>
        </div>
        <PreviewCard />
      </div>
    </section>
  );
}

export default Hero;
