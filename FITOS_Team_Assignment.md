# FITOS — PHÂN CÔNG NHÓM 4 NGƯỜI (Fullstack Cross-Layer)

> **Triết lý:** Mỗi người làm **đủ mọi layer** trên mỗi feature — Database schema, Migration, API (Spring Boot), Frontend (Next.js), AI tích hợp, Docker, CI/CD — để khi vấn đáp có thể giải thích toàn bộ flow từ click UI đến DB.
>
> **Không chia FE riêng / BE riêng.** Mỗi người nhận 1 nhóm feature và tự lo từ đầu đến cuối.
>
> **Thời gian:** 4–5 tuần | **Team:** 4 người

---

## TỔNG QUAN — AI LÀM GÌ

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Người A   │  Auth + User + CRM (Lead → Customer) + Manager Dashboard       │
│            │  DB ✦ API ✦ FE ✦ Security ✦ Docker ✦ CI                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  Người B   │  Plans + Order + Payment + Membership + PT Package              │
│            │  DB ✦ API ✦ FE ✦ Payment logic ✦ Docker ✦ Deploy               │
├─────────────────────────────────────────────────────────────────────────────┤
│  Người C   │  Class + Schedule + Booking + Check-in + Attendance + Trainer  │
│            │  DB ✦ API ✦ FE ✦ Concurrency ✦ Docker ✦ Integration test       │
├─────────────────────────────────────────────────────────────────────────────┤
│  Người D   │  Workout + Progress + AI Coach + Reports + DevOps lead          │
│            │  DB ✦ API ✦ FE ✦ Python AI service ✦ Full Docker stack         │
└─────────────────────────────────────────────────────────────────────────────┘
```

> Mỗi người đều có: Schema SQL + Migration + Spring Boot Controller/Service/Repository + Next.js pages/components + Dockerfile + Test

---

## TECH STACK CHUNG (tất cả đều đụng)

| Layer | Công nghệ | Ai đụng |
|-------|-----------|---------|
| Database | PostgreSQL 15 + Flyway migration | **Tất cả** |
| Backend | Java Spring Boot 3 + Spring Security + JPA | **Tất cả** |
| Frontend | Next.js 14 + TypeScript + Tailwind CSS | **Tất cả** |
| AI Service | Python FastAPI + OpenAI API | A (proxy) + **D (chính)** |
| Cache | Redis | A (session) + B (idempotency) |
| Auth | JWT access + refresh token | **A làm, tất cả dùng** |
| Container | Docker + Docker Compose | **Tất cả** (D lead) |
| CI/CD | GitHub Actions | **Tất cả** (D lead) |
| API Docs | Swagger / OpenAPI | **Tất cả** |
| Test | JUnit + Mockito + Playwright | **Tất cả** |

---

---

# 👤 NGƯỜI A — AUTH + USER + CRM + DASHBOARD

## Mày làm gì để giải thích với nhà tuyển dụng?
> *"Tôi xây hệ thống auth JWT từ đầu, thiết kế RBAC 5 roles, viết toàn bộ CRM lead lifecycle từ DB schema đến UI, xây Manager Dashboard tổng hợp data cross-module."*

---

## TUẦN 1 — Auth Foundation (tất cả đều chờ mày)

### 🗄️ Database (Flyway migration V1__)
```sql
-- V1__auth_users.sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,  -- ADMIN/MANAGER/RECEPTIONIST/TRAINER/CUSTOMER
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- V2__crm_leads.sql
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  date_of_birth DATE,
  goal VARCHAR(50),          -- WEIGHT_LOSS/MUSCLE_GAIN/GENERAL_FITNESS/...
  source VARCHAR(50),        -- WALK_IN/FACEBOOK/INSTAGRAM/REFERRAL/...
  status VARCHAR(50) DEFAULT 'NEW',
  assigned_to UUID REFERENCES users(id),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) NOT NULL,
  actor_id UUID REFERENCES users(id) NOT NULL,
  type VARCHAR(50) NOT NULL,  -- CALL/MESSAGE/CONSULTATION/TRIAL/FOLLOW_UP
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  date_of_birth DATE,
  goal VARCHAR(50),
  lead_id UUID REFERENCES leads(id),  -- preserve lead history
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### ⚙️ Backend (Spring Boot)
- [ ] `POST /api/auth/register` — hash password (BCrypt), tạo user, trả JWT
- [ ] `POST /api/auth/login` — verify password, trả access token (15m) + refresh token (7d)
- [ ] `POST /api/auth/refresh` — dùng refresh token lấy access token mới
- [ ] `POST /api/auth/logout` — invalidate refresh token (Redis blacklist)
- [ ] `POST /api/auth/forgot-password` — tạo reset token, gửi email (mock)
- [ ] `POST /api/auth/reset-password` — validate token, đổi password
- [ ] `PUT /api/auth/change-password` — đổi password khi đang login
- [ ] JWT filter: đọc header `Authorization: Bearer <token>`, set SecurityContext
- [ ] `@PreAuthorize("hasRole('MANAGER')")` annotation-based RBAC
- [ ] Global exception handler (trả JSON chuẩn, không để 500 leak stack trace)
- [ ] AuditLogAspect: `@Around` các method quan trọng để auto-log
- [ ] Redis: lưu refresh tokens, blacklist logout

### 🖥️ Frontend (Next.js)
- [ ] `/login` — email + password form, lưu token vào httpOnly cookie, redirect theo role
- [ ] `/register` — form với role selector (Member / Staff)
- [ ] `AuthContext` provider — expose `user`, `role`, `logout`
- [ ] `<ProtectedRoute>` — redirect `/login` nếu chưa auth
- [ ] `<RoleGuard role="MANAGER">` — ẩn component nếu không đủ quyền
- [ ] Middleware `middleware.ts` — check token trên server side

### 🐳 Docker
- [ ] `Dockerfile` cho Spring Boot backend
- [ ] `docker-compose.yml` phần: postgres + redis + backend

---

## TUẦN 2 — CRM: Lead Management

### ⚙️ Backend
- [ ] `POST /api/leads` — tạo lead (RECEPTIONIST/MANAGER)
- [ ] `GET /api/leads` — list + pagination + filter(status, source) + search(name, phone)
- [ ] `GET /api/leads/:id` — detail + activities timeline
- [ ] `PUT /api/leads/:id` — cập nhật thông tin
- [ ] `PATCH /api/leads/:id/status` — đổi status (validate transition hợp lệ)
- [ ] `POST /api/leads/:id/activities` — thêm activity
- [ ] `PATCH /api/leads/:id/assign` — gán cho staff khác
- [ ] `POST /api/leads/:id/convert` — **flow quan trọng nhất:**
  ```
  Validate status = INTERESTED/TRIAL
  → Tạo Customer record
  → Tạo User account (send invite email mock)
  → Set lead.status = CONVERTED
  → Preserve lead_activities (không xóa)
  → Ghi audit log
  ```
- [ ] `PATCH /api/leads/:id/lost` — mark lost + ghi reason

### 🖥️ Frontend
- [ ] `/dashboard/leads` — data table: filter tabs (All/New/Contacted/Trial/Converted/Lost), search, assign dropdown
- [ ] `/dashboard/leads/create` — form tạo lead: name, phone, email, source, goal, notes
- [ ] `/dashboard/leads/:id` — lead detail:
  - Thông tin + edit inline
  - Activity timeline (cuộn được)
  - Add activity modal (type, note)
  - Action buttons: Contact, Schedule Trial, Convert, Mark Lost
- [ ] Convert modal: chọn plan → preview order → confirm (hand-off sang Người B)

---

## TUẦN 3 — Customer + User Admin + Renewal

### ⚙️ Backend
- [ ] `GET /api/customers` — list + filter + search
- [ ] `GET /api/customers/:id` — full profile aggregate:
  ```json
  {
    "profile": {...},
    "currentMembership": {...},   // join với Người B's table
    "upcomingBookings": [...],    // join với Người C's table
    "recentWorkouts": [...],      // join với Người D's table
    "paymentHistory": [...],      // join với Người B's table
    "activityTimeline": [...]
  }
  ```
- [ ] `PUT /api/customers/:id` — edit profile
- [ ] `GET /api/users` (ADMIN) — list users
- [ ] `POST /api/users` (ADMIN) — tạo user
- [ ] `PUT /api/users/:id` — edit
- [ ] `PATCH /api/users/:id/disable` — disable
- [ ] `PATCH /api/users/:id/role` — change role
- [ ] `GET /api/renewals` — customers có membership hết hạn trong 7 ngày
- [ ] Cron job `@Scheduled`: mỗi ngày 8AM check expiring memberships, tạo renewal alerts

### 🖥️ Frontend
- [ ] `/dashboard/customers` — table với plan badge, status, expiry
- [ ] `/dashboard/customers/:id` — 6 tabs: Overview | Membership | Bookings | Workouts | Payments | Activity
- [ ] `/dashboard/users` (ADMIN) — quản lý users, change role, disable
- [ ] `/dashboard/profile` — xem/sửa profile của mình, đổi password

### 📊 Manager Dashboard
- [ ] `GET /api/dashboard/summary` — tổng hợp: active members, new leads this week, conversion rate, revenue this month
- [ ] Frontend `/dashboard` — 4 KPI cards + renewal widget + recent activity feed
- [ ] Dashboard gọi API từ B, C, D để hiển thị cross-module data

---

## TUẦN 4 — Testing + Integration

- [ ] Unit test `AuthService`: register, login, refresh, logout
- [ ] Unit test `LeadService`: status transitions, convert validation
- [ ] Integration test: `POST /register` → `POST /login` → `GET /profile`
- [ ] Integration test: Lead NEW → CONTACTED → TRIAL → CONVERTED → Customer created
- [ ] Test: disabled user không login được
- [ ] Test: CUSTOMER role không access `/api/leads`
- [ ] Swagger docs hoàn chỉnh
- [ ] Code review với cả team về JWT flow

### 📝 Những gì mày có thể nói trong CV/vấn đáp:
- Thiết kế JWT auth với access + refresh token, Redis blacklist
- Implement RBAC với Spring Security @PreAuthorize
- Xây Lead lifecycle state machine (NEW→CONVERTED với validation)
- Audit log cross-cutting với AOP @Around
- Customer aggregate API join data từ nhiều domain

---

---

# 👤 NGƯỜI B — PLANS + ORDER + PAYMENT + MEMBERSHIP

## Mày làm gì để giải thích với nhà tuyển dụng?
> *"Tôi xây toàn bộ commerce flow: thiết kế DB cho payment idempotency, implement order với server-side price calculation, membership lifecycle state machine, tích hợp payment gateway sandbox."*

---

## TUẦN 1 — Schema + Plans

### 🗄️ Database
```sql
-- V3__commerce.sql
CREATE TABLE service_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,  -- MEMBERSHIP / PT_PACKAGE
  description TEXT,
  price NUMERIC(12,2) NOT NULL,
  duration_days INT,
  included_sessions INT,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  plan_id UUID REFERENCES service_plans(id) NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING',  -- PENDING/PAID/FAILED/CANCELLED
  subtotal NUMERIC(12,2) NOT NULL,
  discount NUMERIC(12,2) DEFAULT 0,
  total NUMERIC(12,2) NOT NULL,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) NOT NULL,
  method VARCHAR(50) NOT NULL,  -- CASH/BANK_TRANSFER/VNPAY/STRIPE
  reference VARCHAR(255) UNIQUE NOT NULL,  -- idempotency key
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING',  -- PENDING/SUCCESS/FAILED/REFUNDED
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  plan_id UUID REFERENCES service_plans(id) NOT NULL,
  order_id UUID REFERENCES orders(id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE',  -- PENDING/ACTIVE/PAUSED/EXPIRED/CANCELLED
  paused_at TIMESTAMPTZ,
  paused_days INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pt_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  plan_id UUID REFERENCES service_plans(id) NOT NULL,
  order_id UUID REFERENCES orders(id),
  total_sessions INT NOT NULL,
  remaining_sessions INT NOT NULL,
  expires_at DATE,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### ⚙️ Backend — Plans
- [ ] `GET /api/plans` (public) — list active plans
- [ ] `GET /api/plans/:id` — detail
- [ ] `POST /api/plans` (MANAGER) — tạo plan
- [ ] `PUT /api/plans/:id` (MANAGER) — cập nhật
- [ ] `PATCH /api/plans/:id/status` — activate/deactivate

### 🖥️ Frontend — Plans
- [ ] `/plans` (public) — 3 plan cards: Move / Perform / PT Focus với feature list, price
- [ ] `/dashboard/plans` (MANAGER) — quản lý plans, toggle active/inactive

---

## TUẦN 2 — Order + Payment

### ⚙️ Backend — Order
- [ ] `POST /api/orders` — tạo order:
  - **Server-side**: tính `subtotal = plan.price`, apply discount, `total = subtotal - discount`
  - Không nhận total từ client
  - Validate: customer tồn tại, plan ACTIVE, customer không có membership ACTIVE cùng loại
- [ ] `GET /api/orders` (MANAGER/RECEPTIONIST) — list với filter
- [ ] `GET /api/orders/me` (CUSTOMER) — own orders
- [ ] `GET /api/orders/:id` — detail
- [ ] `PATCH /api/orders/:id/cancel` — chỉ khi status = PENDING

### ⚙️ Backend — Payment
- [ ] `POST /api/payments` — tạo payment:
  - Validate: order PENDING, amount = order.total
  - Mock payment processing (random success/fail cho Cash)
  - Nếu SUCCESS → trigger `ServiceActivationService.activate(orderId)`
  - Ghi audit log
- [ ] `POST /api/payments/vnpay/callback` — **Idempotency**:
  ```java
  // Kiểm tra reference đã xử lý chưa
  if (paymentRepo.existsByReference(ref)) {
    return ResponseEntity.ok("already processed");
  }
  // Xử lý...
  ```
- [ ] `ServiceActivationService.activate()`:
  ```
  Nếu plan.type = MEMBERSHIP → tạo Membership (ACTIVE, start=today, end=today+duration)
  Nếu plan.type = PT_PACKAGE → tạo PtPackage (remaining=total_sessions)
  Update order.status = PAID
  Ghi audit log
  ```
- [ ] `GET /api/payments` — list
- [ ] `GET /api/payments/:id` — detail

### 🖥️ Frontend — Sales Flow
- [ ] `/dashboard/sales` — KPI cards (Today Revenue, Month Revenue, Pending Orders) + transaction table
- [ ] `/dashboard/create-sale` — 3-step wizard:
  - **Step 1**: Search customer by name/phone → select
  - **Step 2**: Plan cards (selectable), show price + features
  - **Step 3**: Order summary + payment method selector (Cash / Bank Transfer / Sandbox) + "Confirm payment"
- [ ] `/dashboard/payment-confirmed` — success screen: ✓ lime, receipt details, "Print" + "Back to sales"
- [ ] Payment method component: Cash/Bank/Card với radio selection

---

## TUẦN 3 — Membership Lifecycle

### ⚙️ Backend
- [ ] `GET /api/memberships` (MANAGER) — list, filter status
- [ ] `GET /api/memberships/me` (CUSTOMER) — own membership
- [ ] `GET /api/memberships/:id` — detail
- [ ] `PATCH /api/memberships/:id/pause`:
  - Set status = PAUSED, lưu paused_at
  - end_date không thay đổi (thời gian pause được cộng thêm khi resume)
- [ ] `PATCH /api/memberships/:id/resume`:
  - Tính days_paused = now - paused_at
  - end_date += days_paused
  - Set status = ACTIVE
- [ ] `PATCH /api/memberships/:id/cancel` — set CANCELLED
- [ ] `POST /api/memberships/:id/renew` — tạo order mới cho renewal
- [ ] `GET /api/memberships/expiring` — sắp hết hạn 7 ngày (Người A dùng cho renewal widget)
- [ ] **Middleware** `MembershipValidator.requireActive(customerId)`:
  - Trả `403 MEMBERSHIP_REQUIRED` nếu không có membership ACTIVE
  - Người C import để validate booking
- [ ] `GET /api/pt-packages/me` — customer xem pt packages
- [ ] `PATCH /api/pt-packages/:id/use` — **idempotent** decrement:
  ```java
  // Dùng optimistic locking @Version để tránh race condition
  @Transactional
  public void useSession(UUID packageId, UUID sessionRef) {
    // check sessionRef chưa dùng chưa
    // remaining_sessions -= 1
  }
  ```

### 🖥️ Frontend
- [ ] `/dashboard/member/payments` — membership card + payment history table
- [ ] Membership status badge component: ACTIVE (green) / PAUSED (yellow) / EXPIRED (red)
- [ ] Pause/Resume/Cancel buttons với confirmation modal
- [ ] Expiry countdown: "Expires in X days"
- [ ] Tab Membership trong `/dashboard/customers/:id`

### 🐳 Docker
- [ ] Thêm vào docker-compose: cấu hình env vars cho payment sandbox
- [ ] `SPRING_PROFILES_ACTIVE=prod` vs `dev` khác nhau ở payment mode

---

## TUẦN 4 — Testing + Deploy

### Tests
- [ ] Unit test `OrderService`: price calculation, discount, validate customer
- [ ] Unit test `PaymentService`: idempotency (gọi 2 lần cùng reference → chỉ activate 1 lần)
- [ ] Unit test `MembershipService`: pause/resume date calculation
- [ ] Test: create order → payment success → membership ACTIVE
- [ ] Test: payment callback duplicate → không create 2 memberships
- [ ] Test: book class khi membership EXPIRED → `403 MEMBERSHIP_REQUIRED`

### Deploy (coordinate với Người D)
- [ ] Deploy backend lên Railway/Render
- [ ] Configure PostgreSQL managed service
- [ ] Configure env vars (DB_URL, JWT_SECRET, REDIS_URL)
- [ ] Smoke test trên production URL

### 📝 Những gì mày có thể nói trong CV/vấn đáp:
- Implement payment idempotency với unique reference constraint + Redis check
- Server-side price calculation, không trust client input
- Membership pause/resume với date arithmetic chính xác
- Optimistic locking để prevent double-use PT session
- Service activation pattern: tách activation logic khỏi payment logic

---

---

# 👤 NGƯỜI C — CLASS + SCHEDULE + BOOKING + TRAINER + CHECK-IN

## Mày làm gì để giải thích với nhà tuyển dụng?
> *"Tôi giải quyết bài toán concurrency trong booking: khi 2 user cùng book slot cuối cùng, chỉ 1 người thành công. Tôi dùng SELECT FOR UPDATE + database constraint để đảm bảo correctness."*

---

## TUẦN 1 — Schema + Trainer + Class

### 🗄️ Database
```sql
-- V4__operations.sql
CREATE TABLE trainers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  specialization VARCHAR(255),
  bio TEXT,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE trainer_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID REFERENCES trainers(id) NOT NULL,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trainer_id, customer_id)
);

CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),  -- YOGA/HIIT/CYCLING/STRENGTH/BOXING
  description TEXT,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE class_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) NOT NULL,
  trainer_id UUID REFERENCES trainers(id),
  session_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room VARCHAR(100),
  capacity INT NOT NULL,
  booked_count INT DEFAULT 0,  -- denormalized counter
  status VARCHAR(20) DEFAULT 'SCHEDULED',  -- SCHEDULED/CANCELLED/COMPLETED
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  class_session_id UUID REFERENCES class_sessions(id) NOT NULL,
  status VARCHAR(20) DEFAULT 'CONFIRMED',  -- CONFIRMED/CANCELLED/COMPLETED/NO_SHOW
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  UNIQUE(customer_id, class_session_id)  -- prevent duplicate booking
);

CREATE TABLE pt_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID REFERENCES trainers(id) NOT NULL,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  pt_package_id UUID REFERENCES pt_packages(id),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 60,
  status VARCHAR(20) DEFAULT 'SCHEDULED',  -- SCHEDULED/COMPLETED/CANCELLED
  notes TEXT,
  session_ref UUID UNIQUE DEFAULT gen_random_uuid()  -- idempotency for PT complete
);

CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  class_session_id UUID REFERENCES class_sessions(id),
  pt_session_id UUID REFERENCES pt_sessions(id),
  checked_in_at TIMESTAMPTZ DEFAULT NOW(),
  type VARCHAR(20)  -- CLASS/PT/GYM
);

CREATE INDEX idx_bookings_session ON bookings(class_session_id);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_sessions_date ON class_sessions(session_date);
```

### ⚙️ Backend — Trainer + Class
- [ ] `GET /api/trainers` — list
- [ ] `POST /api/trainers` (MANAGER) — tạo trainer (link với user_id)
- [ ] `PUT /api/trainers/:id` — cập nhật
- [ ] `PATCH /api/trainers/:id/assign` — assign customer
- [ ] `GET /api/trainers/:id/schedule` — lịch của trainer (class sessions + PT sessions)
- [ ] `GET /api/classes` — list
- [ ] `POST /api/classes` (MANAGER) — tạo class
- [ ] `PUT /api/classes/:id` — cập nhật

### 🖥️ Frontend
- [ ] `/dashboard/trainer` — trainer home: today timeline + my clients table
- [ ] Trainer assignment section trong `/dashboard/customers/:id`

---

## TUẦN 2 — Sessions + Booking (core challenge)

### ⚙️ Backend — Sessions
- [ ] `POST /api/sessions` (MANAGER) — tạo class session
- [ ] `GET /api/sessions` — list với filter (date range, trainer, class, status)
- [ ] `PUT /api/sessions/:id` — cập nhật
- [ ] `PATCH /api/sessions/:id/cancel` — cancel session + cancel tất cả bookings trong session đó
- [ ] Cron job: auto-complete sessions khi end_time qua

### ⚙️ Backend — Booking (phần quan trọng nhất)
- [ ] `POST /api/bookings` — **Concurrency-safe booking**:
  ```java
  @Transactional
  public Booking createBooking(UUID customerId, UUID sessionId) {
    // 1. Check membership active (gọi Người B's validator)
    membershipValidator.requireActive(customerId);

    // 2. Lock session row để tránh race condition
    ClassSession session = sessionRepo.findByIdWithLock(sessionId);
    // → SQL: SELECT * FROM class_sessions WHERE id=? FOR UPDATE

    // 3. Check capacity
    if (session.getBookedCount() >= session.getCapacity()) {
      throw new ClassFullException();
    }

    // 4. Check duplicate (UNIQUE constraint sẽ catch nếu race condition)
    if (bookingRepo.existsByCustomerAndSession(customerId, sessionId)) {
      throw new DuplicateBookingException();
    }

    // 5. Create booking + increment counter
    session.setBookedCount(session.getBookedCount() + 1);
    sessionRepo.save(session);
    return bookingRepo.save(new Booking(customerId, sessionId));
  }
  ```
- [ ] `GET /api/bookings/me` (CUSTOMER) — own bookings
- [ ] `GET /api/bookings` (MANAGER/RECEPTIONIST) — all bookings, filter date/session/status
- [ ] `PATCH /api/bookings/:id/cancel` — cancel + decrement booked_count
- [ ] `PATCH /api/bookings/:id/no-show` — mark no-show (MANAGER)

### 🖥️ Frontend
- [ ] `/dashboard/schedule` — weekly calendar (7 columns Mon-Sun):
  - Mỗi ô hiển thị session cards với màu theo type (Yoga=purple, HIIT=orange, Strength=lime)
  - Click session → drawer detail (trainer, capacity, booking list)
  - Toggle: Week view / List view
- [ ] `/dashboard/member/book` — member đặt lịch:
  - Tab Classes / PT
  - Date strip (7 ngày tới)
  - Class cards: tên, trainer, giờ, slots remaining, Book button
  - Capacity bar: `booked/capacity`

---

## TUẦN 3 — Check-in + PT Sessions + Attendance

### ⚙️ Backend — Check-in
- [ ] `POST /api/checkin` — check-in:
  - Input: `customerId` hoặc `memberCode`
  - Validate: membership ACTIVE
  - Validate: có booking cho session hôm nay (hoặc walk-in gym access)
  - Tạo attendance record
  - Update booking.status = COMPLETED
- [ ] `GET /api/attendance` (MANAGER) — list với filter date/customer/type
- [ ] `GET /api/attendance/me` (CUSTOMER) — own attendance history
- [ ] `GET /api/attendance/today` (RECEPTIONIST) — check-in list hôm nay

### ⚙️ Backend — PT Sessions
- [ ] `POST /api/pt-sessions` — schedule PT:
  - Validate: trainer available (không conflict giờ)
  - Validate: customer có PT package có remaining_sessions > 0
- [ ] `GET /api/pt-sessions` — list (filter trainer/customer/status/date)
- [ ] `PATCH /api/pt-sessions/:id/reschedule` — đổi giờ
- [ ] `PATCH /api/pt-sessions/:id/cancel` — cancel
- [ ] `PATCH /api/pt-sessions/:id/complete` — complete PT session:
  - **Idempotent**: dùng `session_ref` để check đã complete chưa
  - Gọi Người B: `ptPackageService.useSession(packageId, sessionRef)`
  - Tạo attendance record
  - Set status = COMPLETED

### 🖥️ Frontend
- [ ] `/dashboard/bookings` — receptionist view:
  - Check-in strip: search input + "Check in" button lớn
  - Stats: Checked In Today / Booked / No-show / Capacity %
  - Bookings table: name, class, time, status badge, actions
- [ ] PT Session management trong trainer view: schedule form, reschedule modal, complete button
- [ ] Attendance history trong customer detail (tab Bookings)

### 🧪 Test case quan trọng
- [ ] Concurrency test: gửi 2 concurrent requests book cùng slot cuối → chỉ 1 thành công, 1 nhận `CLASS_FULL`
- [ ] Duplicate booking: cùng customer book cùng session 2 lần → reject
- [ ] Book khi membership EXPIRED → `403`
- [ ] PT complete 2 lần cùng sessionRef → sessions chỉ trừ 1 lần

### 🐳 Docker
- [ ] Thêm cấu hình connection pool (HikariCP) để handle concurrent requests đúng cách

---

## TUẦN 4 — Testing + Integration + Reports

### Tests
- [ ] Unit test `BookingService` với mock repository
- [ ] Integration test concurrency: `CompletableFuture` gửi 2 requests parallel
- [ ] E2E test với Playwright: book → check-in → attendance shown

### Reports
- [ ] `GET /api/reports/classes` — occupancy %, no-show rate, popular classes

### 📝 Những gì mày có thể nói trong CV/vấn đáp:
- **Concurrency** trong booking: SELECT FOR UPDATE, UNIQUE constraint, transaction isolation
- Denormalized `booked_count` để tránh COUNT(*) mỗi lần check capacity
- Idempotent PT session completion với session_ref
- Calendar UI với 7-column grid và color coding
- Integration giữa booking → check-in → attendance trong 1 transaction

---

---

# 👤 NGƯỜI D — WORKOUT + PROGRESS + AI COACH + DEVOPS

## Mày làm gì để giải thích với nhà tuyển dụng?
> *"Tôi xây AI coaching service bằng Python FastAPI, integrate với OpenAI API với context injection từ PostgreSQL, đồng thời setup toàn bộ CI/CD pipeline và container orchestration cho cả team."*

---

## TUẦN 1 — Schema + Exercise Library + DevOps Setup

### 🗄️ Database
```sql
-- V5__workout.sql
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  muscle_group VARCHAR(100),  -- CHEST/BACK/LEGS/SHOULDERS/ARMS/CORE/FULL_BODY
  equipment VARCHAR(100),     -- BARBELL/DUMBBELL/MACHINE/BODYWEIGHT/CABLE
  difficulty VARCHAR(20),     -- BEGINNER/INTERMEDIATE/ADVANCED
  instructions TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  trainer_id UUID REFERENCES trainers(id),
  goal VARCHAR(50),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'DRAFT',  -- DRAFT/ACTIVE/COMPLETED/CANCELLED
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE workout_plan_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES workout_plans(id) NOT NULL,
  day_number INT NOT NULL,  -- 1=Mon, 2=Tue, ..., 6=Sat
  exercise_id UUID REFERENCES exercises(id) NOT NULL,
  sets INT,
  reps INT,
  target_weight NUMERIC(6,2),
  rest_seconds INT,
  order_index INT DEFAULT 0
);

CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  plan_id UUID REFERENCES workout_plans(id),
  performed_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'IN_PROGRESS',  -- IN_PROGRESS/COMPLETED/SKIPPED
  notes TEXT
);

CREATE TABLE workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES workout_sessions(id) NOT NULL,
  exercise_id UUID REFERENCES exercises(id) NOT NULL,
  set_number INT NOT NULL,
  reps_completed INT,
  weight NUMERIC(6,2),
  rpe INT,  -- Rate of Perceived Exertion 1-10
  notes TEXT
);

CREATE TABLE body_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  recorded_at DATE DEFAULT CURRENT_DATE,
  weight NUMERIC(5,2),
  body_fat NUMERIC(5,2),
  muscle_mass NUMERIC(5,2),
  waist NUMERIC(5,2)
);

CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES ai_conversations(id) NOT NULL,
  role VARCHAR(20) NOT NULL,  -- user/assistant
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  conversation_id UUID REFERENCES ai_conversations(id),
  title VARCHAR(255),
  reason TEXT,
  suggested_changes JSONB,  -- structured: [{exercise, old_sets, new_sets, ...}]
  status VARCHAR(20) DEFAULT 'PENDING',  -- PENDING/ACCEPTED/DISMISSED
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### ⚙️ Backend — Exercises
- [ ] `GET /api/exercises` — list + search(name) + filter(muscle_group, equipment, difficulty)
- [ ] `POST /api/exercises` (TRAINER/MANAGER) — tạo exercise
- [ ] `PUT /api/exercises/:id` — cập nhật
- [ ] Seed data: 50 exercises phổ biến (Squat, Deadlift, Bench Press, Pull-up...)

### 🐳 DevOps — Week 1 Priority
- [ ] `docker-compose.yml` đầy đủ:
  ```yaml
  services:
    postgres:    # port 5432
    redis:       # port 6379
    backend:     # Spring Boot, port 8080
    frontend:    # Next.js, port 3000
    ai-service:  # Python FastAPI, port 8000
  ```
- [ ] `docker-compose.override.yml` cho dev (volumes, hot reload)
- [ ] `.env.example` với tất cả variables cần thiết
- [ ] `Makefile` với shortcuts: `make up`, `make down`, `make migrate`, `make seed`
- [ ] GitHub Actions `ci.yml`:
  ```yaml
  jobs:
    test-backend:   # mvn test
    test-frontend:  # npm run build
    build-images:   # docker build
  ```

---

## TUẦN 2 — Workout Plan + Log

### ⚙️ Backend
- [ ] `POST /api/workout-plans` (TRAINER) — tạo plan, thêm exercises theo ngày
- [ ] `GET /api/workout-plans` — list, filter (customer_id, trainer_id, status)
- [ ] `GET /api/workout-plans/:id` — detail với exercises grouped by day
- [ ] `PUT /api/workout-plans/:id` — cập nhật plan + exercises
- [ ] `PATCH /api/workout-plans/:id/activate` — set ACTIVE (chỉ 1 plan ACTIVE/lúc)
- [ ] `PATCH /api/workout-plans/:id/complete` / `cancel`
- [ ] `POST /api/workout-sessions` — start session (từ active plan của ngày hôm nay)
- [ ] `PATCH /api/workout-sessions/:id/complete` — complete session
- [ ] `POST /api/workout-logs` — log 1 set:
  - Input: session_id, exercise_id, set_number, reps, weight, rpe
  - Validate: session IN_PROGRESS
- [ ] `GET /api/workout-sessions/me` — own sessions với logs
- [ ] `GET /api/workout-sessions/:id/logs` — all logs của session

### 🖥️ Frontend
- [ ] `/dashboard/workout-builder` — trainer view:
  - Left: Plan info (name, customer, goal, date range) + week tabs (W1/W2/W3/W4)
  - Day cards grid (Mon-Sat): mỗi card có exercise list + "Add exercise" button
  - Right sidebar: exercise library với search + filter + "+" add button
- [ ] `/dashboard/member` — member home:
  - Top cards: Membership (plan name + expiry + status), Next Booking, Streak
  - This week grid: 6 day cards (Mon-Sat) với exercise list + completion dots
  - Quick actions: Book class / Log workout / View progress / AI Coach
  - Recent activity feed

---

## TUẦN 3 — Progress + AI Coach (python service)

### ⚙️ Backend — Progress
- [ ] `GET /api/progress/me` — computed stats:
  ```json
  {
    "workoutsThisMonth": 12,
    "attendanceCount": 15,
    "currentStreak": 5,
    "weeklyFrequency": [3,2,4,3,2,4,3,2],
    "personalRecords": [
      {"exercise": "Squat", "weight": 100, "reps": 5, "date": "2026-10-01"}
    ]
  }
  ```
- [ ] `POST /api/body-metrics` — log metrics
- [ ] `GET /api/body-metrics/me` — list theo thời gian (cho chart)

### 🐍 AI Service (Python FastAPI) — phần độc đáo nhất
```
ai/
├── app/
│   ├── main.py          # FastAPI app
│   ├── routers/
│   │   ├── chat.py      # POST /chat
│   │   └── recommend.py # POST /recommend
│   ├── services/
│   │   ├── context_loader.py  # Load customer data từ DB
│   │   ├── llm_service.py     # OpenAI API call
│   │   └── safety_filter.py   # Block medical advice
│   └── models/
│       └── schemas.py
└── requirements.txt
```

- [ ] `context_loader.py` — load customer fitness context:
  ```python
  def load_customer_context(customer_id: str) -> dict:
      # Query DB: profile + goals + active_plan + last_30_days_logs
      return {
          "name": ...,
          "goal": ...,
          "active_plan": {...},  # exercises per day
          "recent_logs": [...],  # last 10 sessions
          "personal_records": [...]
      }
  ```
- [ ] `llm_service.py` — gọi OpenAI với system prompt:
  ```python
  SYSTEM_PROMPT = """
  You are FITOS AI Coach, a fitness assistant.
  You help members with workout guidance based on their training data.

  RULES:
  - Only answer fitness-related questions
  - Do NOT provide medical diagnosis or treatment advice
  - If asked about medical conditions, refer to healthcare professionals
  - Base recommendations on the provided user context
  - Keep responses concise and actionable
  """
  ```
- [ ] `safety_filter.py` — detect medical intent, reject với message chuẩn
- [ ] `POST /chat` — nhận message + customer_id → load context → gọi LLM → trả response
- [ ] `POST /recommend` — phân tích logs → suggest workout changes (structured JSON)

### ⚙️ Backend — AI Proxy (Spring Boot)
- [ ] `POST /api/ai/chat` — validate auth → gọi Python service → lưu message vào DB
- [ ] `GET /api/ai/conversations/me` — load conversation history
- [ ] `POST /api/ai/recommend` — trigger recommendation, lưu vào ai_recommendations
- [ ] `PATCH /api/ai/recommendations/:id/accept` — apply suggested changes vào workout plan
- [ ] `PATCH /api/ai/recommendations/:id/dismiss` — mark dismissed

### 🖥️ Frontend — AI Coach + Progress
- [ ] `/dashboard/member/ai-coach` — split layout:
  - Left (60%): message thread (user/AI bubbles), input box + send, quick prompt chips
  - Right (40%): "Your context" card (current plan, goal), "Quick prompts" (6 suggestion buttons)
  - AI recommendation card khi AI suggest thay đổi: Accept / Dismiss buttons
- [ ] `/dashboard/member/progress` — progress page:
  - 4 stat cards: Workouts/month, Attendance, Streak, Total weight lifted
  - Body metrics card: current weight + target + progress bar
  - Weekly frequency chart: pure CSS bar chart (8 bars, last 8 weeks)
  - Personal records table: Exercise | Best weight | Date
  - Recent workouts list

---

## TUẦN 4 — Dashboard + Reports + Full DevOps

### ⚙️ Backend — Dashboard + Reports
- [ ] `GET /api/dashboard/stats` — Manager KPIs (aggregate từ nhiều tables)
- [ ] `GET /api/dashboard/revenue-chart` — revenue last 8 weeks
- [ ] `GET /api/dashboard/crm-funnel` — lead count per stage
- [ ] `GET /api/dashboard/class-occupancy` — today's class fill rates
- [ ] `GET /api/reports/sales` — period filter, order count, revenue
- [ ] `GET /api/reports/memberships` — active/expiring/expired counts
- [ ] `GET /api/reports/classes` — occupancy, no-show per class
- [ ] `GET /api/reports/renewals` — expiring customers list

### 🖥️ Frontend
- [ ] `/dashboard` (Manager) — Manager Dashboard:
  - 4 KPI cards: Revenue / Active Members / New Leads / Conversion Rate
  - Revenue bar chart (CSS bars, 8 weeks)
  - CRM funnel (horizontal bars per stage)
  - Class occupancy list
  - "Renewal needed" widget (từ Người A)
- [ ] `/dashboard/reports` — tabs: Sales | Members | Classes | Renewals

### 🐳 DevOps — Production Deploy
- [ ] Multi-stage `Dockerfile` cho Spring Boot (builder + runtime, minimize image size)
- [ ] Multi-stage `Dockerfile` cho Next.js
- [ ] `Dockerfile` cho Python AI service
- [ ] GitHub Actions `deploy.yml`:
  ```yaml
  on:
    push:
      branches: [main]
  jobs:
    deploy:
      # Build images → Push to registry → Deploy to cloud
  ```
- [ ] Deploy lên Railway / Render / VPS:
  - Backend service
  - Frontend (Vercel hoặc cùng Railway)
  - AI service
  - PostgreSQL managed
  - Redis managed
- [ ] Production checklist:
  - [ ] HTTPS enabled
  - [ ] Secrets không hardcode
  - [ ] Health check endpoints
  - [ ] Basic monitoring (logs)

### Tests
- [ ] Unit test AI safety filter: medical question → blocked
- [ ] Unit test context loader: đúng customer data loaded, không leak data của customer khác
- [ ] Test recommendation accept → workout plan updated
- [ ] E2E test: send AI message → response received

### 📝 Những gì mày có thể nói trong CV/vấn đáp:
- Xây Python FastAPI service separate từ Spring Boot (microservice lite)
- Context injection cho LLM: load user's actual workout data trước khi gọi OpenAI
- Safety filter để block medical advice, protect AI output
- Multi-stage Docker builds để optimize image size
- GitHub Actions CI/CD pipeline end-to-end
- CSS-only charts (không dùng chart library, hiểu DOM/CSS hơn)

---

---

# TIMELINE TỔNG HỢP

```
TUẦN 1
├── A: Auth (JWT + RBAC) ← TẤT CẢ CẦN CÁI NÀY TRƯỚC
├── B: Plans + DB schema
├── C: Trainer + Class + DB schema
└── D: Exercise Library + Docker Compose setup

TUẦN 2
├── A: Lead CRUD + Activities + Convert flow
├── B: Order + Payment + Service Activation
├── C: Sessions + Booking (concurrency!)
└── D: Workout Plan + Workout Log

TUẦN 3
├── A: Customer detail + User admin + Renewal cron
├── B: Membership lifecycle (pause/resume/renew) + PT Package
├── C: Check-in + PT Sessions + Attendance
└── D: Progress API + AI Service (Python) + AI proxy

TUẦN 4
├── A: Manager Dashboard + Integration test + Auth hardening
├── B: Deploy BE + DB + Testing payment idempotency
├── C: Concurrency test + Class reports + E2E test
└── D: Reports + Full DevOps deploy + AI safety test

TUẦN 5 (buffer)
└── Tất cả: Bug fix, polish UI, demo prep, stretch features
```

---

# INTEGRATION CHECKPOINTS (cả team sync)

| Mốc | Khi nào | Ai cần |
|-----|---------|--------|
| Auth hoạt động | Cuối ngày 2, tuần 1 | B, C, D test với JWT |
| Membership validator | Cuối tuần 2 | C dùng để gate booking |
| PT Package use session | Cuối tuần 3 | C gọi khi complete PT |
| Customer aggregate API | Tuần 3 | B, C, D cung cấp data |
| Full flow test | Tuần 4 | Lead→Order→Pay→Book→Workout→AI |

---

# MỖI NGƯỜI ĐỀU CÓ ĐỦ

| Kỹ năng | A | B | C | D |
|---------|---|---|---|---|
| SQL Schema design | ✅ | ✅ | ✅ | ✅ |
| Flyway migration | ✅ | ✅ | ✅ | ✅ |
| Spring Boot REST API | ✅ | ✅ | ✅ | ✅ |
| Spring Security | ✅ lead | ✅ dùng | ✅ dùng | ✅ dùng |
| Business logic phức tạp | State machine | Idempotency | Concurrency | AI context |
| Next.js TypeScript | ✅ | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ | ✅ |
| Docker | ✅ | ✅ | ✅ | ✅ lead |
| Testing | JUnit | JUnit | JUnit+concurrent | JUnit+Python |
| Thứ độc đáo cho CV | JWT/RBAC/AOP | Payment idempotency | Concurrency/locking | AI/Python/CI-CD |

---

*Mỗi người khi đi phỏng vấn có thể giải thích toàn bộ stack từ UI click → API call → business logic → DB query → response. Không ai bị "chỉ làm FE" hay "chỉ làm BE".*
