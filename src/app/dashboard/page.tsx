
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [competency, setCompetency] = useState("In Progress");
  const [retryCount, setRetryCount] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);
  const [engineeringScore, setEngineeringScore] = useState(0);
  const [modulesCompleted, setModulesCompleted] = useState(0);

  const totalModules = 3;
  const overallProgress = (modulesCompleted / totalModules) * 100;

  useEffect(() => {
    try {
      const progressData = localStorage.getItem(
        "connectorFundamentalsProgress"
      );
      const completedStatus = localStorage.getItem(
        "connectorFundamentalsCompleted"
      );
      const competencyStatus = localStorage.getItem(
        "connectorFundamentalsCompetency"
      );
      const storedXP = localStorage.getItem("nexusTotalXP");

      if (storedXP) {
        setXp(Number(storedXP) || 0);
      }

      if (progressData) {
        const parsed = JSON.parse(progressData);
        setXp(parsed.xp || 0);
        setRetryCount(parsed.retryCount || 0);
      }

      const missionData = localStorage.getItem(
        "connectorFundamentalsMaster"
      );

      if (missionData) {
        const parsedMission = JSON.parse(missionData);
        setBadges(parsedMission.badges || []);
        setEngineeringScore(parsedMission.xp || 0);
      }

      if (completedStatus === "true") {
        setCompleted(true);
        setModulesCompleted(1);
      }

      if (competencyStatus) {
        setCompetency(competencyStatus);
      }
    } catch (error) {
      console.error("Unable to load dashboard progress:", error);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#050816] to-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-12">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-500">
            Nexus Academy
          </p>

          <h1 className="mb-4 text-4xl font-bold sm:text-6xl">
            Product Specialist Dashboard
          </h1>

          <p className="text-xl text-gray-400">
            AI-Guided Engineering Learning Platform
          </p>
        </header>

        {/* TOP STATS */}
        <section className="mb-12 grid gap-6 md:grid-cols-4">
          <StatCard title="Total XP" value={xp} valueClass="text-blue-500 text-5xl" />

          <StatCard
            title="Modules Completed"
            value={modulesCompleted}
            valueClass="text-green-400 text-5xl"
          />

          <StatCard
            title="Competency"
            value={competency}
            valueClass="text-green-400 text-3xl"
          />

          <StatCard
            title="Retry Attempts"
            value={retryCount}
            valueClass="text-yellow-400 text-5xl"
          />
        </section>

        {/* LEVEL */}
        <section className="mb-8 rounded-3xl border border-yellow-700 bg-[#111] p-8">
          <p className="mb-3 text-gray-400">Current Level</p>

          <h2 className="mb-3 text-5xl font-bold text-yellow-400">
            Lv.{calculateLevel(xp).level}
          </h2>

          <p className="text-yellow-300">{calculateLevel(xp).title}</p>
        </section>

        {/* LEARNING JOURNEY */}
        <section className="mb-14">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Learning Journey
            </h2>

            <div className="flex flex-wrap items-center gap-4">
              <p className="font-semibold text-blue-400">
                {Math.round(overallProgress)}% Complete
              </p>

              {/* NEW: GUIDED ONBOARDING LINK */}
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/50 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20"
              >
                Guided Onboarding →
              </Link>
            </div>
          </div>

          <div
            className="mb-10 h-4 w-full overflow-hidden rounded-full bg-gray-800"
            role="progressbar"
            aria-label="Module completion progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(overallProgress)}
          >
            <div
              className="h-full bg-blue-600 transition-all duration-700"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* MODULE 1 */}
            <article className="rounded-3xl border border-blue-900 bg-[#111] p-8 transition hover:border-blue-600 hover:shadow-[0_0_35px_rgba(37,99,235,0.25)]">
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-blue-500">
                Module 1
              </p>

              <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                Connector Fundamentals
              </h3>

              <p className="mb-8 leading-8 text-gray-400">
                Learn connector anatomy, mating systems, engineering
                fundamentals, and application prioritization.
              </p>

              <div className="mb-8 flex items-center justify-between gap-3">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    completed ? "bg-green-600" : "bg-yellow-600"
                  }`}
                >
                  {completed ? "Completed" : "In Progress"}
                </span>

                <span className="text-gray-400">XP: {xp}</span>
              </div>

              <Link
                href="/mission/connector-fundamentals"
                className="block rounded-2xl bg-blue-600 px-6 py-4 text-center font-semibold transition hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.35)]"
              >
                {completed ? "Review Module" : "Continue Learning"}
              </Link>
            </article>

            {/* MODULE 2 */}
            <article
              className={`rounded-3xl border p-8 ${
                completed
                  ? "border-gray-800 bg-[#111]"
                  : "border-gray-900 bg-[#0b0b0b] opacity-60"
              }`}
            >
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-blue-500">
                Module 2
              </p>

              <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                Product Families
              </h3>

              <p className="mb-8 leading-8 text-gray-400">
                Learn Molex connector portfolios, applications, customer
                mapping, and product differentiation.
              </p>

              <div className="mb-8">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    completed ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  {completed ? "Unlocked" : "Locked"}
                </span>
              </div>

              {completed ? (
                <Link
                  href="/mission/product-families"
                  className="block rounded-2xl bg-blue-600 px-6 py-4 text-center font-semibold transition hover:bg-blue-500"
                >
                  Start Module
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl bg-gray-800 px-6 py-4 font-semibold text-gray-500"
                >
                  Complete Previous Module
                </button>
              )}
            </article>

            {/* MODULE 3 */}
            <article className="rounded-3xl border border-gray-900 bg-[#0b0b0b] p-8 opacity-60">
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-blue-500">
                Module 3
              </p>

              <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                Connector Selection
              </h3>

              <p className="mb-8 leading-8 text-gray-400">
                Simulate customer interactions, application analysis, and
                connector recommendation workflows.
              </p>

              <div className="mb-8">
                <span className="rounded-full bg-gray-700 px-4 py-2 text-sm font-semibold">
                  Locked
                </span>
              </div>

              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-2xl bg-gray-800 px-6 py-4 font-semibold text-gray-500"
              >
                Locked
              </button>
            </article>
          </div>
        </section>

        {/* COMPETENCY MATRIX */}
        <section className="mb-14">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
            Competency Matrix
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <CompetencyCard
              title="Connector Fundamentals"
              status={completed ? "Complete" : "In Progress"}
              statusClass={completed ? "bg-green-600" : "bg-yellow-600"}
              description="Understanding of connector systems, mating behavior, and electrical continuity."
            />

            <CompetencyCard
              title="Connector Anatomy"
              status={completed ? "Strong" : "Intermediate"}
              statusClass={completed ? "bg-green-600" : "bg-yellow-600"}
              description="Understanding of seals, locking systems, terminals, housing, and connector reliability."
            />

            <CompetencyCard
              title="Engineering Evaluation"
              status={completed ? "Passed" : "Pending"}
              statusClass={completed ? "bg-green-600" : "bg-gray-700"}
              description="Ability to prioritize connector features based on customer requirements and harsh-environment applications."
            />

            <CompetencyCard
              title="Product Specialist Readiness"
              status={completed ? "Ready" : "Developing"}
              statusClass={completed ? "bg-green-600" : "bg-gray-700"}
              description="Demonstrates foundational competency for customer-facing engineering discussions."
            />
          </div>
        </section>

        {/* ACHIEVEMENT BADGES */}
        <section className="mb-14">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
            Achievement Badges
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {badges.map((badge) => (
              <article
                key={badge}
                className="rounded-3xl border border-yellow-700 bg-[#111] p-8 transition hover:scale-[1.02]"
              >
                <div className="mb-6 text-5xl">🏆</div>

                <h3 className="mb-3 text-2xl font-bold">{badge}</h3>

                <p className="text-gray-400">Achievement Unlocked</p>
              </article>
            ))}

            {badges.length === 0 && (
              <article className="rounded-3xl border border-gray-800 bg-[#111] p-8">
                <h3 className="mb-3 text-2xl font-bold">No Badges Yet</h3>

                <p className="text-gray-400">
                  Complete missions to unlock achievements.
                </p>
              </article>
            )}
          </div>
        </section>

        {/* ENGINEERING COMPETENCY PROFILE */}
        <section className="mb-14">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl">
            Engineering Competency Profile
          </h2>

          <div className="mb-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-gray-800 bg-[#111] p-8">
              <p className="mb-4 text-gray-400">Engineering Readiness</p>

              <span
                className={`inline-block rounded-full px-5 py-3 text-lg font-semibold ${
                  readinessLevel(engineeringScore).color
                }`}
              >
                {readinessLevel(engineeringScore).label}
              </span>
            </div>

            <div className="rounded-3xl border border-gray-800 bg-[#111] p-8">
              <p className="mb-4 text-gray-400">Technical Confidence</p>

              <h3 className="text-5xl font-bold text-blue-400">
                {Math.min(100, Math.floor(engineeringScore / 2.5))}%
              </h3>
            </div>

            <div className="rounded-3xl border border-gray-800 bg-[#111] p-8">
              <p className="mb-4 text-gray-400">AI Evaluation</p>

              <h3 className="text-2xl font-bold text-green-400">
                Customer Ready
              </h3>
            </div>
          </div>

          {/* COMPETENCY RING */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-800 bg-[#111] p-8">
            <p className="mb-6 text-gray-400">Competency Score</p>

            <div className="relative h-36 w-36">
              <svg
                className="h-36 w-36 rotate-[-90deg]"
                viewBox="0 0 120 120"
                role="img"
                aria-label={`Competency score: ${Math.min(
                  100,
                  Math.floor(engineeringScore / 2.5)
                )}%`}
              >
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#1f2937"
                  strokeWidth="10"
                  fill="none"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={327}
                  strokeDashoffset={
                    327 -
                    (Math.min(
                      100,
                      Math.floor(engineeringScore / 2.5)
                    ) /
                      100) *
                      327
                  }
                  className="transition-all duration-1000"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-400">
                  {Math.min(100, Math.floor(engineeringScore / 2.5))}%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* AI MENTOR SUMMARY */}
        <section className="rounded-3xl border border-blue-900 bg-[#101010] p-8 sm:p-10">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-500">
            AI Mentor Summary
          </p>

          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
            Learning Evaluation
          </h2>

          <p className="text-xl leading-9 text-gray-300">
            {completed
              ? "You successfully completed the Connector Fundamentals mission and demonstrated strong competency in connector engineering fundamentals, anatomy understanding, and customer application prioritization."
              : "Continue progressing through the onboarding journey to strengthen your understanding of connector systems, engineering fundamentals, and application-driven product selection."}
          </p>
        </section>
      </div>
    </main>
  );
}

/* REUSABLE DASHBOARD COMPONENTS */

type StatCardProps = {
  title: string;
  value: string | number;
  valueClass: string;
};

function StatCard({ title, value, valueClass }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-gray-800 bg-[#111] p-8 transition hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
      <p className="mb-3 text-gray-400">{title}</p>
      <h2 className={`font-bold ${valueClass}`}>{value}</h2>
    </div>
  );
}

type CompetencyCardProps = {
  title: string;
  status: string;
  statusClass: string;
  description: string;
};

function CompetencyCard({
  title,
  status,
  statusClass,
  description,
}: CompetencyCardProps) {
  return (
    <article className="rounded-3xl border border-gray-800 bg-[#111] p-8 transition hover:border-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-bold sm:text-2xl">{title}</h3>

        <span className={`rounded-full px-4 py-2 text-sm ${statusClass}`}>
          {status}
        </span>
      </div>

      <p className="leading-8 text-gray-400">{description}</p>
    </article>
  );
}

/* STATUS HELPERS */

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
