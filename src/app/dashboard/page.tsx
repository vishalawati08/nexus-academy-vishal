"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import tasksData from "@/data/nexus-tasks.json";

type Task = (typeof tasksData)[number];
const TASKS = [...tasksData].sort((a, b) => a.sequenceNumber - b.sequenceNumber);
const STORAGE_KEY = "nexus94CompletedTaskIds";
const XP_KEY = "nexus94TotalXP";

export default function DashboardPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [xp, setXp] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedIds([...new Set(parsed.filter((id): id is string =>
            typeof id === "string" && TASKS.some((task) => task.taskId === id)
          ))]);
        }
      }
      setXp(Number(localStorage.getItem(XP_KEY)) || 0);
    } catch {
      // Keep the dashboard usable when browser storage is unavailable.
    } finally {
      setLoaded(true);
    }
  }, []);

  const completed = useMemo(() => new Set(completedIds), [completedIds]);
  const nextTask = TASKS.find((task) => !completed.has(task.taskId));
  const progress = Math.round((completedIds.length / TASKS.length) * 100);
  const finished = completedIds.length === TASKS.length;

  function resetProgress() {
    if (!window.confirm("Reset your learning progress and XP in this browser?")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(XP_KEY);
      setCompletedIds([]);
      setXp(0);
    } catch {
      window.alert("Progress could not be reset. Please check your browser storage settings.");
    }
  }

  return (
    <main className="min-h-screen bg-[#080d18] text-white">
      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#080d18]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">M</div>
            <div>
              <p className="text-sm font-bold tracking-[0.12em]">MOLEX NEW HIRE TRAINING</p>
              <p className="mt-0.5 text-xs text-slate-400">Product Specialist Training</p>
            </div>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/journey" className="rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-200">Learning Journey →</Link>
            <Link href="/" className="hidden rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:text-white sm:inline-flex">Home</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">YOUR LEARNING SPACE</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Pick up where you left off, check your progress, or jump into a technical learning module.</p>
          </div>
          <div className="rounded-2xl border border-violet-200/15 bg-violet-200/[0.05] px-5 py-4">
            <p className="text-xs text-slate-400">Experience points</p>
            <p className="mt-1 text-2xl font-bold">{loaded ? xp : "—"} <span className="text-sm font-semibold text-violet-200">XP</span></p>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <Metric label="Journey progress" value={loaded ? progress + "%" : "—"} note={loaded ? completedIds.length + " of " + TASKS.length + " tasks complete" : "Loading progress"} />
          <Metric label="Tasks remaining" value={loaded ? String(TASKS.length - completedIds.length) : "—"} note="Across the 12-week learning journey" />
          <Metric label="Current focus" value={finished ? "Completed" : nextTask ? "Week " + nextTask.weekNumber : "Ready to start"} note={finished ? "You have completed every task" : nextTask?.weekTitle ?? "Open the learning journey to begin"} />
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-cyan-200/15 bg-gradient-to-br from-cyan-300/[0.12] via-[#0e192a] to-indigo-300/[0.08] p-6 sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-300/[0.08] blur-3xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">{finished ? "JOURNEY COMPLETE" : "YOUR NEXT STEP"}</p>
              <h2 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">{finished ? "You’ve completed the learning journey." : nextTask ? nextTask.taskTitle : "Start your learning journey."}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">{finished ? "Review your learning journey or revisit a technical mission." : nextTask ? (nextTask.taskDescription || "Continue through the structured learning path, one task at a time.") : "Explore the structured learning path and begin with the first task."}</p>
              <Link href="/journey" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3.5 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200">{finished ? "Review learning journey" : completedIds.length ? "Continue learning" : "Start learning"} →</Link>
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-slate-400"><span>Overall progress</span><span>{loaded ? progress : 0}%</span></div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 transition-all" style={{ width: (loaded ? progress : 0) + "%" }} /></div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">QUICK ACCESS</p>
            <h2 className="mt-3 text-xl font-semibold">Learning resources</h2>
            <div className="mt-5 space-y-3">
              <QuickLink href="/journey" number="01" title="Full learning journey" text="Browse all 94 tasks, weekly sections, and task details." />
              <QuickLink href="/mission/connector-fundamentals" number="02" title="Connector Fundamentals" text="Explore connector anatomy and core engineering concepts." />
              <QuickLink href="/training" number="03" title="AI Mentor" text="Explore guided technical learning support." />
            </div>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
          <p className="text-xs text-slate-500">Progress is saved in this browser.</p>
          <button type="button" onClick={resetProgress} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-rose-200/30 hover:text-rose-200">Reset progress</button>
        </div>
      </div>
    </main>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
    <p className="mt-3 text-3xl font-semibold">{value}</p>
    <p className="mt-2 text-xs leading-5 text-slate-500">{note}</p>
  </div>;
}

function QuickLink({ href, number, title, text }: { href: string; number: string; title: string; text: string }) {
  return <Link href={href} className="group block rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition hover:border-cyan-200/25 hover:bg-white/[0.04]">
    <div className="flex items-center justify-between"><span className="text-xs font-bold tracking-wider text-cyan-200">{number}</span><span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200">↗</span></div>
    <h3 className="mt-3 font-semibold">{title}</h3>
    <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
  </Link>;
}
