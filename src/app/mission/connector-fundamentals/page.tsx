"use client";

import { useEffect, useState } from "react";

export default function ConnectorFundamentalsMission() {

  const [step, setStep] = useState(1);

  const [xp, setXp] = useState(0);

  const [connectorMated, setConnectorMated] = useState(false);

  const [selectedPart, setSelectedPart] = useState("");

  const [exploredParts, setExploredParts] = useState<string[]>([]);

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  const [challengePassed, setChallengePassed] = useState(false);

  const [retryCount, setRetryCount] = useState(0);

  const progress = (step / 5) * 100;

  /* =========================
     LOAD SAVED DATA
  ========================== */

  useEffect(() => {

    const savedData = localStorage.getItem(
      "connectorFundamentalsProgress"
    );

    if (savedData) {

      const parsed = JSON.parse(savedData);

      setStep(parsed.step || 1);

      setXp(parsed.xp || 0);

      setConnectorMated(parsed.connectorMated || false);

      setSelectedPart(parsed.selectedPart || "");

      setExploredParts(parsed.exploredParts || []);

      setChallengePassed(parsed.challengePassed || false);

      setRetryCount(parsed.retryCount || 0);

    }

  }, []);

  /* =========================
     SAVE DATA
  ========================== */

  useEffect(() => {

    localStorage.setItem(
      "connectorFundamentalsProgress",
      JSON.stringify({

        step,
        xp,
        connectorMated,
        selectedPart,
        exploredParts,
        challengePassed,
        retryCount,

      })
    );

  }, [
    step,
    xp,
    connectorMated,
    selectedPart,
    exploredParts,
    challengePassed,
    retryCount,
  ]);

  /* =========================
     ANATOMY DATA
  ========================== */

  const anatomyData = {

    Housing:
      "Provides structural protection, insulation, terminal alignment, and durability under vibration and thermal stress.",

    Terminal:
      "Creates the conductive electrical pathway for signal and power transfer while minimizing resistance and heat generation.",

    Seal:
      "Protects against water ingress, contaminants, and harsh environmental exposure in automotive and industrial systems.",

    "Locking Feature":
      "Ensures secure connector retention during vibration, shock, and repeated mating cycles.",

    Polarization:
      "Prevents incorrect mating orientation and reduces risk of electrical mismatch or equipment damage.",

    "Guide Post":
      "Supports alignment accuracy during mating and minimizes terminal damage risk.",

  };

  /* =========================
     STEP CONTROL
  ========================== */

  const nextStep = () => {

    setStep((prev) => prev + 1);

    setXp((prev) => prev + 20);

  };

  /* =========================
     EXPLORE ANATOMY
  ========================== */

  const handleExplorePart = (part: string) => {

    setSelectedPart(part);

    if (!exploredParts.includes(part)) {

      setExploredParts([...exploredParts, part]);

      setXp((prev) => prev + 5);

    }
  };

  /* =========================
     QUIZ SELECTION
  ========================== */

  const toggleFeature = (feature: string) => {

    if (selectedFeatures.includes(feature)) {

      setSelectedFeatures(
        selectedFeatures.filter((f) => f !== feature)
      );

    } else {

      setSelectedFeatures([
        ...selectedFeatures,
        feature,
      ]);

    }
  };

  /* =========================
     QUIZ SUBMISSION
  ========================== */

  const submitChallenge = () => {

    const requiredFeatures = [
      "Seal",
      "Locking Feature",
      "Housing",
    ];

    const passed = requiredFeatures.every((item) =>
      selectedFeatures.includes(item)
    );

    setChallengeSubmitted(true);

    setChallengePassed(passed);

    if (passed) {

      setXp((prev) => prev + 40);

      localStorage.setItem(
        "connectorFundamentalsCompleted",
        "true"
      );

      localStorage.setItem(
        "connectorFundamentalsCompetency",
        "Strong"
      );

    } else {

      setRetryCount((prev) => prev + 1);

    }
  };

  /* =========================
     RETRY QUIZ
  ========================== */

  const retryQuiz = () => {

    setSelectedFeatures([]);

    setChallengeSubmitted(false);

    setChallengePassed(false);

  };

  /* =========================
     RETAKE COURSE
  ========================== */

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

    setConnectorMated(false);

    setSelectedPart("");

    setExploredParts([]);

    setSelectedFeatures([]);

    setChallengeSubmitted(false);

    setChallengePassed(false);

    setRetryCount(0);

  };

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

        <p className="text-gray-400 text-xl mb-10">
          Guided Product Specialist Engineering Mission
        </p>

        {/* PROGRESS */}

        <div className="mb-8">

          <div className="flex justify-between mb-2">

            <p className="text-gray-400">
              Mission Progress
            </p>

            <p className="text-blue-400 font-semibold">
              {Math.round(progress)}%
            </p>

          </div>

          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">

            <div
              className="bg-blue-600 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

          </div>

        </div>

        {/* XP */}

        <div className="mb-10 flex gap-6 flex-wrap">

          <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 w-56">

            <p className="text-gray-400 mb-3">
              XP Earned
            </p>

            <h2 className="text-5xl font-bold text-blue-500">
              {xp}
            </h2>

          </div>

          <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 w-64">

            <p className="text-gray-400 mb-3">
              Competency
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              {challengePassed
                ? "Strong"
                : "In Progress"}
            </h2>

          </div>

        </div>

        {/* STEP 1 */}

        {step === 1 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
              Step 1
            </p>

            <h2 className="text-5xl font-bold mb-6">
              What We Sell at Molex
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              <div className="bg-[#151515] border border-gray-800 rounded-2xl p-8">

                <h3 className="text-3xl font-bold mb-4">
                  Wire-to-Wire
                </h3>

                <p className="text-gray-400 leading-8">
                  Used in cable harness systems for direct cable mating,
                  high-current transfer, and vibration-resistant
                  automotive applications.
                </p>

              </div>

              <div className="bg-[#151515] border border-gray-800 rounded-2xl p-8">

                <h3 className="text-3xl font-bold mb-4">
                  Wire-to-Board
                </h3>

                <p className="text-gray-400 leading-8">
                  Connects discrete wires to PCBs while supporting
                  compact packaging, automated assembly,
                  and signal integrity.
                </p>

              </div>

              <div className="bg-[#151515] border border-gray-800 rounded-2xl p-8">

                <h3 className="text-3xl font-bold mb-4">
                  Board-to-Board
                </h3>

                <p className="text-gray-400 leading-8">
                  Enables high-speed communication between PCBs in
                  compact electronics, servers, and AI systems.
                </p>

              </div>

              <div className="bg-[#151515] border border-gray-800 rounded-2xl p-8">

                <h3 className="text-3xl font-bold mb-4">
                  Automotive Connectors
                </h3>

                <p className="text-gray-400 leading-8">
                  Engineered for harsh EV environments with sealing,
                  locking systems, CPA/TPA, and vibration resistance.
                </p>

              </div>

            </div>

            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl"
            >
              Continue →
            </button>

          </section>

        )}

        {/* STEP 2 */}

        {step === 2 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
              Step 2
            </p>

            <h2 className="text-5xl font-bold mb-6">
              Connector Mating Simulation
            </h2>

            <div className="bg-[#151515] border border-gray-800 rounded-3xl p-10 mb-10">

              <div className="mb-8">

                <p
                  className={`font-semibold mb-3 ${
                    connectorMated
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >

                  {connectorMated
                    ? "Electrical Path Active"
                    : "Electrical Path Open"}

                </p>

                <h2
                  className={`text-5xl font-bold ${
                    connectorMated
                      ? "text-green-400"
                      : "text-white"
                  }`}
                >

                  {connectorMated
                    ? "CONNECTED"
                    : "DISCONNECTED"}

                </h2>

              </div>

              <div className="relative h-72 flex items-center justify-center overflow-hidden">

                {/* SIGNAL */}

                <div
                  className={`absolute h-3 rounded-full transition-all duration-700 ${
                    connectorMated
                      ? "w-[320px] bg-green-400 shadow-[0_0_30px_#4ade80]"
                      : "w-24 bg-red-500"
                  }`}
                />

                {/* LEFT CONNECTOR */}

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

                {/* RIGHT CONNECTOR */}

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

              <div className="flex justify-end">

                <button
                  onClick={() => {

                    setConnectorMated(true);

                    setXp((prev) => prev + 20);

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

              </div>

            </div>

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

          </section>

        )}

        {/* STEP 3 */}

        {step === 3 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <h2 className="text-5xl font-bold mb-8">
              Connector Anatomy
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              {Object.keys(anatomyData).map((part) => (

                <div
                  key={part}
                  onClick={() => handleExplorePart(part)}
                  className={`border rounded-2xl p-8 cursor-pointer transition ${
                    selectedPart === part
                      ? "bg-blue-600 border-blue-400"
                      : "bg-[#151515] border-gray-800"
                  }`}
                >

                  <h3 className="text-3xl font-bold mb-4">
                    {part}
                  </h3>

                  <p className="text-gray-400">
                    Click to explore engineering functionality.
                  </p>

                </div>

              ))}

            </div>

            {selectedPart && (

              <div className="bg-[#151515] border border-blue-900 rounded-3xl p-8 mb-10">

                <h3 className="text-5xl font-bold mb-6">
                  {selectedPart}
                </h3>

                <p className="text-gray-300 text-lg leading-9">
                  {anatomyData[selectedPart as keyof typeof anatomyData]}
                </p>

              </div>

            )}

            <button
              onClick={nextStep}
              disabled={exploredParts.length < 3}
              className={`px-8 py-4 rounded-2xl ${
                exploredParts.length >= 3
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-800 text-gray-500"
              }`}
            >
              Continue →
            </button>

          </section>

        )}

        {/* STEP 4 */}

        {step === 4 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <h2 className="text-6xl font-bold mb-8">
              Customer Engineering Challenge
            </h2>

            <div className="bg-[#151515] border border-blue-900 rounded-3xl p-8 mb-10">

              <h3 className="text-3xl font-bold mb-6">
                EV Battery Connector Application
              </h3>

              <ul className="space-y-5 text-gray-300 text-xl">

                <li>• High vibration resistance</li>

                <li>• IP67 environmental sealing</li>

                <li>• High current capability</li>

                <li>• Secure locking mechanism</li>

              </ul>

            </div>

            <h3 className="text-3xl font-bold mb-8">
              Select critical connector features:
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              {[
                "Seal",
                "Locking Feature",
                "Housing",
                "Polarization",
                "Guide Post",
                "Terminal",
              ].map((feature) => (

                <div
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`border rounded-2xl p-8 cursor-pointer transition ${
                    selectedFeatures.includes(feature)
                      ? "bg-blue-600 border-blue-400"
                      : "bg-[#151515] border-gray-800"
                  }`}
                >

                  <h3 className="text-3xl font-bold">
                    {feature}
                  </h3>

                </div>

              ))}

            </div>

            {!challengeSubmitted && (

              <button
                onClick={submitChallenge}
                disabled={selectedFeatures.length < 3}
                className={`px-8 py-4 rounded-2xl ${
                  selectedFeatures.length >= 3
                    ? "bg-blue-600 hover:bg-blue-500"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                Submit Engineering Decision
              </button>

            )}

            {challengeSubmitted && (

              <div className="mt-10">

                {challengePassed ? (

                  <div className="bg-[#151515] border border-green-700 rounded-3xl p-10">

                    <h3 className="text-5xl font-bold text-green-400 mb-6">
                      Excellent Engineering Judgment
                    </h3>

                    <p className="text-gray-300 text-xl leading-9 mb-8">
                      You correctly prioritized sealing,
                      connector retention,
                      and structural durability for EV applications.
                    </p>

                    <button
                      onClick={nextStep}
                      className="bg-green-600 hover:bg-green-500 transition px-8 py-4 rounded-2xl"
                    >
                      Complete Mission →
                    </button>

                  </div>

                ) : (

                  <div className="bg-[#151515] border border-red-700 rounded-3xl p-10">

                    <h3 className="text-5xl font-bold text-red-400 mb-6">
                      Re-evaluate Requirements
                    </h3>

                    <p className="text-gray-300 text-xl leading-9 mb-8">
                      Review which features directly support
                      environmental sealing,
                      retention stability,
                      and mechanical durability.
                    </p>

                    <div className="bg-[#101010] border border-gray-800 rounded-2xl p-8 mb-8">

                      <h4 className="text-2xl font-bold text-blue-400 mb-4">
                        AI Mentor Feedback
                      </h4>

                      <ul className="space-y-4 text-gray-300 text-lg">

                        <li>
                          • Seals prevent contaminant ingress
                        </li>

                        <li>
                          • Locking features prevent disconnect
                        </li>

                        <li>
                          • Housing improves structural integrity
                        </li>

                      </ul>

                    </div>

                    <div className="flex gap-6 flex-wrap">

                      <button
                        onClick={retryQuiz}
                        className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl"
                      >
                        Retry Quiz
                      </button>

                      <button
                        onClick={retakeCourse}
                        className="bg-gray-800 hover:bg-gray-700 transition px-8 py-4 rounded-2xl"
                      >
                        Retake Course
                      </button>

                    </div>

                  </div>

                )}

              </div>

            )}

          </section>

        )}

        {/* STEP 5 */}

        {step === 5 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10 text-center">

            <h2 className="text-6xl font-bold mb-8">
              Mission Complete
            </h2>

            <p className="text-gray-400 text-xl leading-9 max-w-4xl mx-auto mb-10">
              You completed the Connector Fundamentals mission
              and demonstrated competency in connector engineering,
              anatomy understanding,
              and application prioritization.
            </p>

            <div className="bg-[#151515] rounded-3xl p-10 max-w-xl mx-auto border border-blue-900 mb-10">

              <p className="text-gray-400 mb-4">
                Final XP Earned
              </p>

              <h2 className="text-7xl font-bold text-blue-500">
                {xp}
              </h2>

            </div>

            <div className="bg-[#101010] border border-gray-800 rounded-3xl p-8 max-w-3xl mx-auto">

              <h3 className="text-3xl font-bold mb-6 text-green-400">
                Competencies Achieved
              </h3>

              <div className="grid md:grid-cols-2 gap-4 text-left">

                <div className="bg-[#151515] p-5 rounded-2xl">
                  Connector Fundamentals
                </div>

                <div className="bg-[#151515] p-5 rounded-2xl">
                  Connector Anatomy
                </div>

                <div className="bg-[#151515] p-5 rounded-2xl">
                  Engineering Evaluation
                </div>

                <div className="bg-[#151515] p-5 rounded-2xl">
                  Product Specialist Readiness
                </div>

              </div>

            </div>

          </section>

        )}

      </div>

    </main>
  );
}
