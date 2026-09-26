"use client";

import { useState, useEffect } from "react";
import WorkoutCard from "./components/WorkoutCard";
import { ArrowDown, Loader2 } from "lucide-react";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-[#121318] border border-[#1e2029] rounded-2xl p-8 sm:p-12 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[420px]">
          {/* Left Column: Text Content */}
          <div>
            <span className="text-[#ccff00] font-bold tracking-widest text-xs uppercase mb-3 block">
              WORKOUT LIBRARY
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase text-white tracking-tight mb-4 leading-tight">
              TRAIN WITH INTENT. LOG EVERY SET.
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-md">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into todays plan, and watch the weeks work add up.
            </p>
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg hover:bg-lime-400 transition"
            >
              <span>Browse Workouts</span>
              <span>↓</span>
            </a>
          </div>

          {/* Right Column: Image Container */}
          <div className="flex justify-center md:justify-end items-center h-full">
            <div className="w-full max-w-sm h-72 sm:h-80 md:h-96 flex items-center justify-center">
              <img
                src="/banner.png" // Apnar image name anujayi change korun
                alt="Gym Companion Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Library Grid */}
      <section
        id="library"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold uppercase text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-xs mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-zinc-500 gap-2 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-[#ccff00]" />
            <span>Fetching exercises...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}