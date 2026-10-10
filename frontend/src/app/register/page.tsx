"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [role, setRole] = useState<'member' | 'staff'>('member');
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left panel — dark */}
      <div
        className="hidden lg:flex lg:flex-col"
        style={{
          width: 480,
          flexShrink: 0,
          background: '#171A16',
          position: 'relative',
          padding: 48,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Background image overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/assets/login_athlete.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
          }}
        />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div
              style={{
                width: 34,
                height: 34,
                background: '#D7FF3F',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#111310">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={{ color: '#ECEDE6', fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em' }}>
              FITOS
            </span>
          </Link>
        </div>

        {/* Tagline */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: '#ECEDE6',
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Bắt đầu hành trình<br />của bạn.
          </h2>
          <p style={{ fontSize: 15, color: '#5E625A', lineHeight: 1.6 }}>
            Kết nối studio, huấn luyện chuyên nghiệp và tiến trình hội viên.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div
        style={{
          flex: 1,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
        }}
      >
        <div style={{ width: 400, maxWidth: '100%' }}>
          {/* Mobile logo */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, textDecoration: 'none' }}
            className="lg:hidden"
          >
            <div
              style={{
                width: 34,
                height: 34,
                background: '#D7FF3F',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#111310">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span style={{ fontSize: 21, fontWeight: 800, color: '#111310' }}>FITOS</span>
          </Link>

          {/* Heading */}
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111310', marginBottom: 6 }}>
            Tạo tài khoản của bạn
          </h1>
          <p style={{ fontSize: 14, color: '#5E625A', marginBottom: 24 }}>
            Không cần thẻ tín dụng. Miễn phí 14 ngày.
          </p>

          <form onSubmit={e => e.preventDefault()}>
            {/* Full name */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                style={{
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  padding: '10px 14px',
                  width: '100%',
                  fontSize: 14,
                  outline: 'none',
                  color: '#111310',
                  background: '#fff',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="you@studio.com"
                style={{
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  padding: '10px 14px',
                  width: '100%',
                  fontSize: 14,
                  outline: 'none',
                  color: '#111310',
                  background: '#fff',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Phone */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Số điện thoại
              </label>
              <input
                type="tel"
                placeholder="0901 234 567"
                style={{
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  padding: '10px 14px',
                  width: '100%',
                  fontSize: 14,
                  outline: 'none',
                  color: '#111310',
                  background: '#fff',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Studio code */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Mã studio
              </label>
              <input
                type="text"
                placeholder="Mã studio (nếu có)"
                style={{
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  padding: '10px 14px',
                  width: '100%',
                  fontSize: 14,
                  outline: 'none',
                  color: '#111310',
                  background: '#fff',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Tối thiểu 8 ký tự"
                style={{
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  padding: '10px 14px',
                  width: '100%',
                  fontSize: 14,
                  outline: 'none',
                  color: '#111310',
                  background: '#fff',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Confirm password */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                style={{
                  border: '1px solid #DADCD3',
                  borderRadius: 10,
                  padding: '10px 14px',
                  width: '100%',
                  fontSize: 14,
                  outline: 'none',
                  color: '#111310',
                  background: '#fff',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Role selector */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#5E625A',
                  marginBottom: 6,
                }}
              >
                Vai trò
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => setRole('member')}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: role === 'member' ? 'none' : '1px solid #DADCD3',
                    background: role === 'member' ? '#D7FF3F' : 'transparent',
                    color: role === 'member' ? '#111310' : '#111310',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  Hội viên
                </button>
                <button
                  type="button"
                  onClick={() => setRole('staff')}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: role === 'staff' ? 'none' : '1px solid #DADCD3',
                    background: role === 'staff' ? '#D7FF3F' : 'transparent',
                    color: role === 'staff' ? '#111310' : '#111310',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  Nhân viên
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 20 }}>
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                style={{ marginTop: 2, cursor: 'pointer', accentColor: '#D7FF3F' }}
              />
              <label htmlFor="terms" style={{ fontSize: 13, color: '#5E625A', cursor: 'pointer', lineHeight: 1.5 }}>
                Tôi đồng ý với{' '}
                <a href="#" style={{ color: '#526B00', fontWeight: 600 }}>Điều khoản dịch vụ</a>
                {' '}và{' '}
                <a href="#" style={{ color: '#526B00', fontWeight: 600 }}>Chính sách bảo mật</a>
              </label>
            </div>

            {/* Register button */}
            <button
              type="submit"
              style={{
                background: '#D7FF3F',
                color: '#111310',
                borderRadius: 10,
                padding: '12px 16px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontSize: 15,
                width: '100%',
              }}
            >
              Đăng ký
            </button>
          </form>

          {/* Bottom link */}
          <p style={{ textAlign: 'center', fontSize: 13, color: '#8A8E85', marginTop: 20 }}>
            Đã có tài khoản?{' '}
            <Link href="/login" style={{ color: '#526B00', fontWeight: 600, textDecoration: 'none' }}>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
