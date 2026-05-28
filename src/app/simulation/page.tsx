"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const scenario = {
  title: "EV Connector Selection Challenge",

  description:
    "A customer is designing a compact EV battery management system requiring high reliability under vibration and moisture exposure.",

  requirements: [
    "IP67 environmental sealing",
    "High vibration resistance",
    "Compact packaging",
    "15A current capacity",
    "Automotive reliability",
  ],

  keywords: [
    "sealing",
    "vibration",
    "current",
    "reliable",
    "compact",
    "automotive",
  ],
};

export default function SimulationPage() {

  const [answer, setAnswer] = useState("");

  const [submitted, setSubmitted] = useState(false);

  const [score, setScore] = useState(0);

  const [feedback, setFeedback] = useState("");

  function evaluateAnswer() {

    const lowerAnswer = answer.toLowerCase();

    let matchedKeywords = 0;

    scenario.keywords.forEach((keyword) => {

      if (lowerAnswer.includes(keyword)) {
        matchedKeywords++;
      }

    });

    const calculatedScore = Math.round(
      (matchedKeywords / scenario.keywords.length) * 100
    );

    setScore(calculatedScore);

    if (calculatedScore >= 80) {

      setFeedback(
        "Excellent evaluation. You considered environmental sealing, vibration resistance, electrical performance, and packaging constraints like a real Product Specialist."
      );

    } else if (calculatedScore >= 50) {

      setFeedback(
        "Good approach. However, you missed some important engineering considerations such as sealing, reliability, or packaging constraints."
      );

    } else {

      setFeedback(
        "Your response needs deeper engineering evaluation. Consider reliability, environmental exposure, electrical requirements, and application-specific constraints."
      );

    }

    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-10">
      <Navbar />
      <div className="p-10"> 
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-5xl font-bold mb-4">
            Customer Challenge Mode
          </h1>

          <p className="text-zinc-400 text-lg">
            Real-world Product Specialist simulation environment
          </p>

        </div>

        {/* Scenario Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">

          <h2 className="text-3xl font-bold mb-6">
            {scenario.title}
          </h2>

          <p className="text-zinc-300 leading-8 text-lg mb-8">
            {scenario.description}
          </p>

          <div>

            <h3 className="text-xl font-semibold mb-4">
              Customer Requirements
            </h3>

            <div className="space-y-3">

              {scenario.requirements.map((req, index) => (

                <div
                  key={index}
                  className="bg-black border border-zinc-800 rounded-xl px-4 py-3"
                >

                  {req}

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Response Area */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Your Recommendation
          </h2>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Explain your connector selection approach and engineering considerations..."
            className="w-full h-56 bg-black border border-zinc-800 rounded-2xl p-6 outline-none resize-none text-white leading-8"
          />

          <button
            onClick={evaluateAnswer}
            className="mt-6 bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-zinc-300 transition"
          >
            Submit Evaluation
          </button>

        </div>

        {/* Results */}
        {submitted && (

          <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-6">
              Mentor Evaluation
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-8">

              <div className="bg-black border border-zinc-800 rounded-2xl p-6">

                <p className="text-zinc-400 mb-2">
                  Technical Score
                </p>

                <h2 className="text-5xl font-bold">
                  {score}%
                </h2>

              </div>

              <div className="bg-black border border-zinc-800 rounded-2xl p-6">

                <p className="text-zinc-400 mb-2">
                  Assessment Result
                </p>

                <h2 className="text-3xl font-bold">

                  {score >= 80
                    ? "Excellent"
                    : score >= 50
                    ? "Moderate"
                    : "Needs Improvement"}

                </h2>

              </div>

            </div>

            <div className="bg-black border border-zinc-800 rounded-2xl p-6 leading-8">

              {feedback}

            </div>

          </div>

        )}

      </div>
      </div>
    </main>
  );
}