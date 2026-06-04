"use client";

import { useEffect, useState } from "react";

export default function ConnectorFundamentalsMission() {

  /* =========================================================
     STATES
  ========================================================= */

  const [step, setStep] = useState(1);

  const [xp, setXp] = useState(0);

  const [connectorMated, setConnectorMated] =
    useState(false);

  const [selectedPart, setSelectedPart] =
    useState("");

  const [exploredParts, setExploredParts] =
    useState<string[]>([]);

  const [selectedFeatures, setSelectedFeatures] =
    useState<string[]>([]);

  const [challengeSubmitted, setChallengeSubmitted] =
    useState(false);

  const [challengePassed, setChallengePassed] =
    useState(false);

  const [quizStarted, setQuizStarted] =
    useState(false);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [quizScore, setQuizScore] =
    useState(0);

  const [quizCompleted, setQuizCompleted] =
    useState(false);

  const [quizPassed, setQuizPassed] =
    useState(false);

  const [showExplanation, setShowExplanation] =
    useState(false);

  const progress =
    quizCompleted
      ? 100
      : (step / 5) * 100;

  /* =========================================================
     LOAD SAVED DATA
  ========================================================= */

  useEffect(() => {

    const savedData = localStorage.getItem(
      "connectorFundamentalsMaster"
    );

    if (savedData) {

      const parsed = JSON.parse(savedData);

      setStep(parsed.step || 1);

      setXp(parsed.xp || 0);

      setConnectorMated(
        parsed.connectorMated || false
      );

      setExploredParts(
        parsed.exploredParts || []
      );

      setQuizCompleted(
        parsed.quizCompleted || false
      );

      setQuizPassed(
        parsed.quizPassed || false
      );

    }

  }, []);

  /* =========================================================
     SAVE DATA
  ========================================================= */

  useEffect(() => {

    localStorage.setItem(
      "connectorFundamentalsMaster",
      JSON.stringify({

        step,
        xp,
        connectorMated,
        exploredParts,
        quizCompleted,
        quizPassed,

      })
    );

  }, [
    step,
    xp,
    connectorMated,
    exploredParts,
    quizCompleted,
    quizPassed,
  ]);

  /* =========================================================
     ANATOMY DATA
  ========================================================= */

  const anatomyData = {

    Housing: {

      what:
        "The housing is the outer insulating structure of the connector that supports and protects internal components.",

      functions:
        "Provides insulation, terminal alignment, structural support, and mechanical protection.",

      types:
        "Plug housing, receptacle housing, sealed housing, and unsealed housing.",

      advantages:
        "Improves durability, electrical safety, and connector stability.",

      applications:
        "Used in EV battery systems, automotive harnesses, and industrial machinery.",

      failures:
        "Cracking due to vibration, thermal deformation, and poor terminal retention.",

    },

    Terminal: {

      what:
        "The terminal creates the conductive electrical path for signal and power transfer.",

      functions:
        "Transfers electrical current while minimizing resistance and heat generation.",

      types:
        "Male terminals, female terminals, stamped terminals, and machined terminals.",

      advantages:
        "Ensures reliable electrical continuity and efficient current transfer.",

      applications:
        "Used in EV charging systems, PCB applications, and industrial automation.",

      failures:
        "Overheating, oxidation, poor crimping, and fretting corrosion.",

    },

    Seal: {

      what:
        "Seals protect connectors from moisture, dust, and harsh environmental contaminants.",

      functions:
        "Provides environmental sealing and improves long-term reliability.",

      types:
        "Wire seals, interface seals, and perimeter seals.",

      advantages:
        "Prevents corrosion and electrical failure in harsh environments.",

      applications:
        "Used in EV systems, automotive electronics, and industrial systems.",

      failures:
        "Seal degradation may lead to water ingress and connector corrosion.",

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
        "Polarization prevents incorrect connector mating orientation.",

      functions:
        "Ensures connectors mate only in the correct orientation.",

      types:
        "Keyed polarization and asymmetrical connector designs.",

      advantages:
        "Prevents assembly errors and equipment damage.",

      applications:
        "Used in PCB systems, automotive electronics, and industrial systems.",

      failures:
        "Incorrect mating may damage electronics.",

    },

  };

  /* =========================================================
     QUIZ QUESTIONS
  ========================================================= */

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
        "Wire-to-board connectors are specifically designed to interface wires with PCBs.",
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
        "Housing provides structural protection, insulation, and terminal alignment.",
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
        "Seals protect connectors from moisture and harsh environmental exposure.",
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
        "Proper mating establishes a reliable conductive electrical path.",
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
        "Locking systems prevent disconnects caused by vibration and shock.",
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
        "Polarization ensures connectors mate only in the correct orientation.",
    },

  ];

  /* =========================================================
     FUNCTIONS
  ========================================================= */

  const nextStep = () => {

    setStep((prev) => prev + 1);

    if (xp < 250) {

      setXp((prev) => prev + 20);

    }

  };

  const handleExplorePart = (part: string) => {

    setSelectedPart(part);

    if (!exploredParts.includes(part)) {

      setExploredParts([
        ...exploredParts,
        part,
      ]);

      if (xp < 250) {

        setXp((prev) => prev + 5);

      }

    }

  };

  const toggleFeature = (feature: string) => {

    if (selectedFeatures.includes(feature)) {

      setSelectedFeatures(
        selectedFeatures.filter(
          (f) => f !== feature
        )
      );

    } else {

      setSelectedFeatures([
        ...selectedFeatures,
        feature,
      ]);

    }

  };

  const submitChallenge = () => {

    const required = [
      "Seal",
      "Locking Feature",
      "Housing",
    ];

    const passed = required.every((item) =>
      selectedFeatures.includes(item)
    );

    setChallengeSubmitted(true);

    setChallengePassed(passed);

    if (passed && xp < 250) {

      setXp((prev) => prev + 40);

    }

  };

  const handleQuizAnswer = () => {

    const current =
      quizQuestions[currentQuestion];

    let updatedScore = quizScore;

    if (
      selectedAnswer === current.correct
    ) {

      updatedScore += 1;

      setQuizScore(updatedScore);

    }

    setShowExplanation(true);

  };

  const nextQuestion = () => {

    setShowExplanation(false);

    setSelectedAnswer("");

    if (
      currentQuestion + 1 <
      quizQuestions.length
    ) {

      setCurrentQuestion((prev) => prev + 1);

    } else {

      setQuizCompleted(true);

      const passed =
        quizScore >= 4;

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

    setShowExplanation(false);

  };

  const retakeCourse = () => {

    localStorage.removeItem(
      "connectorFundamentalsMaster"
    );

    setStep(1);

    setConnectorMated(false);

    setSelectedPart("");

    setExploredParts([]);

    setSelectedFeatures([]);

    setChallengeSubmitted(false);

    setChallengePassed(false);

    setQuizStarted(false);

    setCurrentQuestion(0);

    setSelectedAnswer("");

    setQuizScore(0);

    setQuizCompleted(false);

    setQuizPassed(false);

    setShowExplanation(false);

  };

  /* =========================================================
     UI
  ========================================================= */

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
          Nexus Academy
        </p>

        <h1 className="text-6xl font-bold mb-4">
          Connector Fundamentals
        </h1>

        <p className="text-gray-400 text-xl mb-6">
          Guided Product Specialist Learning Mission
        </p>

        <button
          onClick={retakeCourse}
          className="mb-10 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-2xl font-semibold"
        >
          Retake Course
        </button>

        {/* PROGRESS */}

        <div className="mb-10">

          <div className="flex justify-between mb-2">

            <p>Mission Progress</p>

            <p>{Math.round(progress)}%</p>

          </div>

          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">

            <div
              className="bg-blue-600 h-full transition-all duration-500"
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

          <section className="bg-[#111] border border-gray-800 rounded-3xl p-10">

            <h2 className="text-5xl font-bold mb-8">
              What We Sell at Molex
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

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

              <div className="bg-[#181818] rounded-2xl p-8">

                <h3 className="text-3xl font-bold mb-4">
                  Board-to-Board
                </h3>

                <p className="text-gray-400 leading-8">
                  Enables high-speed communication between PCBs
                  in compact electronic systems and servers.
                </p>

              </div>

              <div className="bg-[#181818] rounded-2xl p-8">

                <h3 className="text-3xl font-bold mb-4">
                  Automotive Connectors
                </h3>

                <p className="text-gray-400 leading-8">
                  Engineered for EVs and harsh environments with
                  environmental sealing and vibration resistance.
                </p>

              </div>

            </div>

            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl"
            >
              Continue →
            </button>

          </section>

        )}

        {/* STEP 2 */}

        {step === 2 && (

          <section className="bg-[#111] border border-gray-800 rounded-3xl p-10">

            <h2 className="text-5xl font-bold mb-8">
              Connector Mating Simulation
            </h2>

            <p className="text-gray-400 text-lg mb-10">
              Observe how electrical continuity is established
              when connectors are properly mated.
            </p>

            <div className="relative h-72 flex items-center justify-center overflow-hidden mb-10">

              <div
                className={`absolute h-3 rounded-full transition-all duration-700 ${
                  connectorMated
                    ? "w-[320px] bg-green-400 shadow-[0_0_30px_#4ade80]"
                    : "w-24 bg-red-500"
                }`}
              />

              <div
                className={`absolute left-24 transition-all duration-700 ${
                  connectorMated
                    ? "translate-x-24"
                    : ""
                }`}
              >

                <div className="relative w-52 h-32 bg-blue-600 rounded-3xl border-4 border-blue-400">

                  <div className="absolute right-[-18px] top-8 flex gap-2">

                    <div className="w-4 h-5 bg-yellow-300 rounded-sm" />
                    <div className="w-4 h-5 bg-yellow-300 rounded-sm" />
                    <div className="w-4 h-5 bg-yellow-300 rounded-sm" />
                    <div className="w-4 h-5 bg-yellow-300 rounded-sm" />

                  </div>

                </div>

              </div>

              <div
                className={`absolute right-24 transition-all duration-700 ${
                  connectorMated
                    ? "-translate-x-24"
                    : ""
                }`}
              >

                <div className="relative w-52 h-32 bg-gray-700 rounded-3xl border-4 border-gray-500">

                  <div className="absolute left-[-12px] top-8 flex gap-2">

                    <div className="w-3 h-6 bg-gray-300 rounded-sm" />
                    <div className="w-3 h-6 bg-gray-300 rounded-sm" />
                    <div className="w-3 h-6 bg-gray-300 rounded-sm" />
                    <div className="w-3 h-6 bg-gray-300 rounded-sm" />

                  </div>

                </div>

              </div>

            </div>

            <div className="mb-10 bg-[#181818] rounded-2xl p-8">

              <h3 className="text-3xl font-bold mb-4">
                Engineering Insight
              </h3>

              <ul className="space-y-4 text-gray-300">

                <li>
                  • Electrical continuity established
                </li>

                <li>
                  • Contact resistance minimized
                </li>

                <li>
                  • Mechanical retention secured
                </li>

              </ul>

            </div>

            <div className="flex gap-6">

              <button
                onClick={() => {

                  setConnectorMated(true);

                  if (xp < 250) {

                    setXp((prev) => prev + 20);

                  }

                }}
                disabled={connectorMated}
                className={`px-8 py-4 rounded-2xl ${
                  connectorMated
                    ? "bg-green-600"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >

                {connectorMated
                  ? "Connector Mated ✓"
                  : "Mate Connector"}

              </button>

              <button
                onClick={nextStep}
                disabled={!connectorMated}
                className={`px-8 py-4 rounded-2xl ${
                  connectorMated
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                Continue →
              </button>

            </div>

          </section>

        )}

        {/* STEP 3 */}

{step === 3 && (

  <section className="bg-[#111] border border-gray-800 rounded-3xl p-10">

    <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
      Step 3
    </p>

    <h2 className="text-5xl font-bold mb-10">
      Connector Anatomy Explorer
    </h2>

    <p className="text-gray-400 text-xl leading-8 mb-10">
      Explore critical connector components and understand their
      engineering significance in reliability, electrical performance,
      environmental protection, and manufacturability.
    </p>

    <div className="grid md:grid-cols-2 gap-6 mb-10">

      {Object.keys(anatomyData).map((part) => (

        <button
          key={part}
          onClick={() => handleExplorePart(part)}
          className={`text-left rounded-2xl p-8 border transition-all duration-300 ${
            selectedPart === part
              ? "bg-blue-600 border-blue-400 scale-[1.02]"
              : "bg-[#181818] border-gray-800 hover:border-blue-500"
          }`}
        >

          <h3 className="text-3xl font-bold mb-4">
            {part}
          </h3>

          <p className="text-gray-300">
            Click to explore engineering details.
          </p>

        </button>

      ))}

    </div>

    {selectedPart && (

      <div className="bg-[#181818] border border-blue-900 rounded-3xl p-10 mb-10">

        <h2 className="text-5xl font-bold mb-10">
          {selectedPart}
        </h2>

        <div className="space-y-8 text-gray-300 leading-8">

          <div>

            <h3 className="text-blue-400 font-bold text-2xl mb-3">
              What is it?
            </h3>

            <p>
              {
                anatomyData[
                  selectedPart as keyof typeof anatomyData
                ].what
              }
            </p>

          </div>

          <div>

            <h3 className="text-blue-400 font-bold text-2xl mb-3">
              Engineering Function
            </h3>

            <p>
              {
                anatomyData[
                  selectedPart as keyof typeof anatomyData
                ].functions
              }
            </p>

          </div>

          <div>

            <h3 className="text-blue-400 font-bold text-2xl mb-3">
              Common Types
            </h3>

            <p>
              {
                anatomyData[
                  selectedPart as keyof typeof anatomyData
                ].types
              }
            </p>

          </div>

          <div>

            <h3 className="text-blue-400 font-bold text-2xl mb-3">
              Advantages
            </h3>

            <p>
              {
                anatomyData[
                  selectedPart as keyof typeof anatomyData
                ].advantages
              }
            </p>

          </div>

          <div>

            <h3 className="text-blue-400 font-bold text-2xl mb-3">
              Applications
            </h3>

            <p>
              {
                anatomyData[
                  selectedPart as keyof typeof anatomyData
                ].applications
              }
            </p>

          </div>

          <div>

            <h3 className="text-red-400 font-bold text-2xl mb-3">
              Failure Risks
            </h3>

            <p>
              {
                anatomyData[
                  selectedPart as keyof typeof anatomyData
                ].failures
              }
            </p>

          </div>

        </div>

      </div>

    )}

    <div className="bg-[#151515] border border-blue-900 rounded-3xl p-8 mb-10">

      <h3 className="text-2xl font-bold text-blue-400 mb-4">
        AI Mentor Insight
      </h3>

      <p className="text-gray-300 leading-8">
        Connector reliability is not determined by one component alone.
        Housing design, terminal integrity, sealing performance,
        locking retention, and polarization all work together
        to ensure electrical continuity, environmental resistance,
        and long-term durability in real-world systems.
      </p>

    </div>

    <button
      onClick={nextStep}
      disabled={exploredParts.length < 3}
      className={`px-8 py-4 rounded-2xl font-semibold transition ${
        exploredParts.length >= 3
          ? "bg-blue-600 hover:bg-blue-500"
          : "bg-gray-800 text-gray-500"
      }`}
    >

      {exploredParts.length >= 3
        ? "Continue →"
        : `Explore ${
            3 - exploredParts.length
          } More Components`}

    </button>

  </section>

)}

{/* STEP 4 */}

{step === 4 && (

  <section className="bg-[#111] border border-gray-800 rounded-3xl p-10">

    <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
      Step 4
    </p>

    <h2 className="text-5xl font-bold mb-10">
      Engineering Challenge
    </h2>

    <p className="text-gray-400 text-xl leading-8 mb-10">
      A customer is designing a high-voltage EV battery connector system.
      Select the most critical connector engineering features required
      for reliable performance in harsh automotive environments.
    </p>

    {/* SCENARIO */}

    <div className="bg-[#181818] border border-blue-900 rounded-3xl p-8 mb-10">

      <h3 className="text-3xl font-bold mb-6">
        EV Battery Connector Requirements
      </h3>

      <div className="space-y-4 text-gray-300 leading-8">

        <p>• High vibration resistance</p>

        <p>• IP67 environmental sealing</p>

        <p>• Reliable mating retention</p>

        <p>• Long-term electrical continuity</p>

        <p>• Protection against incorrect mating</p>

      </div>

    </div>

    {/* FEATURE SELECTION */}

    <h3 className="text-3xl font-bold mb-8">
      Select Critical Engineering Features
    </h3>

    <div className="grid md:grid-cols-2 gap-6 mb-10">

      {[
        "Seal",
        "Locking Feature",
        "Housing",
        "Polarization",
        "Terminal",
        "Guide Post",
      ].map((feature) => (

        <button
          key={feature}
          onClick={() => toggleFeature(feature)}
          className={`text-left rounded-2xl p-8 border transition-all duration-300 ${
            selectedFeatures.includes(feature)
              ? "bg-blue-600 border-blue-400 scale-[1.02]"
              : "bg-[#181818] border-gray-800 hover:border-blue-500"
          }`}
        >

          <h3 className="text-2xl font-bold">
            {feature}
          </h3>

        </button>

      ))}

    </div>

    {/* SUBMIT */}

    {!challengeSubmitted && (

      <button
        onClick={submitChallenge}
        disabled={selectedFeatures.length === 0}
        className={`px-8 py-4 rounded-2xl font-semibold ${
          selectedFeatures.length > 0
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-gray-800 text-gray-500"
        }`}
      >
        Submit Engineering Decision
      </button>

    )}

    {/* RESULT */}

    {challengeSubmitted && (

      <div
        className={`rounded-3xl p-10 mt-10 border ${
          challengePassed
            ? "bg-[#0f1c14] border-green-700"
            : "bg-[#1a1010] border-red-700"
        }`}
      >

        <h3
          className={`text-4xl font-bold mb-6 ${
            challengePassed
              ? "text-green-400"
              : "text-red-400"
          }`}
        >

          {challengePassed
            ? "Engineering Decision Approved"
            : "Re-evaluate Requirements"}

        </h3>

        {challengePassed ? (

          <div className="space-y-4 text-gray-300 leading-8">

            <p>
              • Seal ensures environmental protection
            </p>

            <p>
              • Locking feature improves vibration resistance
            </p>

            <p>
              • Housing provides insulation and structural integrity
            </p>

            <p>
              • Polarization prevents incorrect mating
            </p>

            <p>
              • Terminal integrity ensures electrical continuity
            </p>

          </div>

        ) : (

          <div className="space-y-4 text-gray-300 leading-8">

            <p>
              Your selection missed critical EV connector requirements.
            </p>

            <p>
              Focus on:
            </p>

            <p>
              • Environmental sealing
            </p>

            <p>
              • Mechanical retention
            </p>

            <p>
              • Connector protection
            </p>

          </div>

        )}

        <div className="flex gap-6 mt-10 flex-wrap">

          {!challengePassed && (

            <button
              onClick={() => {

                setSelectedFeatures([]);

                setChallengeSubmitted(false);

              }}
              className="bg-red-600 hover:bg-red-500 px-8 py-4 rounded-2xl"
            >
              Retry Challenge
            </button>

          )}

          {challengePassed && (

            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl"
            >
              Continue to Certification →
            </button>

          )}

        </div>

      </div>

    )}

  </section>

)}
{/* STEP 5 */}

{step === 5 && !quizStarted && (

  <section className="bg-[#111] border border-gray-800 rounded-3xl p-10">

    <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
      Step 5
    </p>

    <h2 className="text-5xl font-bold mb-8">
      Final Certification Quiz
    </h2>

    <p className="text-gray-400 text-xl leading-8 mb-10">
      Complete the mandatory assessment covering the entire
      Connector Fundamentals learning mission.
      Pass Requirement: 4 / 6
    </p>

    <div className="bg-[#181818] border border-blue-900 rounded-3xl p-8 mb-10">

      <h3 className="text-3xl font-bold mb-6">
        Assessment Coverage
      </h3>

      <div className="space-y-4 text-gray-300 leading-8">

        <p>• Molex connector portfolio</p>

        <p>• Connector mating principles</p>

        <p>• Connector anatomy</p>

        <p>• Environmental protection concepts</p>

        <p>• Connector reliability</p>

        <p>• Engineering applications</p>

      </div>

    </div>

    <button
      onClick={() => setQuizStarted(true)}
      className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-semibold"
    >
      Start Certification →
    </button>

  </section>

)}

{/* QUIZ */}

{quizStarted && !quizCompleted && (

  <section className="bg-[#111] border border-gray-800 rounded-3xl p-10">

    <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
      Question {currentQuestion + 1} / 6
    </p>

    <h2 className="text-4xl font-bold mb-10 leading-tight">
      {quizQuestions[currentQuestion].question}
    </h2>

    <div className="space-y-4 mb-10">

      {quizQuestions[currentQuestion].options.map((option) => (

        <button
          key={option}
          onClick={() => setSelectedAnswer(option)}
          className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
            selectedAnswer === option
              ? "bg-blue-600 border-blue-400"
              : "bg-[#181818] border-gray-800 hover:border-blue-500"
          }`}
        >

          <span className="text-xl">
            {option}
          </span>

        </button>

      ))}

    </div>

    {!showExplanation ? (

      <button
        onClick={handleQuizAnswer}
        disabled={!selectedAnswer}
        className={`px-8 py-4 rounded-2xl font-semibold ${
          selectedAnswer
            ? "bg-blue-600 hover:bg-blue-500"
            : "bg-gray-800 text-gray-500"
        }`}
      >
        Submit Answer
      </button>

    ) : (

      <div>

        <div className="bg-[#181818] border border-blue-900 rounded-3xl p-8 mb-10">

          <h3 className="text-2xl font-bold text-blue-400 mb-4">
            Engineering Explanation
          </h3>

          <p className="text-gray-300 leading-8">
            {
              quizQuestions[currentQuestion]
                .explanation
            }
          </p>

        </div>

        <button
          onClick={nextQuestion}
          className="bg-green-600 hover:bg-green-500 px-8 py-4 rounded-2xl font-semibold"
        >
          Next Question →
        </button>

      </div>

    )}

  </section>

)}

{/* QUIZ RESULT */}

{quizCompleted && (

  <section className="bg-[#111] border border-gray-800 rounded-3xl p-10 text-center">

    <h2 className="text-6xl font-bold mb-8">

      {quizPassed
        ? "Certification Achieved"
        : "Assessment Not Passed"}

    </h2>

    <p className="text-3xl text-blue-400 mb-10">
      Final Score: {quizScore} / 6
    </p>

    {quizPassed ? (

  <div>

    <p className="text-gray-300 text-xl leading-8 max-w-4xl mx-auto mb-12">
      You successfully completed the Connector Fundamentals
      learning mission and demonstrated foundational
      connector engineering competency for customer-facing
      technical product specialist engagement.
    </p>

    <div className="bg-[#181818] border border-green-700 rounded-3xl p-10 max-w-4xl mx-auto mb-10">

      <h3 className="text-4xl font-bold text-green-400 mb-8">
        Competencies Achieved
      </h3>

      <div className="grid md:grid-cols-2 gap-6 text-left">

        <div className="bg-[#222] rounded-2xl p-5">
          Connector Fundamentals
        </div>

        <div className="bg-[#222] rounded-2xl p-5">
          Connector Anatomy
        </div>

        <div className="bg-[#222] rounded-2xl p-5">
          Environmental Protection
        </div>

        <div className="bg-[#222] rounded-2xl p-5">
          Connector Reliability
        </div>

        <div className="bg-[#222] rounded-2xl p-5">
          Product Specialist Readiness
        </div>

        <div className="bg-[#222] rounded-2xl p-5">
          Engineering Decision Making
        </div>

      </div>

    </div>

    <div className="bg-[#151515] border border-blue-900 rounded-3xl p-8 max-w-3xl mx-auto">

      <h3 className="text-3xl font-bold text-blue-400 mb-6">
        Mission Summary
      </h3>

      <div className="space-y-4 text-gray-300 leading-8">

        <p>
          • Total XP Earned: {xp}
        </p>

        <p>
          • Certification Status: Passed
        </p>

        <p>
          • Competency Level: Strong
        </p>

        <p>
          • Next Module: Advanced Connector Systems
        </p>

      </div>

      <div className="flex gap-6 justify-center flex-wrap mt-12">

        <button
          onClick={() => {
            window.location.href = "/dashboard";
          }}
          className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-2xl font-semibold"
        >
          Return to Dashboard
        </button>

        <button
          onClick={() => {
            window.location.href =
              "/mission/advanced-connector-systems";
          }}
          className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-semibold"
        >
          Proceed to Next Module →
        </button>

      </div>

    </div>

  </div>

) : (

      <div>

        <p className="text-gray-300 text-xl leading-8 mb-10">
          Review the module content and retry the certification
          assessment to strengthen your engineering understanding.
        </p>

        <div className="flex gap-6 justify-center flex-wrap">

          <button
            onClick={retryQuiz}
            className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-semibold"
          >
            Retry Quiz
          </button>

          <button
            onClick={retakeCourse}
            className="bg-red-600 hover:bg-red-500 px-8 py-4 rounded-2xl font-semibold"
          >
            Retake Course
          </button>

        </div>

      </div>

    )}

  </section>

)}
        
      </div>

    </main>
  );
}
