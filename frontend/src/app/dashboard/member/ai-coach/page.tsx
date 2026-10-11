'use client';

import { useState } from 'react';

const initialMessages = [
  {
    role: 'ai',
    text: "Hi Jane! 👋 I'm your AI coach. I can help with workout programming, nutrition advice, and tracking your progress. What would you like to work on today?",
  },
  {
    role: 'user',
    text: "I've been struggling with my squat depth. Any tips to improve it?",
  },
  {
    role: 'ai',
    text: "Great question! Limited squat depth is usually caused by tight hip flexors, limited ankle mobility, or thoracic stiffness. I'd recommend: (1) daily ankle circles and calf stretches, (2) hip flexor stretches before squatting, and (3) box squats to build confidence at depth. Want me to build a specific mobility warm-up routine for you?",
  },
  {
    role: 'user',
    text: 'Yes please, that would be really helpful!',
  },
];

export default function AiCoachPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: "I'm processing your message. This is a demo — in production, your message would be sent to the AI coaching engine for a personalised response.",
        },
      ]);
    }, 600);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F0]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#DADCD3] px-8 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#526B00]">
              MEMBER · AI COACH
            </p>
            <h1 className="text-lg font-bold text-[#111310]">AI Coach</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-xs text-[#5E625A]">Online</span>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          msg.role === 'ai' ? (
            <div key={i} className="flex items-start gap-3 max-w-lg">
              <div className="w-8 h-8 rounded-full bg-[#171A16] flex items-center justify-center text-[#D7FF3F] text-xs font-bold shrink-0">
                AI
              </div>
              <div className="bg-white border border-[#DADCD3] rounded-xl rounded-tl-none p-4 text-sm text-[#111310]">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="bg-[#171A16] text-[#ECEDE6] rounded-xl rounded-tr-none p-4 max-w-lg text-sm ml-auto">
                {msg.text}
              </div>
            </div>
          )
        ))}
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-[#DADCD3] px-6 py-4 flex gap-3 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your AI coach anything..."
          className="flex-1 border border-[#DADCD3] rounded-lg px-4 py-2.5 text-sm text-[#111310] bg-white focus:outline-none focus:ring-2 focus:ring-[#D7FF3F] focus:border-transparent"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-[#D7FF3F] text-[#111310] font-semibold rounded-lg px-5 py-2.5 text-sm hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
}
