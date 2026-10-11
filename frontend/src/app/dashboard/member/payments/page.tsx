"use client";

const transactions = [
  { date: "Jul 30, 2025", desc: "Perform Plan — August", amount: "$59.00", status: "Paid" },
  { date: "Jun 30, 2025", desc: "Perform Plan — July", amount: "$59.00", status: "Paid" },
  { date: "May 30, 2025", desc: "Perform Plan — June", amount: "$59.00", status: "Paid" },
  { date: "May 15, 2025", desc: "PT Session Pack (5×)", amount: "$149.00", status: "Paid" },
  { date: "Apr 30, 2025", desc: "Perform Plan — May", amount: "$59.00", status: "Paid" },
  { date: "Mar 30, 2025", desc: "Perform Plan — April", amount: "$59.00", status: "Paid" },
];

const statCards = [
  { label: "Paid Total", value: "$708", sub: "all time" },
  { label: "Next Payment", value: "$59", sub: "Aug 30, 2025" },
  { label: "Payment Method", value: "Visa", sub: "••••4242" },
  { label: "Member Since", value: "Jan", sub: "2025" },
];

export default function MemberPaymentsPage() {
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
            Payments
          </h1>
        </div>
        <button
          className="px-4 py-2 text-sm font-semibold rounded-lg border border-[#DADCD3] hover:bg-[#F5F5F0] transition-colors"
          style={{ color: "#111310" }}
        >
          Update Payment Method
        </button>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        {/* Membership card — dark */}
        <div
          className="rounded-xl p-6 mb-6 flex items-start justify-between"
          style={{ background: "#171A16" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#5E625A" }}>
              Current Plan
            </p>
            <p className="text-3xl font-bold mb-1" style={{ color: "#fff" }}>
              Perform
            </p>
            <p className="text-2xl font-bold mb-3" style={{ color: "#D7FF3F" }}>
              $59
              <span className="text-sm font-normal" style={{ color: "#5E625A" }}>
                /month
              </span>
            </p>
            <p className="text-sm" style={{ color: "#5E625A" }}>
              Next billing date: Aug 30, 2025
            </p>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: "#D7FF3F", color: "#111310" }}
          >
            Active
          </span>
        </div>

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
              <p className="text-2xl font-bold" style={{ color: "#111310" }}>
                {s.value}
              </p>
              <p className="text-xs mt-1" style={{ color: "#5E625A" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Transaction history table */}
        <div className="bg-white rounded-xl border border-[#DADCD3] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#DADCD3]">
            <h2 className="text-base font-semibold" style={{ color: "#111310" }}>
              Transaction History
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: "#F5F5F0" }}>
                {["Date", "Description", "Amount", "Status"].map((col) => (
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
              {transactions.map((tx, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm" style={{ color: "#5E625A" }}>
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium" style={{ color: "#111310" }}>
                    {tx.desc}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: "#111310" }}>
                    {tx.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                      style={{ background: "#E8FFAA", color: "#526B00" }}
                    >
                      {tx.status}
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
