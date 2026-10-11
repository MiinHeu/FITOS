"use client";
import { useState } from "react";
import Link from "next/link";

type Tab = "Classes" | "Personal Training";

function getWeekDays() {
  const abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      label: abbr[d.getDay()],
      date: d.getDate(),
      isToday: i === 0,
    };
  });
}

interface ClassItem {
  time: string;
  type: string;
  name: string;
  instructor: string;
  duration: string;
  spotsTaken: number;
  spotsTotal: number;
  booked: boolean;
}

const classes: ClassItem[] = [
  {
    time: "07:00",
    type: "Yoga",
    name: "Morning Yoga Flow",
    instructor: "Coach Thanh Hà",
    duration: "60 min",
    spotsTaken: 7,
    spotsTotal: 12,
    booked: true,
  },
  {
    time: "08:30",
    type: "HIIT",
    name: "HIIT Blast",
    instructor: "Coach Minh Tuấn",
    duration: "45 min",
    spotsTaken: 15,
    spotsTotal: 15,
    booked: false,
  },
  {
    time: "09:00",
    type: "Cycling",
    name: "Cycling Power",
    instructor: "Coach Phương Linh",
    duration: "50 min",
    spotsTaken: 12,
    spotsTotal: 18,
    booked: false,
  },
  {
    time: "18:30",
    type: "Strength",
    name: "Strength Lab",
    instructor: "Coach Văn Quân",
    duration: "60 min",
    spotsTaken: 9,
    spotsTotal: 15,
    booked: false,
  },
  {
    time: "19:00",
    type: "Yoga",
    name: "Yin Yoga",
    instructor: "Coach Mai Anh",
    duration: "75 min",
    spotsTaken: 18,
    spotsTotal: 18,
    booked: false,
  },
];

const typeChip: Record<string, { bg: string; color: string }> = {
  Yoga: { bg: "#E9EDFF", color: "#3B4FA8" },
  HIIT: { bg: "#D7FF3F", color: "#526B00" },
  Cycling: { bg: "#FFF3E0", color: "#B87000" },
  Strength: { bg: "#ECEDE6", color: "#5E625A" },
};

export default function BookPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Classes");
  const [selectedDay, setSelectedDay] = useState(0);
  const days = getWeekDays();

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/member"
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ background: "#ECEDE6", color: "#111310", textDecoration: "none" }}
          >
            ←
          </Link>
          <div>
            <span
              className="block text-[10px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#526B00" }}
            >
              MEMBER
            </span>
            <h1 className="text-2xl font-bold" style={{ color: "#111310" }}>
              Book a Class
            </h1>
          </div>
        </div>
      </div>

      {/* Tab row */}
      <div className="bg-white border-b border-[#DADCD3] px-8 flex gap-6">
        {(["Classes", "Personal Training"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="py-4 text-sm font-semibold border-b-2 transition-colors"
            style={
              activeTab === tab
                ? { borderColor: "#D7FF3F", color: "#111310" }
                : { borderColor: "transparent", color: "#8A8E85" }
            }
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        {/* Date strip */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {days.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className="rounded-xl px-4 py-3 text-center flex-shrink-0 border transition-colors min-w-[56px]"
              style={
                selectedDay === i
                  ? { background: "#D7FF3F", borderColor: "#D7FF3F", color: "#111310" }
                  : { background: "#fff", borderColor: "#DADCD3", color: "#5E625A" }
              }
            >
              <p className="text-xs font-semibold">{d.label}</p>
              <p className="text-xl font-bold mt-0.5">{d.date}</p>
            </button>
          ))}
        </div>

        {/* Classes grid */}
        {activeTab === "Classes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((cls, i) => {
              const chip = typeChip[cls.type] ?? { bg: "#ECEDE6", color: "#5E625A" };
              const spotsLeft = cls.spotsTotal - cls.spotsTaken;
              const full = spotsLeft === 0;
              const pct = Math.round((cls.spotsTaken / cls.spotsTotal) * 100);

              return (
                <div
                  key={i}
                  className="bg-white border border-[#DADCD3] rounded-xl p-5"
                >
                  {/* Top row: time + type chip */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold" style={{ color: "#111310" }}>
                      {cls.time}
                    </span>
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: chip.bg, color: chip.color }}
                    >
                      {cls.type}
                    </span>
                  </div>

                  {/* Class name */}
                  <h3 className="text-base font-bold mb-0.5" style={{ color: "#111310" }}>
                    {cls.name}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "#5E625A" }}>
                    {cls.instructor} · {cls.duration}
                  </p>

                  {/* Spots */}
                  <div className="mb-3">
                    <div
                      className="w-full h-1.5 rounded-full mb-1"
                      style={{ background: "#ECEDE6" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: full ? "#E53E3E" : "#D7FF3F",
                        }}
                      />
                    </div>
                    <p className="text-xs" style={{ color: full ? "#E53E3E" : "#5E625A" }}>
                      {full ? "Class full" : `${spotsLeft} spots left`}
                    </p>
                  </div>

                  {/* CTA */}
                  {cls.booked ? (
                    <button
                      disabled
                      className="w-full py-2.5 text-sm font-semibold rounded-lg"
                      style={{ background: "#D7FF3F", color: "#111310", opacity: 0.7 }}
                    >
                      Booked ✓
                    </button>
                  ) : full ? (
                    <button
                      className="w-full py-2.5 text-sm font-semibold rounded-lg border border-[#DADCD3] hover:bg-[#F5F5F0] transition-colors"
                      style={{ color: "#111310" }}
                    >
                      Join Waitlist
                    </button>
                  ) : (
                    <button
                      className="w-full py-2.5 text-sm font-semibold rounded-lg"
                      style={{ background: "#D7FF3F", color: "#111310" }}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "Personal Training" && (
          <div className="bg-white rounded-xl border border-[#DADCD3] p-8 text-center">
            <p className="text-base font-semibold mb-2" style={{ color: "#111310" }}>
              Request a PT Session
            </p>
            <p className="text-sm" style={{ color: "#5E625A" }}>
              Select a date above and contact your assigned trainer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
