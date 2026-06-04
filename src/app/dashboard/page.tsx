"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {

  const [xp, setXp] = useState(0);

  const [completed, setCompleted] = useState(false);

  const [competency, setCompetency] =
    useState("In Progress");

  const [retryCount, setRetryCount] =
  useState(0);

const [badges, setBadges] =
  useState<string[]>([]);
const [engineeringScore, setEngineeringScore] =
  useState(0);
  
  const [modulesCompleted, setModulesCompleted] =
    useState(0);

  const totalModules = 3;

  const overallProgress =
    (modulesCompleted / totalModules) * 100;

  useEffect(() => {

    const progressData = localStorage.getItem(
      "connectorFundamentalsProgress"
    );

    const completedStatus = localStorage.getItem(
      "connectorFundamentalsCompleted"
    );

    const competencyStatus = localStorage.getItem(
      "connectorFundamentalsCompetency"
    );

    const storedXP =
      localStorage.getItem("nexusTotalXP");

    if (storedXP) {

      setXp(Number(storedXP));

    }

    if (progressData) {

  const parsed = JSON.parse(progressData);

  setXp(parsed.xp || 0);

  setRetryCount(parsed.retryCount || 0);

}

const missionData =
  localStorage.getItem(
    "connectorFundamentalsMaster"
  );

if (missionData) {

  const parsedMission =
    JSON.parse(missionData);

  setBadges(
    parsedMission.badges || []
  );
  setEngineeringScore(
  parsedMission.xp || 0
);
}

    if (completedStatus === "true") {

      setCompleted(true);

      setModulesCompleted(1);

    }

    if (competencyStatus) {

      setCompetency(competencyStatus);

    }

  }, []);

  return (

    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-12">

          <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
            Nexus Academy
          </p>

          <h1 className="text-6xl font-bold mb-4">
            Product Specialist Dashboard
          </h1>

          <p className="text-gray-400 text-xl">
            AI-Guided Engineering Learning Platform
          </p>

        </div>

        {/* TOP STATS */}

        <div className="grid md:grid-cols-5 gap-6 mb-12">

          {/* XP */}

          <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

            <p className="text-gray-400 mb-3">
              Total XP
            </p>

            <h2 className="text-5xl font-bold text-blue-500">
              {xp}
            </h2>

          </div>

          {/* COMPLETED */}

          <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

            <p className="text-gray-400 mb-3">
              Modules Completed
            </p>

            <h2 className="text-5xl font-bold text-green-400">
              {modulesCompleted}
            </h2>

          </div>

          {/* COMPETENCY */}

          <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

            <p className="text-gray-400 mb-3">
              Competency
            </p>

            <h2 className="text-3xl font-bold text-green-400">
              {competency}
            </h2>

          </div>

          {/* RETRIES */}

          <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

            <p className="text-gray-400 mb-3">
              Retry Attempts
            </p>

            <h2 className="text-5xl font-bold text-yellow-400">
              {retryCount}
            </h2>

          </div>

        </div>
        {/* LEVEL */}

<div className="bg-[#111] border border-yellow-700 rounded-3xl p-8">

  <p className="text-gray-400 mb-3">
    Current Level
  </p>

  <h2 className="text-5xl font-bold text-yellow-400 mb-3">
    Lv.{calculateLevel(xp).level}
  </h2>

  <p className="text-yellow-300">
    {calculateLevel(xp).title}
  </p>

</div>
        {/* LEARNING PATH */}

        <section className="mb-14">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-4xl font-bold">
              Learning Journey
            </h2>

            <p className="text-blue-400 font-semibold">
              {Math.round(overallProgress)}% Complete
            </p>

          </div>

          <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden mb-10">

            <div
              className="bg-blue-600 h-full transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />

          </div>

          {/* MODULES */}

          <div className="grid md:grid-cols-3 gap-8">

            {/* MODULE 1 */}

            <div className="bg-[#111] border border-blue-900 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]">

              <p className="text-blue-500 uppercase tracking-[0.2em] text-sm mb-4">
                Module 1
              </p>

              <h3 className="text-3xl font-bold mb-4">
                Connector Fundamentals
              </h3>

              <p className="text-gray-400 leading-8 mb-8">
                Learn connector anatomy, mating systems,
                engineering fundamentals,
                and application prioritization.
              </p>

              <div className="flex items-center justify-between mb-8">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    completed
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                >

                  {completed
                    ? "Completed"
                    : "In Progress"}

                </span>

                <span className="text-gray-400">
                  XP: {xp}
                </span>

              </div>

              <Link
                href="/mission/connector-fundamentals"
                className="block text-center bg-blue-600 hover:bg-blue-500 transition px-6 py-4 rounded-2xl font-semibold"
              >
                {completed
                  ? "Review Module"
                  : "Continue Learning"}
              </Link>

            </div>

            {/* MODULE 2 */}

            <div className={`rounded-3xl p-8 border ${
              completed
                ? "bg-[#111] border-gray-800"
                : "bg-[#0b0b0b] border-gray-900 opacity-50"
            }`}>

              <p className="text-blue-500 uppercase tracking-[0.2em] text-sm mb-4">
                Module 2
              </p>

              <h3 className="text-3xl font-bold mb-4">
                Product Families
              </h3>

              <p className="text-gray-400 leading-8 mb-8">
                Learn Molex connector portfolios,
                applications,
                customer mapping,
                and product differentiation.
              </p>

              <div className="mb-8">

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    completed
                      ? "bg-blue-600"
                      : "bg-gray-700"
                  }`}
                >

                  {completed
                    ? "Unlocked"
                    : "Locked"}

                </span>

              </div>

              {completed ? (

  <Link
    href="/mission/product-families"
    className="block w-full text-center bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-semibold transition"
  >
    Start Module
  </Link>

) : (

  <button
    disabled
    className="w-full px-6 py-4 rounded-2xl font-semibold bg-gray-800 text-gray-500 cursor-not-allowed"
  >
    Complete Previous Module
  </button>

)}

            </div>

            {/* MODULE 3 */}

            <div className="bg-[#0b0b0b] border border-gray-900 rounded-3xl p-8 opacity-50 transition-all duration-300 hover:opacity-70">

              <p className="text-blue-500 uppercase tracking-[0.2em] text-sm mb-4">
                Module 3
              </p>

              <h3 className="text-3xl font-bold mb-4">
                Connector Selection
              </h3>

              <p className="text-gray-400 leading-8 mb-8">
                Simulate customer interactions,
                application analysis,
                and connector recommendation workflows.
              </p>

              <div className="mb-8">

                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-700">
                  Locked
                </span>

              </div>

              <button
                disabled
                className="w-full px-6 py-4 rounded-2xl font-semibold bg-gray-800 text-gray-500 cursor-not-allowed"
              >
                Locked
              </button>

            </div>

          </div>

        </section>

        {/* COMPETENCY MATRIX */}

        <section className="mb-14">

          <h2 className="text-4xl font-bold mb-8">
            Competency Matrix
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-2xl font-bold">
                  Connector Fundamentals
                </h3>

                <span className={`px-4 py-2 rounded-full text-sm ${
                  completed
                    ? "bg-green-600"
                    : "bg-yellow-600"
                }`}>

                  {completed
                    ? "Complete"
                    : "In Progress"}

                </span>

              </div>

              <p className="text-gray-400 leading-8">
                Understanding of connector systems,
                mating behavior,
                and electrical continuity.
              </p>

            </div>

            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-2xl font-bold">
                  Connector Anatomy
                </h3>

                <span className={`px-4 py-2 rounded-full text-sm ${
                  exploredStatus(exploredLevel(completed))
                }`}>

                  {completed
                    ? "Strong"
                    : "Intermediate"}

                </span>

              </div>

              <p className="text-gray-400 leading-8">
                Understanding of seals,
                locking systems,
                terminals,
                housing,
                and connector reliability.
              </p>

            </div>

            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-2xl font-bold">
                  Engineering Evaluation
                </h3>

                <span className={`px-4 py-2 rounded-full text-sm ${
                  challengeStatus(challengeLevel(completed))
                }`}>

                  {completed
                    ? "Passed"
                    : "Pending"}

                </span>

              </div>

              <p className="text-gray-400 leading-8">
                Ability to prioritize connector features
                based on customer requirements
                and harsh environment applications.
              </p>

            </div>

            <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-2xl font-bold">
                  Product Specialist Readiness
                </h3>

                <span className={`px-4 py-2 rounded-full text-sm ${
                  completed
                    ? "bg-green-600"
                    : "bg-gray-700"
                }`}>

                  {completed
                    ? "Ready"
                    : "Developing"}

                </span>

              </div>

              <p className="text-gray-400 leading-8">
                Demonstrates foundational competency
                for customer-facing engineering discussions.
              </p>

            </div>

          </div>

        </section>
         {/* BADGES */}

<section className="mb-14">

  <h2 className="text-4xl font-bold mb-8">
    Achievement Badges
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    {badges.map((badge) => (

      <div
        key={badge}
        className="bg-[#111] border border-yellow-700 rounded-3xl p-8 hover:scale-[1.02] transition-all duration-300"
      >

        <div className="text-5xl mb-6">
          🏆
        </div>

        <h3 className="text-2xl font-bold mb-3">
          {badge}
        </h3>

        <p className="text-gray-400">
          Achievement Unlocked
        </p>

      </div>

    ))}

    {badges.length === 0 && (

      <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

        <h3 className="text-2xl font-bold mb-3">
          No Badges Yet
        </h3>

        <p className="text-gray-400">
          Complete missions to unlock achievements.
        </p>

      </div>

    )}

  </div>

</section>

        {/* ENGINEERING PROFILE */}

<section className="mb-14">

  <h2 className="text-4xl font-bold mb-8">
    Engineering Competency Profile
  </h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

      <p className="text-gray-400 mb-4">
        Engineering Readiness
      </p>

      <div
        className={`inline-block px-5 py-3 rounded-full text-lg font-semibold ${
          readinessLevel(engineeringScore).color
        }`}
      >

        {readinessLevel(engineeringScore).label}

      </div>

    </div>

    <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

      <p className="text-gray-400 mb-4">
        Technical Confidence
      </p>

      <h3 className="text-5xl font-bold text-blue-400">
        {Math.min(
          100,
          Math.floor(engineeringScore / 2.5)
        )}%
      </h3>

    </div>

    <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)] transition-all duration-300 hover:scale-[1.02] hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.25)]">

      <p className="text-gray-400 mb-4">
        AI Evaluation
      </p>

      <h3 className="text-2xl font-bold text-green-400">
        Customer Ready
      </h3>

    </div>

  </div>

</section>
        {/* AI MENTOR */}

        <section className="bg-[#101010] border border-blue-900 rounded-3xl p-10">

          <p className="text-blue-500 uppercase tracking-[0.3em] text-sm mb-4">
            AI Mentor Summary
          </p>

          <h2 className="text-4xl font-bold mb-6">
            Learning Evaluation
          </h2>

          <p className="text-gray-300 text-xl leading-9">

            {completed
              ? "You successfully completed the Connector Fundamentals mission and demonstrated strong competency in connector engineering fundamentals, anatomy understanding, and customer application prioritization."
              : "Continue progressing through the onboarding journey to strengthen your understanding of connector systems, engineering fundamentals, and application-driven product selection."
            }

          </p>

        </section>

      </div>

    </main>
  );
}

/* =========================
   STATUS HELPERS
========================= */

function exploredLevel(completed: boolean) {

  return completed
    ? "strong"
    : "intermediate";

}

function exploredStatus(level: string) {

  if (level === "strong") {
    return "bg-green-600";
  }

  return "bg-yellow-600";

}

function challengeLevel(completed: boolean) {

  return completed
    ? "passed"
    : "pending";

}

function challengeStatus(level: string) {

  if (level === "passed") {
    return "bg-green-600";
  }

  return "bg-gray-700";

}
function readinessLevel(score: number) {

  if (score >= 220) {
    return {
      label: "Advanced",
      color: "bg-green-600",
    };
  }

  if (score >= 140) {
    return {
      label: "Intermediate",
      color: "bg-blue-600",
    };
  }

  return {
    label: "Beginner",
    color: "bg-yellow-600",
  };

}

function calculateLevel(xp: number) {

  if (xp >= 400) {
    return {
      level: 5,
      title: "Connector Expert",
    };
  }

  if (xp >= 300) {
    return {
      level: 4,
      title: "Senior Specialist",
    };
  }

  if (xp >= 200) {
    return {
      level: 3,
      title: "Product Specialist",
    };
  }

  if (xp >= 100) {
    return {
      level: 2,
      title: "Engineering Associate",
    };
  }

  return {
    level: 1,
    title: "Trainee",
  };

}
