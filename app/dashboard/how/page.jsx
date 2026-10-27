const steps = [
  "Add the job role, tech stack and your years of experience.",
  "AI generates a set of interview questions for that role.",
  "Enable your webcam and microphone, then answer each question out loud.",
  "Get a rating and improvement tips for every answer, plus your overall score.",
];

export default function HowItWorks() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">How it Works?</h2>
      <ol className="mt-5 list-decimal list-inside space-y-2 text-gray-600">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
