"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import tasksData from "@/data/nexus-tasks.json";

type Task = (typeof tasksData)[number];
const TASKS = [...tasksData].sort((a, b) => a.sequenceNumber - b.sequenceNumber);
const STORAGE_KEY = "nexus94CompletedTaskIds";
const XP_KEY = "nexus94TotalXP";

function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "green" | "amber" | "red" | "cyan" }) {
  const styles = {
    neutral: "border-white/10 bg-white/[0.04] text-slate-300",
    green: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
    amber: "border-amber-300/20 bg-amber-300/10 text-amber-100",
    red: "border-rose-300/20 bg-rose-300/10 text-rose-200",
    cyan: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${styles[tone]}`}>{children}</span>;
}

export default function JourneyPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("NS-001");
  const [search, setSearch] = useState("");
  const [weekFilter, setWeekFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAllWeeks, setShowAllWeeks] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setCompleted([...new Set(parsed.filter((id): id is string => typeof id === "string" && TASKS.some(t => t.taskId === id)))]);
      }
    } catch (error) {
      console.error("Unable to load Molex journey progress", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  const completedSet = useMemo(() => new Set(completed), [completed]);
  const nextTask = TASKS.find(task => !completedSet.has(task.taskId));
  const selectedTask = TASKS.find(task => task.taskId === selectedId) ?? nextTask ?? TASKS[0];
  const isNextTask = !!nextTask && selectedTask?.taskId === nextTask.taskId;
  const progress = Math.round((completed.length / TASKS.length) * 100);
  const weeks = [...new Set(TASKS.map(task => task.weekNumber))];
  const visibleTasks = TASKS.filter(task => {
    const matchesSearch = !search || [task.taskId, task.taskTitle, task.taskDescription, task.taskType, task.weekTitle].join(" ").toLowerCase().includes(search.toLowerCase());
    const matchesWeek = weekFilter === "all" || task.weekNumber === Number(weekFilter);
    const matchesStatus = statusFilter === "all" || (statusFilter === "completed" ? completedSet.has(task.taskId) : !completedSet.has(task.taskId));
    return matchesSearch && matchesWeek && matchesStatus;
  });
  const visibleWeeks = [...new Set(visibleTasks.map(task => task.weekNumber))];

  function completeTask(task: Task) {
    if (completedSet.has(task.taskId)) return;
    const updated = [...completed, task.taskId];
    setCompleted(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(XP_KEY, String(updated.length * 10));
    } catch (error) {
      console.error("Unable to save Molex journey progress", error);
    }
    const next = TASKS.find(t => !updated.includes(t.taskId));
    if (next) setSelectedId(next.taskId);
  }

  function resetProgress() {
    if (!window.confirm("Reset all 94-task learning progress in this browser?")) return;
    setCompleted([]);
    setSelectedId("NS-001");
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(XP_KEY);
    } catch (error) {
      console.error("Unable to reset Molex journey progress", error);
    }
  }

  if (!loaded) return <main className="min-h-screen bg-[#080d18] p-8 text-white"><div className="mx-auto max-w-7xl animate-pulse"><div className="h-8 w-64 rounded bg-white/10" /><div className="mt-6 h-72 rounded-3xl bg-white/5" /></div></main>;

  return <main className="min-h-screen bg-[#080d18] text-white">
    <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#080d18]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">M</div><div><p className="text-sm font-bold tracking-[0.16em]">MOLEX NEW HIRE TRAINING</p><p className="mt-0.5 text-xs text-slate-400">Product Specialist Training</p></div></Link>
        <div className="flex items-center gap-2"><nav className="flex items-center gap-2"><Link href="/manager" className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-200/30 hover:text-cyan-100">Manager Portal</Link><Link href="/dashboard" className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-200/30 hover:text-cyan-100">Dashboard</Link></nav></div>
      </div>
    </header>

    <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-8 sm:py-10">
      <div className="mb-7 grid gap-6 lg:grid-cols-[1.4fr_.6fr] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">THE 12-WEEK JOURNEY</p><h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">Your learning, one task at a time.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Explore the actual onboarding plan: 94 tasks, 12 weeks, clear prerequisites, resources, deliverables, and trainer follow-ups.</p></div>
        <div className="rounded-2xl border border-amber-200/20 bg-amber-200/[0.05] p-4"><p className="text-xs font-bold uppercase tracking-wider text-amber-100">Progress information</p><p className="mt-2 text-sm leading-6 text-slate-300">Your progress is saved in this browser. Shared learner records and SharePoint synchronisation can be connected as the platform develops.</p></div>
      </div>

      <section className="mb-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="text-xs text-slate-400">Total learning tasks</p><p className="mt-2 text-3xl font-semibold">{TASKS.length}</p><p className="mt-1 text-xs text-slate-500">Imported from the audited source list</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="text-xs text-slate-400">Journey progress</p><p className="mt-2 text-3xl font-semibold">{progress}%</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: progress + "%" }} /></div></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="text-xs text-slate-400">Tasks completed</p><p className="mt-2 text-3xl font-semibold">{completed.length}<span className="text-lg text-slate-500"> / {TASKS.length}</span></p><p className="mt-1 text-xs text-slate-500">Saved in this browser</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"><p className="text-xs text-slate-400">Experience points</p><p className="mt-2 text-3xl font-semibold">{completed.length * 10}<span className="ml-1 text-sm text-cyan-300">XP</span></p><p className="mt-1 text-xs text-slate-500">10 XP per completed task</p></div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(320px,.85fr)_minmax(0,1.15fr)]">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
          <div className="border-b border-white/10 p-4 sm:p-5"><div className="flex items-center justify-between gap-3"><div><h2 className="font-semibold">Learning roadmap</h2><p className="mt-1 text-xs text-slate-500">{visibleTasks.length} tasks match your filters</p></div><button type="button" onClick={() => setShowAllWeeks(v => !v)} className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white">{showAllWeeks ? "Collapse weeks" : "Expand weeks"}</button></div>
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_130px]"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks, IDs, topics…" className="min-w-0 rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-300/50" /><select value={weekFilter} onChange={e => setWeekFilter(e.target.value)} className="rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none"><option value="all">All weeks</option>{weeks.map(week => <option key={week} value={week}>Week {week}</option>)}</select></div>
            <div className="mt-2"><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2.5 text-sm text-white outline-none"><option value="all">All task statuses</option><option value="incomplete">Not completed</option><option value="completed">Completed</option></select></div>
          </div>
          <div className="max-h-[760px] overflow-y-auto p-3">
            {visibleWeeks.map(week => {
              const weekTasks = visibleTasks.filter(task => task.weekNumber === week);
              const weekDone = weekTasks.filter(task => completedSet.has(task.taskId)).length;
              const isExpanded = showAllWeeks || weekFilter !== "all" || search.length > 0 || week === (selectedTask?.weekNumber ?? 1);
              return <div key={week} className="mb-3 overflow-hidden rounded-xl border border-white/[0.07]">
                <div className="flex items-center justify-between bg-white/[0.035] px-3 py-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">Week {String(week).padStart(2,"0")}</p><p className="mt-1 text-sm font-semibold">{weekTasks[0]?.weekTitle}</p></div><span className="text-xs text-slate-400">{weekDone}/{weekTasks.length}</span></div>
                {isExpanded && <div className="divide-y divide-white/[0.05]">{weekTasks.map(task => {
                  const isDone = completedSet.has(task.taskId);
                  const isSelected = selectedTask?.taskId === task.taskId;
                  return <button type="button" key={task.taskId} onClick={() => setSelectedId(task.taskId)} className={`flex w-full items-start gap-3 px-3 py-3 text-left transition ${isSelected ? "bg-cyan-300/[0.08]" : "hover:bg-white/[0.035]"}`}>
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${isDone ? "border-emerald-300/40 bg-emerald-300/10 text-emerald-200" : isSelected ? "border-cyan-300/50 text-cyan-200" : "border-white/10 text-slate-500"}`}>{isDone ? "✓" : String(task.sequenceNumber).padStart(2,"0")}</span>
                    <span className="min-w-0 flex-1"><span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">{task.taskId} · {task.taskType || "Task"}</span><span className={`mt-1 block text-sm font-medium leading-5 ${isSelected ? "text-cyan-100" : "text-slate-200"}`}>{task.taskTitle}</span></span>
                    {isDone && <span className="text-xs text-emerald-200">Done</span>}
                  </button>;
                })}</div>}
              </div>;
            })}
            {visibleTasks.length === 0 && <div className="p-8 text-center text-sm text-slate-500">No tasks match those filters.</div>}
          </div>
        </div>

        <div className="h-fit overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] xl:sticky xl:top-24">
          {selectedTask && <><div className="border-b border-white/10 bg-gradient-to-br from-cyan-300/[0.09] to-transparent p-5 sm:p-7"><div className="flex flex-wrap items-center gap-2"><StatusPill tone="cyan">{selectedTask.taskId}</StatusPill><StatusPill>{`Week ${selectedTask.weekNumber}`}</StatusPill><StatusPill>{selectedTask.taskType || "Task"}</StatusPill>{completedSet.has(selectedTask.taskId) && <StatusPill tone="green">Completed</StatusPill>}{!completedSet.has(selectedTask.taskId) && isNextTask && <StatusPill tone="amber">Next up</StatusPill>}{!completedSet.has(selectedTask.taskId) && !isNextTask && <StatusPill>Locked</StatusPill>}</div><h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">{selectedTask.taskTitle}</h2><p className="mt-3 text-sm leading-7 text-slate-400">{selectedTask.taskDescription || "A description has not yet been supplied for this task."}</p></div>
          <div className="space-y-5 p-5 sm:p-7">
            <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Instructions</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300">{selectedTask.instructions || "Instructions need trainer confirmation before this task is released."}</p></div>
            {selectedTask.learningObjective && <div><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Learning objective</p><p className="mt-2 text-sm leading-7 text-slate-300">{selectedTask.learningObjective}</p></div>}
            <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Expected deliverable</p><p className="mt-2 text-sm text-slate-300">{selectedTask.expectedDeliverable || "Not yet defined"}</p></div><div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Completion criteria</p><p className="mt-2 text-sm text-slate-300">{selectedTask.completionCriteria || "Needs trainer confirmation"}</p></div></div>
            <div className="grid gap-3 sm:grid-cols-2"><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Owner</p><p className="mt-1 text-sm text-slate-300">{selectedTask.taskOwner || "Not assigned"}</p></div><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Estimated duration</p><p className="mt-1 text-sm text-slate-300">{selectedTask.estimatedDuration && selectedTask.estimatedDuration > 0 ? `${selectedTask.estimatedDuration} minutes` : "Not yet estimated"}</p></div></div>
            <div className="flex flex-wrap items-center gap-2"><StatusPill tone={selectedTask.resourceStatus === "Missing" ? "red" : selectedTask.resourceStatus === "Broken/Unverified" ? "amber" : "neutral"}>Resource: {selectedTask.resourceStatus || "Not specified"}</StatusPill>{selectedTask.mandatoryStatus && <StatusPill>{selectedTask.mandatoryStatus}</StatusPill>}{selectedTask.assessmentRequired && <StatusPill>Assessment: {selectedTask.assessmentRequired}</StatusPill>}</div>
            {selectedTask.resourceTitle && <div className="rounded-xl border border-white/[0.07] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Learning resource</p><p className="mt-1 text-sm font-medium text-slate-200">{selectedTask.resourceTitle}</p>{selectedTask.resourceUrl ? <a href={selectedTask.resourceUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-cyan-300 hover:text-cyan-100">Open resource ↗</a> : <p className="mt-1 text-xs text-amber-100">Resource link needs confirmation.</p>}</div>}
            {selectedTask.clarificationRequired && <div className="rounded-xl border border-amber-200/20 bg-amber-200/[0.04] p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-amber-100">Trainer clarification needed</p><p className="mt-2 text-sm leading-6 text-slate-300">{selectedTask.clarificationRequired}</p></div>}
            {selectedTask.prerequisiteTaskId && <div className="text-xs text-slate-500">Prerequisite: <button type="button" className="font-semibold text-cyan-300 hover:text-cyan-100" onClick={() => setSelectedId(selectedTask.prerequisiteTaskId!)}>{selectedTask.prerequisiteTaskId}</button></div>}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">{(selectedTask.taskId === "NS-005" || selectedTask.taskId === "NS-006") && <a href={`/mission/connector-fundamentals?task=${selectedTask.taskId}`} className="rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-center text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20">Start interactive connector learning →</a>}<button type="button" disabled={completedSet.has(selectedTask.taskId) || !isNextTask} onClick={() => completeTask(selectedTask)} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500">{completedSet.has(selectedTask.taskId) ? "Task completed ✓" : isNextTask ? "Mark task complete · +10 XP" : "Complete earlier tasks first"}</button><button type="button" onClick={resetProgress} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 hover:border-rose-200/30 hover:text-rose-200">Reset progress</button></div>{!completedSet.has(selectedTask.taskId) && !isNextTask && nextTask && <p className="text-xs leading-5 text-amber-100">Next step: complete {nextTask.taskId} — {nextTask.taskTitle} next. You can explore any task without marking it complete.</p>}
          </div></>}
        </div>
      </section>
      <p className="mt-6 text-center text-xs text-slate-600">Molex New Hire Training · Learning tasks are based on the current onboarding source list; fields requiring confirmation are identified for review.</p>
    </div>
  </main>;
}
