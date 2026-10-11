"use client";
import { useState } from "react";

const fitnessGoals = [
  "Lose weight",
  "Build muscle",
  "Improve cardio",
  "Flexibility",
  "Sport performance",
];

const notifSettings = [
  { key: "email", label: "Email reminders" },
  { key: "sms", label: "SMS alerts" },
  { key: "cancel", label: "Class cancellations" },
  { key: "progress", label: "Progress updates" },
];

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer flex-shrink-0"
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: on ? "#D7FF3F" : "#DADCD3",
        transition: "background 0.2s",
      }}
      role="switch"
      aria-checked={on}
    >
      <div
        className="absolute top-0.5 rounded-full"
        style={{
          width: 20,
          height: 20,
          background: "#fff",
          left: on ? 22 : 2,
          transition: "left 0.2s",
        }}
      />
    </div>
  );
}

export default function MemberProfilePage() {
  const [goals, setGoals] = useState<Record<string, boolean>>({
    "Lose weight": true,
    "Build muscle": true,
    "Improve cardio": false,
    Flexibility: false,
    "Sport performance": false,
  });

  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    email: true,
    sms: false,
    cancel: true,
    progress: true,
  });

  function toggleGoal(g: string) {
    setGoals((prev) => ({ ...prev, [g]: !prev[g] }));
  }

  function toggleNotif(k: string) {
    setNotifs((prev) => ({ ...prev, [k]: !prev[k] }));
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
            MEMBER
          </span>
          <h1 className="text-2xl font-bold" style={{ color: "#111310" }}>
            My Profile
          </h1>
        </div>
        <button
          className="px-4 py-2 text-sm font-semibold rounded-lg"
          style={{ background: "#D7FF3F", color: "#111310" }}
        >
          Save Changes
        </button>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT — col-span-2 */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Personal info card */}
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h2
                className="text-base font-semibold mb-6"
                style={{ color: "#111310" }}
              >
                Personal Information
              </h2>

              {/* Avatar upload */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                      color: "#fff",
                    }}
                  >
                    T
                  </div>
                  <button
                    className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{ background: "#D7FF3F", color: "#111310" }}
                  >
                    ✎
                  </button>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#111310" }}>
                    Nguyễn Thị Trâm
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#8A8E85" }}>
                    Click the icon to upload a new photo
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[13px] font-medium mb-1" style={{ color: "#111310" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Nguyễn Thị Trâm"
                    className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                    style={{ color: "#111310" }}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1" style={{ color: "#111310" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="tram@example.com"
                    className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                    style={{ color: "#111310" }}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1" style={{ color: "#111310" }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue="0901 234 567"
                    className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                    style={{ color: "#111310" }}
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium mb-1" style={{ color: "#111310" }}>
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    defaultValue="1998-04-15"
                    className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                    style={{ color: "#111310" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-medium mb-1" style={{ color: "#111310" }}>
                  Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue="Fitness enthusiast focused on strength training and overall wellness."
                  className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none resize-none"
                  style={{ color: "#111310" }}
                />
              </div>
            </div>

            {/* Fitness goals card */}
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h2
                className="text-base font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Fitness Goals
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {fitnessGoals.map((goal) => (
                  <label
                    key={goal}
                    className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-[#DADCD3] hover:border-[#D7FF3F] transition-colors"
                    style={
                      goals[goal]
                        ? { background: "#FAFFF0", borderColor: "#D7FF3F" }
                        : {}
                    }
                  >
                    <input
                      type="checkbox"
                      checked={!!goals[goal]}
                      onChange={() => toggleGoal(goal)}
                      className="w-4 h-4"
                      style={{ accentColor: "#D7FF3F" }}
                    />
                    <span className="text-sm font-medium" style={{ color: "#111310" }}>
                      {goal}
                    </span>
                  </label>
                ))}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A8E85" }}>
                  Current Plan
                </p>
                <span
                  className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-[#DADCD3]"
                  style={{ color: "#111310" }}
                >
                  Perform — $59/month
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — col-span-1 */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Studio info card */}
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Studio Information
              </h3>
              {[
                { label: "Membership Plan", value: "Perform" },
                { label: "Trainer Assigned", value: "Coach Văn Quân" },
                { label: "Studio Location", value: "Pulse District 2" },
                { label: "Member Since", value: "Jan 2025" },
                { label: "Sessions Left", value: "6 PT sessions" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between py-2.5 border-b border-[#F0F0EB] last:border-0"
                >
                  <span className="text-sm" style={{ color: "#5E625A" }}>
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#111310" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Notifications card */}
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Notifications
              </h3>
              <div className="flex flex-col">
                {notifSettings.map((n, i) => (
                  <div
                    key={n.key}
                    className="flex items-center justify-between py-3 border-b border-[#F0F0EB] last:border-0"
                  >
                    <span className="text-sm" style={{ color: "#111310" }}>
                      {n.label}
                    </span>
                    <Toggle
                      on={notifs[n.key]}
                      onClick={() => toggleNotif(n.key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
