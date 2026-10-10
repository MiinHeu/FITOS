"use client"
import { useState } from 'react'

const initialMessages = [
  { role: 'ai', text: 'Chào Trâm! Tôi là AI Coach của bạn. Hôm nay bạn muốn tập gì?' },
  { role: 'user', text: 'Tôi muốn tập chân hôm nay, bạn có gợi ý gì không?' },
  { role: 'ai', text: 'Tuyệt vời! Dựa trên lịch tập tuần này của bạn, tôi gợi ý: Squat 4×6, Romanian Deadlift 3×8, Leg Press 3×10, và Calf Raise 4×15. Bạn có muốn điều chỉnh khối lượng không?' },
  { role: 'user', text: 'Trọng lượng Squat nên bắt đầu từ bao nhiêu kg?' },
  { role: 'ai', text: 'Dựa trên kỷ lục cá nhân của bạn (80kg × 5), tôi gợi ý warm-up ở 50kg, sau đó tăng dần: 60kg, 70kg, và working sets ở 72-75kg. Đây là 90% của 1RM ước tính. Bạn cảm thấy ổn không?' },
  { role: 'user', text: 'Ổn rồi, cảm ơn bạn!' },
]

const quickPrompts = [
  'Bài tập hôm nay',
  'Lịch tập tuần này',
  'Phục hồi sau tập',
  'Chế độ ăn',
  'Cải thiện squat',
  'Đặt lịch PT',
]

const contextRows = [
  { label: 'Gói hiện tại', value: 'Perform' },
  { label: 'Mục tiêu', value: 'Giảm mỡ + Tăng cơ' },
  { label: 'Số buổi/tuần', value: '4' },
  { label: 'HLV được chỉ định', value: 'Coach Văn Quân' },
  { label: 'Streak hiện tại', value: '3 ngày 🔥' },
]

export default function AiCoachPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages(prev => [...prev, { role: 'user', text: trimmed }])
    setInput('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div>
      {/* Page header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #DADCD3',
          padding: '28px 28px',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            color: '#526B00',
            display: 'block',
            marginBottom: 4,
          }}
        >
          AI COACH
        </span>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', margin: 0 }}>
          AI Coach của bạn
        </h1>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 24,
          height: 'calc(100vh - 120px)',
        }}
      >
        {/* LEFT — chat area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            background: '#fff',
            borderRadius: 16,
            border: '1px solid #DADCD3',
            overflow: 'hidden',
          }}
        >
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto' as const,
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: msg.role === 'ai' ? 'flex-start' : 'flex-end',
                    maxWidth: '80%',
                    marginBottom: 12,
                  }}
                >
                  {/* Role label */}
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#8A8E85',
                      textTransform: 'uppercase' as const,
                      marginBottom: 4,
                      textAlign: msg.role === 'ai' ? 'left' as const : 'right' as const,
                    }}
                  >
                    {msg.role === 'ai' ? 'AI Coach' : 'Bạn'}
                  </div>
                  <div
                    style={{
                      background: msg.role === 'ai' ? '#F5F5F0' : '#D7FF3F',
                      borderRadius: msg.role === 'ai' ? '12px 12px 12px 0' : '12px 12px 0 12px',
                      padding: '12px 16px',
                    }}
                  >
                    <span style={{ fontSize: 14, color: '#111310' }}>{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div
            style={{
              borderTop: '1px solid #DADCD3',
              padding: '16px 20px',
              display: 'flex',
              gap: 12,
            }}
          >
            <textarea
              rows={2}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi AI Coach..."
              style={{
                flex: 1,
                border: '1px solid #DADCD3',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 14,
                resize: 'none' as const,
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: '#D7FF3F',
                color: '#111310',
                borderRadius: 10,
                padding: '10px 16px',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                alignSelf: 'flex-end',
              }}
            >
              Gửi
            </button>
          </div>
        </div>

        {/* RIGHT column */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, overflowY: 'auto' as const }}>
          {/* Quick prompts */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 12 }}>
              Gợi ý nhanh
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => setInput(prompt)}
                  style={{
                    border: '1px solid #DADCD3',
                    borderRadius: 20,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 600,
                    background: '#fff',
                    cursor: 'pointer',
                    color: '#111310',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Context card */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              border: '1px solid #DADCD3',
              padding: 20,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 700, color: '#111310', marginBottom: 4 }}>
              Ngữ cảnh của bạn
            </div>
            {contextRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: i < contextRows.length - 1 ? '1px solid #DADCD3' : 'none',
                  fontSize: 13,
                }}
              >
                <span style={{ color: '#5E625A' }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: '#111310' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
