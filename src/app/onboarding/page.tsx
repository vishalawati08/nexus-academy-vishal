
"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  day: string;
  title: string;
  description: string;
  instructions: string[];
  resourceUrl?: string;
  resourceLabel?: string;
};

const TASKS: Task[] = [
  {
    id: 1,
    day: "DAY 01",
    title: "Welcome to Nexus Academy",
    description: "Get familiar with your guided learning journey.",
    instructions: [
      "Understand the purpose of Nexus Academy.",
      "Review how tasks unlock in sequence.",
      "Complete this introduction to begin your journey.",
    ],
  },
  {
    id: 2,
    day: "DAY 01",
    title: "Understand the Product Specialist Role",
    description: "Learn how a Product Specialist contributes to the business.",
    instructions: [
      "Review your role and key responsibilities.",
      "Understand how product, engineering, sales, and customers collaborate.",
      "Note questions to discuss with your manager.",
    ],
  },
  {
    id: 3,
    day: "DAY 01",
    title: "Connector Fundamentals",
    description: "Continue into the existing Connector Fundamentals module.",
    instructions: [
      "Open the existing Module 1 learning experience.",
      "Work through the module content and activities.",
      "Return here after completing the assigned learning.",
    ],
    resourceUrl: "/mission/connector-fundamentals",
    resourceLabel: "Open Module 1",
  },
  {
    id: 4,
    day: "DAY 02",
    title: "Explore Product Families",
    description: "Start building familiarity with the product portfolio.",
    instructions: [
      "Review the product families assigned to you.",
      "Identify their applications and key differences.",
      "Discuss any questions with your trainer.",
    ],
    resourceUrl: "/mission/product-families",
    resourceLabel: "Open Product Families",
  },
  {
    id: 5,
    day: "DAY 02",
    title: "Learning Review",
    description: "Review your progress and identify your next learning goals.",
    instructions: [
      "Review the onboarding tasks you have completed.",
      "List topics that need further clarification.",
      "Discuss your next learning goals with your manager.",
    ],
  },
];

const STORAGE_KEY = "nexusOnboardingCompletedTasks";

export default function OnboardingPage() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (
          Array.isArray(parsed) &&
          parsed.every(
            (id) =>
              typeof id === "number" &&
              TASKS.some((task) => task.id === id)
          )
        ) {
          const validIds = [...new Set(parsed)].sort((a, b) => a - b);
          setCompletedTasks(validIds);

          const nextTask = TASKS.find(
            (task) => !validIds.includes(task.id)
          );

          setSelectedTaskId(nextTask?.id ?? TASKS[TASKS.length - 1].id);
        }
      }
    } catch {
      // Invalid browser data is ignored.
    }

    setLoaded(true);
  }, []);

  const isUnlocked = (task: Task) =>
    task.id === 1 || completedTasks.includes(task.id - 1);

  const completedCount = completedTasks.length;
  const progress = Math.round((completedCount / TASKS.length) * 100);
  const selectedTask =
    TASKS.find((task) => task.id === selectedTaskId) ?? TASKS[0];

  function completeTask() {
    if (
      !isUnlocked(selectedTask) ||
      completedTasks.includes(selectedTask.id)
    ) {
      return;
    }

    const updated = [...completedTasks, selectedTask.id].sort(
      (a, b) => a - b
    );

    setCompletedTasks(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // The current session still works if browser storage is unavailable.
    }

    const nextTask = TASKS.find(
      (task) => task.id === selectedTask.id + 1
    );

    if (nextTask) setSelectedTaskId(nextTask.id);
  }

  function resetProgress() {
    if (!window.confirm("Reset your onboarding demo progress?")) return;

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // State can still be reset for this session.
    }

    setCompletedTasks([]);
    setSelectedTaskId(1);
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        Loading your learning journey...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/dashboard" className="text-sm text-slate-400 hover:text-white">
              ← Back to Dashboard
            </a>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
              Nexus Academy
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Your Learning Journey
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              One task at a time. Complete each step to unlock the next
              part of your Product Specialist onboarding.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4">
            <p className="text-sm text-slate-400">Tasks completed</p>
            <p className="mt-1 text-2xl font-bold">
              {completedCount}
              <span className="text-slate-500"> / {TASKS.length}</span>
            </p>
          </div>
        </header>

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">Overall progress</h2>
              <p className="mt-1 text-sm text-slate-400">
                {completedCount === TASKS.length
                  ? "You've completed this demo learning plan."
                  : "Keep going — your next task unlocks as you progress."}
              </p>
            </div>
            <span className="text-2xl font-bold text-cyan-400">
              {progress}%
            </span>
          </div>

          <div
            className="h-2 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-lg font-semibold">Learning plan</h2>

            <div className="space-y-3">
              {TASKS.map((task) => {
                const completed = completedTasks.includes(task.id);
                const unlocked = isUnlocked(task);
                const selected = selectedTaskId === task.id;

                return (
                  <button
                    key={task.id}
                    type="button"
                    disabled={!unlocked}
                    onClick={() => setSelectedTaskId(task.id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-slate-800 bg-slate-950"
                    } ${
                      unlocked
                        ? "hover:border-slate-600"
                        : "cursor-not-allowed opacity-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm ${
                          completed
                            ? "bg-emerald-400/15 text-emerald-300"
                            : selected
                              ? "bg-cyan-400/15 text-cyan-300"
                              : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {completed ? "✓" : unlocked ? task.id : "🔒"}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold tracking-wide text-cyan-400">
                          {task.day}
                        </p>
                        <p className="mt-1 font-medium">{task.title}</p>
                        <p className="mt-2 text-xs text-slate-400">
                          {completed
                            ? "Completed"
                            : unlocked
                              ? "Available now"
                              : "Complete the previous task to unlock"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <p className="text-sm font-semibold text-cyan-400">
              {selectedTask.day} · TASK {selectedTask.id}
            </p>

            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              {selectedTask.title}
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              {selectedTask.description}
            </p>

            <div className="my-7 border-t border-slate-800" />

            <h3 className="font-semibold">Your checklist</h3>
            <ol className="mt-5 space-y-4">
              {selectedTask.instructions.map((instruction, index) => (
                <li key={instruction} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm">
                    {index + 1}
                  </span>
                  <span className="leading-6 text-slate-300">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>

            {selectedTask.resourceUrl && (
              <a
                href={selectedTask.resourceUrl}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-cyan-300 transition hover:border-cyan-400"
              >
                {selectedTask.resourceLabel} ↗
              </a>
            )}

            <div className="mt-8">
              {completedTasks.includes(selectedTask.id) ? (
                <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 p-4 text-emerald-300">
                  ✓ This task is complete.
                </div>
              ) : isUnlocked(selectedTask) ? (
                <button
                  type="button"
                  onClick={completeTask}
                  className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Mark task complete →
                </button>
              ) : (
                <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-400">
                  This task is locked. Complete the preceding task first.
                </p>
              )}
            </div>
          </section>
        </div>

        {completedCount === TASKS.length && (
          <section className="mt-6 rounded-2xl border border-emerald-800 bg-emerald-950/30 p-6">
            <h2 className="text-xl font-bold text-emerald-300">
              Learning plan complete!
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              You have completed all tasks in this demonstration.
              An approved quiz gate and manager reporting will be added
              in later implementation steps.
            </p>
          </section>
        )}

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5">
          <p className="max-w-2xl text-xs leading-5 text-slate-500">
            Prototype: progress is stored in this browser only. It does not
            yet sync across devices or provide authenticated manager reporting.
            Task content is illustrative and must be replaced with your approved
            onboarding plan.
          </p>
          <button
            type="button"
            onClick={resetProgress}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            Reset demo
          </button>
        </footer>
      </div>
    </main>
  );
}
