"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../planContext/PlanContext";


export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 bg-[#0b0c0e]/90 backdrop-blur-md border-b border-[#181920]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display font-bold text-xl tracking-wider text-white"
        >
          {/* Modern Next.js img tag ba regular img tag */}
          <img
            src="/logo.png"
            alt="FitLog Logo"
            className="w-8 h-8 object-contain"
          />
          <span>FITLOG</span>
        </Link>

        {/* Center: Nav links */}
        <nav className="flex items-center gap-2 bg-[#121318] p-1 rounded-full border border-[#1e2029]">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname === "/"
                ? "bg-[#1e2029] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              pathname === "/my-plan"
                ? "bg-[#1e2029] text-[#ccff00]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badges */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:opacity-90 transition"
          >
            <span>Plan</span>
            <span className="bg-[#ccff00] text-black font-bold w-5 h-5 rounded-full flex items-center justify-center text-[11px]">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:opacity-90 transition"
          >
            <span>Saved</span>
            <span className="border border-zinc-700 bg-[#121318] text-zinc-300 w-5 h-5 rounded-full flex items-center justify-center text-[11px]">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
