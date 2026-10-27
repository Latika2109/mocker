import { History, Mic, Sparkles, Star, Video, Volume2 } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Tailored questions", text: "Questions generated for your exact role, tech stack and years of experience." },
  { icon: Mic, title: "Answer by voice", text: "Speak naturally like in a real interview. Your answer is transcribed for you." },
  { icon: Star, title: "Instant ratings", text: "Every answer gets a score out of 10 and specific tips to improve it." },
  { icon: Volume2, title: "Hear the question", text: "Questions can be read aloud so it feels like talking to an interviewer." },
  { icon: Video, title: "Practice on camera", text: "Turn on your webcam to get comfortable with video interviews." },
  { icon: History, title: "Track your progress", text: "Every session is saved, so you can revisit past feedback any time." },
];

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to prepare</h2>
        <p className="mt-4 text-gray-600">One place to practice, get feedback and improve before the real thing.</p>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-5 font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
