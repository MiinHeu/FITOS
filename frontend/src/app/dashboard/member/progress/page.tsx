"use client";

const statCards = [
  { label: "Weight", value: "72", unit: "kg" },
  { label: "Body Fat", value: "18", unit: "%" },
  { label: "Classes Attended", value: "48", unit: "" },
  { label: "Streak", value: "12", unit: "days" },
];

const measurements = [
  { label: "Chest", value: "96 cm", date: "Jul 10" },
  { label: "Waist", value: "78 cm", date: "Jul 10" },
  { label: "Hips", value: "90 cm", date: "Jul 10" },
  { label: "Arms", value: "34 cm", date: "Jul 10" },
];

const weeklyAttendance = [
  { week: "W1", classes: 3 },
  { week: "W2", classes: 5 },
  { week: "W3", classes: 4 },
  { week: "W4", classes: 6 },
  { week: "W5", classes: 3 },
  { week: "W6", classes: 5 },
  { week: "W7", classes: 4 },
  { week: "W8", classes: 6 },
];

const maxClasses = Math.max(...weeklyAttendance.map((w) => w.classes));

const personalRecords = [
  { exercise: "Squat", weight: "80 kg", date: "Jul 10, 2025", improvement: "+5 kg" },
  { exercise: "Deadlift", weight: "100 kg", date: "Jul 5, 2025", improvement: "+10 kg" },
  { exercise: "Bench Press", weight: "60 kg", date: "Jul 8, 2025", improvement: "+2.5 kg" },
  { exercise: "Overhead Press", weight: "40 kg", date: "Jul 3, 2025", improvement: "+2.5 kg" },
  { exercise: "Pull-up", weight: "BW+10 kg", date: "Jun 28, 2025", improvement: "+5 kg" },
];

export default function MemberProgressPage() {
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
            My Progress
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        {/* 4 stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statCards.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl border border-[#DADCD3] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#8A8E85" }}>
                {s.label}
              </p>
              <p className="text-3xl font-bold" style={{ color: "#111310" }}>
                {s.value}
                <span className="text-base font-normal" style={{ color: "#5E625A" }}>
                  {s.unit}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Body metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Body Metrics */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
            <h2 className="text-base font-semibold mb-5" style={{ color: "#111310" }}>
              Body Metrics
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { label: "Weight", value: "72", unit: "kg", trend: "↓ 3kg" },
                { label: "Height", value: "165", unit: "cm", trend: "" },
                { label: "BMI", value: "26.4", unit: "", trend: "Normal" },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-3xl font-bold" style={{ color: "#111310" }}>
                    {m.value}
                    <span className="text-sm font-normal" style={{ color: "#5E625A" }}>
                      {m.unit}
                    </span>
                  </p>
                  <p className="text-xs uppercase tracking-wider mt-1" style={{ color: "#8A8E85" }}>
                    {m.label}
                  </p>
                  {m.trend && (
                    <p className="text-xs font-semibold mt-1" style={{ color: "#526B00" }}>
                      {m.trend}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Measurements */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
            <h2 className="text-base font-semibold mb-5" style={{ color: "#111310" }}>
              Measurements
            </h2>
            <div className="flex flex-col">
              {measurements.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 border-b border-[#F0F0EB] last:border-0"
                >
                  <span className="text-sm" style={{ color: "#5E625A" }}>
                    {m.label}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-semibold" style={{ color: "#111310" }}>
                      {m.value}
                    </span>
                    <span className="text-xs ml-2" style={{ color: "#8A8E85" }}>
                      {m.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly class attendance bar chart */}
        <div className="bg-white rounded-xl border border-[#DADCD3] p-6 mb-6">
          <h2 className="text-base font-semibold mb-5" style={{ color: "#111310" }}>
            Weekly Class Attendance (8 weeks)
          </h2>
          <div className="flex items-end gap-3" style={{ height: "120px" }}>
            {weeklyAttendance.map((w, i) => {
              const isLast = i === weeklyAttendance.length - 1;
              const barPct = Math.round((w.classes / maxClasses) * 100);
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center gap-1"
                  style={{ height: "100%", justifyContent: "flex-end" }}
                >
                  <span className="text-xs font-semibold" style={{ color: "#111310" }}>
                    {w.classes}
                  </span>
                  <div
                    className="w-full rounded-t-lg"
                    style={{
                      height: `${barPct}%`,
                      background: isLast ? "#D7FF3F" : "#ECEDE6",
                    }}
                  />
                  <span className="text-xs" style={{ color: "#8A8E85" }}>
                    {w.week}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Personal Records table */}
        <div className="bg-white rounded-xl border border-[#DADCD3] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#DADCD3]">
            <h2 className="text-base font-semibold" style={{ color: "#111310" }}>
              Personal Records
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: "#F5F5F0" }}>
                {["Exercise", "Weight", "Date", "Improvement"].map((col) => (
                  <th
                    key={col}
                    className="text-left px-6 py-3 text-xs font-bold uppercase tracking-wider"
                    style={{ color: "#8A8E85" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0EB]">
              {personalRecords.map((pr, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: "#111310" }}>
                    {pr.exercise}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold" style={{ color: "#526B00" }}>
                    {pr.weight}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: "#8A8E85" }}>
                    {pr.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "#E8FFAA", color: "#526B00" }}
                    >
                      {pr.improvement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
