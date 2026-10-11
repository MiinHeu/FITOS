"use client";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const sessions = [
  {
    time: "06:30",
    end: "07:30",
    name: "Morning Yoga Flow",
    attendees: 8,
    capacity: 12,
    full: false,
  },
  {
    time: "08:00",
    end: "09:00",
    name: "HIIT Blast",
    attendees: 15,
    capacity: 15,
    full: true,
  },
  {
    time: "10:00",
    end: "11:00",
    name: "PT — Nguyễn Trâm",
    attendees: 1,
    capacity: 1,
    full: false,
  },
  {
    time: "11:30",
    end: "12:30",
    name: "PT — Lê Đức Thịnh",
    attendees: 1,
    capacity: 1,
    full: false,
  },
  {
    time: "18:30",
    end: "19:30",
    name: "Strength Lab",
    attendees: 10,
    capacity: 15,
    full: false,
  },
  {
    time: "19:45",
    end: "20:45",
    name: "Cycling Power",
    attendees: 18,
    capacity: 18,
    full: true,
  },
];

const clients = [
  { name: "Nguyễn Trâm", lastSession: "Today", progress: 82 },
  { name: "Lê Đức Thịnh", lastSession: "Today", progress: 65 },
  { name: "Phạm Lan Anh", lastSession: "Yesterday", progress: 45 },
  { name: "Trần Hải Nam", lastSession: "3 days ago", progress: 78 },
  { name: "Hoàng Bích Ngọc", lastSession: "5 days ago", progress: 91 },
];

function initials(name: string): string {
  return name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("");
}

export default function TrainerPage() {
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
            My Schedule
          </h1>
        </div>
        <span className="text-sm" style={{ color: "#5E625A" }}>
          {today}
        </span>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT — Today's sessions (col-span-2) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <div className="flex items-center gap-3 mb-5">
                <h2
                  className="text-base font-semibold"
                  style={{ color: "#111310" }}
                >
                  Today&apos;s Sessions
                </h2>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "#D7FF3F", color: "#111310" }}
                >
                  {sessions.length}
                </span>
              </div>

              {/* Current time indicator */}
              <div
                className="flex items-center gap-2 mb-4"
                style={{ color: "#526B00" }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: "#D7FF3F" }}
                />
                <div
                  className="flex-1 h-px"
                  style={{ background: "#D7FF3F" }}
                />
                <span className="text-xs font-semibold">Now</span>
              </div>

              {/* Sessions timeline */}
              <div className="flex flex-col">
                {sessions.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-4 border-b border-[#F0F0EB] last:border-0"
                  >
                    {/* Time */}
                    <div className="w-20 flex-shrink-0">
                      <p
                        className="text-sm font-bold"
                        style={{ color: "#111310" }}
                      >
                        {s.time}
                      </p>
                      <p className="text-xs" style={{ color: "#8A8E85" }}>
                        –{s.end}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <p
                        className="text-sm font-semibold"
                        style={{ color: "#111310" }}
                      >
                        {s.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={
                            s.full
                              ? { background: "#D7FF3F", color: "#111310" }
                              : { background: "#F0F0EB", color: "#5E625A" }
                          }
                        >
                          {s.attendees}/{s.capacity}
                          {s.full ? " · Full" : " attendees"}
                        </span>
                      </div>
                    </div>

                    {/* View button */}
                    <button
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#DADCD3] hover:bg-[#F5F5F0] transition-colors flex-shrink-0"
                      style={{ color: "#111310" }}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — My Clients */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h2
                className="text-base font-semibold mb-1"
                style={{ color: "#111310" }}
              >
                My Clients
              </h2>
              <p
                className="text-xs uppercase font-semibold mb-4"
                style={{ color: "#526B00" }}
              >
                Active Clients
              </p>

              <div className="flex flex-col gap-4">
                {clients.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 pb-4 border-b border-[#F0F0EB] last:border-0 last:pb-0"
                  >
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{ background: "#ECEDE6", color: "#111310" }}
                    >
                      {initials(c.name)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: "#111310" }}
                      >
                        {c.name}
                      </p>
                      <p className="text-xs" style={{ color: "#8A8E85" }}>
                        Last: {c.lastSession}
                      </p>
                      {/* Progress bar */}
                      <div
                        className="w-full h-1.5 rounded-full mt-1.5"
                        style={{ background: "#ECEDE6" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${c.progress}%`,
                            background: "#D7FF3F",
                          }}
                        />
                      </div>
                    </div>

                    {/* Progress % */}
                    <span
                      className="text-xs font-semibold flex-shrink-0"
                      style={{ color: "#526B00" }}
                    >
                      {c.progress}%
                    </span>
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
