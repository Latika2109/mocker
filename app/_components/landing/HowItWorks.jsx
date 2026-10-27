const steps = [
  { title: "Describe the role", text: "Enter the job title, tech stack and your years of experience." },
  { title: "Answer the questions", text: "Enable your camera and microphone, then answer each question out loud." },
  { title: "Review your feedback", text: "See your score, a model answer and what to improve for every question." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-16 bg-secondary/60 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How it works</h2>
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map(({ title, text }, i) => (
            <li key={title} className="relative rounded-2xl bg-white p-6 shadow-sm">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-5 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
