"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "nexus94CompletedTaskIds";
const XP_KEY = "nexusTotalXP";
const TASK_COUNT = 94;

export default function DashboardPage() {
  const [completed, setCompleted] = useState(0);
  const [xp, setXp] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompleted(new Set(parsed.filter((id): id is string => typeof id === "string" && /^NS-\d{3}$/.test(id))).size);
        }
      }
      setXp(Number(localStorage.getItem(XP_KEY)) || 0);
    } catch {
      // Keep the dashboard usable when browser storage is unavailable.
    } finally {
      setLoaded(true);
    }
  }, []);

  function resetProgress() {
    if (!window.confirm("Reset your Nexus Academy demo progress? This will clear 94-task journey progress and XP in this browser.")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(XP_KEY);
      setCompleted(0);
      setXp(0);
    } catch (error) {
      console.error("Unable to reset demo progress:", error);
      window.alert("Progress could not be reset. Please check your browser storage settings and try again.");
    }
  }

  const progress = Math.round((completed / TASK_COUNT) * 100);
  const finished = completed === TASK_COUNT;

  return <main className="min-h-screen bg-[#080d18] text-white">
    <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#080d18]/90 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
      <Link href="/" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">N</div><div><p className="text-sm font-bold tracking-[0.16em]">NEXUS ACADEMY</p><p className="mt-0.5 text-xs text-slate-400">Learner workspace</p></div></Link>
      <div className="flex items-center gap-2 sm:gap-3"><span className="hidden rounded-full border border-amber-200/20 bg-amber-200/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-100 sm:inline-flex">Prototype mode</span><button type="button" onClick={resetProgress} className="rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-rose-200/30 hover:text-rose-200 sm:px-4">Reset progress</button><Link href="/journey" className="rounded-xl bg-cyan-300 px-3 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-cyan-200 sm:px-4 sm:text-sm">Explore 94-task journey ↗</Link></div>
    </div></header>
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">YOUR DEVELOPMENT SPACE</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome to your journey.</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">A guided path to build product knowledge, strengthen engineering judgement, and prepare for customer conversations.</p></div><div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-300/10 text-xl text-violet-200">✦</div><div><p className="text-xs text-slate-400">Experience points</p><p className="text-xl font-bold">{loaded ? xp : "—"} <span className="text-xs font-semibold text-violet-200">XP</span></p></div></div></div>
      <section className="relative overflow-hidden rounded-[1.75rem] border border-cyan-200/15 bg-gradient-to-br from-cyan-300/[0.12] via-[#0e192a] to-indigo-300/[0.08] p-6 sm:p-10"><div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-cyan-300/[0.09] blur-3xl" /><div className="relative grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div><div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/[0.07] px-3 py-1.5 text-xs font-semibold text-cyan-100"><span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />YOUR NEXT CHAPTER</div><h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{finished ? "You’ve completed the sample journey." : completed === 0 ? "Build your expertise, one mission at a time." : "Momentum looks good. Keep going."}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">{finished ? "Review your learning journey or reset the demo to walk through it again." : "Each task has a clear purpose, instructions, and a next step. Complete the current task to unlock what follows."}</p><Link href="/onboarding" className="mt-7 inline-flex items-center gap-3 rounded-xl bg-cyan-300 px-5 py-3.5 font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-200">{finished ? "Review journey" : completed > 0 ? "Resume your journey" : "Start your journey"} →</Link></div>
        <div className="rounded-2xl border border-white/10 bg-[#08101d]/70 p-5 sm:p-6"><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Journey progress</p><p className="mt-2 text-4xl font-semibold">{loaded ? progress : "—"}<span className="text-xl text-slate-500">%</span></p></div><p className="text-right text-sm text-slate-400">{loaded ? completed + " of " + TASK_COUNT + " sample tasks" : "Loading progress"}</p></div><div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-sky-400 transition-all duration-700" style={{ width: (loaded ? progress : 0) + "%" }} /></div><div className="mt-5 flex items-center justify-between border-t border-white/[0.08] pt-4 text-xs"><span className="text-slate-400">{finished ? "Demo complete" : "Next task unlocks after completion"}</span><span className="font-semibold text-cyan-200">{loaded ? TASK_COUNT - completed + " remaining" : "—"}</span></div></div>
      </div></section>
      <section className="mt-6 grid gap-4 sm:grid-cols-3"><Metric icon="◎" label="Learning sequence" value="Step by step" note="A clear next action" /><Metric icon="✦" label="Learning support" value="AI mentor concept" note="Conversational help" /><Metric icon="↗" label="Progress model" value="Learner-led" note="Local prototype tracking" /></section>
      <section className="mt-10"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">THE EXPERIENCE</p><h2 className="mt-2 text-2xl font-semibold">Your learning toolkit</h2></div><p className="text-xs text-slate-500">Features shown are at prototype stage</p></div><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Feature href="/onboarding" n="01" title="Guided onboarding" text="Follow a structured sequence of tasks, open learning resources, and unlock the next step." status="Available in demo" />
        <Feature href="/mission/connector-fundamentals" n="02" title="Connector fundamentals" text="Explore connector anatomy, interactive learning steps, and a foundational knowledge check." status="Interactive mission" />
        <Feature href="/training" n="03" title="AI mentor simulation" text="Try a guided technical conversation and see how a mentor-led learning interaction could work." status="Demo experience" />
      </div></section>
      <section className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-7"><div className="flex gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-200/10 text-amber-100">i</div><div><h3 className="font-semibold">A transparent prototype</h3><p className="mt-2 max-w-4xl text-sm leading-7 text-slate-400">This preview uses five sample onboarding tasks and stores completion in the current browser. Shared learner records, the approved SharePoint curriculum, enterprise authentication, validated AI grounding, and management analytics are integration steps—not yet represented as live capabilities.</p></div></div></section>
      <footer className="mt-10 flex flex-col gap-2 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between"><span>Nexus Academy · Product Specialist Enablement</span><Link href="/" className="hover:text-cyan-200">Back to overview ↗</Link></footer>
    </div>
  </main>;
}

function Metric({ icon, label, value, note }: { icon: string; label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p><span className="text-lg text-cyan-200">{icon}</span></div><p className="mt-4 text-lg font-semibold">{value}</p><p className="mt-1 text-xs text-slate-500">{note}</p></div>;
}
function Feature({ href, n, title, text, status }: { href: string; n: string; title: string; text: string; status: string }) {
  return <Link href={href} className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-cyan-200/25 hover:bg-white/[0.04]"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.18em] text-cyan-200">{n}</span><span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200">↗</span></div><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-slate-400">{text}</p><div className="mt-5 border-t border-white/[0.08] pt-4 text-xs font-semibold text-cyan-200">{status}</div></Link>;
}