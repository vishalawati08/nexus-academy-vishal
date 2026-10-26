"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DEMO_ONBOARDING_TASKS, type OnboardingTask } from "@/data/onboarding-tasks";

const STORAGE_KEY = "nexusOnboardingCompletedTasks";
const TASKS: OnboardingTask[] = DEMO_ONBOARDING_TASKS.filter((task) => task.isActive).sort((a, b) => a.sequence - b.sequence);

export default function OnboardingPage() {
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validIds = parsed.filter(
            (id): id is number =>
              typeof id === "number" && TASKS.some((task) => task.id === id)
          );
          setCompletedTasks(Array.from(new Set(validIds)));
        }
      }
    } catch (error) { console.error("Unable to load onboarding progress:", error); }
    finally { setIsLoaded(true); }
  }, []);

  useEffect(() => {
    if (!isLoaded || TASKS.length === 0) return;
    const next = TASKS.find((task) => !completedTasks.includes(task.id));
    setSelectedTaskId((current) => {
      if (current === null || !TASKS.some((task) => task.id === current)) return (next ?? TASKS[TASKS.length - 1]).id;
      const index = TASKS.findIndex((task) => task.id === current);
      if (completedTasks.includes(current) || (index > 0 && !completedTasks.includes(TASKS[index - 1].id))) return (next ?? TASKS[TASKS.length - 1]).id;
      return current;
    });
  }, [completedTasks, isLoaded]);

  const completedCount = TASKS.filter((task) => completedTasks.includes(task.id)).length;
  const progress = TASKS.length ? Math.round(completedCount / TASKS.length * 100) : 0;
  const allCompleted = TASKS.length > 0 && completedCount === TASKS.length;
  const selectedTask = TASKS.find((task) => task.id === selectedTaskId);
  const selectedIndex = TASKS.findIndex((task) => task.id === selectedTaskId);
  const isUnlocked = (index: number) => index === 0 || completedTasks.includes(TASKS[index - 1].id);

  function completeTask(id: number) {
    const index = TASKS.findIndex((task) => task.id === id);
    if (index < 0 || !isUnlocked(index) || completedTasks.includes(id)) return;
    const updated = [...completedTasks, id];
    setCompletedTasks(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); }
    catch (error) { console.error("Unable to save onboarding progress:", error); }
    setSelectedTaskId((TASKS.find((task) => !updated.includes(task.id)) ?? TASKS[index]).id);
  }
  function resetProgress() {
    if (!window.confirm("Reset your onboarding progress? Completed tasks will become incomplete.")) return;
    setCompletedTasks([]);
    setSelectedTaskId(TASKS[0]?.id ?? null);
    try { localStorage.removeItem(STORAGE_KEY); }
    catch (error) { console.error("Unable to reset onboarding progress:", error); }
  }

  if (!isLoaded) return <main className="min-h-screen bg-[#080d18] p-8 text-white"><div className="mx-auto max-w-6xl animate-pulse"><div className="h-8 w-56 rounded bg-white/10" /><div className="mt-5 h-4 w-80 rounded bg-white/10" /><div className="mt-10 h-80 rounded-3xl bg-white/5" /></div></main>;

  return <main className="min-h-screen bg-[#080d18] text-white">
    <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#080d18]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><Link href="/dashboard" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">N</div><div><p className="text-sm font-bold tracking-[0.16em]">NEXUS ACADEMY</p><p className="mt-0.5 text-xs text-slate-400">Guided learning path</p></div></Link><Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white">← Dashboard</Link></div></header>
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">YOUR PATH · SAMPLE JOURNEY</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">Every step builds expertise.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Work through each learning task in sequence. Review the objective, use the resource, then mark the task complete to unlock the next step.</p></div><div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"><div className="relative flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "conic-gradient(#67e8f9 " + progress + "%, rgba(255,255,255,.09) 0)" }}><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0b1220] text-sm font-bold">{progress}%</div></div><div><p className="text-sm font-semibold">Journey progress</p><p className="mt-1 text-xs text-slate-400">{completedCount} of {TASKS.length} sample tasks completed</p></div></div></div>
      <div className="mb-6 rounded-2xl border border-amber-200/15 bg-amber-100/[0.04] px-4 py-3 text-sm leading-6 text-amber-100/80"><span className="mr-2 font-bold text-amber-200">LEARNING CONTENT</span>This guided sequence currently contains five example tasks. The full 12-week curriculum can be added after the content is reviewed and approved.</div>
      <div className="grid gap-6 lg:grid-cols-[0.92fr_1.35fr]">
        <section className="rounded-3xl border border-white/[0.09] bg-white/[0.025] p-4 sm:p-5"><div className="flex items-center justify-between px-2 pb-4 pt-1"><div><h2 className="font-semibold">Learning sequence</h2><p className="mt-1 text-xs text-slate-500">Complete in order to progress</p></div><span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400">{completedCount}/{TASKS.length}</span></div>
          <div className="space-y-2">{TASKS.map((task, index) => { const completed = completedTasks.includes(task.id); const unlocked = isUnlocked(index); const selected = selectedTaskId === task.id; return <button key={task.id} type="button" disabled={!unlocked} onClick={() => { if (unlocked) setSelectedTaskId(task.id); }} className={"flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition " + (selected ? "border-cyan-200/40 bg-cyan-200/[0.07] ring-1 ring-cyan-200/10 " : completed ? "border-emerald-200/15 bg-emerald-200/[0.04] " : unlocked ? "border-white/[0.07] bg-black/10 hover:border-white/20 hover:bg-white/[0.035] " : "cursor-not-allowed border-white/[0.04] bg-black/10 opacity-50 ")}><span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold " + (completed ? "bg-emerald-200/10 text-emerald-200" : unlocked ? "bg-cyan-200/10 text-cyan-200" : "bg-white/[0.06] text-slate-500")}>{completed ? "✓" : unlocked ? String(index + 1).padStart(2, "0") : "⌑"}</span><span className="min-w-0 flex-1"><span className="block text-[10px] font-bold tracking-[0.18em] text-slate-500">{task.day}</span><span className="mt-1 block text-sm font-semibold leading-5 text-white">{task.title}</span><span className="mt-1.5 block text-xs leading-5 text-slate-400">{completed ? "Completed · available to review" : unlocked ? "Ready when you are" : "Complete the previous task to unlock"}</span></span><span className={"mt-1 text-sm " + (selected ? "text-cyan-200" : "text-slate-600")}>{selected ? "→" : completed ? "✓" : ""}</span></button>; })}</div>
          <button onClick={resetProgress} className="mt-4 w-full rounded-xl border border-white/[0.08] px-4 py-3 text-xs font-semibold text-slate-500 transition hover:border-rose-200/20 hover:text-rose-200">Reset progress</button>
        </section>
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-[#101d30] via-[#0c1423] to-[#111126] p-6 sm:p-9"><div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-300/[0.06] blur-3xl" />
          {allCompleted ? <div className="relative flex min-h-[420px] flex-col items-start justify-center"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-200/10 text-3xl text-emerald-200">✓</div><p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-emerald-200">Journey complete</p><h2 className="mt-3 text-3xl font-semibold">You completed the sample path.</h2><p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">Follow the learning tasks in sequence. The curriculum and readiness criteria should be agreed with the training owners.</p><Link href="/dashboard" className="mt-7 rounded-xl bg-cyan-300 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-200">Return to dashboard →</Link></div> : selectedTask ? <div className="relative">
            <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-cyan-200/20 bg-cyan-200/[0.07] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-cyan-100">{selectedTask.day}</span><span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-semibold text-slate-400">TASK {String(selectedIndex + 1).padStart(2, "0")} OF {String(TASKS.length).padStart(2, "0")}</span>{completedTasks.includes(selectedTask.id) && <span className="rounded-full border border-emerald-200/20 bg-emerald-200/[0.07] px-3 py-1.5 text-[10px] font-bold text-emerald-200">COMPLETED</span>}</div>
            <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{selectedTask.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">{selectedTask.description}</p>
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-black/20 p-5 sm:p-6"><h3 className="flex items-center gap-2 text-sm font-semibold"><span className="text-cyan-200">◎</span> What you need to do</h3><ol className="mt-4 space-y-4">{selectedTask.instructions.map((instruction, index) => <li key={instruction} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-xs font-semibold text-slate-300">{index + 1}</span><span className="text-sm leading-6 text-slate-300">{instruction}</span></li>)}</ol></div>
            {selectedTask.resourceUrl && <div className="mt-5 rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.04] p-5"><p className="text-xs font-bold uppercase tracking-[0.17em] text-cyan-200">Learning resource</p><p className="mt-2 text-sm text-slate-300">Open the resource, complete the activity, then return here to continue your journey.</p><div className="mt-4">{selectedTask.resourceUrl.startsWith("/") ? <Link href={selectedTask.resourceUrl} className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/25 bg-cyan-200/[0.08] px-4 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-200/[0.13]">{selectedTask.resourceLabel ?? "Open learning resource"} ↗</Link> : <a href={selectedTask.resourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/25 bg-cyan-200/[0.08] px-4 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-200/[0.13]">{selectedTask.resourceLabel ?? "Open learning resource"} ↗</a>}</div></div>}
            <div className="mt-8 flex flex-col gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-sm text-xs leading-5 text-slate-500">{completedTasks.includes(selectedTask.id) ? "This task is complete. You can review it or select another unlocked task." : "Completion is learner-confirmed and saved in this browser."}</p>{completedTasks.includes(selectedTask.id) ? <span className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-200/[0.07] px-5 py-3 text-sm font-semibold text-emerald-100">✓ Task completed</span> : <button onClick={() => completeTask(selectedTask.id)} className="inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-300 px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200">Mark task complete →</button>}</div>
          </div> : <p className="text-slate-400">No active tasks are available.</p>}
        </section>
      </div>
      <footer className="mt-8 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Progress is stored locally in this browser.</span><Link href="/" className="hover:text-cyan-200">Molex New Hire Training ↗</Link></footer>
    </div>
  </main>;
}