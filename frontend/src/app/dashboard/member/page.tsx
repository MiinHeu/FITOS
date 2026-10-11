"use client";
import Link from "next/link";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type DayStatus = "completed" | "planned" | "rest";

const weekGrid: { day: string; status: DayStatus }[] = [
  { day: "Mon", status: "completed" },
  { day: "Tue", status: "completed" },
  { day: "Wed", status: "completed" },
  { day: "Thu", status: "planned" },
  { day: "Fri", status: "planned" },
  { day: "Sat", status: "rest" },
  { day: "Sun", status: "rest" },
];

const activities = [
  {
    icon: "🏋️",
    desc: "Attended Strength Lab with Coach Quân",
    time: "2h ago",
  },
  { icon: "🏆", desc: "New PR: Squat 80kg × 5 reps", time: "Yesterday" },
  { icon: "📅", desc: "Booked Yoga Flow for Wednesday 7am", time: "Yesterday" },
  { icon: "📝", desc: "Logged Upper Push workout (55 min)", time: "2 days ago" },
  {
    icon: "✅",
    desc: "Completed week 3 of Perform program",
    time: "3 days ago",
  },
];

const quickActions = [
  { label: "Book a class", icon: "📅", href: "/dashboard/member/book" },
  { label: "Log workout", icon: "📝", href: "#" },
  { label: "View progress", icon: "📈", href: "/dashboard/member/progress" },
  { label: "AI Coach", icon: "🤖", href: "/dashboard/member/ai-coach" },
];

export default function MemberDashboardPage() {
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
            My Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium" style={{ color: "#5E625A" }}>
            Hi, Trâm
          </span>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: "#D7FF3F", color: "#111310" }}
          >
            T
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        {/* Row 1 — 3 top cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {/* Classes this week */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A8E85" }}>
              Classes This Week
            </p>
            <p className="text-3xl font-bold mb-1" style={{ color: "#111310" }}>
              4
              <span className="text-base font-normal" style={{ color: "#8A8E85" }}>
                /5
              </span>
            </p>
            <div className="w-full h-2 rounded-full" style={{ background: "#ECEDE6" }}>
              <div
                className="h-full rounded-full"
                style={{ width: "80%", background: "#D7FF3F" }}
              />
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A8E85" }}>
              Streak
            </p>
            <p className="text-3xl font-bold mb-1" style={{ color: "#111310" }}>
              12 <span className="text-2xl">🔥</span>
            </p>
            <p className="text-xs" style={{ color: "#5E625A" }}>
              days in a row
            </p>
          </div>

          {/* Next Class */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A8E85" }}>
              Next Class
            </p>
            <p className="text-base font-bold mb-1" style={{ color: "#111310" }}>
              Yoga Flow
            </p>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "#E8FFAA", color: "#526B00" }}
            >
              Tomorrow 9am
            </span>
          </div>
        </div>

        {/* Row 2 — Workout week grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekGrid.map(({ day, status }) => (
            <div
              key={day}
              className="rounded-xl p-3 text-center border"
              style={
                status === "completed"
                  ? { background: "#D7FF3F", borderColor: "#D7FF3F" }
                  : status === "planned"
                  ? { background: "#fff", borderColor: "#DADCD3" }
                  : { background: "#F5F5F0", borderColor: "#DADCD3" }
              }
            >
              <p
                className="text-xs font-semibold uppercase"
                style={{
                  color:
                    status === "completed"
                      ? "#111310"
                      : status === "planned"
                      ? "#111310"
                      : "#8A8E85",
                }}
              >
                {day}
              </p>
              <p
                className="text-lg mt-1"
                style={{
                  color:
                    status === "completed"
                      ? "#111310"
                      : status === "rest"
                      ? "#DADCD3"
                      : "#DADCD3",
                }}
              >
                {status === "completed" ? "✓" : status === "planned" ? "○" : "—"}
              </p>
            </div>
          ))}
        </div>

        {/* Row 3 — Activity feed + Quick actions */}
        <div className="grid grid-cols-3 gap-4">
          {/* Activity feed — col-span-2 */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h2
                className="text-base font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Recent Activity
              </h2>
              <div className="flex flex-col">
                {activities.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3 border-b border-[#F0F0EB] last:border-0"
                  >
                    <span className="text-xl flex-shrink-0">{a.icon}</span>
                    <p
                      className="flex-1 text-sm"
                      style={{ color: "#111310" }}
                    >
                      {a.desc}
                    </p>
                    <span
                      className="text-xs flex-shrink-0"
                      style={{ color: "#8A8E85" }}
                    >
                      {a.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div>
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h2
                className="text-base font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Quick Actions
              </h2>
              <div className="flex flex-col gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl border border-[#DADCD3] hover:border-[#D7FF3F] transition-colors"
                    style={{ textDecoration: "none" }}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span
                      className="flex-1 text-sm font-semibold"
                      style={{ color: "#111310" }}
                    >
                      {action.label}
                    </span>
                    <span style={{ color: "#8A8E85" }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
