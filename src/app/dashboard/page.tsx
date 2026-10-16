
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nexusOnboardingCompletedTasks";

// Temporary demo total. The real task count will come from SharePoint.
const DEMO_TASK_COUNT = 5;

export default function DashboardPage() {
  const [completedCount, setCompletedCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          const validIds = parsed.filter(
            (id): id is number =>
              typeof id === "number" &&
              Number.isInteger(id) &&
              id >= 1 &&
              id <= DEMO_TASK_COUNT
          );

          setCompletedCount([...new Set(validIds)].length);
        }
      }
    } catch {
      // Show the welcome page if saved browser data is unavailable.
    }

    setLoaded(true);
  }, []);

  const progress = Math.round(
    (completedCount / DEMO_TASK_COUNT) * 100
  );

  const journeyComplete = completedCount >= DEMO_TASK_COUNT;

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-bold text-slate-950">
              N
            </div>

            <div>
              <p className="font-bold tracking-wide">NEXUS ACADEMY</p>
              <p className="text-xs text-slate-400">
                Product Specialist Onboarding
              </p>
            </div>
          </Link>

          <span className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400 sm:inline-block">
            Learning workspace
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-16">
        <section className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-950 p-7 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Your learning journey starts here
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              One step at a time.
              <span className="block text-cyan-300">
                We’ll guide you forward.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Follow your assigned onboarding tasks, access the required
              resources, and complete each step before moving forward.
              Your next task is always your next destination.
            </p>

            <div className="mt-9">
              <Link
                href="/onboarding"
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
              >
                {loaded && completedCount > 0 && !journeyComplete
                  ? "Resume onboarding"
                  : journeyComplete
                    ? "Review onboarding"
                    : "Start onboarding"}

                <span aria-hidden="true">→</span>
              </Link>

              <p className="mt-4 text-sm text-slate-400">
                Your tasks will guide you through the process in sequence.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  YOUR PROGRESS
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {loaded
                    ? journeyComplete
                      ? "Journey completed"
                      : completedCount === 0
                        ? "Ready when you are"
                        : "Keep moving forward"
                    : "Loading your progress"}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <span className="text-xl" aria-hidden="true">
                  {journeyComplete ? "✓" : "↗"}
                </span>
              </div>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <p className="text-sm text-slate-400">
                {loaded
                  ? `${completedCount} of ${DEMO_TASK_COUNT} demo tasks completed`
                  : "Checking saved progress"}
              </p>

              <p className="text-2xl font-bold text-cyan-300">
                {loaded ? `${progress}%` : "—"}
              </p>
            </div>

            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-label="Demo onboarding progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={loaded ? progress : 0}
            >
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${loaded ? progress : 0}%` }}
              />
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">
              Demo progress is currently stored in this browser.
              The final task count and shared learner progress will come
              from the approved data source.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm font-medium text-slate-400">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              A clear path forward
            </h2>

            <div className="mt-6 space-y-5">
              <JourneyPoint
                number="01"
                title="Open your assigned task"
                description="Read the instructions and understand what you need to do."
              />

              <JourneyPoint
                number="02"
                title="Access the required resource"
                description="Follow the document, training, or activity link provided for that task."
              />

              <JourneyPoint
                number="03"
                title="Complete and continue"
                description="Mark the task complete and unlock the next step."
              />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
              <span className="text-xl" aria-hidden="true">i</span>
            </div>

            <div>
              <h2 className="font-semibold">Your onboarding, organized</h2>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400">
                The intended system will load the official task plan,
                instructions, and resource URLs from SharePoint. The
                SharePoint connection is not active yet because your
                organization’s site and access are still pending.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
          Nexus Academy · Guided Product Specialist Onboarding
        </footer>
      </div>
    </main>
  );
}

function JourneyPoint({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-sm font-semibold text-cyan-300">
        {number}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
