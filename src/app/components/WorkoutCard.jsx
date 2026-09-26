"use client";

import Link from "next/link";
import { Clock, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  // 1. Safe Calories Calculation (Handling API Property: caloriesBurned)
  const calValue =
    workout.caloriesBurned || workout.calories || workout.calories_burned || 0;

  // 2. Safe Muscle Groups / Categories Calculation (Handling API Property: muscleGroups)
  const categories =
    Array.isArray(workout.muscleGroups) && workout.muscleGroups.length > 0
      ? workout.muscleGroups
      : Array.isArray(workout.category)
        ? workout.category
        : [workout.category || "FITNESS"];

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="bg-[#121318] border border-[#1e2029] rounded-2xl overflow-hidden hover:border-zinc-700 transition flex flex-col justify-between group p-1.5"
    >
      <div>
        {/* Card Image Container */}
        <div className="h-48 w-full bg-[#181920] rounded-xl overflow-hidden">
          <img
            src={
              workout.image ||
              workout.illustration ||
              "https://via.placeholder.com/300"
            }
            alt={workout.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* Card Body */}
        <div className="p-4">
          {/* Category Badges (Renders 2 Badges from API: muscleGroups) */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className="text-[11px] uppercase font-black tracking-wide px-3 py-1 bg-[#ccff00] text-black rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-display font-extrabold text-lg uppercase text-white mb-1 group-hover:text-[#ccff00] transition tracking-wide">
            {workout.name}
          </h3>

          {/* Subtitle / Equipment */}
          <p className="text-xs text-zinc-400 font-medium truncate">
            {Array.isArray(workout.equipment)
              ? workout.equipment.join(", ")
              : workout.equipment}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-4 pb-3 pt-2 border-t border-[#1e2029]/60 flex items-center justify-between text-xs text-zinc-400 font-medium">
        {/* Duration */}
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
          <span>{workout.duration || 0} min</span>
        </div>

        {/* Calories */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-zinc-300 rounded-full inline-block"></span>
          <span>{calValue} kcal</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-zinc-400" />
          <span>{workout.rating || 0}</span>
        </div>
      </div>
    </Link>
  );
}