"use client";

import Link from "next/link";

const destinations = [
  {
    number: "01",
    title: "Learning Journey",
    description: "Follow the structured onboarding path, explore weekly learning tasks, and track completion.",
    href: "/journey",
    action: "Explore learning journey",
  },
  {
    number: "02",
    title: "Dashboard",
    description: "See your overall progress, experience points, remaining tasks, and recommended next step.",
    href: "/dashboard",
    action: "View dashboard",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#080d18] text-white">
      <nav className="border-b border-white/[0.08] bg-[#080d18]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-lg font-black text-slate-950">M</div>
            <div>
              <p className="text-sm font-bold tracking-[0.12em]">MOLEX NEW HIRE TRAINING</p>
              <p className="mt-0.5 text-xs text-slate-400">Product Specialist Training</p>
            </div>
          </Link>
          <div className="flex items-center gap-2"><Link href="/manager" className="hidden rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-slate-300 hover:border-cyan-200/30 hover:text-cyan-100 sm:inline-flex">Manager Portal</Link><Link href="/journey" className="rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
            Start learning <span aria-hidden="true">→</span>
          </Link></div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">PRODUCT SPECIALIST TRAINING</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Build product knowledge.
            <span className="mt-1 block bg-gradient-to-r from-cyan-200 to-sky-300 bg-clip-text text-transparent">Grow technical confidence.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A guided learning space for new Molex Product Specialists, bringing onboarding tasks, technical learning, and progress tracking together.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {destinations.map((item) => (
            <Link
              key={item.number}
              href={item.href}
              className="group flex min-h-[245px] flex-col rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.045]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.18em] text-cyan-200">{item.number}</span>
                <span className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-cyan-200" aria-hidden="true">↗</span>
              </div>
              <h2 className="mt-8 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">{item.description}</p>
              <span className="mt-6 border-t border-white/[0.08] pt-4 text-sm font-semibold text-cyan-200">{item.action} <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-white/[0.08] bg-[#0c1422] p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold">Learn step by step</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">Work through tasks in a clear sequence, with objectives and guidance.</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Apply technical knowledge</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">Use interactive learning activities to explore connector engineering fundamentals.</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Keep track of progress</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">See completed tasks, what remains, and where to continue next.</p>
            </div>
          </div>
        </section>
      </section>

      <footer className="border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>Molex New Hire Training</span>
          <span>Product Specialist Training</span>
        </div>
      </footer>
    </main>
  );
}
