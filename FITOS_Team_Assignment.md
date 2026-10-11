# FITOS — PHÂN CÔNG DỰ ÁN NHÓM 4 NGƯỜI

> **Thời gian:** 4–5 tuần  
> **Mô hình:** Fullstack vertical slice — mỗi người sở hữu 1 domain hoàn chỉnh: DB → API → Frontend → AI (nếu có) → DevOps  
> **Nguyên tắc:** Không chia theo layer (FE/BE riêng). Mỗi người chịu trách nhiệm end-to-end cho domain của mình, tự test, tự deploy.

---

## TỔNG QUAN PHÂN CHIA

| Người | Domain | Từ khóa |
|-------|--------|---------|
| **Thành viên 1** | Foundation + CRM + Auth | Auth, RBAC, User, Lead, Customer, Renewal |
| **Thành viên 2** | Commerce + Membership + Payment | Plans, Order, Payment, Membership, Activation |
| **Thành viên 3** | Operations + Trainer + PT | Class, Schedule, Booking, Check-in, Trainer, PT Session |
| **Thành viên 4** | Workout + Progress + AI Coach | Exercise, Workout Plan, Log, Progress, AI Chat, Dashboard |

---

## LỊCH CHUNG 4 TUẦN

| Tuần | Tất cả làm |
|------|-----------|
| **Tuần 1** | Setup project (repo, DB schema, Docker, CI/CD cơ bản), implement domain core (CRUD cơ bản) |
| **Tuần 2** | Hoàn thiện business logic, API endpoints, Frontend screens chính |
| **Tuần 3** | Integration giữa các domain, UI polish, Error/Loading/Empty states |
| **Tuần 4** | Testing, bug fix, deploy cloud, review chéo, demo prep |
| **Tuần 5 (buffer)** | Polish, stretch features nếu còn thời gian, final demo |

---

---

# THÀNH VIÊN 1 — FOUNDATION + CRM + AUTH

## Tổng quan
Người này xây móng cho toàn hệ thống. Không có Auth và User thì các thành viên khác không làm được. Song song đó làm toàn bộ CRM (Lead lifecycle) và Customer management.

## Tuần 1 — Foundation

### Database
- [ ] Thiết kế và tạo bảng `users` (id, email, password_hash, role, status, created_at)
- [ ] Bảng `roles` và constants: ADMIN, MANAGER, RECEPTIONIST, TRAINER, CUSTOMER
- [ ] Bảng `audit_logs` (actor_id, action, entity_type, entity_id, metadata, timestamp)
- [ ] Bảng `leads` (id, full_name, phone, email, dob, goal, source, status, assigned_to, notes, created_at)
- [ ] Bảng `lead_activities` (id, lead_id, actor_id, type, note, timestamp)
- [ ] Bảng `customers` (id, user_id, full_name, phone, email, dob, goal, joined_at, lead_id)
- [ ] Setup Docker Compose (postgres, redis, backend, frontend, ai service)
- [ ] Init migration scripts (Flyway hoặc Liquibase)

### Backend (Spring Boot)
- [ ] Setup project structure (controller/service/repository/dto/exception)
- [ ] JWT authentication filter
- [ ] `POST /api/auth/register` — tạo account
- [ ] `POST /api/auth/login` — trả về JWT
- [ ] `POST /api/auth/logout`
- [ ] `POST /api/auth/forgot-password`
- [ ] `POST /api/auth/reset-password`
- [ ] `PUT /api/auth/change-password`
- [ ] RBAC annotation `@RequiresRole`
- [ ] Global exception handler
- [ ] Audit log interceptor

### Frontend (Next.js)
- [ ] `/login` — form đăng nhập, lưu JWT vào httpOnly cookie
- [ ] `/register` — form đăng ký với role selector
- [ ] Auth context/provider
- [ ] Protected route wrapper (redirect nếu chưa login)
- [ ] Role-based UI guard (ẩn/hiện theo role)

## Tuần 2 — CRM Core

### Backend
- [ ] `POST /api/leads` — tạo lead
- [ ] `GET /api/leads` — list với pagination, filter (status, source, assigned_to), search (name, phone)
- [ ] `GET /api/leads/:id` — detail + activities
- [ ] `PUT /api/leads/:id` — cập nhật thông tin
- [ ] `PUT /api/leads/:id/status` — đổi status
- [ ] `POST /api/leads/:id/activities` — thêm activity (CALL, MESSAGE, CONSULTATION, TRIAL, FOLLOW_UP)
- [ ] `POST /api/leads/:id/convert` — convert lead thành customer
  - Validate: status phải là INTERESTED hoặc TRIAL
  - Tạo Customer record
  - Tạo User account nếu chưa có
  - Gửi invitation email (mock hoặc thật)
  - Preserve lead history
  - Set lead status = CONVERTED
- [ ] `POST /api/leads/:id/lost` — mark lost
- [ ] `GET /api/customers` — list customers
- [ ] `GET /api/customers/:id` — full customer detail (membership, bookings, payments, workouts, activities)
- [ ] `PUT /api/customers/:id` — edit customer profile

### Frontend
- [ ] `/dashboard/leads` — bảng leads với filter status, source, search
- [ ] `/dashboard/leads/:id` — lead detail: thông tin + activity timeline + actions
- [ ] `/dashboard/create-lead` — form tạo lead mới (name, phone, email, source, goal, notes)
- [ ] Modal/panel thêm activity (type, note)
- [ ] Convert lead flow: chọn plan → tạo order (hand-off sang TV2) → confirm
- [ ] `/dashboard/customers` — bảng customers với filter, search
- [ ] `/dashboard/customers/:id` — customer detail 6 tabs: Overview, Membership, Bookings, Workout, Payments, Activity

## Tuần 3 — User Management + Renewal

### Backend
- [ ] `GET /api/users` (ADMIN only) — list all users
- [ ] `POST /api/users` — create user
- [ ] `PUT /api/users/:id` — edit user
- [ ] `PUT /api/users/:id/disable` — disable user
- [ ] `PUT /api/users/:id/role` — change role
- [ ] `GET /api/profile` — own profile
- [ ] `PUT /api/profile` — update profile
- [ ] Renewal detection: scheduled job (cron) mỗi ngày check membership hết hạn trong 7 ngày
- [ ] `GET /api/renewals` — list customers cần renewal
- [ ] `POST /api/renewals/:id/contact` — ghi nhận đã contact

### Frontend
- [ ] `/dashboard/users` (ADMIN) — quản lý users
- [ ] `/dashboard/profile` — xem và edit profile của mình
- [ ] Renewal widget trong Manager Dashboard — hiển thị danh sách sắp hết hạn
- [ ] Notification badge cho renewal alerts

## Tuần 4 — Integration + Testing

- [ ] Unit tests: AuthService, LeadService, CustomerService
- [ ] Integration tests: convert lead flow end-to-end
- [ ] Audit log: verify tất cả actions quan trọng đều được log
- [ ] Security review: JWT expiry, refresh token, disabled user không login được
- [ ] API docs (Swagger/OpenAPI)
- [ ] Review chéo với TV2 (Customer → Order link)

## Deliverables
- Auth system hoạt động với đủ 5 roles
- CRM: full lead lifecycle từ NEW → CONVERTED/LOST
- Customer profile với 6 tabs
- User management (ADMIN)
- Renewal detection + alert
- Audit logs

---

---

# THÀNH VIÊN 2 — COMMERCE + MEMBERSHIP + PAYMENT

## Tổng quan
Domain này là **trái tim doanh thu** của FITOS. Quản lý toàn bộ vòng đời thương mại: Plans → Order → Payment → Membership activation. Kết nối với TV1 (Customer) và TV3 (Booking access).

## Tuần 1 — Schema + Plans

### Database
- [ ] Bảng `service_plans` (id, name, type: MEMBERSHIP/PT_PACKAGE, description, price, duration_days, included_sessions, status)
- [ ] Bảng `orders` (id, customer_id, plan_id, status, subtotal, discount, total, notes, created_at)
- [ ] Bảng `payments` (id, order_id, method, reference, amount, status, paid_at, created_at)
- [ ] Bảng `memberships` (id, customer_id, plan_id, order_id, start_date, end_date, status, auto_renew)
- [ ] Bảng `pt_packages` (id, customer_id, plan_id, order_id, total_sessions, remaining_sessions, expires_at, status)
- [ ] Index: customer_id trên memberships, payments; reference unique trên payments

### Backend
- [ ] `GET /api/plans` — list tất cả plans (public endpoint)
- [ ] `GET /api/plans/:id` — plan detail
- [ ] `POST /api/plans` (MANAGER) — tạo plan
- [ ] `PUT /api/plans/:id` (MANAGER) — cập nhật plan
- [ ] `PUT /api/plans/:id/status` (MANAGER) — activate/deactivate

### Frontend
- [ ] `/plans` (public) — trang plans cho visitor xem
- [ ] `/dashboard/plans` (MANAGER) — quản lý plans, toggle status
- [ ] Plan card component với price, features, CTA

## Tuần 2 — Order + Payment

### Backend
- [ ] `POST /api/orders` — tạo order
  - Input: customer_id, plan_id, discount_code (optional)
  - Server-side: tính subtotal, discount, total (không nhận total từ client)
  - Status: PENDING
  - Validate: customer phải tồn tại, plan phải ACTIVE
- [ ] `GET /api/orders` — list orders (MANAGER/RECEPTIONIST), filter status
- [ ] `GET /api/orders/:id` — order detail
- [ ] `PUT /api/orders/:id/cancel` — cancel order (chỉ khi PENDING)
- [ ] `POST /api/payments` — tạo payment
  - Input: order_id, method (CASH/BANK_TRANSFER/SANDBOX), reference
  - Validate: order phải PENDING
  - Process payment (mock logic)
  - Nếu SUCCESS → trigger Service Activation
- [ ] `POST /api/payments/callback` — webhook callback (VNPay sandbox hoặc Stripe test)
  - Idempotency: check reference đã xử lý chưa
  - Nếu duplicate → trả 200 nhưng không xử lý lại
- [ ] Service Activation logic (gọi sau payment success):
  - Nếu plan type = MEMBERSHIP → tạo Membership record (status=ACTIVE)
  - Nếu plan type = PT_PACKAGE → tạo PT Package record
  - Update Order status = PAID
- [ ] `GET /api/payments` — list payments
- [ ] `GET /api/payments/:id` — payment detail

### Frontend
- [ ] `/dashboard/sales` — bảng orders + KPI (Today Revenue, Month Revenue, Pending)
- [ ] `/dashboard/create-sale` — 3 bước:
  1. Tìm customer (search by name/phone)
  2. Chọn plan (card selection)
  3. Order summary + chọn payment method + xác nhận
- [ ] `/dashboard/payment-confirmed` — success screen: checkmark, receipt, "Print receipt" button
- [ ] Payment method selector (Cash/Bank Transfer/Sandbox card)

## Tuần 3 — Membership Management

### Backend
- [ ] `GET /api/memberships` (MANAGER) — list all memberships, filter status
- [ ] `GET /api/memberships/me` (CUSTOMER) — own membership
- [ ] `GET /api/memberships/:id` — detail
- [ ] `PUT /api/memberships/:id/pause` — pause (nếu policy cho phép)
- [ ] `PUT /api/memberships/:id/resume` — resume
- [ ] `PUT /api/memberships/:id/cancel` — cancel
- [ ] `POST /api/memberships/:id/renew` — tạo renewal order
- [ ] `GET /api/memberships/expiring` — list sắp hết hạn (dùng cho TV1 renewal widget)
- [ ] Access validation middleware: `validateMembershipActive(customerId)` — TV3 và TV4 sẽ gọi
- [ ] `GET /api/pt-packages/me` — customer xem pt packages
- [ ] `PUT /api/pt-packages/:id/use` — trừ 1 session (gọi từ TV3 khi complete PT)

### Frontend
- [ ] `/dashboard/member/payments` — xem payment history + membership status card
- [ ] `/dashboard/customers/:id` tab Membership — xem và manage membership
- [ ] Membership status badge component (ACTIVE/PAUSED/EXPIRED)
- [ ] Expiry countdown widget

## Tuần 4 — Integration + Testing

- [ ] Unit tests: OrderService (tính giá), PaymentService (idempotency), MembershipService
- [ ] Test case: payment success → membership active → booking allowed
- [ ] Test case: duplicate payment callback → chỉ activate 1 lần
- [ ] Test case: order cancel → payment không thể tạo
- [ ] Swagger docs cho tất cả endpoints
- [ ] Review chéo với TV1 (Customer link) và TV3 (membership validation)

## Deliverables
- Plan management (Membership + PT Package)
- Order flow end-to-end
- Payment processing với idempotency
- Membership lifecycle (create/pause/resume/cancel/renew)
- PT Package session tracking
- Revenue reports

---

---

# THÀNH VIÊN 3 — OPERATIONS + TRAINER + PT

## Tổng quan
Domain vận hành hàng ngày của studio: lịch lớp học, đặt lịch, check-in, quản lý trainer, PT sessions. Kết nối với TV2 (membership validation) và TV4 (workout sau PT).

## Tuần 1 — Schema + Class

### Database
- [ ] Bảng `trainers` (id, user_id, full_name, specialization, bio, status)
- [ ] Bảng `classes` (id, name, type, description, trainer_id, room, status)
- [ ] Bảng `class_sessions` (id, class_id, trainer_id, date, start_time, end_time, room, capacity, status)
- [ ] Bảng `bookings` (id, customer_id, class_session_id, status, booked_at, cancelled_at)
- [ ] Bảng `attendance` (id, customer_id, class_session_id, pt_session_id, checked_in_at, type)
- [ ] Bảng `pt_sessions` (id, trainer_id, customer_id, pt_package_id, scheduled_at, status, notes)
- [ ] Unique constraint: (customer_id, class_session_id) trên bookings
- [ ] Index: class_session_id, customer_id trên bookings và attendance

### Backend
- [ ] `GET /api/trainers` — list trainers
- [ ] `POST /api/trainers` (MANAGER) — tạo trainer
- [ ] `PUT /api/trainers/:id` — cập nhật
- [ ] `PUT /api/trainers/:id/assign` — assign trainer cho customer
- [ ] `GET /api/classes` — list classes
- [ ] `POST /api/classes` (MANAGER) — tạo class
- [ ] `PUT /api/classes/:id` — cập nhật

### Frontend
- [ ] `/dashboard/trainer` — trang trainer: today's sessions timeline + my clients list
- [ ] `/dashboard/customers/:id` — tab Trainer assignment

## Tuần 2 — Schedule + Booking

### Backend
- [ ] `GET /api/sessions` — list sessions, filter (date, trainer, class, status)
- [ ] `POST /api/sessions` (MANAGER) — tạo class session
- [ ] `PUT /api/sessions/:id` — cập nhật session
- [ ] `PUT /api/sessions/:id/cancel` — cancel session
- [ ] `PUT /api/sessions/:id/complete` — complete session
- [ ] `POST /api/bookings` — tạo booking
  - Validate: customer membership active (gọi TV2's middleware)
  - Validate: không duplicate (same customer + session)
  - Validate: capacity chưa đầy
  - **Concurrency**: dùng SELECT FOR UPDATE hoặc optimistic locking
  - Nếu full → trả `CLASS_FULL` error
- [ ] `GET /api/bookings/me` (CUSTOMER) — own bookings
- [ ] `GET /api/bookings` (MANAGER/RECEPTIONIST) — all bookings
- [ ] `PUT /api/bookings/:id/cancel` — cancel booking
- [ ] Cron job: auto-complete sessions sau end_time

### Frontend
- [ ] `/dashboard/schedule` — weekly calendar (7 columns Mon-Sun), mỗi ô chứa session cards màu theo type
- [ ] `/dashboard/bookings` — check-in strip + attendance table
- [ ] `/dashboard/member/book` — member đặt lịch: tabs Classes/PT, date strip, class cards với Book button
- [ ] Capacity indicator (progress bar, slots remaining)

## Tuần 3 — Check-in + PT Sessions

### Backend
- [ ] `POST /api/checkin` — check-in
  - Input: customer_id hoặc QR code
  - Validate: membership active
  - Validate: có booking hoặc walk-in
  - Tạo attendance record
- [ ] `GET /api/attendance` (MANAGER) — attendance history, filter date/customer/class
- [ ] `GET /api/attendance/me` (CUSTOMER) — own attendance
- [ ] `POST /api/pt-sessions` — schedule PT
  - Validate: trainer available (không conflict)
  - Validate: customer có PT package còn sessions
- [ ] `GET /api/pt-sessions` — list (filter trainer/customer/status)
- [ ] `PUT /api/pt-sessions/:id/reschedule`
- [ ] `PUT /api/pt-sessions/:id/cancel`
- [ ] `PUT /api/pt-sessions/:id/complete` — complete PT session
  - Gọi TV2: `pt_packages.remaining_sessions -= 1` (idempotent)
  - Tạo attendance record

### Frontend
- [ ] Check-in screen: search customer → verify membership → check-in button → success
- [ ] `/dashboard/trainer` — full trainer view: schedule week, PT client management, training notes
- [ ] PT Session management modal (schedule/reschedule/cancel/complete)
- [ ] Trainer assignment trong customer detail

## Tuần 4 — Integration + Testing

- [ ] Unit tests: BookingService (duplicate prevention, capacity check, concurrency)
- [ ] Test case: concurrency — 2 requests cùng lúc cho slot cuối, chỉ 1 thành công
- [ ] Test case: booking khi membership expired → reject
- [ ] Test case: PT complete → decrement sessions, idempotent
- [ ] Integration test: book → check-in → attendance recorded
- [ ] Review chéo với TV2 (membership validation), TV4 (workout trigger sau class)

## Deliverables
- Trainer management + assignment
- Class + Session management
- Schedule (weekly view)
- Booking với concurrency safety
- Check-in + Attendance
- PT Session lifecycle
- Capacity tracking

---

---

# THÀNH VIÊN 4 — WORKOUT + PROGRESS + AI COACH + DASHBOARD

## Tổng quan
Domain này tạo ra **giá trị cốt lõi cho member**: workout plan từ trainer, ghi log, theo dõi tiến trình, và AI Coach cá nhân hóa. Cộng thêm Dashboard & Reports cho Manager. Đây là domain phức tạp nhất vì có AI component.

## Tuần 1 — Schema + Exercise Library

### Database
- [ ] Bảng `exercises` (id, name, muscle_group, equipment, difficulty, instructions, created_by)
- [ ] Bảng `workout_plans` (id, customer_id, trainer_id, goal, start_date, end_date, status, notes)
- [ ] Bảng `workout_plan_exercises` (id, plan_id, day_number, exercise_id, sets, reps, target_weight, rest_seconds, order_index)
- [ ] Bảng `workout_sessions` (id, customer_id, plan_id, performed_at, notes, status)
- [ ] Bảng `workout_logs` (id, session_id, exercise_id, set_number, reps_completed, weight, rpe, notes)
- [ ] Bảng `goals` (id, customer_id, type, current_value, target_value, unit, target_date, status)
- [ ] Bảng `body_metrics` (id, customer_id, date, weight, body_fat, muscle_mass, waist)
- [ ] Bảng `ai_conversations` (id, customer_id, created_at)
- [ ] Bảng `ai_messages` (id, conversation_id, role: user/assistant, content, created_at)
- [ ] Bảng `ai_recommendations` (id, customer_id, title, reason, suggested_changes, status: PENDING/ACCEPTED/DISMISSED)

### Backend
- [ ] `GET /api/exercises` — list với search, filter (muscle_group, equipment, difficulty)
- [ ] `POST /api/exercises` (TRAINER/MANAGER) — tạo exercise
- [ ] `PUT /api/exercises/:id` — cập nhật
- [ ] `DELETE /api/exercises/:id` — deactivate

### Frontend
- [ ] `/dashboard/workout-builder` — exercise library sidebar + week grid (Mon-Sat, mỗi ngày add exercises)
- [ ] Exercise search và filter trong library panel

## Tuần 2 — Workout Plan + Log

### Backend
- [ ] `POST /api/workout-plans` (TRAINER) — tạo plan cho customer
- [ ] `GET /api/workout-plans` — list (filter customer, trainer, status)
- [ ] `GET /api/workout-plans/:id` — detail với exercises theo day
- [ ] `PUT /api/workout-plans/:id` — cập nhật plan
- [ ] `PUT /api/workout-plans/:id/activate` — activate plan
- [ ] `PUT /api/workout-plans/:id/complete` — complete plan
- [ ] `PUT /api/workout-plans/:id/cancel` — cancel plan
- [ ] `POST /api/workout-sessions` — start workout session (từ active plan)
- [ ] `PUT /api/workout-sessions/:id/complete` — complete session
- [ ] `POST /api/workout-logs` — log từng set trong session
  - Input: session_id, exercise_id, set_number, reps_completed, weight, rpe, notes
- [ ] `GET /api/workout-sessions/me` — own sessions
- [ ] `GET /api/workout-sessions/:id` — session detail với all logs

### Frontend
- [ ] `/dashboard/member` (Member Home) — top cards (membership, next booking, streak) + this week workout grid + quick actions
- [ ] Workout execution screen — exercise list, input sets/reps/weight per set, complete button
- [ ] Workout history list

## Tuần 3 — Progress + AI Coach

### Backend
- [ ] `GET /api/progress/me` — progress summary cho member:
  - workouts_this_month
  - attendance_count
  - current_streak
  - best_lifts (per exercise, max weight)
  - weekly_frequency (last 8 weeks)
- [ ] `POST /api/body-metrics` — log body metrics
- [ ] `GET /api/body-metrics/me` — list theo thời gian
- [ ] `POST /api/goals` — tạo goal
- [ ] `PUT /api/goals/:id` — update goal
- [ ] **AI Service (Python FastAPI)**:
  - `POST /ai/chat` — nhận message, load context, gọi LLM, trả về response
    - Context loader: lấy customer profile + active workout plan + last 30 days workout logs + goals
    - System prompt: fitness assistant, không medical diagnosis
    - Safety filter: reject medical/treatment requests
  - `POST /ai/recommend` — phân tích workout history, đề xuất thay đổi
  - `GET /ai/progress-summary` — tổng hợp progress bằng ngôn ngữ tự nhiên
- [ ] Spring Boot proxy endpoints:
  - `POST /api/ai/chat` → gọi AI service với customer context
  - `POST /api/ai/recommend` → tạo recommendation record
  - `PUT /api/ai/recommendations/:id/accept` → apply changes vào workout plan
  - `PUT /api/ai/recommendations/:id/dismiss`
- [ ] Manager Dashboard API:
  - `GET /api/dashboard/stats` — revenue, active members, new leads, conversion rate
  - `GET /api/dashboard/class-occupancy` — occupancy % per class today
  - `GET /api/dashboard/revenue-chart` — last 8 weeks revenue
  - `GET /api/dashboard/crm-funnel` — lead counts per stage

### Frontend
- [ ] `/dashboard/member/progress` — 4 stat cards + body metrics card + CSS bar chart (8 weeks) + PRs table + recent workouts
- [ ] `/dashboard/member/ai-coach` — split layout: chat left (message bubbles + input) + quick prompts + context panel right
- [ ] AI recommendation card với Accept/Dismiss buttons
- [ ] `/dashboard` (Manager) — 4 KPI cards + revenue bar chart + CRM funnel + class occupancy + renewal widget

## Tuần 4 — Reports + Integration + DevOps

### Backend Reports
- [ ] `GET /api/reports/crm` — lead stats by stage + conversion rate
- [ ] `GET /api/reports/sales` — revenue by period, order count, avg order value
- [ ] `GET /api/reports/memberships` — active/expiring/expired/renewed counts
- [ ] `GET /api/reports/classes` — occupancy, attendance, no-show per class
- [ ] `GET /api/reports/renewals` — renewal list với days remaining

### DevOps (cả team dùng, TV4 lead)
- [ ] Docker Compose hoàn chỉnh: postgres, redis, spring-backend, nextjs-frontend, python-ai
- [ ] `.env.example` với tất cả required vars
- [ ] `Dockerfile` cho từng service (optimize layer caching)
- [ ] GitHub Actions CI:
  - Build backend (Maven)
  - Build frontend (npm run build)
  - Run tests
  - Build Docker images
- [ ] Deploy lên cloud (Railway / Render / VPS):
  - Backend
  - Frontend (Vercel hoặc cùng VPS)
  - AI service
  - PostgreSQL (managed hoặc container)
- [ ] Environment variables management

### AI
- [ ] Unit tests: context loader (đúng data, đúng customer)
- [ ] Test: AI không trả lời câu hỏi y tế
- [ ] Test: recommendation accept → workout plan thay đổi đúng
- [ ] Test: conversation history load đúng

### Frontend
- [ ] `/dashboard/reports` — tabs: Sales, Members, Classes, Renewals

## Deliverables
- Exercise library
- Workout Plan (Trainer tạo, Member thực hiện)
- Workout Log + History
- Progress tracking với charts
- Body metrics
- AI Coach chat (context-aware)
- AI Recommendations (accept/dismiss)
- Manager Dashboard với real data
- Reports (4 loại)
- Full DevOps pipeline

---

---

# MA TRẬN PHỤ THUỘC

```
TV1 (Auth/CRM) ──────────────────────────────────────► TV2, TV3, TV4
       │                                                   (cần JWT để test)
       │
TV2 (Commerce) ──► membership validation ──────────────► TV3, TV4
       │                                                   (cần check membership)
       │
TV3 (Operations) ──► workout trigger sau PT ───────────► TV4
                     booking/attendance data              (cần PT data)

TV4 (Workout/AI) ──► Dashboard dùng data từ TV1,2,3
```

## Integration checkpoints (cả team)

| Tuần | Checkpoint |
|------|-----------|
| Cuối tuần 1 | TV1 xong Auth → TV2,3,4 có thể test với JWT |
| Cuối tuần 2 | TV2 xong membership → TV3 có thể test booking validation |
| Cuối tuần 3 | TV3 xong PT complete → TV4 có thể test workout trigger |
| Tuần 4 | Full integration test: Lead → Convert → Order → Pay → Membership → Book → Check-in → Workout → AI |

---

---

# TECH STACK

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Java Spring Boot 3, Spring Security, JPA |
| AI Service | Python FastAPI, OpenAI API (hoặc Gemini) |
| Database | PostgreSQL 15 |
| Cache | Redis (session, rate limiting) |
| Auth | JWT (access + refresh token) |
| Payment | VNPay Sandbox hoặc Stripe Test |
| DevOps | Docker, Docker Compose, GitHub Actions |
| Deploy | Railway / Render / VPS |
| Docs | Swagger/OpenAPI |

---

# TIÊU CHÍ HOÀN THÀNH (mỗi chức năng)

Một chức năng chỉ được tính **DONE** khi có đủ:

- [ ] UI hiển thị đúng, responsive
- [ ] API endpoint hoạt động
- [ ] Business logic validate đúng
- [ ] Database lưu đúng
- [ ] Error/Loading/Empty/Success states
- [ ] Authorization check (backend, không chỉ frontend)
- [ ] Ít nhất 1 unit test cho business logic chính
- [ ] Không có console.error hoặc 500 error khi dùng bình thường

---

# PHÂN CÔNG TỔNG HỢP (1 TRANG)

```
┌─────────────────────────────────────────────────────────────────┐
│                    FITOS — 4 NGƯỜI × 4 TUẦN                    │
├──────────┬──────────────────────────────────────────────────────┤
│ TV1      │ Auth · RBAC · User · Lead · Customer · Renewal       │
│          │ Login/Register · CRM screens · Profile · Audit log   │
├──────────┼──────────────────────────────────────────────────────┤
│ TV2      │ Plans · Order · Payment · Membership · PT Package    │
│          │ Sales screens · Membership screens · Revenue data    │
├──────────┼──────────────────────────────────────────────────────┤
│ TV3      │ Class · Session · Schedule · Booking · Check-in      │
│          │ Trainer · PT Session · Attendance · Concurrency      │
├──────────┼──────────────────────────────────────────────────────┤
│ TV4      │ Exercise · Workout Plan · Log · Progress · AI Chat   │
│          │ AI Recommend · Dashboard KPI · Reports · DevOps      │
└──────────┴──────────────────────────────────────────────────────┘
```

---

# RỦI RO VÀ GIẢM THIỂU

| Rủi ro | Giảm thiểu |
|--------|-----------|
| TV1 chậm → cả team bị block | TV1 ưu tiên Auth trước tiên (ngày 1-2 tuần 1) |
| AI API tốn tiền | Dùng mock response trong dev, chỉ dùng real API khi demo |
| Concurrency bug khó test | TV3 viết test case cụ thể với 2 concurrent requests |
| Integration fail cuối | Weekly integration checkpoint, không đợi tuần 4 mới test chéo |
| Scope creep | MVP first — stretch features chỉ làm sau khi MVP xong |

---

*Document version: 1.0 — Tạo tự động từ FITOS Functional Specification Full*
