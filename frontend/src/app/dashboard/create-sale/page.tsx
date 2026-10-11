'use client';

import Link from 'next/link';
import { useState } from 'react';

const plans = [
  { id: 'move', name: 'Move', price: 29, description: 'Unlimited gym access, off-peak hours' },
  { id: 'perform', name: 'Perform', price: 49, description: 'Full gym access, group classes included' },
  { id: 'pt-focus', name: 'PT Focus', price: 89, description: '4 PT sessions/month + Perform access' },
];

export default function CreateSalePage() {
  const [selectedPlan, setSelectedPlan] = useState('move');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const activePlan = plans.find((p) => p.id === selectedPlan) ?? plans[0];

  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00] mb-1">
              GROW · SALES
            </p>
            <h1 className="text-2xl font-bold text-[#111310]">Create Sale</h1>
            <Link href="/dashboard/sales" className="text-sm text-[#5E625A] mt-1 inline-flex items-center gap-1 hover:text-[#111310]">
              ← Back to Sales
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex gap-6">
          {/* Left: Member + Plan */}
          <div className="flex-1 space-y-5">
            {/* Member search */}
            <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
              <h2 className="text-sm font-semibold text-[#111310] mb-3">Member</h2>
              <input
                type="text"
                placeholder="Search member name..."
                defaultValue="Jane Doe"
                className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent mb-3"
              />
              {/* Mock result */}
              <div className="flex items-center gap-3 border border-[#D7FF3F] bg-[#F9FFDF] rounded-lg px-4 py-3">
                <div className="w-9 h-9 rounded-full bg-[#D7FF3F] flex items-center justify-center text-sm font-bold text-[#111310]">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111310]">Jane Doe</p>
                  <p className="text-xs text-[#5E625A]">jane.doe@email.com · No active membership</p>
                </div>
                <span className="ml-auto text-[#526B00]">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
            </div>

            {/* Plan picker */}
            <div className="bg-white border border-[#DADCD3] rounded-xl p-5">
              <h2 className="text-sm font-semibold text-[#111310] mb-3">Select plan</h2>
              <div className="space-y-3">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left border rounded-xl px-4 py-4 transition-colors ${
                      selectedPlan === plan.id
                        ? 'border-[#D7FF3F] bg-[#F9FFDF]'
                        : 'border-[#DADCD3] bg-white hover:bg-[#F5F5F0]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                          selectedPlan === plan.id ? 'border-[#526B00]' : 'border-[#DADCD3]'
                        }`}>
                          {selectedPlan === plan.id && (
                            <div className="w-2 h-2 rounded-full bg-[#526B00]" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#111310]">{plan.name}</p>
                          <p className="text-xs text-[#5E625A] mt-0.5">{plan.description}</p>
                        </div>
                      </div>
                      <p className="text-base font-bold text-[#111310]">£{plan.price}<span className="text-xs font-normal text-[#5E625A]">/mo</span></p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order summary */}
          <div className="w-80 shrink-0">
            <div className="bg-white border border-[#DADCD3] rounded-xl p-5 sticky top-6">
              <h2 className="text-sm font-semibold text-[#111310] mb-5">Order summary</h2>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#5E625A]">Plan</span>
                <span className="text-sm font-semibold text-[#111310]">{activePlan.name}</span>
              </div>
              <div className="flex items-center justify-between mb-5 pb-5 border-b border-[#DADCD3]">
                <span className="text-sm text-[#5E625A]">Monthly price</span>
                <span className="text-sm font-semibold text-[#111310]">£{activePlan.price}</span>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-1.5">
                  Start date
                </label>
                <input
                  type="date"
                  defaultValue="2025-07-15"
                  className="w-full border border-[#DADCD3] rounded-lg px-3 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
                />
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-[#8A8E85] mb-2">
                  Payment method
                </label>
                <div className="space-y-2">
                  {[{ id: 'card', label: 'Card' }, { id: 'bank', label: 'Bank transfer' }].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-3 border rounded-lg px-3 py-2.5 text-sm ${
                        paymentMethod === method.id
                          ? 'border-[#D7FF3F] bg-[#F9FFDF] text-[#111310]'
                          : 'border-[#DADCD3] bg-white text-[#5E625A]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id ? 'border-[#526B00]' : 'border-[#DADCD3]'
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-2 h-2 rounded-full bg-[#526B00]" />
                        )}
                      </div>
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-[#DADCD3] mb-4">
                <span className="text-sm font-semibold text-[#111310]">Total</span>
                <span className="text-lg font-bold text-[#111310]">£{activePlan.price}</span>
              </div>

              <button className="w-full bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-4 py-2.5 text-sm hover:opacity-90">
                Complete sale
              </button>

              <Link href="/dashboard/sales" className="block text-center text-sm text-[#5E625A] mt-3 hover:text-[#111310]">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
