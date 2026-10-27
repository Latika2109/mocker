import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";

const perks = [
  "Questions tailored to your role",
  "Answer out loud, like the real thing",
  "Instant ratings and feedback",
];

function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-blue-700 p-12 text-white lg:flex">
        <div className="absolute -right-24 -top-24 size-72 rounded-full bg-white/10 blur-3xl" />
        <Link href="/" className="relative flex items-center gap-2 text-lg font-semibold">
          <Sparkles className="size-5" /> Mock AI Interviewer
        </Link>
        <div className="relative">
          <h2 className="text-4xl font-bold leading-tight">Practice today. Interview with confidence tomorrow.</h2>
          <ul className="mt-8 space-y-3 text-blue-100">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 shrink-0" /> {perk}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-blue-200">Powered by Google Gemini</p>
      </aside>
      <main className="flex items-center justify-center p-8">{children}</main>
    </div>
  );
}

export default AuthLayout;
