"use client";

import { useEffect, useState } from "react";

export default function ConnectorFundamentalsMission() {

  const [step, setStep] = useState(1);

  const [xp, setXp] = useState(0);

  const [selectedPart, setSelectedPart] = useState("");

  const [exploredParts, setExploredParts] = useState<string[]>([]);

  const [quizStarted, setQuizStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [quizScore, setQuizScore] = useState(0);

  const [quizCompleted, setQuizCompleted] = useState(false);

  const [quizPassed, setQuizPassed] = useState(false);

  const progress = (step / 4) * 100;

  useEffect(() => {

    const savedData = localStorage.getItem(
      "connectorFundamentalsProgress"
    );

    if (savedData) {

      const parsed = JSON.parse(savedData);

      setStep(parsed.step || 1);

      setXp(parsed.xp || 0);

      setExploredParts(parsed.exploredParts || []);

      setQuizCompleted(parsed.quizCompleted || false);

      setQuizPassed(parsed.quizPassed || false);

    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "connectorFundamentalsProgress",
      JSON.stringify({
        step,
        xp,
        exploredParts,
        quizCompleted,
        quizPassed,
      })
    );

  }, [
    step,
    xp,
    exploredParts,
    quizCompleted,
    quizPassed,
  ]);

  const anatomyData = {

    Housing: {

      what:
        "The housing is the outer insulating structure of the connector that supports and protects internal components.",

      functions:
        "Provides insulation, terminal alignment, structural support, and mechanical protection.",

      types:
        "Plug housing, receptacle housing, sealed housing, and unsealed housing.",

      advantages:
        "Improves durability, connector stability, and electrical safety.",

      applications:
        "Used in EV battery systems, automotive harnesses, and industrial systems.",

      failures:
        "Cracking due to vibration, thermal deformation, and poor terminal retention.",

    },

    Terminal: {

      what:
        "The terminal creates the conductive path for signal and power transfer.",

      functions:
        "Transfers electrical current while minimizing resistance and heat generation.",

      types:
        "Male terminals, female terminals, stamped terminals, and machined terminals.",

      advantages:
        "Ensures reliable electrical continuity and efficient current transfer.",

      applications:
        "Used in EV charging, PCB systems, servers, and industrial automation.",

      failures:
        "Overheating, oxidation, poor crimping, and fretting corrosion.",

    },

    Seal: {

      what:
        "Seals protect connectors from moisture, dust, and contaminants.",

      functions:
        "Provides environmental sealing and improves reliability in harsh conditions.",

      types:
        "Wire seals, interface seals, and perimeter seals.",

      advantages:
        "Prevents corrosion and electrical failure.",

      applications:
        "Used in EV systems, automotive connectors, and industrial machinery.",

      failures:
        "Seal degradation may lead to water ingress and corrosion.",

    },

    "Locking Feature": {

      what:
        "Locking mechanisms secure connectors during vibration and movement.",

      functions:
        "Improves retention force and mating stability.",

      types:
        "CPA locks, latch locks, and snap-fit locking systems.",

      advantages:
        "Prevents accidental disconnects.",

      applications:
        "Used in EV systems, aerospace, and industrial environments.",

      failures:
        "Weak retention may cause connector disengagement.",

    },

    Polarization: {

      what:
        "Polarization prevents incorrect mating orientation.",

      functions:
        "Ensures connectors mate only in the correct orientation.",

      types:
        "Keyed polarization and asymmetrical connector designs.",

      advantages:
        "Prevents assembly errors and equipment damage.",

      applications:
        "Used in PCB systems and automotive electronics.",

      failures:
        "Incorrect mating may damage electronics.",

    },

  };

  const quizQuestions = [

    {
      question:
        "Which connector type commonly interfaces directly with PCBs?",

      options: [
        "Wire-to-Board",
        "Wire-to-Wire",
        "Cable Clamp",
        "Busbar",
      ],

      correct: "Wire-to-Board",

      explanation:
        "Wire-to-board connectors interface discrete wires with PCBs.",
    },

    {
      question:
        "What is the primary function of connector housing?",

      options: [
        "Heat generation",
        "Signal amplification",
        "Mechanical protection and insulation",
        "Current conversion",
      ],

      correct:
        "Mechanical protection and insulation",

      explanation:
        "Housing provides insulation, terminal support, and protection.",
    },

    {
      question:
        "Why are connector seals critical in EV systems?",

      options: [
        "Increase connector color",
        "Reduce PCB size",
        "Prevent moisture ingress",
        "Increase voltage",
      ],

      correct:
        "Prevent moisture ingress",

      explanation:
        "Seals protect connectors from harsh environmental exposure.",
    },

    {
      question:
        "What happens when connectors are properly mated?",

      options: [
        "Voltage stops",
        "Electrical continuity is established",
        "Connector melts",
        "Signal disappears",
      ],

      correct:
        "Electrical continuity is established",

      explanation:
        "Proper mating establishes a conductive electrical pathway.",
    },

    {
      question:
        "Why are locking features important in automotive connectors?",

      options: [
        "Improve vibration resistance",
        "Increase connector color",
        "Reduce housing size",
        "Decrease conductivity",
      ],

      correct:
        "Improve vibration resistance",

      explanation:
        "Locking systems prevent disconnects caused by vibration.",
    },

    {
      question:
        "What does polarization prevent?",

      options: [
        "Connector heating",
        "Incorrect connector mating",
        "Signal loss",
        "Terminal plating",
      ],

      correct:
        "Incorrect connector mating",

      explanation:
        "Polarization ensures correct connector orientation.",
    },

  ];

  const nextStep = () => {

    setStep((prev) => prev + 1);

    if (xp < 200) {

      setXp((prev) => prev + 20);

    }

  };

  const handleExplorePart = (part: string) => {

    setSelectedPart(part);

    if (!exploredParts.includes(part)) {

      setExploredParts([...exploredParts, part]);

      if (xp < 200) {

        setXp((prev) => prev + 5);

      }

    }

  };

  const handleQuizAnswer = () => {

    const current = quizQuestions[currentQuestion];

    let updatedScore = quizScore;

    if (selectedAnswer === current.correct) {

      updatedScore += 1;

      setQuizScore(updatedScore);

    }

    if (currentQuestion + 1 < quizQuestions.length) {

      setCurrentQuestion((prev) => prev + 1);

      setSelectedAnswer("");

    } else {

      setQuizCompleted(true);

      const passed = updatedScore >= 4;

      setQuizPassed(passed);

      if (passed) {

        localStorage.setItem(
          "connectorFundamentalsCompleted",
          "true"
        );

        localStorage.setItem(
          "connectorFundamentalsCompetency",
          "Strong"
        );

      }

    }

  };

  const retryQuiz = () => {

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setQuizScore(0);

    setQuizCompleted(false);

    setQuizPassed(false);

  };

  const retakeCourse = () => {

    localStorage.removeItem(
      "connectorFundamentalsProgress"
    );

    localStorage.removeItem(
      "connectorFundamentalsCompleted"
    );

    localStorage.removeItem(
      "connectorFundamentalsCompetency"
    );

    setStep(1);

    setXp(0);

    setSelectedPart("");

    setExploredParts([]);

    setQuizStarted(false);

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setQuizScore(0);

    setQuizCompleted(false);

    setQuizPassed(false);

  };

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-6xl font-bold mb-4">
          Connector Fundamentals
        </h1>

        <p className="text-gray-400 text-xl mb-10">
          Guided Product Specialist Learning Mission
        </p>

        {/* PROGRESS */}

        <div className="mb-10">

          <div className="flex justify-between mb-2">

            <p>Mission Progress</p>

            <p>{Math.round(progress)}%</p>

          </div>

          <div className="w-full bg-gray-800 rounded-full h-3">

            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

        {/* XP */}

        <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 w-56 mb-10">

          <p className="text-gray-400 mb-3">
            XP Earned
          </p>

          <h2 className="text-5xl font-bold text-blue-500">
            {xp}
          </h2>

        </div>

        {/* STEP 1 */}

        {step === 1 && (

          <section className="bg-[#111] rounded-3xl p-10">

            <h2 className="text-5xl font-bold mb-8">
              What We Sell at Molex
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-[#181818] rounded-2xl p-8">

                <h3 className="text-3xl font-bold mb-4">
                  Wire-to-Wire
                </h3>

                <p className="text-gray-400 leading-8">
                  Used in cable harness systems for direct cable mating,
                  high-current transfer,
                  and vibration-resistant automotive applications.
                </p>

              </div>

              <div className="bg-[#181818] rounded-2xl p-8">

                <h3 className="text-3xl font-bold mb-4">
                  Wire-to-Board
                </h3>

                <p className="text-gray-400 leading-8">
                  Interfaces discrete wires with PCBs while supporting
                  compact packaging and signal integrity.
                </p>

              </div>

            </div>

            <button
              onClick={nextStep}
              className="mt-10 bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl"
            >
              Continue →
            </button>

          </section>

        )}

        {/* STEP 2 */}

        {step === 2 && (

          <section className="bg-[#111] rounded-3xl p-10">

            <h2 className="text-5xl font-bold mb-8">
              Connector Anatomy
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              {Object.keys(anatomyData).map((part) => (

                <div
                  key={part}
                  onClick={() => handleExplorePart(part)}
                  className={`cursor-pointer rounded-2xl p-8 border transition ${
                    selectedPart === part
                      ? "bg-blue-600 border-blue-400"
                      : "bg-[#181818] border-gray-800"
                  }`}
                >

                  <h3 className="text-3xl font-bold">
                    {part}
                  </h3>

                </div>

              ))}

            </div>

            {selectedPart && (

              <div className="bg-[#181818] rounded-3xl p-10">

                <h2 className="text-5xl font-bold mb-8">
                  {selectedPart}
                </h2>

                <div className="space-y-6 text-gray-300 leading-8">

                  <div>

                    <h3 className="text-blue-400 font-bold mb-2">
                      What is it?
                    </h3>

                    <p>
                      {anatomyData[selectedPart as keyof typeof anatomyData].what}
                    </p>

                  </div>

                  <div>

                    <h3 className="text-blue-400 font-bold mb-2">
                      Functions
                    </h3>

                    <p>
                      {anatomyData[selectedPart as keyof typeof anatomyData].functions}
                    </p>

                  </div>

                  <div>

                    <h3 className="text-blue-400 font-bold mb-2">
                      Types
                    </h3>

                    <p>
                      {anatomyData[selectedPart as keyof typeof anatomyData].types}
                    </p>

                  </div>

                  <div>

                    <h3 className="text-blue-400 font-bold mb-2">
                      Advantages
                    </h3>

                    <p>
                      {anatomyData[selectedPart as keyof typeof anatomyData].advantages}
                    </p>

                  </div>

                  <div>

                    <h3 className="text-blue-400 font-bold mb-2">
                      Applications
                    </h3>

                    <p>
                      {anatomyData[selectedPart as keyof typeof anatomyData].applications}
                    </p>

                  </div>

                  <div>

                    <h3 className="text-red-400 font-bold mb-2">
                      Failure Risks
                    </h3>

                    <p>
                      {anatomyData[selectedPart as keyof typeof anatomyData].failures}
                    </p>

                  </div>

                </div>

              </div>

            )}

            <button
              onClick={nextStep}
              disabled={exploredParts.length < 3}
              className={`mt-10 px-8 py-4 rounded-2xl ${
                exploredParts.length >= 3
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              Continue →
            </button>

          </section>

        )}

      </div>

    </main>
  );
}
