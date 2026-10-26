"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Learner = {
  id: string;
  name: string;
  role: string;
  startDate: string;
  completed: number;
  total: number;
  quizAverage: number | null;
  status: "On track" | "Needs attention" | "Not started";
  lastActivity: string;
};

const LEARNERS: Learner[] = [
  { id: "PS-001", name: "Learner 01", role: "Product Specialist", startDate: "—", completed: 32, total: 94, quizAverage: 86, status: "On track", lastActivity: "Recently active" },
  { id: "PS-002", name: "Learner 02", role: "Product Specialist", startDate: "—", completed: 21, total: 94, quizAverage: 72, status: "Needs attention", lastActivity: "Follow-up recommended" },
  { id: "PS-003", name: "Learner 03", role: "Product Specialist", startDate: "—", completed: 12, total: 94, quizAverage: null, status: "On track", lastActivity: "Recently active" },
  { id: "PS-004", name: "Learner 04", role: "Product Specialist", startDate: "—", completed: 0, total: 94, quizAverage: null, status: "Not started", lastActivity: "Awaiting first activity" },
];

export default function ManagerPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All learners");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filtered = useMemo(() => LEARNERS.filter((learner) => {
    const matchesQuery = (learner.name + " " + learner.id).toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (statusFilter === "All learners" || learner.status === statusFilter);
  }), [query, statusFilter]);
  const selected = LEARNERS.find((learner) => learner.id === selectedId);
  const averageProgress = Math.round(LEARNERS.reduce((sum, learner) => sum + learner.completed / learner.total, 0) / LEARNERS.length * 100);
  const onTrack = LEARNERS.filter((learner) => learner.status === "On track").length;
  const attention = LEARNERS.filter((learner) => learner.status === "Needs attention").length;

  return (
    <main className="min-h-screen bg-[#080d18] text-white">
      <header className="border-b border-white/[0.08] bg-[#080d18]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">M</div>
            <div><p className="text-sm font-bold tracking-[0.12em]">MOLEX NEW HIRE TRAINING</p><p className="mt-0.5 text-xs text-slate-400">Manager Portal</p></div>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/dashboard" className="hidden rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:text-white sm:inline-flex">Learner Dashboard</Link>
            <Link href="/" className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:text-white">Home</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">LEARNING OVERSIGHT</p><h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Team progress</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Review individual learning progress, quiz performance, and learners who may need support.</p></div>
          <button type="button" onClick={() => window.print()} className="self-start rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-cyan-200/30 hover:text-cyan-100 sm:self-auto">Export / Print report ↗</button>
        </div>

        <div className="mt-7 rounded-xl border border-amber-200/15 bg-amber-200/[0.04] px-4 py-3 text-xs leading-5 text-amber-100/80">The learner rows below are example records to illustrate the manager view. Real individual progress requires employee sign-in and a shared training data source.</div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Learners" value={String(LEARNERS.length)} note="In this example team" />
          <Metric label="Average progress" value={averageProgress + "%"} note="Across listed learners" />
          <Metric label="On track" value={String(onTrack)} note="Progressing through learning" />
          <Metric label="Needs attention" value={String(attention)} note="Follow-up recommended" />
        </section>

        <section className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div><h2 className="text-lg font-semibold">Learner roster</h2><p className="mt-1 text-sm text-slate-400">Select a learner to review their learning summary.</p></div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input aria-label="Search learners" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search learner or ID" className="rounded-xl border border-white/10 bg-[#080d18] px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-200/40" />
              <select aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-white/10 bg-[#080d18] px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-200/40">
                <option>All learners</option><option>On track</option><option>Needs attention</option><option>Not started</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-white/[0.025] text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4 font-semibold">Learner</th><th className="px-5 py-4 font-semibold">Progress</th><th className="px-5 py-4 font-semibold">Quiz average</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4 font-semibold">Latest activity</th><th className="px-5 py-4 font-semibold">Details</th></tr></thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map((learner) => {
                  const progress = Math.round(learner.completed / learner.total * 100);
                  return <tr key={learner.id} className="transition hover:bg-white/[0.025]">
                    <td className="px-5 py-4"><p className="font-semibold text-slate-100">{learner.name}</p><p className="mt-1 text-xs text-slate-500">{learner.id} · {learner.role}</p></td>
                    <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300" style={{width: progress + "%"}} /></div><span className="whitespace-nowrap text-xs text-slate-300">{progress}%</span></div><p className="mt-1 text-xs text-slate-500">{learner.completed}/{learner.total} tasks</p></td>
                    <td className="px-5 py-4 text-slate-300">{learner.quizAverage === null ? "—" : learner.quizAverage + "%"}</td>
                    <td className="px-5 py-4"><Status status={learner.status} /></td>
                    <td className="px-5 py-4 text-xs text-slate-400">{learner.lastActivity}</td>
                    <td className="px-5 py-4"><button type="button" onClick={() => setSelectedId(learner.id)} className="font-semibold text-cyan-200 hover:text-cyan-100">View details →</button></td>
                  </tr>;
                })}
                {filtered.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">No learners match your search.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        {selected && <section className="mt-6 rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.035] p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-wider text-cyan-200">LEARNER SUMMARY</p><h2 className="mt-2 text-2xl font-semibold">{selected.name}</h2><p className="mt-1 text-sm text-slate-400">{selected.id} · {selected.role}</p></div><button onClick={() => setSelectedId(null)} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-slate-300 hover:text-white">Close</button></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3"><Metric label="Tasks completed" value={selected.completed + "/" + selected.total} note={Math.round(selected.completed/selected.total*100) + "% journey completion"} /><Metric label="Quiz average" value={selected.quizAverage === null ? "Not attempted" : selected.quizAverage + "%"} note="Across recorded quizzes" /><Metric label="Recommended action" value={selected.status === "Needs attention" ? "Schedule check-in" : selected.status === "Not started" ? "Confirm onboarding start" : "Continue journey"} note="Based on current example status" /></div>
        </section>}

        <footer className="mt-8 border-t border-white/[0.08] pt-5 text-xs text-slate-500">Molex New Hire Training · Manager Portal</footer>
      </div>
    </main>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p><p className="mt-3 text-3xl font-semibold">{value}</p><p className="mt-2 text-xs leading-5 text-slate-500">{note}</p></div>;
}

function Status({ status }: { status: Learner["status"] }) {
  const classes = status === "On track" ? "border-emerald-200/20 bg-emerald-200/[0.07] text-emerald-100" : status === "Needs attention" ? "border-amber-200/20 bg-amber-200/[0.07] text-amber-100" : "border-white/10 bg-white/[0.04] text-slate-300";
  return <span className={"inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold " + classes}>{status}</span>;
}
