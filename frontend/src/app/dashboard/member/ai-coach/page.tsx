"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "ai",
    text: "Hi Trâm! I'm your AI Coach. What would you like to work on today?",
  },
  {
    role: "user",
    text: "I want to do a leg workout today. Any suggestions?",
  },
  {
    role: "ai",
    text: "Great choice! Based on your training history, I recommend: Squat 4×6, Romanian Deadlift 3×8, Leg Press 3×10, and Calf Raise 4×15. Want me to adjust the weights?",
  },
  {
    role: "user",
    text: "What weight should I start squats with?",
  },
  {
    role: "ai",
    text: "Based on your PR (80kg×5), I suggest warm-ups at 50kg, then ramp up: 60kg, 70kg, and working sets at 72–75kg. That's ~90% of your estimated 1RM. How does that feel?",
  },
];

const quickPrompts = [
  "Create a workout plan",
  "How to improve my squat?",
  "Nutrition tips for muscle gain",
  "Analyze my progress",
  "Schedule this week",
];

export default function AiCoachPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold" style={{ color: "#111310" }}>
              AI Coach
            </h1>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#D7FF3F", color: "#111310" }}
            >
              BETA
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex gap-6 p-8"
        style={{ height: "calc(100vh - 89px)", background: "#F5F5F0" }}
      >
        {/* LEFT — Chat */}
        <div
          className="flex-1 flex flex-col bg-white rounded-xl border border-[#DADCD3]"
          style={{ minWidth: 0 }}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div style={{ maxWidth: "75%" }}>
                    <p
                      className="text-[10px] font-bold uppercase mb-1"
                      style={{
                        color: "#8A8E85",
                        textAlign: msg.role === "user" ? "right" : "left",
                      }}
                    >
                      {msg.role === "user" ? "You" : "AI Coach"}
                    </p>
                    <div
                      className="px-4 py-3 text-sm"
                      style={{
                        background: msg.role === "user" ? "#D7FF3F" : "#fff",
                        border: msg.role === "ai" ? "1px solid #DADCD3" : "none",
                        borderRadius:
                          msg.role === "user"
                            ? "12px 12px 0 12px"
                            : "12px 12px 12px 0",
                        color: "#111310",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input area */}
          <div className="border-t border-[#DADCD3] p-4 flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask your AI Coach anything..."
              className="flex-1 border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#D7FF3F] focus:outline-none"
              style={{ color: "#111310" }}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2.5 text-sm font-semibold rounded-lg flex-shrink-0"
              style={{ background: "#D7FF3F", color: "#111310" }}
            >
              Send →
            </button>
          </div>
        </div>

        {/* RIGHT — Quick prompts + profile */}
        <div className="w-72 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-[#DADCD3] p-5">
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#111310" }}>
              Suggested Prompts
            </h3>
            <div className="flex flex-col gap-2">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  className="text-left p-3 text-sm rounded-lg border border-[#DADCD3] hover:border-[#D7FF3F] transition-colors"
                  style={{ color: "#111310" }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* AI Coach profile */}
          <div className="bg-white rounded-xl border border-[#DADCD3] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0"
                style={{ background: "#171A16", color: "#D7FF3F" }}
              >
                🤖
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#111310" }}>
                  FITOS AI Coach
                </p>
                <p className="text-xs" style={{ color: "#8A8E85" }}>
                  Powered by AI
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {["Strength", "Nutrition", "Recovery", "Planning"].map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#E8FFAA", color: "#526B00" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
