"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import toast from "react-hot-toast";

const PlanContext = createContext();

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const localPlan = localStorage.getItem("fitlog_plan");
    const localSaved = localStorage.getItem("fitlog_saved");

    if (localPlan) {
      setPlan(JSON.parse(localPlan));
    }

    if (localSaved) {
      setSaved(JSON.parse(localSaved));
    }

    setIsLoaded(true);
  }, []);

  // Save plan
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog_plan", JSON.stringify(plan));
  }, [plan, isLoaded]);

  // Save saved workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("fitlog_saved", JSON.stringify(saved));
  }, [saved, isLoaded]);

  // Add workout to today's plan
  const addToPlan = (workout) => {
    if (plan.length >= 5) {
      toast.error("Cap of 5 lifts reached for today!");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already in today's plan!");
      return;
    }

    setPlan((prev) => [...prev, workout]);

    toast.success("Added to today's plan");
  };

  // Save workout
  const addToSaved = (workout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved!");
      return;
    }

    setSaved((prev) => [...prev, workout]);

    toast.success("Saved for later");
  };

  // Remove from plan
  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));

    toast.success("Removed from plan");
  };

  // Remove from saved
  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));

    toast.success("Removed from saved");
  };

  // Mark workout as completed
  const markAsDone = (workout) => {
    removeFromPlan(workout.id);

    toast.success("Completed workout!");
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);