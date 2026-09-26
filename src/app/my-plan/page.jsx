"use client";

import { useState } from "react";
import { usePlan } from "../planContext/PlanContext";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();


  const rawList = activeTab === "plan" ? plan : saved;


  const totalExercises = rawList.length;
  const totalMinutes = rawList.reduce(
    (acc, curr) => acc + Number(curr.duration || 0),
    0,
  );
  const totalCalories = rawList.reduce(
    (acc, curr) =>
      acc +
      Number(curr.calories || curr.caloriesBurned || curr.calories_burned || 0),
    0,
  );

  // Sorting Logic
  const currentList = [...rawList].sort((a, b) => {
    const aCal = Number(
      a.calories || a.caloriesBurned || a.calories_burned || 0,
    );
    const bCal = Number(
      b.calories || b.caloriesBurned || b.calories_burned || 0,
    );

    if (sortBy === "duration") return (a.duration || 0) - (b.duration || 0);
    if (sortBy === "calories") return bCal - aCal;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-extrabold uppercase text-white">
          MY PLAN
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Dynamic Metrics Summary Card */}
      <div className="bg-[#121318] border border-[#1e2029] rounded-xl p-6 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#1e2029]">
        <div>
          <span className="text-xs text-zinc-500 uppercase font-semibold block mb-1">
            Exercises
          </span>
          <span className="text-4xl font-display font-bold text-[#ccff00]">
            {totalExercises}
          </span>
        </div>

        <div className="pt-4 sm:pt-0 sm:pl-6">
          <span className="text-xs text-zinc-500 uppercase font-semibold block mb-1">
            Minutes
          </span>
          <span className="text-4xl font-display font-bold text-white">
            {totalMinutes}
          </span>
        </div>

        <div className="pt-4 sm:pt-0 sm:pl-6">
          <span className="text-xs text-zinc-500 uppercase font-semibold block mb-1">
            Calories
          </span>
          <span className="text-4xl font-display font-bold text-white">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Sub Header: Tabs + Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex bg-[#121318] p-1 rounded-lg border border-[#1e2029] w-fit">
          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === "plan"
                ? "bg-[#1e2029] text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Todays Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${
              activeTab === "saved"
                ? "bg-[#1e2029] text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500">Sort By</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#121318] border border-[#1e2029] text-zinc-200 text-xs rounded-lg px-3 py-1.5 pr-8 appearance-none focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Workout Items List / Empty View */}
      {currentList.length === 0 ? (
        <div className="border border-dashed border-[#1e2029] rounded-2xl p-12 text-center my-8">
          <h3 className="font-display font-bold text-xl uppercase text-white mb-1">
            NOTHING HERE YET
          </h3>
          <p className="text-zinc-500 text-xs mb-5">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-2.5 rounded-lg hover:bg-lime-400 transition"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {currentList.map((item) => {
            const calValue =
              item.calories || item.caloriesBurned || item.calories_burned || 0;

            return (
              <div
                key={item.id}
                className="bg-[#121318] border border-[#1e2029] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      item.image ||
                      item.illustration ||
                      "https://via.placeholder.com/100"
                    }
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-[#181920] flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-bold uppercase text-white text-base">
                      {item.name}
                    </h4>
                    <p className="text-xs text-zinc-500 mb-1">
                      {Array.isArray(item.equipment)
                        ? item.equipment.join(", ")
                        : item.equipment}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span>⏱ {item.duration || 0} min</span>
                      <span>🔥 {calValue} kcal</span>
                      <span>⭐ {item.rating || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-3 py-1.5 border border-[#1e2029] bg-[#181920] text-xs font-semibold text-zinc-300 rounded-lg hover:bg-zinc-800 transition"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(item)}
                      className="flex items-center gap-1 bg-[#ccff00] text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-lime-400 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Mark as Done</span>
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="p-1.5 text-zinc-500 hover:text-zinc-200 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}