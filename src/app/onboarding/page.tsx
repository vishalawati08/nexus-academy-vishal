
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DEMO_ONBOARDING_TASKS,
  type OnboardingTask,
} from "@/data/onboarding-tasks";

const STORAGE_KEY = "nexusOnboardingCompletedTasks";

type Task = OnboardingTask;

const TASKS: Task[] = DEMO_ONBOARDING_TASKS
  .filter((task) => task.isActive)
  .sort((a, b) => a.sequence - b.sequence);

export default function OnboardingPage() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);

      if (savedProgress) {
        const parsed: unknown = JSON.parse(savedProgress);

        if (Array.isArray(parsed)) {
          const validIds = parsed.filter(
            (id): id is number =>
              typeof id === "number" &&
              TASKS.some((task) => task.id === id)
          );

          setCompletedTasks(validIds);
        }
      }
    } catch (error) {
      console.error("Unable to load onboarding progress:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const nextTask = TASKS.find(
      (task) => !completedTasks.includes(task.id)
    );

    if (nextTask) {
      setSelectedTaskId((current) => {
        if (current === null) return nextTask.id;

        const selectedTask = TASKS.find(
          (task) => task.id === current
        );

        if (!selectedTask) return nextTask.id;

        const selectedIndex = TASKS.findIndex(
          (task) => task.id === current
        );

        const previousTask =
          selectedIndex > 0 ? TASKS[selectedIndex - 1] : null;

        const isSelectedUnlocked =
          selectedIndex === 0 ||
          (previousTask !== null &&
            completedTasks.includes(previousTask.id));

        if (
          completedTasks.includes(current) ||
          !isSelectedUnlocked
        ) {
          return nextTask.id;
        }

        return current;
      });
    } else if (TASKS.length > 0) {
      setSelectedTaskId(TASKS[TASKS.length - 1].id);
    }
  }, [completedTasks, isLoaded]);

  const isTaskUnlocked = (index: number) => {
    if (index === 0) return true;

    const previousTask = TASKS[index - 1];

    return completedTasks.includes(previousTask.id);
  };

  const selectedTask = TASKS.find(
    (task) => task.id === selectedTaskId
  );

  const selectedIndex = TASKS.findIndex(
    (task) => task.id === selectedTaskId
  );

  const completedCount = TASKS.filter((task) =>
    completedTasks.includes(task.id)
  ).length;

  const progress =
    TASKS.length === 0
      ? 0
      : Math.round((completedCount / TASKS.length) * 100);

  const allCompleted =
    TASKS.length > 0 && completedCount === TASKS.length;

  function completeTask(taskId: number) {
    const taskIndex = TASKS.findIndex(
      (task) => task.id === taskId
    );

    if (taskIndex < 0 || !isTaskUnlocked(taskIndex)) return;
    if (completedTasks.includes(taskId)) return;

    const updatedTasks = [...completedTasks, taskId];

    setCompletedTasks(updatedTasks);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.error("Unable to save onboarding progress:", error);
    }

    const nextTask = TASKS.find(
      (task) => !updatedTasks.includes(task.id)
    );

    if (nextTask) {
      setSelectedTaskId(nextTask.id);
    } else {
      setSelectedTaskId(taskId);
    }
  }

  function resetProgress() {
    const confirmed = window.confirm(
      "Reset your onboarding progress? All completed tasks will become incomplete."
    );

    if (!confirmed) return;

    setCompletedTasks([]);
    setSelectedTaskId(TASKS[0]?.id ?? null);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Unable to reset onboarding progress:", error);
    }
  }

  if (!isLoaded) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="mb-4 h-8 w-64 rounded-lg bg-slate-200" />
          <div className="h-4 w-96 max-w-full rounded bg-slate-200" />
          <div className="mt-8 h-64 rounded-2xl bg-white shadow-sm" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <span aria-hidden="true">←</span>
              Back to dashboard
            </Link>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your onboarding journey
            </h1>

            <p className="mt-2 max-w-2xl text-slate-600">
              One task at a time. Complete each step to unlock
              the next part of your learning journey.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Overall progress
            </p>
            <p className="mt-1 text-2xl font-bold">
              {progress}%
            </p>
          </div>
        </header>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">Learning progress</h2>
              <p className="mt-1 text-sm text-slate-500">
                {completedCount} of {TASKS.length} tasks completed
              </p>
            </div>

            <span className="text-sm font-semibold text-slate-700">
              {completedCount}/{TASKS.length}
            </span>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label="Onboarding progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {allCompleted ? (
          <section className="rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
              ✓
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              Onboarding tasks completed!
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              You have completed every task in this demo
              onboarding journey. Check with your manager or
              trainer for the next steps.
            </p>

            <Link
              href="/dashboard"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Return to dashboard
            </Link>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.4fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="text-lg font-bold">
                  Your task checklist
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Follow the tasks in sequence.
                </p>
              </div>

              <div className="space-y-3">
                {TASKS.map((task, index) => {
                  const completed = completedTasks.includes(task.id);
                  const unlocked = isTaskUnlocked(index);
                  const selected = selectedTaskId === task.id;

                  return (
                    <button
                      key={task.id}
                      type="button"
                      onClick={() => {
                        if (unlocked && !completed) {
                          setSelectedTaskId(task.id);
                        } else if (completed) {
                          setSelectedTaskId(task.id);
                        }
                      }}
                      disabled={!unlocked}
                      className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                        selected
                          ? "border-blue-500 bg-blue-50 ring-1 ring-blue-200"
                          : completed
                            ? "border-emerald-200 bg-emerald-50/60"
                            : unlocked
                              ? "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                              : "cursor-not-allowed border-slate-100 bg-slate-50 opacity-70"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          completed
                            ? "bg-emerald-100 text-emerald-700"
                            : unlocked
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {completed
                          ? "✓"
                          : unlocked
                            ? index + 1
                            : "🔒"}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {task.day}
                        </span>

                        <span className="mt-1 block font-semibold text-slate-900">
                          {task.title}
                        </span>

                        <span className="mt-1 block text-sm text-slate-500">
                          {completed
                            ? "Completed"
                            : unlocked
                              ? "Available to start"
                              : "Complete the previous task to unlock"}
                        </span>
                      </span>

                      {selected && (
                        <span className="mt-1 text-blue-600" aria-hidden="true">
                          →
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              {selectedTask ? (
                <>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-800">
                      {selectedTask.day}
                    </span>

                    {completedTasks.includes(selectedTask.id) && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                        Completed
                      </span>
                    )}
                  </div>

                  <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
                    {selectedTask.title}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600">
                    {selectedTask.description}
                  </p>

                  <div className="mt-8">
                    <h3 className="font-bold">What you need to do</h3>

                    <ol className="mt-4 space-y-4">
                      {selectedTask.instructions.map(
                        (instruction, index) => (
                          <li
                            key={`${selectedTask.id}-${index}`}
                            className="flex items-start gap-3"
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                              {index + 1}
                            </span>

                            <span className="pt-1 leading-6 text-slate-700">
                              {instruction}
                            </span>
                          </li>
                        )
                      )}
                    </ol>
                  </div>

                  {selectedTask.resourceUrl && (
                    <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <p className="font-semibold text-slate-900">
                        Assigned learning resource
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Open the resource, complete the assigned
                        learning, and return here.
                      </p>

                      <a
                        href={selectedTask.resourceUrl}
                        target={
                          selectedTask.resourceUrl.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          selectedTask.resourceUrl.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
                      >
                        {selectedTask.resourceLabel || "Open resource"}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  )}

                  {completedTasks.includes(selectedTask.id) ? (
                    <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                      <p className="font-semibold text-emerald-800">
                        You have completed this task.
                      </p>
                      <p className="mt-1 text-sm text-emerald-700">
                        Your progress is saved in this browser.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-8 border-t border-slate-100 pt-6">
                      <button
                        type="button"
                        onClick={() => completeTask(selectedTask.id)}
                        disabled={
                          selectedIndex < 0 ||
                          !isTaskUnlocked(selectedIndex)
                        }
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        Mark task as complete
                        <span aria-hidden="true">→</span>
                      </button>

                      <p className="mt-3 text-xs leading-5 text-slate-500">
                        Mark this task complete only after finishing
                        the assigned work. The next task will unlock
                        automatically.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-12 text-center">
                  <h2 className="text-xl font-bold">
                    No active tasks available
                  </h2>
                  <p className="mt-2 text-slate-500">
                    Add active tasks to the onboarding task data file
                    to display your learning journey.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}

        <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-5">
          <p className="max-w-2xl text-xs leading-5 text-slate-500">
            Prototype notice: task definitions are currently demo data
            in the code, and completion is saved in this browser using
            localStorage. Progress is not yet shared across devices or
            connected to SharePoint.
          </p>

          <button
            type="button"
            onClick={resetProgress}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700"
          >
            Reset demo progress
          </button>
        </footer>
      </div>
    </main>
  );
}
