"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

const trainingFlow = [
  {
    question:
      "Why do you think connectors are critical in modern electronic systems?",

    keywords: ["connect", "signal", "power", "reliable"],

    goodResponse:
      "Correct. Connectors ensure reliable electrical communication between systems while supporting modularity, maintenance, and signal integrity.",

    nextTopic:
      "Now let’s think deeper. Why might connector reliability become even more important in EV systems?",
  },

  {
    question:
      "Why might connector reliability become even more important in EV systems?",

    keywords: ["vibration", "heat", "high voltage", "safety"],

    goodResponse:
      "Excellent thinking. EV systems experience vibration, thermal stress, moisture exposure, and high current loads. Connector reliability becomes critical for both performance and safety.",

    nextTopic:
      "Next question: What factors would you consider while selecting a connector for an automotive application?",
  },

  {
    question:
      "What factors would you consider while selecting a connector for an automotive application?",

    keywords: ["current", "temperature", "sealing", "vibration"],

    goodResponse:
      "Great answer. Product Specialists evaluate current rating, environmental sealing, vibration resistance, packaging constraints, and durability before selecting connectors.",

    nextTopic:
      "You completed the Connector Fundamentals assessment.",
  },
];

export default function TrainingPage() {

  const [input, setInput] = useState("");

  const [step, setStep] = useState(0);

  const [score, setScore] = useState(0);

  const [attempts, setAttempts] = useState(0);

  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content: trainingFlow[0].question,
    },
  ]);

  const totalQuestions = trainingFlow.length;

  const progress = ((step + 1) / totalQuestions) * 100;

  const finalScore = Math.round(
    (score / totalQuestions) * 100
  );

  const passed = finalScore >= 85;

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, isTyping]);

  function sendMessage() {

    if (!input) return;

    const current = trainingFlow[step];

    const userMessage = {
      role: "user",
      content: input,
    };

    const lowerInput = input.toLowerCase();

    let matchedKeywords = 0;

    current.keywords.forEach((keyword) => {

      if (lowerInput.includes(keyword)) {
        matchedKeywords++;
      }

    });

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");

    setIsTyping(true);

    setTimeout(() => {

      let aiReply = "";

      let updatedScore = score;

      // SMARTER VALIDATION
      if (matchedKeywords >= 2) {

        updatedScore += 1;

        setScore(updatedScore);

        aiReply =
          current.goodResponse +
          "\n\n" +
          current.nextTopic;

        if (step < totalQuestions - 1) {
          setStep(step + 1);
        }

      } else {

        setAttempts((prev) => prev + 1);

        aiReply =
          "Good attempt. Think about reliability, safety, environmental conditions, electrical performance, or application challenges and try again.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply,
        },
      ]);

      setIsTyping(false);

    }, 1200);
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="grid grid-cols-12 min-h-screen">

        {/* Sidebar */}
        <div className="col-span-3 border-r border-zinc-800 p-6 bg-black">

          <h1 className="text-3xl font-bold mb-10">
            Training Modules
          </h1>

          <div className="space-y-4">

            {/* Module 1 */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">

              <h2 className="font-semibold text-lg">
                Connector Fundamentals
              </h2>

              <p className="text-sm text-zinc-400 mt-2">
                Completed: {Math.round(progress)}%
              </p>

            </div>

            {/* Module 2 */}
            <div
              className={`border rounded-xl p-4 transition-all duration-500 ${
                passed
                  ? "bg-zinc-900 border-zinc-700"
                  : "bg-zinc-950 border-zinc-800 opacity-50"
              }`}
            >

              <h2 className="font-semibold text-lg">
                Product Families
              </h2>

              <p className="text-sm mt-2 text-zinc-400">
                {passed ? "Unlocked" : "Locked"}
              </p>

            </div>

            {/* Module 3 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 opacity-50">

              <h2 className="font-semibold text-lg">
                Connector Selection
              </h2>

              <p className="text-sm text-zinc-500 mt-2">
                Locked
              </p>

            </div>

          </div>

        </div>

        {/* Main */}
        <div className="col-span-9 flex flex-col">

          {/* Header */}
          <div className="border-b border-zinc-800 p-6">

            <h1 className="text-4xl font-bold">
              AI Mentor Simulation
            </h1>

            <p className="text-zinc-400 mt-2 text-lg">
              Guided Product Specialist Learning
            </p>

            {/* Progress */}
            <div className="mt-6">

              <div className="flex justify-between text-sm text-zinc-400 mb-2">

                <span>Training Progress</span>

                <span>{Math.round(progress)}%</span>

              </div>

              <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">

                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />

              </div>

            </div>

            {/* Analytics */}
            <div className="grid grid-cols-3 gap-4 mt-6">

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">

                <p className="text-zinc-400 text-sm">
                  Quiz Score
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {finalScore}%
                </h2>

              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">

                <p className="text-zinc-400 text-sm">
                  Certification Status
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {passed ? "Passed" : "In Progress"}
                </h2>

              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">

                <p className="text-zinc-400 text-sm">
                  Retry Attempts
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {attempts}
                </h2>

              </div>

            </div>

          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`max-w-3xl ${
                  msg.role === "user"
                    ? "ml-auto"
                    : ""
                }`}
              >

                <div
                  className={`rounded-2xl p-6 leading-8 whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-blue-600"
                      : "bg-zinc-900 border border-zinc-800"
                  }`}
                >

                  {msg.content}

                </div>

              </div>

            ))}

            {/* Typing Indicator */}
            {isTyping && (

              <div className="max-w-3xl">

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

                  <div className="flex gap-2">

                    <div className="w-3 h-3 bg-zinc-400 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-zinc-400 rounded-full animate-bounce delay-100" />
                    <div className="w-3 h-3 bg-zinc-400 rounded-full animate-bounce delay-200" />

                  </div>

                </div>

              </div>

            )}

            {/* Completion */}
            {progress >= 100 && (

              <div className="max-w-3xl">

                <div
                  className={`rounded-2xl p-6 border ${
                    passed
                      ? "bg-green-900/30 border-green-700"
                      : "bg-red-900/30 border-red-700"
                  }`}
                >

                  <h2
                    className={`text-2xl font-bold mb-4 ${
                      passed
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {passed
                      ? "Connector Fundamentals Completed"
                      : "Assessment Failed"}
                  </h2>

                  <p className="text-zinc-300 leading-8">

                    Final Score:
                    <span className="font-bold text-white">
                      {" "} {finalScore}%
                    </span>

                    <br /><br />

                    {passed
                      ? "You successfully passed the Product Specialist foundational assessment."
                      : "You need at least 85% to unlock the next module. Review the concepts and retry the assessment."}

                  </p>

                </div>

              </div>

            )}

            <div ref={messagesEndRef} />

          </div>

          {/* Input */}
          <div className="border-t border-zinc-800 p-6">

            <div className="flex gap-4">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Answer the mentor..."
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 outline-none text-white"
              />

              <button
                onClick={sendMessage}
                className="bg-white text-black px-8 rounded-xl font-semibold hover:bg-zinc-300 transition"
              >
                Send
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}