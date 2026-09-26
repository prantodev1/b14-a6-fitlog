"use client";

import { useEffect, useState, use } from "react";
import { usePlan } from "../../planContext/PlanContext";
import { Plus, Bookmark, Loader2 } from "lucide-react";

export default function WorkoutDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = params;

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, addToSaved } = usePlan();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-zinc-500 gap-2 text-sm">
        <Loader2 className="w-5 h-5 animate-spin text-[#ccff00]" />
        <span>Loading workout details...</span>
      </div>
    );
  }

  if (!workout)
    return (
      <div className="text-center py-20 text-zinc-400">Workout not found.</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Illustration */}
        <div className="bg-[#121318] border border-[#1e2029] rounded-2xl overflow-hidden h-[380px] lg:h-[520px]">
          <img
            src={
              workout.image ||
              workout.illustration ||
              "https://via.placeholder.com/600"
            }
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Content */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold uppercase text-white mb-2">
            {workout.name}
          </h1>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
            {workout.description ||
              "A compound movement designed for maximum muscle engagement and strength."}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {workout.category?.map((cat, idx) => (
              <span
                key={idx}
                className="text-xs uppercase font-bold px-3 py-1 bg-[#ccff00] text-black rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Key Specs Table */}
          <div className="bg-[#121318] border border-[#1e2029] rounded-xl p-4 mb-6 divide-y divide-[#181920] text-xs">
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-semibold uppercase">
                EQUIPMENT
              </span>
              <span className="text-zinc-200">
                {Array.isArray(workout.equipment)
                  ? workout.equipment.join(", ")
                  : workout.equipment}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-semibold uppercase">
                DIFFICULTY
              </span>
              <span className="text-zinc-200">
                {workout.difficulty || "Intermediate"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-semibold uppercase">
                SETS
              </span>
              <span className="text-zinc-200">{workout.sets || 4}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-semibold uppercase">
                REPS
              </span>
              <span className="text-zinc-200">{workout.reps || "6-8"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-semibold uppercase">
                DURATION
              </span>
              <span className="text-zinc-200">{workout.duration} min</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-semibold uppercase">
                CALORIES
              </span>
              <span className="text-zinc-200">{workout.calories} kcal</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-500 font-semibold uppercase">
                RATING
              </span>
              <span className="text-zinc-200">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <h3 className="font-display font-bold uppercase text-sm text-white mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-xs text-zinc-400">
              {(
                workout.instructions || [
                  "Lie on the bench with eyes under the bar and feet planted.",
                  "Unrack with locked elbows and lower the bar to mid-chest.",
                  "Press up in a slight arc until elbows lock without bouncing.",
                  "Keep shoulder blades pinched and a natural arch in the back.",
                ]
              ).map((step, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-[#ccff00] font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => addToPlan(workout)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold text-xs uppercase px-5 py-3 rounded-lg hover:bg-lime-400 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add to todays plan</span>
            </button>

            <button
              onClick={() => addToSaved(workout)}
              className="flex-1 flex items-center justify-center gap-2 bg-[#121318] border border-[#1e2029] text-zinc-300 font-semibold text-xs uppercase px-5 py-3 rounded-lg hover:bg-[#181920] transition"
            >
              <Bookmark className="w-4 h-4" />
              <span>Save for later</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}