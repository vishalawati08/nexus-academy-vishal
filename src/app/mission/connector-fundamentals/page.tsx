"use client";

import { useState } from "react";

export default function ConnectorFundamentalsMission() {
const [step, setStep] = useState(1);
const [xp, setXp] = useState(0);

const nextStep = () => {
setStep(step + 1);
setXp(xp + 20);
};

const progress = (step / 5) * 100;

return ( <main className="min-h-screen bg-black text-white px-6 py-10">

```
  {/* HEADER */}

  <div className="max-w-6xl mx-auto">

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
        <p className="text-gray-400">Mission Progress</p>
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

    <div className="mb-10 flex gap-6">

      <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 w-56">
        <p className="text-gray-400 mb-3">XP Earned</p>
        <h2 className="text-5xl font-bold text-blue-500">
          {xp}
        </h2>
      </div>

      <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 w-72">
        <p className="text-gray-400 mb-3">Current Mission</p>
        <h2 className="text-2xl font-bold">
          Connector Fundamentals
        </h2>
      </div>

    </div>

    {/* STEP CONTENT */}

    {step === 1 && (
      <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

        <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
          Mission Brief
        </p>

        <h2 className="text-4xl font-bold mb-6">
          Welcome Product Specialist
        </h2>

        <p className="text-gray-400 text-lg leading-9 mb-8">
          In this mission, you will learn how Molex connector systems
          enable reliable signal and power transmission across modern
          electronic ecosystems including EVs, servers, industrial
          automation, and consumer electronics.
        </p>

        <div className="bg-[#151515] rounded-2xl p-6 mb-8 border border-blue-900">
          <p className="text-blue-400 mb-2 font-semibold">
            AI Mentor
          </p>

          <p className="text-gray-300 leading-8">
            “Your objective is to understand connector fundamentals,
            connector anatomy, and engineering considerations before
            moving into customer-facing product selection scenarios.”
          </p>
        </div>

        <button
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl font-semibold text-lg"
        >
          Start Mission →
        </button>

      </section>
    )}

    {step === 2 && (
      <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

        <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
          Step 1
        </p>

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
                Molex provides reliable interconnect solutions for
                modern electronic systems requiring power delivery,
                signal integrity, and durability.
              </p>
            </div>
          ))}

        </div>

        <div className="bg-[#151515] rounded-2xl p-6 mb-8 border border-blue-900">
          <p className="text-blue-400 mb-2 font-semibold">
            AI Mentor Insight
          </p>

          <p className="text-gray-300 leading-8">
            “Notice how connector categories vary based on application,
            environment, signal requirements, and packaging constraints.”
          </p>
        </div>

        <button
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl font-semibold text-lg"
        >
          Continue →
        </button>

      </section>
    )}

    {step === 3 && (
      <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

        <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
          Step 2
        </p>

        <h2 className="text-4xl font-bold mb-8">
          What is a Connector?
        </h2>

        <p className="text-gray-400 text-lg leading-9 mb-8">
          A connector bridges electrical pathways between conductors
          while enabling reliable signal and power transmission.
        </p>

        <div className="bg-[#151515] rounded-2xl p-8 mb-8 border border-gray-800">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-red-400 mb-2">
                Electrical Path Open
              </p>

              <h3 className="text-3xl font-bold">
                DISCONNECTED
              </h3>
            </div>

            <button className="bg-blue-600 px-6 py-3 rounded-xl">
              Mate Connector
            </button>

          </div>

        </div>

        <div className="bg-[#151515] rounded-2xl p-6 mb-8 border border-blue-900">
          <p className="text-blue-400 mb-2 font-semibold">
            AI Mentor
          </p>

          <p className="text-gray-300 leading-8">
            “Connectors simplify maintenance, modularity, replacement,
            and system scalability across electronic architectures.”
          </p>
        </div>

        <button
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl font-semibold text-lg"
        >
          Continue →
        </button>

      </section>
    )}

    {step === 4 && (
      <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10">

        <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
          Step 3
        </p>

        <h2 className="text-4xl font-bold mb-8">
          Connector Anatomy
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          {[
            "Housing",
            "Terminal",
            "Seal",
            "Locking Feature",
            "Polarization",
            "Guide Post",
          ].map((part) => (
            <div
              key={part}
              className="bg-[#151515] border border-gray-800 hover:border-blue-600 transition rounded-2xl p-6 cursor-pointer"
            >
              <h3 className="text-2xl font-bold mb-4">
                {part}
              </h3>

              <p className="text-gray-400 leading-7">
                Click to explore engineering functionality and
                application importance.
              </p>
            </div>
          ))}

        </div>

        <div className="bg-[#151515] rounded-2xl p-6 mb-8 border border-blue-900">
          <p className="text-blue-400 mb-2 font-semibold">
            Mentor Guidance
          </p>

          <p className="text-gray-300 leading-8">
            “Connector design directly impacts reliability, vibration
            resistance, environmental protection, and signal integrity.”
          </p>
        </div>

        <button
          onClick={nextStep}
          className="bg-blue-600 hover:bg-blue-500 transition px-8 py-4 rounded-2xl font-semibold text-lg"
        >
          Continue →
        </button>

      </section>
    )}

    {step === 5 && (
      <section className="bg-[#0d0d0d] border border-gray-800 rounded-3xl p-10 text-center">

        <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
          Mission Complete
        </p>

        <h2 className="text-5xl font-bold mb-6">
          Connector Fundamentals Completed
        </h2>

        <p className="text-gray-400 text-xl leading-9 max-w-3xl mx-auto mb-10">
          You have completed the first learning mission and gained
          foundational understanding of Molex connector ecosystems
          and connector engineering principles.
        </p>

        <div className="bg-[#151515] rounded-3xl p-8 max-w-xl mx-auto border border-blue-900 mb-10">
          <p className="text-gray-400 mb-4">
            Final XP Earned
          </p>

          <h2 className="text-7xl font-bold text-blue-500">
            {xp}
          </h2>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 transition px-10 py-5 rounded-2xl font-semibold text-xl">
          Continue Learning Journey →
        </button>

      </section>
    )}

  </div>

</main>
```

);
}
