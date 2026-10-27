import { Lightbulb, Volume2 } from "lucide-react";

function QuestionsSection({ questions, activeIndex, onQuestionClick }) {
  const speak = (text) => {
    if (!("speechSynthesis" in window)) {
      alert("Sorry, your browser does not support text to speech");
      return;
    }
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
  };

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {questions.map((_, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
              activeIndex === index ? "bg-green-600 text-white" : "bg-secondary"
            }`}
            onClick={() => onQuestionClick(index)}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className="my-8 text-md md:text-lg">{questions[activeIndex]?.question}</h2>
      <Volume2 className="cursor-pointer" onClick={() => speak(questions[activeIndex]?.question)} />

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-blue-700">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
      </div>
    </div>
  );
}

export default QuestionsSection;
