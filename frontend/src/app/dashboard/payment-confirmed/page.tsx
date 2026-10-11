import Link from "next/link";

const receiptRows = [
  { label: "Member", value: "Nguyễn Thị Trâm" },
  { label: "Plan", value: "Perform" },
  { label: "Amount", value: "$59.00" },
  { label: "Date", value: "Jul 15, 2025" },
];

export default function PaymentConfirmedPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ background: "#F5F5F0" }}
    >
      <div
        className="bg-white rounded-2xl border border-[#DADCD3] p-10 max-w-md w-full text-center"
      >
        {/* Checkmark circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
          style={{ background: "#D7FF3F" }}
        >
          <span className="text-3xl font-bold" style={{ color: "#111310" }}>
            ✓
          </span>
        </div>

        {/* Heading */}
        <h1
          className="text-3xl font-bold mt-6"
          style={{ color: "#111310" }}
        >
          Payment confirmed!
        </h1>
        <p
          className="text-[15px] mt-2"
          style={{ color: "#5E625A" }}
        >
          Membership activated successfully.
        </p>

        {/* Receipt card */}
        <div
          className="rounded-xl p-5 mt-6 text-left"
          style={{ background: "#F5F5F0" }}
        >
          {receiptRows.map((row, i) => (
            <div
              key={i}
              className="flex justify-between text-sm py-2.5 border-b border-[#DADCD3] last:border-0"
            >
              <span style={{ color: "#5E625A" }}>{row.label}</span>
              <span className="font-semibold" style={{ color: "#111310" }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <Link
          href="/dashboard/customers"
          className="mt-8 block w-full py-3 text-sm font-semibold rounded-lg text-center"
          style={{ background: "#D7FF3F", color: "#111310" }}
        >
          View Member Profile
        </Link>
        <Link
          href="/dashboard"
          className="mt-3 block w-full py-3 text-sm font-semibold rounded-lg border border-[#DADCD3] hover:bg-[#F5F5F0] transition-colors text-center"
          style={{ color: "#111310" }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
