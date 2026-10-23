"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Message = { role: "assistant" | "user"; text: string };

const welcome: Message = {
  role: "assistant",
  text: "Hi, I’m Nexus AI Mentor. Ask a question about connector fundamentals, electrical connectivity, product selection principles, or your learning journey. I’ll help explain concepts step by step.",
};

export default function AIMentor() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  async function handleSend(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    setMessages((current) => [...current, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data: { reply?: string; error?: string } = await response.json();
      if (!response.ok) throw new Error(data.error || "The mentor is temporarily unavailable.");
      if (!data.reply?.trim()) throw new Error("The mentor returned an empty response. Please try again.");
      setMessages((current) => [...current, { role: "assistant", text: data.reply!.trim() }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to reach the mentor right now.";
      setError(message);
      setMessages((current) => [...current, { role: "assistant", text: "I couldn’t complete that response just now. You can try again in a moment, or continue exploring the learning tasks." }]);
    } finally {
      setLoading(false);
    }
  }

  return <>
    <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close Nexus AI Mentor" : "Open Nexus AI Mentor"} aria-expanded={open} className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-300 text-2xl text-slate-950 shadow-[0_12px_40px_rgba(34,211,238,0.22)] transition hover:-translate-y-1 hover:bg-cyan-200">
      {open ? "×" : "✦"}
    </button>
    {open && <section aria-label="Nexus AI Mentor chat" className="fixed bottom-24 right-4 z-50 flex h-[min(600px,calc(100dvh-8rem))] w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] shadow-2xl shadow-black/60">
      <header className="border-b border-white/[0.08] bg-[#101a2b] px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-lg text-cyan-200">✦</div><div><h2 className="text-sm font-bold text-white">Nexus AI Mentor</h2><p className="mt-1 text-[11px] text-slate-400">Engineering learning companion · Prototype</p></div><span className="ml-auto h-2 w-2 rounded-full bg-cyan-300" /></div></header>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        <div className="mb-2 rounded-xl border border-amber-200/15 bg-amber-100/[0.04] px-3 py-2 text-[11px] leading-5 text-amber-100/80">Prototype mentor. Verify technical and product-specific answers against approved documentation.</div>
        {messages.map((message, index) => <div key={index} className={"max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 whitespace-pre-wrap " + (message.role === "user" ? "ml-auto bg-cyan-300 text-slate-950" : "border border-white/[0.08] bg-white/[0.05] text-slate-200")}>{message.text}</div>)}
        {loading && <div className="flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.05] px-4 py-3 text-xs text-slate-400"><span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />Thinking through your question…</div>}
        {error && <p role="status" className="px-1 text-xs leading-5 text-amber-200">{error}</p>}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSend} className="border-t border-white/[0.08] bg-[#0e1727] p-3"><label htmlFor="nexus-mentor-input" className="sr-only">Ask the Nexus AI Mentor</label><div className="flex gap-2"><input id="nexus-mentor-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about connectors…" disabled={loading} className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#080d18] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-200/40 disabled:opacity-60" /><button type="submit" disabled={loading || !input.trim()} className="rounded-xl bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50">Send</button></div></form>
    </section>}
  </>;
}
