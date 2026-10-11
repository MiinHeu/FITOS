"use client";
import { useState } from "react";
import Link from "next/link";

interface Plan {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  desc: string;
}

const plans: Plan[] = [
  { id: "move", name: "Move", price: "$29", priceNum: 29, desc: "Access all group classes" },
  { id: "perform", name: "Perform", price: "$59", priceNum: 59, desc: "Classes + open gym" },
  { id: "pt", name: "PT Focus", price: "$99", priceNum: 99, desc: "Personal training included" },
];

const paymentMethods = ["Card", "Cash", "Bank Transfer"];

export default function CreateSalePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [discount, setDiscount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Card");

  const mockMembers = ["Nguyễn Thị Trâm", "Lê Văn Hùng", "Phạm Minh Châu"];
  const showDropdown = searchQuery.length > 0 && !selectedMember;

  const subtotal = selectedPlan ? selectedPlan.priceNum : 0;
  const discountNum = parseFloat(discount) || 0;
  const tax = Math.round((subtotal - discountNum) * 0.1 * 100) / 100;
  const total = subtotal - discountNum + tax;

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/sales"
            className="text-sm flex items-center gap-1 hover:text-[#111310]"
            style={{ color: "#5E625A" }}
          >
            ← Back to Sales
          </Link>
          <div>
            <span
              className="block text-[10px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#526B00" }}
            >
              GROW
            </span>
            <h1 className="text-2xl font-bold" style={{ color: "#111310" }}>
              New Sale
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — col-span-3 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              {/* Find Member */}
              <h2
                className="text-base font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Find Member
              </h2>
              <div className="relative mb-2">
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
                  placeholder="Search by name or phone..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedMember(null);
                  }}
                  className="w-full border border-[#DADCD3] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                  style={{ color: "#111310" }}
                />
              </div>

              {showDropdown && (
                <div className="border border-[#DADCD3] rounded-lg overflow-hidden mb-4">
                  {mockMembers
                    .filter((m) =>
                      m.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((m) => (
                      <div
                        key={m}
                        className="flex items-center gap-3 px-4 py-3 border-b border-[#F0F0EB] last:border-0 hover:bg-[#F5F5F0] cursor-pointer"
                        onClick={() => {
                          setSelectedMember(m);
                          setSearchQuery(m);
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                          style={{ background: "#E8FFAA", color: "#526B00" }}
                        >
                          {m.charAt(0)}
                        </div>
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: "#111310" }}
                          >
                            {m}
                          </p>
                          <p className="text-xs" style={{ color: "#8A8E85" }}>
                            Active member
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {selectedMember && (
                <div
                  className="flex items-center gap-3 p-3 rounded-lg border border-[#DADCD3] mb-6"
                  style={{ background: "#F5F5F0" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: "#D7FF3F", color: "#111310" }}
                  >
                    {selectedMember.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "#111310" }}>
                      {selectedMember}
                    </p>
                    <p className="text-xs" style={{ color: "#8A8E85" }}>
                      Current plan: Perform
                    </p>
                  </div>
                  <button
                    onClick={() => { setSelectedMember(null); setSearchQuery(""); }}
                    className="text-base"
                    style={{ color: "#8A8E85" }}
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Select Plan */}
              <h2
                className="text-base font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Select Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {plans.map((plan) => {
                  const isSelected = selectedPlan?.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(isSelected ? null : plan)}
                      className="text-left p-4 rounded-xl border-2 transition-colors"
                      style={
                        isSelected
                          ? {
                              borderColor: "#D7FF3F",
                              background: "#FAFFF0",
                            }
                          : {
                              borderColor: "#DADCD3",
                              background: "#fff",
                            }
                      }
                    >
                      <div
                        className="text-base font-bold mb-1"
                        style={{ color: "#111310" }}
                      >
                        {plan.name}
                      </div>
                      <div
                        className="text-xl font-bold mb-1"
                        style={{ color: "#526B00" }}
                      >
                        {plan.price}
                        <span
                          className="text-xs font-normal"
                          style={{ color: "#8A8E85" }}
                        >
                          /mo
                        </span>
                      </div>
                      <div className="text-xs" style={{ color: "#5E625A" }}>
                        {plan.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Start Date */}
              <h2
                className="text-base font-semibold mb-3"
                style={{ color: "#111310" }}
              >
                Start Date
              </h2>
              <input
                type="date"
                className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                style={{ color: "#111310" }}
              />
            </div>
          </div>

          {/* Right — Order Summary col-span-2 */}
          <div className="lg:col-span-2">
            <div
              className="bg-white rounded-xl border border-[#DADCD3] p-6"
              style={{ position: "sticky", top: "2rem" }}
            >
              <h2
                className="text-base font-semibold mb-5"
                style={{ color: "#111310" }}
              >
                Order Summary
              </h2>

              {/* Member + plan row */}
              <div
                className="flex justify-between text-sm mb-2"
                style={{ color: "#5E625A" }}
              >
                <span>Member</span>
                <span style={{ color: "#111310", fontWeight: 500 }}>
                  {selectedMember || "—"}
                </span>
              </div>
              <div
                className="flex justify-between text-sm mb-4 pb-4 border-b border-[#DADCD3]"
                style={{ color: "#5E625A" }}
              >
                <span>Plan</span>
                <span style={{ color: "#111310", fontWeight: 500 }}>
                  {selectedPlan ? selectedPlan.name : "—"}
                </span>
              </div>

              {/* Price breakdown */}
              <div
                className="flex justify-between text-sm mb-2"
                style={{ color: "#5E625A" }}
              >
                <span>Subtotal</span>
                <span style={{ color: "#111310" }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm mb-2">
                <span style={{ color: "#5E625A" }}>Discount</span>
                <div className="flex items-center gap-1">
                  <span style={{ color: "#5E625A" }}>-$</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-20 border border-[#DADCD3] rounded px-2 py-1 text-sm text-right focus:outline-none focus:ring-1 focus:ring-[#D7FF3F]"
                    style={{ color: "#111310" }}
                  />
                </div>
              </div>

              <div
                className="flex justify-between text-sm mb-4 pb-4 border-b border-[#DADCD3]"
                style={{ color: "#5E625A" }}
              >
                <span>Tax (10%)</span>
                <span style={{ color: "#111310" }}>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span
                  className="text-base font-bold"
                  style={{ color: "#111310" }}
                >
                  Total
                </span>
                <span
                  className="text-xl font-bold"
                  style={{ color: "#111310" }}
                >
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Payment method pills */}
              <p className="text-xs mb-2" style={{ color: "#8A8E85" }}>
                Payment Method
              </p>
              <div className="flex gap-2 mb-6">
                {paymentMethods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className="flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors"
                    style={
                      paymentMethod === m
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
                    {m}
                  </button>
                ))}
              </div>

              <button
                className="w-full py-3 text-sm font-semibold rounded-lg mb-3"
                style={{ background: "#D7FF3F", color: "#111310" }}
              >
                Confirm Sale
              </button>
              <button
                className="w-full py-3 text-sm font-semibold rounded-lg border border-[#DADCD3] hover:bg-[#F5F5F0] transition-colors"
                style={{ color: "#111310" }}
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
