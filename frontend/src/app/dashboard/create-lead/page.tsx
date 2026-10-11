"use client";
import { useState } from "react";
import Link from "next/link";

export default function CreateLeadPage() {
  const [status, setStatus] = useState("New");

  return (
    <div>
      {/* Page header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/leads"
            className="text-sm text-[#5E625A] flex items-center gap-1 hover:text-[#111310]"
          >
            ← Back to Leads
          </Link>
          <div>
            <span
              className="block text-[10px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: "#526B00" }}
            >
              GROW
            </span>
            <h1 className="text-2xl font-bold" style={{ color: "#111310" }}>
              New Lead
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 bg-[#F5F5F0] min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form — col-span-2 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              {/* Lead Information */}
              <h2
                className="text-base font-semibold mb-5"
                style={{ color: "#111310" }}
              >
                Lead Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    className="block text-[13px] font-medium mb-1"
                    style={{ color: "#111310" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nguyễn Văn An"
                    className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                    style={{ color: "#111310" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-[13px] font-medium mb-1"
                    style={{ color: "#111310" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                    style={{ color: "#111310" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-[13px] font-medium mb-1"
                    style={{ color: "#111310" }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="0901 234 567"
                    className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                    style={{ color: "#111310" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-[13px] font-medium mb-1"
                    style={{ color: "#111310" }}
                  >
                    Source
                  </label>
                  <select
                    className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                    style={{ color: "#111310" }}
                  >
                    <option>Walk-in</option>
                    <option>Website</option>
                    <option>Referral</option>
                    <option>Social</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label
                  className="block text-[13px] font-medium mb-1"
                  style={{ color: "#111310" }}
                >
                  Status
                </label>
                <div className="flex gap-2">
                  {["New", "Contacted", "Trial"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold border transition-colors"
                      style={
                        status === s
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
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#5E625A" }}
                >
                  Notes
                </h3>
                <textarea
                  rows={4}
                  placeholder="Add any notes about this lead..."
                  className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none resize-none"
                  style={{ color: "#111310" }}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  className="px-4 py-2 text-sm font-semibold rounded-lg"
                  style={{ background: "#D7FF3F", color: "#111310" }}
                >
                  Save Lead
                </button>
                <Link
                  href="/dashboard/leads"
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-[#DADCD3] hover:bg-[#F5F5F0] transition-colors"
                  style={{ color: "#111310" }}
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Assign to */}
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Assign to
              </h3>
              <label
                className="block text-[13px] font-medium mb-1"
                style={{ color: "#111310" }}
              >
                Staff Member
              </label>
              <select
                className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                style={{ color: "#111310" }}
              >
                <option>Auto-assign</option>
                <option>Coach Minh Trần</option>
                <option>Coach An Phạm</option>
                <option>Coach Quân Lê</option>
                <option>Coach Mai Vũ</option>
              </select>
            </div>

            {/* Follow-up date */}
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                Follow-up Date
              </h3>
              <input
                type="date"
                className="w-full border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
                style={{ color: "#111310" }}
              />
            </div>

            {/* Quick stats */}
            <div className="bg-white rounded-xl border border-[#DADCD3] p-6">
              <h3
                className="text-sm font-semibold mb-4"
                style={{ color: "#111310" }}
              >
                This Month
              </h3>
              {[
                { label: "New Leads", value: "24" },
                { label: "Converted", value: "9" },
                { label: "Conversion Rate", value: "37.5%" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex justify-between items-center py-2.5 border-b border-[#F0F0EB] last:border-0"
                >
                  <span className="text-sm" style={{ color: "#5E625A" }}>
                    {stat.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#111310" }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
