"use client";
import { useState } from "react";

interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

interface DayPlan {
  exercises: Exercise[];
}

type WeekPlan = Record<string, DayPlan>;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EXERCISE_LIBRARY = [
  { name: "Bench Press", category: "Upper" },
  { name: "Overhead Press", category: "Upper" },
  { name: "Pull-up", category: "Upper" },
  { name: "Barbell Row", category: "Upper" },
  { name: "Bicep Curl", category: "Upper" },
  { name: "Squat", category: "Lower" },
  { name: "Deadlift", category: "Lower" },
  { name: "Leg Press", category: "Lower" },
  { name: "Romanian Deadlift", category: "Lower" },
  { name: "Plank", category: "Core" },
  { name: "Russian Twist", category: "Core" },
  { name: "HIIT Run", category: "Cardio" },
];

const CATEGORIES = ["All", "Upper", "Lower", "Core", "Cardio"];

const categoryColors: Record<string, { bg: string; color: string }> = {
  Upper: { bg: "#E9EDFF", color: "#3B4FA8" },
  Lower: { bg: "#FFF3E0", color: "#B87000" },
  Core: { bg: "#E8FFAA", color: "#526B00" },
  Cardio: { bg: "#D7FF3F", color: "#111310" },
};

const initialPlan: WeekPlan = {
  Mon: {
    exercises: [
      { name: "Squat", sets: "4", reps: "6" },
      { name: "Romanian Deadlift", sets: "3", reps: "8" },
    ],
  },
  Tue: { exercises: [] },
  Wed: { exercises: [{ name: "Bench Press", sets: "4", reps: "6" }] },
  Thu: { exercises: [] },
  Fri: { exercises: [{ name: "Pull-up", sets: "4", reps: "6" }] },
  Sat: { exercises: [] },
  Sun: { exercises: [] },
};

export default function WorkoutBuilderPage() {
  const [planName, setPlanName] = useState("4-Week Plan — Nguyễn Thị Trâm");
  const [plan, setPlan] = useState<WeekPlan>(initialPlan);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = EXERCISE_LIBRARY.filter((ex) => {
    const matchCat = activeCategory === "All" || ex.category === activeCategory;
    const matchSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  function addExercise(day: string, exName: string) {
    setPlan((prev) => ({
      ...prev,
      [day]: {
        exercises: [
          ...prev[day].exercises,
          { name: exName, sets: "3", reps: "10" },
        ],
      },
    }));
  }

  function removeExercise(day: string, index: number) {
    setPlan((prev) => ({
      ...prev,
      [day]: {
        exercises: prev[day].exercises.filter((_, i) => i !== index),
      },
    }));
  }

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div>
          <span
            className="block text-[10px] font-semibold uppercase tracking-widest mb-1"
            style={{ color: "#526B00" }}
          >
            TRAINER
          </span>
          <h1 className="text-2xl font-bold" style={{ color: "#111310" }}>
            Workout Builder
          </h1>
        </div>
        <button
          className="px-4 py-2 text-sm font-semibold rounded-lg"
          style={{ background: "#D7FF3F", color: "#111310" }}
        >
          Save Plan
        </button>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT — Plan builder */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
            {/* Plan name input */}
            <input
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="w-full text-xl font-bold border-0 outline-none focus:ring-0 mb-4 p-0"
              style={{ color: "#111310" }}
            />

            <button
              className="mb-5 px-4 py-2 text-sm font-semibold rounded-lg border border-[#DADCD3] hover:bg-[#F5F5F0] transition-colors"
              style={{ color: "#111310" }}
            >
              + Add Week
            </button>

            {/* Week 1 accordion (open by default) */}
            <div>
              <div
                className="text-xs font-bold uppercase tracking-wider mb-4 px-1"
                style={{ color: "#526B00" }}
              >
                Week 1
              </div>

              <div className="flex flex-col gap-3">
                {DAYS.map((day) => {
                  const dayData = plan[day];
                  return (
                    <div
                      key={day}
                      className="border border-[#DADCD3] rounded-xl p-4"
                    >
                      <div
                        className="text-xs font-bold uppercase tracking-wider mb-3"
                        style={{ color: "#5E625A" }}
                      >
                        {day}
                      </div>

                      {dayData.exercises.map((ex, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 mb-2 py-2 border-b border-[#F0F0EB] last:border-0"
                        >
                          <span style={{ color: "#DADCD3" }}>⋮⋮</span>
                          <span
                            className="flex-1 text-sm font-semibold"
                            style={{ color: "#111310" }}
                          >
                            {ex.name}
                          </span>
                          <span className="text-xs" style={{ color: "#5E625A" }}>
                            {ex.sets}×{ex.reps}
                          </span>
                          <button
                            onClick={() => removeExercise(day, i)}
                            className="text-xs ml-2"
                            style={{ color: "#8A8E85" }}
                          >
                            ✕
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => addExercise(day, "New Exercise")}
                        className="mt-2 w-full py-2 text-xs font-semibold rounded-lg border border-dashed border-[#DADCD3] hover:border-[#D7FF3F] transition-colors"
                        style={{ color: "#526B00" }}
                      >
                        + Add exercise
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT — Exercise library */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
            <h2
              className="text-base font-semibold mb-4"
              style={{ color: "#111310" }}
            >
              Exercise Library
            </h2>

            {/* Search */}
            <div className="relative mb-4">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#8A8E85" }}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-[#DADCD3] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                style={{ color: "#111310" }}
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors"
                  style={
                    activeCategory === cat
                      ? {
                          background: "#D7FF3F",
                          borderColor: "#D7FF3F",
                          color: "#111310",
                        }
                      : {
                          background: "#fff",
                          borderColor: "#DADCD3",
                          color: "#5E625A",
                        }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Exercise list */}
            <div className="overflow-y-auto" style={{ maxHeight: "520px" }}>
              {filteredExercises.map((ex, i) => {
                const chip = categoryColors[ex.category] ?? {
                  bg: "#ECEDE6",
                  color: "#5E625A",
                };
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-[#F0F0EB] last:border-0"
                  >
                    <div>
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#111310" }}
                      >
                        {ex.name}
                      </p>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{ background: chip.bg, color: chip.color }}
                      >
                        {ex.category}
                      </span>
                    </div>
                    <button
                      className="text-sm font-bold px-3 py-1.5 rounded-lg border border-[#DADCD3] hover:border-[#D7FF3F] transition-colors"
                      style={{ color: "#526B00" }}
                    >
                      + Add
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
