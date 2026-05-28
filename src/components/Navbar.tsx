"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {

  const pathname = usePathname();

  function navClass(path: string) {

    return pathname === path
      ? "text-white"
      : "text-zinc-400 hover:text-blue-400";
  }

  return (
    <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-xl sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        {/* Brand */}
        <div>

          <h1 className="text-2xl font-bold">
            Nexus Academy
          </h1>

          <p className="text-sm text-zinc-500 mt-1">
            AI Product Specialist Enablement Platform
          </p>

        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm font-medium">

          <Link
            href="/dashboard"
            className={`${navClass("/dashboard")} transition`}
          >
            Dashboard
          </Link>

          <Link
            href="/training"
            className={`${navClass("/training")} transition`}
          >
            Training
          </Link>

          <Link
            href="/simulation"
            className={`${navClass("/simulation")} transition`}
          >
            Simulation
          </Link>

          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
            V
          </div>

        </div>

      </div>

    </nav>
  );
}