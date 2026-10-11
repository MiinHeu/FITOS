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

### 🗄️ Database (Flyway migration)
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
  goal VARCHAR(50),
  source VARCHAR(50),
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
  lead_id UUID REFERENCES leads(id),
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
- [ ] `POST /api/auth/register` — hash password BCrypt, tạo user, trả JWT
- [ ] `POST /api/auth/login` — verify password, trả access token (15m) + refresh token (7d)
- [ ] `POST /api/auth/refresh` — dùng refresh token lấy access token mới
- [ ] `POST /api/auth/logout` — invalidate refresh token (Redis blacklist)
- [ ] `POST /api/auth/forgot-password` — tạo reset token, gửi email mock
- [ ] `POST /api/auth/reset-password` — validate token, đổi password
- [ ] `PUT /api/auth/change-password`
- [ ] JWT filter: đọc header `Authorization: Bearer <token>`, set SecurityContext
- [ ] `@PreAuthorize("hasRole('MANAGER')")` annotation-based RBAC
- [ ] Global exception handler (JSON chuẩn, không để 500 leak stack trace)
- [ ] AuditLogAspect: `@Around` các method quan trọng để auto-log
- [ ] Redis: lưu refresh tokens + blacklist logout

### 🖥️ Frontend (Next.js)
- [ ] `/login` — email + password form, lưu token vào httpOnly cookie, redirect theo role
- [ ] `/register` — form với role selector (Member / Staff)
- [ ] `AuthContext` provider — expose `user`, `role`, `logout`
- [ ] `<ProtectedRoute>` — redirect `/login` nếu chưa auth
- [ ] `<RoleGuard role="MANAGER">` — ẩn component nếu không đủ quyền
- [ ] `middleware.ts` — check token trên server side

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
- [ ] `/dashboard/leads` — data table: filter tabs (All/New/Contacted/Trial/Converted/Lost), search, assign
- [ ] `/dashboard/leads/create` — form: name, phone, email, source, goal, notes
- [ ] `/dashboard/leads/:id` — lead detail:
  - Thông tin + edit inline
  - Activity timeline (cuộn được)
  - Add activity modal (type, note)
  - Action buttons: Contact, Schedule Trial, Convert, Mark Lost
- [ ] Convert modal: chọn plan → preview order → confirm

---

## TUẦN 3 — Customer + User Admin + Renewal

### ⚙️ Backend
- [ ] `GET /api/customers` — list + filter + search
- [ ] `GET /api/customers/:id` — full profile aggregate (join membership từ B, bookings từ C, workouts từ D)
- [ ] `PUT /api/customers/:id` — edit profile
- [ ] `GET /api/users` (ADMIN) — list users
- [ ] `POST /api/users` — tạo user
- [ ] `PUT /api/users/:id` — edit
- [ ] `PATCH /api/users/:id/disable`
- [ ] `PATCH /api/users/:id/role` — change role
- [ ] `GET /api/renewals` — customers có membership hết hạn trong 7 ngày
- [ ] Cron job `@Scheduled`: mỗi ngày 8AM check expiring memberships

### 🖥️ Frontend
- [ ] `/dashboard/customers` — table với plan badge, status, expiry
- [ ] `/dashboard/customers/:id` — 6 tabs: Overview | Membership | Bookings | Workouts | Payments | Activity
- [ ] `/dashboard/users` (ADMIN) — quản lý users, change role, disable
- [ ] `/dashboard/profile` — xem/sửa profile, đổi password

### 📊 Manager Dashboard
- [ ] `GET /api/dashboard/summary` — active members, new leads, conversion rate, revenue
- [ ] `/dashboard` — 4 KPI cards + renewal widget + recent activity feed

---

## TUẦN 4 — Testing + Integration

- [ ] Unit test `AuthService`: register, login, refresh, logout
- [ ] Unit test `LeadService`: status transitions, convert validation
- [ ] Integration test: Lead NEW → CONTACTED → TRIAL → CONVERTED → Customer created
- [ ] Test: disabled user không login được
- [ ] Test: CUSTOMER role không access `/api/leads`
- [ ] Swagger docs hoàn chỉnh

### 📝 CV / Vấn đáp:
- JWT auth với access + refresh token, Redis blacklist
- RBAC với Spring Security @PreAuthorize
- Lead lifecycle state machine (NEW → CONVERTED với validation)
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
  status VARCHAR(20) DEFAULT 'PENDING',
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
  status VARCHAR(20) DEFAULT 'PENDING',
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
  status VARCHAR(20) DEFAULT 'ACTIVE',
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
- [ ] `PUT /api/plans/:id` — cập nhật
- [ ] `PATCH /api/plans/:id/status` — activate/deactivate

### 🖥️ Frontend
- [ ] `/plans` (public) — 3 plan cards: Move / Perform / PT Focus
- [ ] `/dashboard/plans` (MANAGER) — quản lý plans

---

## TUẦN 2 — Order + Payment

### ⚙️ Backend
- [ ] `POST /api/orders` — tạo order (server-side tính total, không nhận từ client)
- [ ] `GET /api/orders` (MANAGER/RECEPTIONIST) — list với filter
- [ ] `GET /api/orders/me` (CUSTOMER) — own orders
- [ ] `GET /api/orders/:id` — detail
- [ ] `PATCH /api/orders/:id/cancel` — chỉ khi status = PENDING
- [ ] `POST /api/payments` — tạo payment + trigger activation nếu SUCCESS
- [ ] `POST /api/payments/vnpay/callback` — **Idempotency**:
  ```java
  if (paymentRepo.existsByReference(ref)) {
    return ResponseEntity.ok("already processed");
  }
  ```
- [ ] `ServiceActivationService.activate()`:
  ```
  MEMBERSHIP → tạo Membership ACTIVE
  PT_PACKAGE → tạo PtPackage với remaining_sessions
  Order.status = PAID
  ```

### 🖥️ Frontend
- [ ] `/dashboard/sales` — KPI cards + transaction table
- [ ] `/dashboard/create-sale` — 3-step wizard:
  1. Search + select customer
  2. Plan card selection
  3. Order summary + payment method + confirm
- [ ] `/dashboard/payment-confirmed` — success screen với receipt

---

## TUẦN 3 — Membership Lifecycle

### ⚙️ Backend
- [ ] `GET /api/memberships` — list, filter status
- [ ] `GET /api/memberships/me` — own membership
- [ ] `PATCH /api/memberships/:id/pause` — lưu paused_at
- [ ] `PATCH /api/memberships/:id/resume` — tính days_paused, cộng vào end_date
- [ ] `PATCH /api/memberships/:id/cancel`
- [ ] `POST /api/memberships/:id/renew` — tạo order mới
- [ ] `GET /api/memberships/expiring` — sắp hết hạn 7 ngày
- [ ] **Middleware** `MembershipValidator.requireActive(customerId)` — Người C dùng
- [ ] `PATCH /api/pt-packages/:id/use` — idempotent decrement với @Version optimistic locking

### 🖥️ Frontend
- [ ] `/dashboard/member/payments` — membership card + payment history
- [ ] Membership status badge, pause/resume/cancel buttons
- [ ] Tab Membership trong customer detail

### 🐳 Docker
- [ ] Cấu hình env vars cho payment sandbox trong docker-compose

---

## TUẦN 4 — Testing + Deploy

- [ ] Unit test: price calculation, discount, validate customer
- [ ] Unit test: idempotency — gọi 2 lần cùng reference → chỉ activate 1 lần
- [ ] Unit test: pause/resume date calculation
- [ ] Test: payment success → membership ACTIVE
- [ ] Test: payment callback duplicate → không tạo 2 memberships
- [ ] Deploy backend lên Railway/Render + configure env vars

### 📝 CV / Vấn đáp:
- Payment idempotency với unique reference + Redis check
- Server-side price calculation, không trust client input
- Membership pause/resume với date arithmetic
- Optimistic locking để prevent double-use PT session
- Service activation tách biệt khỏi payment logic

---

---

# 👤 NGƯỜI C — CLASS + SCHEDULE + BOOKING + TRAINER + CHECK-IN

## Mày làm gì để giải thích với nhà tuyển dụng?
> *"Tôi giải quyết bài toán concurrency trong booking: khi 2 user cùng book slot cuối cùng, chỉ 1 người thành công. Tôi dùng SELECT FOR UPDATE + UNIQUE constraint để đảm bảo correctness."*

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
  status VARCHAR(20) DEFAULT 'ACTIVE'
);

CREATE TABLE trainer_assignments (
  trainer_id UUID REFERENCES trainers(id) NOT NULL,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (trainer_id, customer_id)
);

CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),  -- YOGA/HIIT/CYCLING/STRENGTH/BOXING
  description TEXT,
  status VARCHAR(20) DEFAULT 'ACTIVE'
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
  booked_count INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'SCHEDULED'
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  class_session_id UUID REFERENCES class_sessions(id) NOT NULL,
  status VARCHAR(20) DEFAULT 'CONFIRMED',
  booked_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ,
  UNIQUE(customer_id, class_session_id)  -- prevent duplicate
);

CREATE TABLE pt_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID REFERENCES trainers(id) NOT NULL,
  customer_id UUID REFERENCES customers(id) NOT NULL,
  pt_package_id UUID REFERENCES pt_packages(id),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 60,
  status VARCHAR(20) DEFAULT 'SCHEDULED',
  notes TEXT,
  session_ref UUID UNIQUE DEFAULT gen_random_uuid()  -- idempotency
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
CREATE INDEX idx_sessions_date ON class_sessions(session_date);
```

### ⚙️ Backend — Trainer + Class
- [ ] `GET /api/trainers` — list
- [ ] `POST /api/trainers` (MANAGER)
- [ ] `PUT /api/trainers/:id`
- [ ] `PATCH /api/trainers/:id/assign` — assign customer
- [ ] `GET /api/trainers/:id/schedule`
- [ ] `GET /api/classes` — list
- [ ] `POST /api/classes` (MANAGER)
- [ ] `PUT /api/classes/:id`

### 🖥️ Frontend
- [ ] `/dashboard/trainer` — today's sessions timeline + my clients table

---

## TUẦN 2 — Sessions + Booking (core challenge)

### ⚙️ Backend — Booking với Concurrency
- [ ] `POST /api/sessions` (MANAGER) — tạo class session
- [ ] `GET /api/sessions` — filter date/trainer/class
- [ ] `PATCH /api/sessions/:id/cancel` — cancel + cancel all bookings
- [ ] `POST /api/bookings` — **Concurrency-safe**:
  ```java
  @Transactional
  public Booking createBooking(UUID customerId, UUID sessionId) {
    // 1. Check membership active
    membershipValidator.requireActive(customerId);

    // 2. Lock session row
    ClassSession session = sessionRepo.findByIdWithLock(sessionId);
    // SQL: SELECT * FROM class_sessions WHERE id=? FOR UPDATE

    // 3. Check capacity
    if (session.getBookedCount() >= session.getCapacity()) {
      throw new ClassFullException();
    }

    // 4. Create booking + increment (UNIQUE constraint catches duplicate)
    session.setBookedCount(session.getBookedCount() + 1);
    return bookingRepo.save(new Booking(customerId, sessionId));
  }
  ```
- [ ] `GET /api/bookings/me` — own bookings
- [ ] `GET /api/bookings` (MANAGER/RECEPTIONIST) — all bookings
- [ ] `PATCH /api/bookings/:id/cancel` — cancel + decrement booked_count
- [ ] `PATCH /api/bookings/:id/no-show`

### 🖥️ Frontend
- [ ] `/dashboard/schedule` — weekly calendar 7 columns (Mon-Sun), session cards màu theo type
- [ ] `/dashboard/member/book` — date strip + class cards với Book button + capacity bar

---

## TUẦN 3 — Check-in + PT Sessions

### ⚙️ Backend
- [ ] `POST /api/checkin` — search customer → validate membership → tạo attendance
- [ ] `GET /api/attendance` — history filter date/customer
- [ ] `GET /api/attendance/me` — own history
- [ ] `POST /api/pt-sessions` — schedule PT (validate trainer available + package có sessions)
- [ ] `GET /api/pt-sessions` — list filter
- [ ] `PATCH /api/pt-sessions/:id/reschedule`
- [ ] `PATCH /api/pt-sessions/:id/cancel`
- [ ] `PATCH /api/pt-sessions/:id/complete` — idempotent via session_ref → gọi B's useSession

### 🖥️ Frontend
- [ ] `/dashboard/bookings` — check-in strip + stats cards + bookings table
- [ ] PT Session management trong trainer view

---

## TUẦN 4 — Testing + Reports

- [ ] Unit test `BookingService`: duplicate prevention, capacity check
- [ ] **Concurrency test**: 2 concurrent requests cho slot cuối → chỉ 1 thành công
- [ ] Test: booking khi membership EXPIRED → 403
- [ ] Test: PT complete 2 lần → sessions chỉ trừ 1 lần
- [ ] `GET /api/reports/classes` — occupancy %, no-show rate

### 📝 CV / Vấn đáp:
- Concurrency trong booking: SELECT FOR UPDATE, UNIQUE constraint, transaction isolation
- Denormalized `booked_count` để tránh COUNT(*) mỗi lần check capacity
- Idempotent PT session completion với session_ref UUID
- Calendar UI với 7-column grid và color coding
- Integration: booking → check-in → attendance trong 1 flow

---

---

# 👤 NGƯỜI D — WORKOUT + PROGRESS + AI COACH + DEVOPS

## Mày làm gì để giải thích với nhà tuyển dụng?
> *"Tôi xây AI coaching service bằng Python FastAPI, inject customer fitness context vào OpenAI API call, implement safety filter chặn medical advice, đồng thời setup toàn bộ CI/CD pipeline cho team."*

---

## TUẦN 1 — Schema + Exercise Library + DevOps Setup

### 🗄️ Database
```sql
-- V5__workout.sql
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  muscle_group VARCHAR(100),
  equipment VARCHAR(100),
  difficulty VARCHAR(20),
  instructions TEXT,
  created_by UUID REFERENCES users(id)
);

CREATE TABLE workout_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  trainer_id UUID REFERENCES trainers(id),
  goal VARCHAR(50),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'DRAFT',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE workout_plan_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES workout_plans(id) NOT NULL,
  day_number INT NOT NULL,
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
  status VARCHAR(20) DEFAULT 'IN_PROGRESS',
  notes TEXT
);

CREATE TABLE workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES workout_sessions(id) NOT NULL,
  exercise_id UUID REFERENCES exercises(id) NOT NULL,
  set_number INT NOT NULL,
  reps_completed INT,
  weight NUMERIC(6,2),
  rpe INT,
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
  title VARCHAR(255),
  reason TEXT,
  suggested_changes JSONB,
  status VARCHAR(20) DEFAULT 'PENDING',  -- PENDING/ACCEPTED/DISMISSED
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### ⚙️ Backend — Exercises
- [ ] `GET /api/exercises` — search + filter(muscle_group, equipment, difficulty)
- [ ] `POST /api/exercises` (TRAINER/MANAGER)
- [ ] `PUT /api/exercises/:id`
- [ ] Seed 50 exercises phổ biến

### 🐳 DevOps — Setup ngay tuần 1
- [ ] `docker-compose.yml` đầy đủ:
  ```yaml
  services:
    postgres:     # port 5432
    redis:        # port 6379
    backend:      # Spring Boot port 8080
    frontend:     # Next.js port 3000
    ai-service:   # Python FastAPI port 8000
  ```
- [ ] `docker-compose.override.yml` cho dev (volumes, hot reload)
- [ ] `.env.example` với tất cả variables cần thiết
- [ ] `Makefile`: `make up`, `make down`, `make migrate`, `make seed`
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
- [ ] `POST /api/workout-plans` (TRAINER)
- [ ] `GET /api/workout-plans` — filter customer/trainer/status
- [ ] `GET /api/workout-plans/:id` — detail với exercises grouped by day
- [ ] `PUT /api/workout-plans/:id`
- [ ] `PATCH /api/workout-plans/:id/activate` — chỉ 1 plan ACTIVE/lúc
- [ ] `PATCH /api/workout-plans/:id/complete` / `cancel`
- [ ] `POST /api/workout-sessions` — start session từ active plan
- [ ] `PATCH /api/workout-sessions/:id/complete`
- [ ] `POST /api/workout-logs` — log từng set (session_id, exercise_id, set_number, reps, weight, rpe)
- [ ] `GET /api/workout-sessions/me` — own sessions với logs

### 🖥️ Frontend
- [ ] `/dashboard/workout-builder` — trainer view:
  - Left: plan info + week tabs (W1/W2/W3/W4) + day cards grid (Mon-Sat)
  - Right sidebar: exercise library với search + filter + "+" button
- [ ] `/dashboard/member` — member home:
  - Top cards: Membership, Next Booking, Streak
  - This week grid (Mon-Sat) với exercises + completion dots
  - Quick actions: Book / Log workout / Progress / AI Coach
  - Recent activity feed

---

## TUẦN 3 — Progress + AI Coach (Python)

### ⚙️ Backend — Progress
- [ ] `GET /api/progress/me` — computed:
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
- [ ] `POST /api/body-metrics` + `GET /api/body-metrics/me`

### 🐍 AI Service (Python FastAPI)
```
ai/
├── app/
│   ├── main.py
│   ├── routers/
│   │   ├── chat.py        # POST /chat
│   │   └── recommend.py   # POST /recommend
│   ├── services/
│   │   ├── context_loader.py   # Load customer data từ DB
│   │   ├── llm_service.py      # OpenAI API call
│   │   └── safety_filter.py    # Block medical advice
│   └── schemas.py
└── requirements.txt
```

- [ ] `context_loader.py`:
  ```python
  def load_context(customer_id: str) -> dict:
      # Query: profile + goals + active_plan + last_30_days_logs
      return {"name", "goal", "active_plan", "recent_logs", "personal_records"}
  ```
- [ ] `llm_service.py` với system prompt:
  ```
  You are FITOS AI Coach. Answer fitness questions only.
  Do NOT provide medical diagnosis or treatment.
  Base advice on user's actual training data.
  ```
- [ ] `safety_filter.py` — detect medical intent → reject với message chuẩn
- [ ] `POST /chat` — message + customer_id → load context → LLM → response
- [ ] `POST /recommend` — phân tích logs → suggest changes (JSON)

### ⚙️ Backend — AI Proxy (Spring Boot)
- [ ] `POST /api/ai/chat` — validate auth → gọi Python service → lưu message
- [ ] `GET /api/ai/conversations/me` — load history
- [ ] `POST /api/ai/recommend` → lưu recommendation
- [ ] `PATCH /api/ai/recommendations/:id/accept` — apply vào workout plan
- [ ] `PATCH /api/ai/recommendations/:id/dismiss`

### 🖥️ Frontend
- [ ] `/dashboard/member/ai-coach` — split:
  - Left (60%): message bubbles + input + send + quick prompt chips
  - Right (40%): "Your context" card + recommendation card (Accept/Dismiss)
- [ ] `/dashboard/member/progress`:
  - 4 stat cards: Workouts/month, Attendance, Streak, PRs
  - Body metrics card + progress bar
  - Weekly bar chart (pure CSS, 8 bars)
  - Personal records table
  - Recent workouts list

---

## TUẦN 4 — Reports + Full DevOps

### ⚙️ Backend — Reports
- [ ] `GET /api/dashboard/stats` — Manager KPIs
- [ ] `GET /api/dashboard/revenue-chart` — last 8 weeks
- [ ] `GET /api/dashboard/crm-funnel` — lead count per stage
- [ ] `GET /api/reports/sales` — revenue by period
- [ ] `GET /api/reports/memberships` — active/expiring/expired
- [ ] `GET /api/reports/classes` — occupancy, no-show
- [ ] `GET /api/reports/renewals` — expiring customers

### 🖥️ Frontend
- [ ] `/dashboard` (Manager) — 4 KPI cards + revenue CSS bar chart + CRM funnel + class occupancy
- [ ] `/dashboard/reports` — tabs: Sales | Members | Classes | Renewals

### 🐳 DevOps — Production
- [ ] Multi-stage Dockerfile: Spring Boot (builder + runtime, minimize size)
- [ ] Multi-stage Dockerfile: Next.js
- [ ] Dockerfile: Python AI service
- [ ] GitHub Actions `deploy.yml` — build → push registry → deploy
- [ ] Deploy lên Railway/Render/VPS:
  - Backend, Frontend, AI service, PostgreSQL, Redis
- [ ] HTTPS, secrets management, health check endpoints

### Tests
- [ ] Unit test AI safety filter: medical question → blocked
- [ ] Unit test context loader: đúng customer, không leak data người khác
- [ ] Test recommendation accept → workout plan thay đổi đúng

### 📝 CV / Vấn đáp:
- Python FastAPI microservice riêng biệt từ Spring Boot
- Context injection cho LLM: load actual DB data trước khi gọi OpenAI
- Safety filter để block medical advice
- Multi-stage Docker builds giảm image size
- GitHub Actions CI/CD pipeline end-to-end
- Pure CSS charts không dùng library

---

---

# TIMELINE TỔNG HỢP

```
TUẦN 1
├── A: Auth JWT + RBAC ← TẤT CẢ CẦN TRƯỚC
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
├── B: Membership lifecycle (pause/resume/renew)
├── C: Check-in + PT Sessions + Attendance
└── D: Progress API + AI Service Python + AI proxy

TUẦN 4
├── A: Manager Dashboard + Auth hardening + tests
├── B: Deploy + payment idempotency tests
├── C: Concurrency tests + class reports
└── D: Reports + Full CI/CD deploy + AI tests

TUẦN 5 (buffer)
└── Tất cả: Bug fix, UI polish, demo prep, stretch features
```

---

# INTEGRATION CHECKPOINTS

| Mốc | Thời điểm | Ai cần |
|-----|-----------|--------|
| Auth hoạt động | Cuối ngày 2 tuần 1 | B, C, D test với JWT |
| Membership validator | Cuối tuần 2 | C gate booking |
| PT Package useSession | Cuối tuần 3 | C gọi khi complete PT |
| Customer aggregate API | Tuần 3 | B, C, D cung cấp data |
| Full E2E test | Tuần 4 | Lead→Order→Pay→Book→Workout→AI |

---

# MỖI NGƯỜI ĐỀU CÓ ĐỦ

| Kỹ năng | A | B | C | D |
|---------|---|---|---|---|
| SQL Schema + Migration | ✅ | ✅ | ✅ | ✅ |
| Spring Boot REST API | ✅ | ✅ | ✅ | ✅ |
| Spring Security / Auth | ✅ lead | ✅ dùng | ✅ dùng | ✅ dùng |
| Business logic phức tạp | State machine | Idempotency | Concurrency | AI context |
| Next.js + TypeScript | ✅ | ✅ | ✅ | ✅ |
| Tailwind CSS | ✅ | ✅ | ✅ | ✅ |
| Docker | ✅ | ✅ | ✅ | ✅ lead |
| Testing | JUnit | JUnit | JUnit+concurrent | JUnit+Python |
| Thứ độc đáo cho CV | JWT/RBAC/AOP | Payment idempotency | Concurrency/locking | AI/Python/CI-CD |

---

# RỦI RO VÀ GIẢM THIỂU

| Rủi ro | Giảm thiểu |
|--------|-----------|
| A chậm → cả team bị block | A ưu tiên Auth ngày 1-2 tuần 1 |
| AI API tốn tiền | Mock response trong dev, real API chỉ khi demo |
| Concurrency bug khó reproduce | C viết test với CompletableFuture parallel |
| Integration fail cuối | Weekly checkpoint, không đợi tuần 4 |
| Scope creep | MVP first, stretch features sau khi MVP xong |

---

*Mỗi người khi đi phỏng vấn có thể giải thích flow từ UI click → API → business logic → DB → response. Không ai bị "chỉ làm FE" hay "chỉ làm BE".*
