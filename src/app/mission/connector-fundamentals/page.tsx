```tsx
"use client";

import { useState } from "react";

export default function ConnectorFundamentalsMission() {

  const [step, setStep] = useState(1);
  const [xp, setXp] = useState(0);

  const [selectedPart, setSelectedPart] = useState("");
  const [exploredParts, setExploredParts] = useState<string[]>([]);

  const [connectorMated, setConnectorMated] = useState(false);
  const [connectorXpAwarded, setConnectorXpAwarded] = useState(false);

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengePassed, setChallengePassed] = useState(false);

  const nextStep = () => {
    setStep(step + 1);
    setXp((prev) => prev + 20);
  };

  const progress = (step / 6) * 100;

  const anatomyData = {
    Housing: {
      description:
        "The housing provides structural protection, insulation, and terminal alignment within the connector system.",
      engineering:
        "Engineering considerations include temperature resistance, mechanical durability, and chemical compatibility.",
      applications:
        "Used extensively in EV battery systems, industrial automation, and consumer electronics.",
      failure:
        "Weak housing materials may crack under vibration or thermal stress.",
    },

    Terminal: {
      description:
        "Terminals establish the electrical connection path between mating conductors.",
      engineering:
        "Terminal plating, conductivity, and contact resistance are critical engineering parameters.",
      applications:
        "Common in high-current automotive and power delivery systems.",
      failure:
        "Poor terminal contact may cause overheating or signal degradation.",
    },

    Seal: {
      description:
        "Seals prevent moisture, dust, and contaminants from entering the connector interface.",
      engineering:
        "IP-rated sealing is critical for harsh environments and outdoor applications.",
      applications:
        "Widely used in EV charging systems and automotive connectors.",
      failure:
        "Seal failure can result in corrosion and electrical short circuits.",
    },

    "Locking Feature": {
      description:
        "Locking mechanisms secure the connector during vibration and movement.",
      engineering:
        "Retention force and mating stability are important design considerations.",
      applications:
        "Critical in automotive, aerospace, and industrial machinery.",
      failure:
        "Weak locking may cause connector disengagement during operation.",
    },

    Polarization: {
      description:
        "Polarization prevents incorrect connector mating orientation.",
      engineering:
        "Polarized designs reduce assembly errors and protect electronics.",
      applications:
        "Used in PCB connectors, automotive systems, and medical electronics.",
      failure:
        "Improper mating may damage sensitive electronic circuits.",
    },

    "Guide Post": {
      description:
        "Guide posts assist alignment during connector mating.",
      engineering:
        "Blind mating support is important in compact electronic systems.",
      applications:
        "Common in server infrastructure and board-to-board systems.",
      failure:
        "Misalignment may bend terminals or damage mating interfaces.",
    },
  };

  const toggleFeature = (feature: string) => {

    if (selectedFeatures.includes(feature)) {

      setSelectedFeatures(
        selectedFeatures.filter((f) => f !== feature)
      );

    } else {

      setSelectedFeatures([...selectedFeatures, feature]);

    }
  };

  const submitChallenge = () => {

    const correctAnswers = [
      "Seal",
      "Locking Feature",
      "Housing",
    ];

    const passed =
      correctAnswers.every((item) =>
        selectedFeatures.includes(item)
      ) && selectedFeatures.length === 3;

    setChallengeSubmitted(true);
    setChallengePassed(passed);

    if (passed) {
      setXp((prev) => prev + 40);
    }
  };

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
          Nexus Academy
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-4">
          Connector Fundamentals
        </h1>

        <p className="text-gray-400 text-xl max-w-3xl mb-10">
          Mission 1 — Understanding Electronic Interconnections
        </p>

        {/* PROGRESS */}

        <div className="mb-10">

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

        </div>

        {/* STEP 1 */}

        {step === 1 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-6">
              Welcome Product Specialist
            </h2>

            <p className="text-gray-400 text-lg leading-9 mb-8">
              Learn how Molex connector systems enable reliable signal
              and power transmission across modern electronic systems.
            </p>

            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              Start Mission →
            </button>

          </section>

        )}

        {/* STEP 2 */}

        {step === 2 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-8">
              What We Sell at Molex
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              {[
                "Wire-to-Wire",
                "Wire-to-Board",
                "Board-to-Board",
                "Automotive Connectors",
              ].map((item) => (

                <div
                  key={item}
                  className="bg-[#151515] border border-gray-800 hover:border-blue-600 transition rounded-2xl p-6"
                >

                  <h3 className="text-2xl font-bold mb-4">
                    {item}
                  </h3>

                  <p className="text-gray-400 leading-7">
                    Connector systems designed for signal integrity,
                    power delivery, and reliability across electronic applications.
                  </p>

                </div>

              ))}

            </div>

            <button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              Continue →
            </button>

          </section>

        )}

        {/* STEP 3 */}

        {step === 3 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-8">
              Connector Simulation
            </h2>

            <div className="bg-[#151515] rounded-2xl p-8 mb-8 border border-gray-800 overflow-hidden">

              <div className="flex flex-col gap-10">

                <div>

                  <p
                    className={`mb-2 font-semibold ${
                      connectorMated
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {connectorMated
                      ? "Electrical Path Active"
                      : "Electrical Path Open"}
                  </p>

                  <h3
                    className={`text-4xl font-bold ${
                      connectorMated
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {connectorMated
                      ? "CONNECTED"
                      : "DISCONNECTED"}
                  </h3>

                </div>

                <div className="relative h-52 flex items-center justify-center overflow-hidden">

                  <div
                    className={`absolute h-2 rounded-full transition-all duration-700

                    ${
                      connectorMated
                        ? "w-72 bg-green-400 shadow-[0_0_25px_#4ade80]"
                        : "w-24 bg-red-500"
                    }`}
                  />

                  {connectorMated && (

                    <div className="absolute flex items-center justify-center">

                      <div className="w-12 h-3 bg-cyan-300 rounded-full animate-ping absolute" />

                      <div className="w-8 h-2 bg-blue-400 rounded-full absolute" />

                    </div>

                  )}

                  <div
                    className={`absolute left-10 transition-all duration-700 ease-in-out

                    ${
                      connectorMated
                        ? "translate-x-28"
                        : ""
                    }`}
                  >

                    <div className="w-40 h-24 bg-blue-600 rounded-2xl border-4 border-blue-400" />

                  </div>

                  <div
                    className={`absolute right-10 transition-all duration-700 ease-in-out

                    ${
                      connectorMated
                        ? "-translate-x-28"
                        : ""
                    }`}
                  >

                    <div className="w-40 h-24 bg-gray-700 rounded-2xl border-4 border-gray-500" />

                  </div>

                </div>

                <div className="flex justify-end">

                  <button
                    onClick={() => {

                      setConnectorMated(true);

                      if (!connectorXpAwarded) {
                        setXp((prev) => prev + 15);
                        setConnectorXpAwarded(true);
                      }
                    }}
                    disabled={connectorMated}
                    className={`px-6 py-3 rounded-xl transition font-semibold

                    ${
                      connectorMated
                        ? "bg-green-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-500"
                    }`}
                  >

                    {connectorMated
                      ? "Connector Mated ✓"
                      : "Mate Connector"}

                  </button>

                </div>

              </div>

            </div>

            <button
              onClick={nextStep}
              disabled={!connectorMated}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition

              ${
                connectorMated
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >

              Continue →

            </button>

          </section>

        )}

        {/* STEP 4 */}

        {step === 4 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <h2 className="text-4xl font-bold mb-8">
              Connector Anatomy
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-10">

              {Object.keys(anatomyData).map((part) => (

                <div
                  key={part}
                  onClick={() => {

                    setSelectedPart(part);

                    if (!exploredParts.includes(part)) {
                      setExploredParts([...exploredParts, part]);
                      setXp((prev) => prev + 10);
                    }
                  }}
                  className={`bg-[#151515] border rounded-2xl p-6 cursor-pointer transition

                  ${
                    selectedPart === part
                      ? "border-blue-500"
                      : "border-gray-800 hover:border-blue-600"
                  }`}
                >

                  <h3 className="text-2xl font-bold mb-4">
                    {part}
                  </h3>

                  <p className="text-gray-400 leading-7">
                    Click to explore engineering functionality.
                  </p>

                </div>

              ))}

            </div>

            {selectedPart && (

              <div className="bg-[#151515] border border-blue-900 rounded-3xl p-8 mb-10">

                <h3 className="text-4xl font-bold mb-6">
                  {selectedPart}
                </h3>

                <div className="space-y-6 text-gray-300 leading-8">

                  <p>
                    {anatomyData[selectedPart as keyof typeof anatomyData].description}
                  </p>

                  <p>
                    {anatomyData[selectedPart as keyof typeof anatomyData].engineering}
                  </p>

                  <p>
                    {anatomyData[selectedPart as keyof typeof anatomyData].applications}
                  </p>

                  <p className="text-red-400">
                    {anatomyData[selectedPart as keyof typeof anatomyData].failure}
                  </p>

                </div>

              </div>

            )}

            <button
              onClick={nextStep}
              disabled={exploredParts.length < 3}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition

              ${
                exploredParts.length >= 3
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >

              Continue →

            </button>

          </section>

        )}

        {/* STEP 5 */}

        {step === 5 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

            <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
              Engineering Decision Challenge
            </p>

            <h2 className="text-5xl font-bold mb-8">
              Customer Scenario
            </h2>

            <div className="bg-[#151515] border border-blue-900 rounded-3xl p-8 mb-10">

              <h3 className="text-2xl font-bold mb-6">
                EV Battery Connector Application
              </h3>

              <ul className="space-y-4 text-gray-300 text-lg">

                <li>• High vibration resistance</li>
                <li>• IP67 environmental sealing</li>
                <li>• High current capability</li>
                <li>• Secure locking mechanism</li>

              </ul>

            </div>

            <h3 className="text-2xl font-bold mb-6">
              Select the MOST critical connector features:
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
                  className={`border rounded-2xl p-6 cursor-pointer transition

                  ${
                    selectedFeatures.includes(feature)
                      ? "bg-blue-600 border-blue-400"
                      : "bg-[#151515] border-gray-800 hover:border-blue-600"
                  }`}
                >

                  <h3 className="text-2xl font-bold">
                    {feature}
                  </h3>

                </div>

              ))}

            </div>

            {!challengeSubmitted && (

              <button
                onClick={submitChallenge}
                className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl font-semibold text-lg"
              >
                Submit Engineering Decision
              </button>

            )}

            {challengeSubmitted && (

              <div className="mt-10">

                {challengePassed ? (

                  <div className="bg-[#151515] border border-green-700 rounded-3xl p-8">

                    <h3 className="text-4xl font-bold text-green-400 mb-4">
                      Excellent Engineering Judgment
                    </h3>

                    <p className="text-gray-300 text-lg leading-8">
                      You correctly prioritized environmental sealing,
                      structural protection, and connector retention —
                      critical requirements in EV applications.
                    </p>

                    <button
                      onClick={nextStep}
                      className="mt-8 bg-green-600 hover:bg-green-500 transition px-8 py-4 rounded-2xl font-semibold text-lg"
                    >
                      Complete Mission →
                    </button>

                  </div>

                ) : (

                  <div className="bg-[#151515] border border-red-700 rounded-3xl p-8">

                    <h3 className="text-4xl font-bold text-red-400 mb-4">
                      Re-evaluate Requirements
                    </h3>

                    <p className="text-gray-300 text-lg leading-8">
                      Consider which connector features directly support
                      sealing, vibration resistance, and mechanical retention
                      in harsh EV environments.
                    </p>

                  </div>

                )}

              </div>

            )}

          </section>

        )}

        {/* STEP 6 */}

        {step === 6 && (

          <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10 text-center">

            <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
              Mission Complete
            </p>

            <h2 className="text-5xl font-bold mb-6">
              Connector Fundamentals Completed
            </h2>

            <p className="text-gray-400 text-xl leading-9 max-w-3xl mx-auto mb-10">
              You successfully completed the engineering onboarding mission
              and demonstrated Product Specialist competency fundamentals.
            </p>

            <div className="bg-[#151515] rounded-3xl p-8 max-w-xl mx-auto border border-blue-900 mb-10">

              <p className="text-gray-400 mb-4">
                Final XP Earned
              </p>

              <h2 className="text-7xl font-bold text-blue-500">
                {xp}
              </h2>

            </div>

          </section>

        )}

      </div>

    </main>
  );
}


