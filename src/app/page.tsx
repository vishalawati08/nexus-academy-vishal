"use client";

import Link from "next/link";

export default function HomePage() {

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

      {/* Navbar */}
      <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">

        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

          {/* Brand */}
          <div>

            <h1 className="text-2xl font-bold">
              Nexus Academy
            </h1>

            <p className="text-sm text-zinc-500 mt-1">
              AI Product Specialist Enablement Platform
            </p>

          </div>

          {/* Nav */}
          <div className="flex items-center gap-8 text-sm font-medium">

            <Link
              href="/dashboard"
              className="text-zinc-400 hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              href="/training"
              className="text-zinc-400 hover:text-blue-400 transition"
            >
              Training
            </Link>

            <Link
              href="/simulation"
              className="text-zinc-400 hover:text-blue-400 transition"
            >
              Simulation
            </Link>

            <Link
              href="/analytics"
              className="text-zinc-400 hover:text-blue-400 transition"
            >
              Analytics
            </Link>

          </div>

        </div>

      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-28 pb-24">

        <div className="max-w-5xl">

          <p className="text-blue-500 font-semibold uppercase tracking-[0.3em] mb-8">
            Enterprise AI Learning Infrastructure
          </p>

          <h1 className="text-7xl font-bold leading-tight mb-10">

            Reinventing
            <br />

            Product Specialist
            <br />

            Onboarding

          </h1>

          <p className="text-zinc-400 text-2xl leading-[3rem] max-w-4xl mb-12">

            Guided technical learning, AI mentor simulations,
            competency evaluation, and onboarding intelligence —
            unified into one scalable enterprise platform.

          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-6">

            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-500 transition px-10 py-5 rounded-2xl text-lg font-semibold"
            >
              Enter Platform
            </Link>

            <Link
              href="/simulation"
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition px-10 py-5 rounded-2xl text-lg font-semibold"
            >
              View Simulation
            </Link>

          </div>

        </div>

      </section>

      {/* Metrics */}
      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <p className="text-zinc-500 mb-4">
              Onboarding Reduction
            </p>

            <h2 className="text-6xl font-bold">
              40%
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <p className="text-zinc-500 mb-4">
              Simulation Accuracy
            </p>

            <h2 className="text-6xl font-bold">
              91%
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <p className="text-zinc-500 mb-4">
              Learning Engagement
            </p>

            <h2 className="text-6xl font-bold">
              88%
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <p className="text-zinc-500 mb-4">
              Readiness Tracking
            </p>

            <h2 className="text-6xl font-bold">
              Real-Time
            </h2>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 pb-32">

        <div className="mb-16">

          <p className="text-blue-500 font-semibold uppercase tracking-[0.3em] mb-6">
            Platform Capabilities
          </p>

          <h2 className="text-6xl font-bold">
            Built for Modern Technical Enablement
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Feature */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500/40 transition">

            <h3 className="text-3xl font-bold mb-6">
              Guided Learning
            </h3>

            <p className="text-zinc-400 leading-9 text-lg">

              Structured Product Specialist onboarding with progressive learning,
              technical mentoring, assessments, and certification workflows.

            </p>

          </div>

          {/* Feature */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500/40 transition">

            <h3 className="text-3xl font-bold mb-6">
              AI Simulations
            </h3>

            <p className="text-zinc-400 leading-9 text-lg">

              Real-world customer challenge environments evaluating engineering reasoning,
              connector selection logic, and application understanding.

            </p>

          </div>

          {/* Feature */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500/40 transition">

            <h3 className="text-3xl font-bold mb-6">
              Team Intelligence
            </h3>

            <p className="text-zinc-400 leading-9 text-lg">

              Manager dashboards delivering onboarding analytics,
              competency visibility, weak skill detection, and readiness scoring.

            </p>

          </div>

        </div>

      </section>

      {/* Journey */}
      <section className="max-w-7xl mx-auto px-8 pb-32">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>

            <p className="text-blue-500 font-semibold uppercase tracking-[0.3em] mb-6">
              Learning Journey
            </p>

            <h2 className="text-6xl font-bold leading-tight mb-10">

              From New Hire
              <br />
              to Product Specialist

            </h2>

            <p className="text-zinc-400 text-xl leading-[3rem]">

              Nexus Academy combines structured onboarding,
              technical simulations, competency validation,
              and AI-assisted coaching into one seamless learning ecosystem.

            </p>

          </div>

          {/* Right */}
          <div className="space-y-6">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-3">
                01 — Foundation Learning
              </h3>

              <p className="text-zinc-400 leading-8">
                Connector fundamentals, portfolio understanding,
                and guided technical onboarding.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-3">
                02 — AI Mentor Coaching
              </h3>

              <p className="text-zinc-400 leading-8">
                Progressive assessments, competency validation,
                and adaptive mentoring experiences.
              </p>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-3">
                03 — Customer Simulations
              </h3>

              <p className="text-zinc-400 leading-8">
                Real-world engineering evaluations and Product Specialist readiness testing.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Final CTA */}
      <section className="border-t border-zinc-800">

        <div className="max-w-7xl mx-auto px-8 py-24 text-center">

          <p className="text-blue-500 font-semibold uppercase tracking-[0.3em] mb-6">
            Future of Technical Enablement
          </p>

          <h2 className="text-6xl font-bold mb-10 leading-tight">

            Transform Enterprise
            <br />
            Onboarding at Scale

          </h2>

          <p className="text-zinc-400 text-xl leading-[3rem] max-w-4xl mx-auto mb-12">

            AI-guided learning, simulations, competency intelligence,
            and scalable technical onboarding — unified into one platform.

          </p>

          <Link
            href="/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-500 transition px-12 py-6 rounded-2xl text-xl font-semibold"
          >
            Launch Platform
          </Link>

        </div>

      </section>

    </main>
  );
}