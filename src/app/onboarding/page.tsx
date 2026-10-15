
"use client";

import { useEffect, useState } from "react";

type Task = {
  id: number;
  day: string;
  title: string;
  description: string;
  instructions: string[];
};

const TASKS: Task[] = [
  {
    id: 1,
    day: "Day 1",
    title: "Welcome to Nexus Academy",
    description: "Understand the learning journey and how to use the platform.",
    instructions: [
      "Review the purpose of Nexus Academy.",
      "Understand the task-by-task learning approach.",
      "Mark this task complete when you are ready to continue.",
    ],
  },
  {
    id: 2,
    day: "Day 1",
    title: "Explore the Product Specialist Role",
    description: "Understand the core responsibilities of a Product Specialist.",
    instructions: [
      "Review the responsibilities of the Product Specialist.",
      "Understand how product, engineering, and customer teams work together.",
      "Identify any questions to discuss with your manager.",
    ],
  },
  {
    id: 3,
    day: "Day 1",
    title: "Introduction to Connector Fundamentals",
    description: "Prepare for the Connector Fundamentals learning module.",
    instructions: [
      "Review the connector fundamentals learning objectives.",
      "Familiarize yourself with basic connector terminology.",
      "Continue to the existing Module 1 when instructed.",
    ],
  },
  {
    id: 4,
    day: "Day 2",
    title: "Explore Product Families",
    description: "Begin learning about the product portfolio.",
    instructions: [
      "Review the product families assigned to you.",
      "Record key applications and differences.",
      "Discuss any unclear concepts with your trainer.",
    ],
  },
  {
    id: 5,
    day: "Day 2",
    title: "Review Your Learning Progress",
    description: "Check your progress and prepare for the next learning stage.",
    instructions: [
      "Review the tasks you have completed.",
      "List topics that need clarification.",
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
          setCompletedTasks([...new Set(parsed)].sort((a, b) => a - b));
        }
      }
    } catch {
      // Start with empty progress if saved data is invalid.
    }

    setLoaded(true);
  }, []);

  const completedCount = completedTasks.length;
  const progress = Math.round(
    (completedCount / TASKS.length) * 100
  );

  const isTaskUnlocked = (task: Task) =>
    task.id === 1 || completedTasks.includes(task.id - 1);

  const selectedTask =
    TASKS.find((task) => task.id === selectedTaskId) ?? TASKS[0];

  const completeTask = () => {
    if (
      !selectedTask ||
      !isTaskUnlocked(selectedTask) ||
      completedTasks.includes(selectedTask.id)
    ) {
      return;
    }

    const updated = [...completedTasks, selectedTask.id].sort(
      (a, b) => a - b
    );

    setCompletedTasks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    const nextTask = TASKS.find(
      (task) => task.id === selectedTask.id + 1
    );

    if (nextTask) {
      setSelectedTaskId(nextTask.id);
    }
  };

  const resetProgress = () => {
    const confirmed = window.confirm(
      "Reset all onboarding demo progress?"
    );

    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);
    setCompletedTasks([]);
    setSelectedTaskId(1);
  };

  if (!loaded) {
    return (
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        Loading your learning journey...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Nexus Academy
          </p>

          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Guided Onboarding
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Complete each task to unlock the next step in your
            Product Specialist learning journey.
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                Your learning progress
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {completedCount} of {TASKS.length} tasks completed
              </p>
            </div>

            <span className="text-2xl font-bold text-cyan-400">
              {progress}%
            </span>
          </div>

          <div
            className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="mb-4 text-lg font-semibold">
              Learning plan
            </h2>

            <div className="space-y-3">
              {TASKS.map((task) => {
                const completed = completedTasks.includes(task.id);
                const unlocked = isTaskUnlocked(task);
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
                      !unlocked
                        ? "cursor-not-allowed opacity-45"
                        : "hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm">
                        {completed ? "✓" : unlocked ? task.id : "🔒"}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-cyan-400">
                          {task.day}
                        </p>
                        <p className="mt-1 font-medium">{task.title}</p>
                        <p className="mt-2 text-xs text-slate-400">
                          {completed
                            ? "Completed"
                            : unlocked
                              ? "Available"
                              : "Complete the previous task to unlock"}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm font-medium text-cyan-400">
              {selectedTask.day} · Task {selectedTask.id}
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {selectedTask.title}
            </h2>

            <p className="mt-3 leading-7 text-slate-400">
              {selectedTask.description}
            </p>

            <div className="my-6 border-t border-slate-800" />

            <h3 className="font-semibold">What you need to do</h3>

            <ol className="mt-4 space-y-4">
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

            <div className="mt-8">
              {completedTasks.includes(selectedTask.id) ? (
                <div className="rounded-xl border border-emerald-800 bg-emerald-950/40 p-4 text-emerald-300">
                  ✓ Task completed
                </div>
              ) : isTaskUnlocked(selectedTask) ? (
                <button
                  type="button"
                  onClick={completeTask}
                  className="w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Mark task as complete →
                </button>
              ) : (
                <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-400">
                  This task is locked. Complete the previous task
                  first.
                </p>
              )}
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">
              Prototype only: progress is saved in this browser.
              It is not yet connected to authenticated accounts or
              shared manager reporting.
            </p>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={resetProgress}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:text-white"
          >
            Reset demo progress
          </button>
        </div>
      </div>
    </main>
  );
}

