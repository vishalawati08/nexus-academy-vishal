"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function DashboardPage() {

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

    <Navbar />  

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">

        {/* Hero */}
        <div className="mb-14">

          <p className="text-blue-500 font-semibold mb-5 tracking-wide uppercase">
            Product Specialist Learning Ecosystem
          </p>

          <h1 className="text-6xl font-bold leading-tight mb-6">

            Welcome back,
            <br />
            Vishal

          </h1>

          <p className="text-zinc-400 text-xl max-w-4xl leading-9">

            Accelerate Product Specialist onboarding through guided learning,
            competency tracking, technical simulations, and AI-assisted mentoring.

          </p>

        </div>

        {/* Analytics Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

          {/* Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-blue-500/40 transition">

            <p className="text-zinc-400 mb-4">
              Readiness Score
            </p>

            <h2 className="text-6xl font-bold">
              78%
            </h2>

            <p className="text-green-400 mt-4 text-sm">
              +12% this week
            </p>

          </div>

          {/* Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-blue-500/40 transition">

            <p className="text-zinc-400 mb-4">
              Modules Completed
            </p>

            <h2 className="text-6xl font-bold">
              3
            </h2>

            <p className="text-zinc-500 mt-4 text-sm">
              Foundation track active
            </p>

          </div>

          {/* Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-blue-500/40 transition">

            <p className="text-zinc-400 mb-4">
              Simulation Score
            </p>

            <h2 className="text-6xl font-bold">
              83%
            </h2>

            <p className="text-zinc-500 mt-4 text-sm">
              Customer challenge completed
            </p>

          </div>

          {/* Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7 hover:border-blue-500/40 transition">

            <p className="text-zinc-400 mb-4">
              Certification Status
            </p>

            <h2 className="text-3xl font-bold leading-tight">
              In Progress
            </h2>

            <p className="text-zinc-500 mt-4 text-sm">
              Product Families unlocked
            </p>

          </div>

        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            {/* Learning Journey */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <div className="flex items-center justify-between mb-10">

                <div>

                  <h2 className="text-4xl font-bold">
                    Learning Journey
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    Structured Product Specialist progression path
                  </p>

                </div>

                <div className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm">
                  Active Track
                </div>

              </div>

              <div className="space-y-8">

                {/* Step */}
                <div className="flex gap-6">

                  <div className="flex flex-col items-center">

                    <div className="w-5 h-5 rounded-full bg-green-500 mt-2" />

                    <div className="w-[2px] h-24 bg-zinc-800 mt-3" />

                  </div>

                  <div className="flex-1">

                    <h3 className="text-2xl font-semibold">
                      Connector Fundamentals
                    </h3>

                    <p className="text-zinc-400 mt-2 leading-8">
                      Completed with full assessment score and mentor validation.
                      Core understanding of connector architecture, reliability,
                      and application fundamentals established.
                    </p>

                  </div>

                </div>

                {/* Step */}
                <div className="flex gap-6">

                  <div className="flex flex-col items-center">

                    <div className="w-5 h-5 rounded-full bg-blue-500 animate-pulse mt-2" />

                    <div className="w-[2px] h-24 bg-zinc-800 mt-3" />

                  </div>

                  <div className="flex-1">

                    <h3 className="text-2xl font-semibold">
                      Product Families
                    </h3>

                    <p className="text-zinc-400 mt-2 leading-8">
                      Currently active learning module covering portfolio
                      understanding, segmentation, and application alignment.
                    </p>

                  </div>

                </div>

                {/* Step */}
                <div className="flex gap-6 opacity-50">

                  <div className="flex flex-col items-center">

                    <div className="w-5 h-5 rounded-full bg-zinc-700 mt-2" />

                    <div className="w-[2px] h-24 bg-zinc-800 mt-3" />

                  </div>

                  <div className="flex-1">

                    <h3 className="text-2xl font-semibold">
                      Connector Selection
                    </h3>

                    <p className="text-zinc-500 mt-2 leading-8">
                      Advanced engineering decision-making, current rating,
                      sealing strategy, packaging constraints, and reliability
                      evaluation.
                    </p>

                  </div>

                </div>

                {/* Step */}
                <div className="flex gap-6 opacity-50">

                  <div className="flex flex-col items-center">

                    <div className="w-5 h-5 rounded-full bg-zinc-700 mt-2" />

                  </div>

                  <div className="flex-1">

                    <h3 className="text-2xl font-semibold">
                      Customer Simulation Challenges
                    </h3>

                    <p className="text-zinc-500 mt-2 leading-8">
                      Real-world Product Specialist competency evaluation
                      through customer application scenarios and technical
                      recommendation workflows.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* XP / Achievement */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-bold">
                    Performance Snapshot
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    AI-generated readiness and engagement metrics
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-zinc-500 text-sm">
                    Current Level
                  </p>

                  <h2 className="text-3xl font-bold">
                    Level 3
                  </h2>

                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-black border border-zinc-800 rounded-2xl p-6">

                  <p className="text-zinc-500 mb-2">
                    XP Earned
                  </p>

                  <h2 className="text-5xl font-bold">
                    1,240
                  </h2>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-6">

                  <p className="text-zinc-500 mb-2">
                    Learning Streak
                  </p>

                  <h2 className="text-5xl font-bold">
                    12
                  </h2>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-6">

                  <p className="text-zinc-500 mb-2">
                    Top Ranking
                  </p>

                  <h2 className="text-5xl font-bold">
                    #4
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* Quick Access */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-8">
                Quick Access
              </h2>

              <div className="space-y-5">

                <Link
                  href="/training"
                  className="block bg-blue-600 hover:bg-blue-500 transition rounded-2xl p-6"
                >

                  <h3 className="text-2xl font-semibold mb-3">
                    Continue Training
                  </h3>

                  <p className="text-blue-100 leading-7">
                    Resume guided Product Specialist onboarding journey
                  </p>

                </Link>

                <Link
                  href="/simulation"
                  className="block bg-zinc-800 hover:bg-zinc-700 transition rounded-2xl p-6"
                >

                  <h3 className="text-2xl font-semibold mb-3">
                    Customer Challenge
                  </h3>

                  <p className="text-zinc-300 leading-7">
                    Practice real-world engineering recommendation scenarios
                  </p>

                </Link>

                <div className="bg-zinc-800 rounded-2xl p-6">

                  <h3 className="text-2xl font-semibold mb-3">
                    Knowledge Base
                  </h3>

                  <p className="text-zinc-300 leading-7">
                    Connector documentation, application references,
                    and portfolio intelligence
                  </p>

                </div>

              </div>

            </div>

            {/* AI Mentor Status */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="text-3xl font-bold">
                    Mentor Status
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    AI learning orchestration engine
                  </p>

                </div>

                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />

              </div>

              <div className="space-y-5">

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500 text-sm mb-2">
                    Active Learning Mode
                  </p>

                  <h3 className="text-xl font-semibold">
                    Guided Technical Coaching
                  </h3>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500 text-sm mb-2">
                    Competency Evaluation
                  </p>

                  <h3 className="text-xl font-semibold">
                    Real-Time Assessment Enabled
                  </h3>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500 text-sm mb-2">
                    Learning Recommendation
                  </p>

                  <h3 className="text-xl font-semibold">
                    Focus on Connector Selection
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}