"use client";

import Link from "next/link";

const weeks = [
  { week: "01", theme: "Role, team & business context", objective: "Understand the Product Specialist role, key stakeholders, product lifecycle, and how Product Management works with Engineering, Sales, Operations, and customers.", evidence: "Role map and personal learning goals", status: "Proposed" },
  { week: "02", theme: "Connector Fundamentals I", objective: "Learn the purpose of a connector and the basic electrical and mechanical principles behind a reliable connection.", evidence: "Foundational knowledge check", status: "Existing mission to validate" },
  { week: "03", theme: "Connector Fundamentals II", objective: "Identify housing, terminals, contacts, seals, polarization, locking features, mating, and common failure considerations.", evidence: "Component identification exercise", status: "Proposed" },
  { week: "04", theme: "Portfolio map & product families", objective: "Build a structured view of the assigned portfolio, naming conventions, product-family purpose, and where to find approved information.", evidence: "Portfolio map and terminology check", status: "Proposed" },
  { week: "05", theme: "Low-power & signal solutions", objective: "Understand key use cases, specifications, design constraints, and the questions needed to evaluate application fit.", evidence: "Product-family comparison worksheet", status: "Proposed" },
  { week: "06", theme: "High-power solutions", objective: "Explore high-power connector concepts, current-carrying considerations, thermal effects, mating configurations, and relevant portfolio differentiators.", evidence: "Specification interpretation exercise", status: "Proposed" },
  { week: "07", theme: "Applications & customer needs", objective: "Translate customer and market context into requirements, constraints, and questions for technical discovery.", evidence: "Customer needs brief", status: "Proposed" },
  { week: "08", theme: "Product selection & specifications", objective: "Read datasheets and drawings, compare requirements, recognize limitations, and escalate gaps rather than assume fit.", evidence: "Guided product-selection case", status: "Proposed" },
  { week: "09", theme: "Competitive landscape & positioning", objective: "Compare solutions using approved, current evidence and communicate differentiators without unsupported claims.", evidence: "Evidence-backed comparison", status: "Proposed" },
  { week: "10", theme: "Practical product case", objective: "Apply portfolio and engineering knowledge to a realistic use case, document assumptions, and explain a reasoned recommendation.", evidence: "Case-study submission and review", status: "Proposed" },
  { week: "11", theme: "Product operations & lifecycle", objective: "Understand the relevant internal workflows, lifecycle status, change notifications, documentation, and cross-functional handoffs for the assigned role.", evidence: "Process walkthrough and checklist", status: "Proposed" },
  { week: "12", theme: "Assessment & readiness review", objective: "Demonstrate core knowledge, present a product/application case, identify development gaps, and agree follow-up actions with the manager or trainer.", evidence: "Final assessment and manager discussion", status: "Proposed" },
];

const working = [
  ["Landing page and learner dashboard", "Available in current experience", "Visual experience and navigation are implemented."],
  ["Sequential onboarding flow", "Available in current experience", "Five sample tasks; next task unlocks after completion."],
  ["Progress persistence", "Working locally only", "Browser localStorage; not shared across users or devices."],
  ["Reset learning progress", "Implemented", "Dashboard reset clears local onboarding completion and XP after confirmation."],
  ["Connector Fundamentals mission", "Available learning module", "Route and learning experience exist; validate content and scoring before claiming assessment readiness."],
  ["AI mentor", "Environment-dependent", "API route exists; availability depends on configured API key, quota, and approved grounding."],
  ["12-week curriculum", "Proposed design", "The roadmap on this page is a planning proposal, not a fully populated course."],
  ["SharePoint content and progress", "Not connected", "Live SharePoint read/write integration is not connected."],
  ["Manager analytics and reporting", "Not connected", "No validated shared reporting or learner-level management dashboard."],
  ["Enterprise identity, permissions and governance", "Not verified", "Requires IT/security review and an approved deployment path."],
];

const lists = [
  { name: "NexusLearningTasks", purpose: "Master curriculum catalogue", fields: "TaskID, WeekNumber, WeekTitle, SequenceNumber, TaskTitle, TaskDescription, Instructions, LearningObjective, ResourceTitle, ResourceURL, TaskType, PrerequisiteTaskID, MandatoryStatus, CompletionCriteria, IsActive" },
  { name: "NexusLearnerProgress", purpose: "Per-learner task status", fields: "LearnerEmail, LearnerName, TaskID, TaskStatus, StartedAt, CompletedAt, AssessmentScore" },
];

export default function ManagementPage() {
  return <main className="min-h-screen bg-[#080d18] text-white">
    <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#080d18]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300 font-black text-slate-950">N</div><div><p className="text-sm font-bold tracking-[0.16em]">NEXUS ACADEMY</p><p className="mt-0.5 text-xs text-slate-400">Management brief</p></div></Link>
        <div className="flex items-center gap-3"><Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">Open Dashboard</Link><Link href="/" className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 hover:text-white">Overview</Link></div>
      </div>
    </header>

    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Learning platform overview</p><h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">A path toward a governed learning platform.</h1><p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">Molex New Hire Training is a guided learning journey for Product Specialists. This overview separates available learning interactions from capabilities that need curriculum approval, IT alignment, and integration work.</p></div>
        <div className="rounded-2xl border border-cyan-200/15 bg-cyan-200/[0.04] p-6"><p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Management ask</p><h2 className="mt-3 text-xl font-semibold">Approve a controlled discovery and pilot—not a production rollout.</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300"><li>01 · Nominate curriculum owners and reviewers.</li><li>02 · Confirm the approved Microsoft environment and site.</li><li>03 · Agree pilot audience, success measures, and data access.</li></ul></div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Metric title="Journey length" value="12 weeks" detail="Proposed learning architecture" />
        <Metric title="Learning task flow" value="5 sample tasks" detail="Sequential completion in browser" />
        <Metric title="SharePoint integration" value="Not connected" detail="Design and approval remain" />
      </section>

      <section className="mt-14">
        <SectionTitle eyebrow="01 · Capability truth" title="What works today vs. what is proposed" text="Use this status view to distinguish available features from capabilities that still need enterprise integration." />
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <div className="hidden grid-cols-[0.9fr_0.8fr_1.3fr] gap-4 bg-white/[0.05] px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 md:grid"><span>Capability</span><span>Status</span><span>Evidence / boundary</span></div>
          {working.map((item) => <div key={item[0]} className="grid gap-2 border-t border-white/[0.07] px-5 py-4 md:grid-cols-[0.9fr_0.8fr_1.3fr] md:gap-4"><p className="text-sm font-semibold">{item[0]}</p><p className="text-xs font-bold text-cyan-200">{item[1]}</p><p className="text-sm leading-6 text-slate-400">{item[2]}</p></div>)}
        </div>
      </section>

      <section className="mt-14">
        <SectionTitle eyebrow="02 · Proposed curriculum" title="The 12-week learning journey" text="This is a working curriculum proposal to review with Product Management, Engineering, and training owners. Weekly topics, prerequisites, workload, and pass criteria are not yet approved." />
        <div className="mt-6 space-y-3">
          {weeks.map((item) => <article key={item.week} className="grid gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:grid-cols-[4rem_1fr_0.8fr] sm:items-start sm:p-6"><div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-200/15 bg-cyan-200/[0.06] text-sm font-bold text-cyan-200">W{item.week}</div><div><div className="flex flex-wrap items-center gap-2"><h3 className="text-lg font-semibold">{item.theme}</h3>{item.status !== "Proposed" && <span className="rounded-full border border-amber-200/20 px-2 py-1 text-[10px] font-semibold text-amber-100">{item.status}</span>}</div><p className="mt-2 text-sm leading-6 text-slate-400">{item.objective}</p></div><div className="rounded-xl bg-black/20 p-4"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Evidence / output</p><p className="mt-2 text-sm leading-6 text-slate-300">{item.evidence}</p></div></article>)}
        </div>
      </section>

      <section className="mt-14">
        <SectionTitle eyebrow="03 · Microsoft integration" title="Recommended SharePoint-backed architecture" text="Target architecture only. The current experience uses browser storage and is not connected to SharePoint. Confirm that the lists below exist in the dedicated PSBU PM Training site before wiring the app." />
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <Architecture n="01" title="Approved SharePoint site" text="PSBU PM Training site, site owners, access groups, and content governance confirmed by IT/site owner." />
          <Architecture n="02" title="Curriculum list" text="NexusLearningTasks stores the approved task catalogue, sequence, instructions, resources, prerequisites, and active status." />
          <Architecture n="03" title="Learner progress list" text="NexusLearnerProgress stores per-learner status, timestamps, and assessment score with least-privilege permissions." />
          <Architecture n="04" title="App + automation" text="Preferred Microsoft-native path: Power Apps for learner UI, SharePoint Lists for data, and Power Automate for approved notifications/reporting where needed." />
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {lists.map((list) => <div key={list.name} className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><h3 className="text-lg font-semibold">{list.name}</h3><p className="mt-1 text-sm text-cyan-200">{list.purpose}</p><p className="mt-4 text-xs leading-6 text-slate-400"><span className="font-semibold text-slate-300">Planned fields:</span> {list.fields}</p></div>)}
        </div>
        <div className="mt-5 rounded-2xl border border-amber-200/15 bg-amber-100/[0.035] p-5"><h3 className="font-semibold text-amber-100">Important implementation checks</h3><ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 sm:grid-cols-2"><li>• Confirm lists are in PSBU PM Training, not only the earlier site.</li><li>• Verify actual internal column names, lookup configuration, and choice values.</li><li>• Decide whether learners can update only their own progress rows.</li><li>• Confirm Power Apps, Power Automate, and any AI capacity/licensing separately.</li><li>• Use approved internal resource links; avoid copying restricted content into an unapproved host.</li><li>• Validate retention, reporting access, audit requirements, and data ownership with IT.</li></ul></div>
      </section>

      <section className="mt-14">
        <SectionTitle eyebrow="04 · Delivery plan" title="A gated path to a pilot" text="Each phase ends with a review gate. Do not treat the proposed timeline as a committed delivery date until owners, access, and licensing are confirmed." />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Phase n="01" title="Validate" timing="Gate 1" items={["Confirm curriculum owner and reviewers", "Approve 12-week outline and learning outcomes", "Confirm SharePoint site and list readiness"]} />
          <Phase n="02" title="Connect" timing="Gate 2" items={["Connect to approved Microsoft data source", "Test learner identity and row-level permissions", "Validate task loading and progress write-back"]} />
          <Phase n="03" title="Pilot" timing="Gate 3" items={["Run with a small Product Specialist cohort", "Collect learner and trainer feedback", "Measure completion, quiz performance, and friction"]} />
          <Phase n="04" title="Decide" timing="Gate 4" items={["Review evidence against success criteria", "Prioritize content and UX improvements", "Approve, revise, or stop wider rollout"]} />
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-cyan-200/15 bg-gradient-to-br from-cyan-300/[0.09] via-[#0d1727] to-indigo-300/[0.06] p-6 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Proposed pilot measures</p><h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Measure learning—not just clicks.</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{t:"Task completion",d:"Share of assigned tasks completed within the agreed window."},{t:"Knowledge checks",d:"Baseline and end-of-module results using approved questions."},{t:"Learner confidence",d:"Short self-rating before and after the learning path."},{t:"Manager review",d:"Structured assessment of applied product understanding."}].map((m) => <div key={m.t} className="rounded-2xl border border-white/10 bg-black/20 p-4"><h3 className="font-semibold">{m.t}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{m.d}</p></div>)}</div><p className="mt-6 text-xs leading-6 text-slate-500">Baseline, targets, sample size, and reporting ownership must be agreed before the pilot. No performance outcomes are claimed at this stage.</p>
      </section>

      <footer className="mt-12 flex flex-col gap-3 border-t border-white/[0.08] pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>Nexus Academy · Management discussion draft · Curriculum and integrations require validation</span><div className="flex gap-4"><Link href="/dashboard" className="hover:text-cyan-200">Explore Dashboard ↗</Link><Link href="/" className="hover:text-cyan-200">Home ↗</Link></div></footer>
    </div>
  </main>;
}

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">{eyebrow}</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">{text}</p></div>;
}
function Metric({ title, value, detail }: { title: string; value: string; detail: string }) {
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{title}</p><p className="mt-3 text-2xl font-semibold">{value}</p><p className="mt-2 text-xs text-slate-500">{detail}</p></div>;
}
function Architecture({ n, title, text }: { n: string; title: string; text: string }) {
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><span className="text-xs font-bold tracking-[0.18em] text-cyan-200">{n}</span><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{text}</p></div>;
}
function Phase({ n, title, timing, items }: { n: string; title: string; timing: string; items: string[] }) {
  return <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"><div className="flex items-center justify-between"><span className="text-xs font-bold tracking-[0.18em] text-cyan-200">{n}</span><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-slate-400">{timing}</span></div><h3 className="mt-4 text-lg font-semibold">{title}</h3><ul className="mt-3 space-y-2">{items.map((item) => <li key={item} className="text-sm leading-6 text-slate-400">• {item}</li>)}</ul></div>;
}
