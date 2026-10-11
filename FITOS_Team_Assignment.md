# FITOS — PHÂN CÔNG NHÓM 4 NGƯỜI × 5 TUẦN
## Phiên bản 6 — Chia đều task nhỏ, mỗi người đủ 5 layer

---

## QUY TẮC

- Mỗi task được đánh: **Layer** (DB/BE/FE/AI/OPS) + **Độ ưu tiên** (🔴 must / 🟡 nice)
- Mỗi người nhận task sao cho: **tổng giờ xấp xỉ nhau** và **đủ cả 5 layer**
- Có AI hỗ trợ (Cursor/Kiro/Copilot) → estimate đã tính sẵn
- Mỗi người có **1 Python AI service riêng** tự viết từ đầu đến cuối

**Capacity:** 2-3h/ngày × 5 ngày × 5 tuần = **50-75h/người**
**Target mỗi người: ~55h**

---

## AI SERVICE RIÊNG CỦA TỪNG NGƯỜI

```
ai-crm/         port 8001  ← Người A tự viết toàn bộ
ai-commerce/    port 8002  ← Người B tự viết toàn bộ
ai-operations/  port 8003  ← Người C tự viết toàn bộ
ai-workout/     port 8004  ← Người D tự viết toàn bộ
```

---

## BẢNG TẤT CẢ TASK — CHIA CHO 4 NGƯỜI

> Quy ước: **A** = Người A, **B** = Người B, **C** = Người C, **D** = Người D

---

### NHÓM 1 — DATABASE & MIGRATION (~16h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 1 | Viết `V1__users.sql` — bảng users, index email | DB | 0.5h | 🔴 | A |
| 2 | Viết `V1__leads.sql` — bảng leads, lead_activities, customers, audit_logs, index | DB | 1h | 🔴 | A |
| 3 | Viết `V2__plans.sql` — bảng service_plans | DB | 0.5h | 🔴 | B |
| 4 | Viết `V2__orders.sql` — bảng orders, payments, index | DB | 0.5h | 🔴 | B |
| 5 | Viết `V2__memberships.sql` — bảng memberships, pt_packages, index | DB | 0.5h | 🔴 | B |
| 6 | Viết `V3__trainers.sql` — bảng trainers, trainer_assignments | DB | 0.5h | 🔴 | C |
| 7 | Viết `V3__classes.sql` — bảng classes, class_sessions, index | DB | 0.5h | 🔴 | C |
| 8 | Viết `V3__bookings.sql` — bảng bookings (UNIQUE), pt_sessions (completion_ref), attendance | DB | 1h | 🔴 | C |
| 9 | Viết `V4__exercises.sql` — bảng exercises, index | DB | 0.5h | 🔴 | D |
| 10 | Viết `V4__workout_plans.sql` — bảng workout_plans, workout_plan_exercises | DB | 0.5h | 🔴 | D |
| 11 | Viết `V4__workout_logs.sql` — bảng workout_sessions, workout_logs, body_metrics | DB | 0.5h | 🔴 | D |
| 12 | Viết `V4__ai_tables.sql` — bảng ai_conversations, ai_messages, ai_recommendations (JSONB) | DB | 0.5h | 🔴 | D |

**DB tổng: A=1.5h, B=1.5h, C=2h, D=2h** ✅ đều

---

### NHÓM 2 — BACKEND AUTH & USER (~8h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 13 | `POST /api/auth/register` — BCrypt, tạo user, trả JWT | BE | 1h | 🔴 | A |
| 14 | `POST /api/auth/login` — verify, access(15m) + refresh(7d) | BE | 1h | 🔴 | A |
| 15 | `POST /api/auth/refresh` — access token mới từ refresh | BE | 0.5h | 🔴 | A |
| 16 | `POST /api/auth/logout` — Redis blacklist refresh token | BE | 0.5h | 🔴 | A |
| 17 | JwtAuthFilter — đọc Bearer, set SecurityContext | BE | 1h | 🔴 | A |
| 18 | @PreAuthorize RBAC — annotation trên controllers | BE | 0.5h | 🔴 | A |
| 19 | Global exception handler — JSON chuẩn, không leak | BE | 0.5h | 🔴 | A |
| 20 | `POST /api/auth/forgot-password` + `reset-password` | BE | 1h | 🟡 | B |
| 21 | `PUT /api/auth/change-password` | BE | 0.5h | 🔴 | B |
| 22 | `GET/POST/PATCH /api/users` (ADMIN) — CRUD users | BE | 1h | 🟡 | B |

**Auth/User BE: A=5h, B=2.5h** — A nặng hơn vì Auth là việc của A, nhưng được bù bằng các task khác

---

### NHÓM 3 — BACKEND CRM (~8h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 23 | `POST /api/leads` — tạo lead | BE | 0.5h | 🔴 | A |
| 24 | `GET /api/leads` — list + filter + search + pagination | BE | 1h | 🔴 | A |
| 25 | `GET /api/leads/:id` — detail + activities | BE | 0.5h | 🔴 | A |
| 26 | `PUT /api/leads/:id` + `PATCH /api/leads/:id/status` | BE | 0.5h | 🔴 | A |
| 27 | `POST /api/leads/:id/activities` + `PATCH assign` | BE | 0.5h | 🔴 | A |
| 28 | `POST /api/leads/:id/convert` — state machine + tạo Customer + User | BE | 2h | 🔴 | A |
| 29 | `PATCH /api/leads/:id/lost` | BE | 0.5h | 🔴 | A |
| 30 | `GET /api/customers` — list + filter | BE | 0.5h | 🔴 | B |
| 31 | `GET /api/customers/:id` — profile aggregate (join 4 module) | BE | 1h | 🔴 | B |
| 32 | `PUT /api/customers/:id` — edit | BE | 0.5h | 🔴 | B |
| 33 | AuditLogAspect — @Around @Auditable annotation | BE | 1h | 🟡 | C |

**CRM BE: A=6h, B=2h, C=1h**

---

### NHÓM 4 — BACKEND COMMERCE (~10h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 34 | `GET/POST/PUT/PATCH /api/plans` — CRUD plans | BE | 1h | 🔴 | B |
| 35 | `POST /api/orders` — server-side tính total, validate | BE | 1.5h | 🔴 | B |
| 36 | `GET /api/orders` + `GET /api/orders/me` + `GET /:id` | BE | 0.5h | 🔴 | B |
| 37 | `PATCH /api/orders/:id/cancel` | BE | 0.5h | 🔴 | B |
| 38 | `POST /api/payments` — process + trigger activation | BE | 1.5h | 🔴 | B |
| 39 | `POST /api/payments/callback` — idempotent webhook | BE | 1h | 🔴 | B |
| 40 | ServiceActivationService — MEMBERSHIP vs PT_PACKAGE | BE | 1h | 🔴 | B |
| 41 | MembershipValidator bean — `requireActive(customerId)` | BE | 0.5h | 🔴 | B |
| 42 | `GET/PATCH /api/memberships` — list, pause, resume, cancel | BE | 1.5h | 🔴 | C |
| 43 | `POST /api/memberships/:id/renew` + `GET /expiring` | BE | 0.5h | 🔴 | C |
| 44 | `GET /api/pt-packages/me` + `PATCH /:id/use` (idempotent) | BE | 1h | 🔴 | C |

**Commerce BE: B=7.5h, C=3h**

---

### NHÓM 5 — BACKEND OPERATIONS (~12h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 45 | `GET/POST/PUT /api/trainers` + assign customer | BE | 1h | 🔴 | C |
| 46 | `GET /api/trainers/:id/schedule` | BE | 0.5h | 🔴 | D |
| 47 | `GET/POST/PUT /api/classes` | BE | 0.5h | 🔴 | C |
| 48 | `GET/POST/PUT /api/sessions` + PATCH cancel | BE | 1h | 🔴 | C |
| 49 | `POST /api/bookings` — SELECT FOR UPDATE + capacity check | BE | 2h | 🔴 | C |
| 50 | `GET /api/bookings/me` + `GET /api/bookings` | BE | 0.5h | 🔴 | C |
| 51 | `PATCH /api/bookings/:id/cancel` + `no-show` | BE | 0.5h | 🔴 | C |
| 52 | `POST /api/checkin` — validate membership + tạo attendance | BE | 1h | 🔴 | D |
| 53 | `GET /api/attendance` + `GET /api/attendance/me` | BE | 0.5h | 🔴 | D |
| 54 | `POST /api/pt-sessions` — schedule PT, validate | BE | 1h | 🔴 | D |
| 55 | `GET /api/pt-sessions` + `PATCH reschedule/cancel` | BE | 0.5h | 🔴 | D |
| 56 | `PATCH /api/pt-sessions/:id/complete` — idempotent via completion_ref | BE | 1h | 🔴 | D |
| 57 | Cron job: auto-complete sessions sau end_time | BE | 0.5h | 🟡 | A |

**Operations BE: C=6h, D=3.5h, A=0.5h**

---

### NHÓM 6 — BACKEND WORKOUT & PROGRESS (~10h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 58 | `GET/POST/PUT /api/exercises` + seed 30 exercises | BE | 1h | 🔴 | D |
| 59 | `POST/GET/PUT /api/workout-plans` + PATCH activate/complete | BE | 2h | 🔴 | D |
| 60 | `POST /api/workout-sessions` + `PATCH complete` + `GET /me` | BE | 1h | 🔴 | D |
| 61 | `POST /api/workout-logs` + `GET /:id/logs` | BE | 1h | 🔴 | D |
| 62 | `POST/GET /api/body-metrics/me` | BE | 0.5h | 🔴 | A |
| 63 | `GET /api/progress/me` — workouts/month, streak, PRs, weekly freq | BE | 1.5h | 🔴 | A |
| 64 | `POST /api/ai/chat` proxy — auth → gọi ai-workout → lưu message | BE | 1h | 🔴 | B |
| 65 | `GET /api/ai/conversations/me` — load history | BE | 0.5h | 🔴 | B |
| 66 | `POST /api/ai/recommend` + `PATCH accept/dismiss` | BE | 1h | 🔴 | C |
| 67 | `GET /api/dashboard/stats` + `revenue-chart` + `crm-funnel` | BE | 1h | 🔴 | A |
| 68 | `GET /api/reports/sales` + `memberships` + `classes` | BE | 1h | 🟡 | B |

**Workout/Progress/AI BE: D=5.5h, A=3h, B=2.5h, C=1h**

---

### NHÓM 7 — FRONTEND PUBLIC PAGES (~10h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 69 | `/login` page — form + JWT cookie + redirect theo role | FE | 1.5h | 🔴 | A |
| 70 | `/register` page — form + role selector | FE | 1h | 🔴 | A |
| 71 | `AuthContext` + `ProtectedRoute` + `RoleGuard` + `middleware.ts` | FE | 1.5h | 🔴 | A |
| 72 | `/` landing page — Hero + features + CTA (đã có sẵn) | FE | 0.5h | 🔴 | B |
| 73 | `/plans` — 3 plan cards, features, price | FE | 1h | 🔴 | B |
| 74 | `/classes` — class grid + filter tabs | FE | 1h | 🔴 | C |

**Public FE: A=4h, B=1.5h, C=1h**

---

### NHÓM 8 — FRONTEND DASHBOARD AUTH/CRM (~10h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 75 | `/dashboard/leads` — filter tabs + search + table + score badge | FE | 2h | 🔴 | A |
| 76 | `/dashboard/leads/create` — form tạo lead | FE | 1h | 🔴 | A |
| 77 | `/dashboard/leads/[id]` — info card + timeline + add activity modal + actions | FE | 2h | 🔴 | A |
| 78 | `/dashboard/customers` — table với badges | FE | 1h | 🔴 | B |
| 79 | `/dashboard/customers/[id]` — 6 tabs: Overview/Membership/Bookings/Workouts/Payments/Activity | FE | 2h | 🔴 | B |
| 80 | `/dashboard/profile` — xem + edit + đổi password | FE | 1h | 🔴 | C |
| 81 | `/dashboard/users` (ADMIN) — list + change role + disable | FE | 1h | 🟡 | D |

**CRM FE: A=5h, B=3h, C=1h, D=1h**

---

### NHÓM 9 — FRONTEND DASHBOARD COMMERCE (~10h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 82 | `/dashboard/sales` — 4 KPI cards + transaction table | FE | 1.5h | 🔴 | B |
| 83 | `/dashboard/create-sale` — 3-step wizard | FE | 2h | 🔴 | B |
| 84 | `/dashboard/payment-confirmed` — success screen + receipt + countdown | FE | 1h | 🔴 | B |
| 85 | `/dashboard/plans` — table + toggle + create modal | FE | 1h | 🟡 | C |
| 86 | `/dashboard/member/payments` — membership card + payment history | FE | 1.5h | 🔴 | C |
| 87 | Membership status badge component (dùng chung) | FE | 0.5h | 🔴 | D |
| 88 | Renewal risk widget — expiring list + AI risk badge | FE | 1.5h | 🟡 | A |

**Commerce FE: B=4.5h, C=3h, D=0.5h, A=1.5h**

---

### NHÓM 10 — FRONTEND DASHBOARD OPERATIONS (~12h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 89 | `/dashboard/schedule` — 7-col weekly calendar + session cards màu theo type | FE | 2.5h | 🔴 | C |
| 90 | `/dashboard/bookings` — check-in strip + stats + table | FE | 2h | 🔴 | C |
| 91 | `/dashboard/trainer` — today timeline + clients list + PT management | FE | 2h | 🔴 | D |
| 92 | `/dashboard/member/book` — tabs Classes/PT + date strip + class cards | FE | 2h | 🔴 | D |
| 93 | Book confirmation modal component | FE | 0.5h | 🔴 | A |
| 94 | No-show prediction badge component | FE | 0.5h | 🟡 | B |
| 95 | Schedule AI suggestion banner | FE | 1h | 🟡 | C |

**Operations FE: C=5.5h, D=4h, A=0.5h, B=0.5h**

---

### NHÓM 11 — FRONTEND DASHBOARD WORKOUT/AI/PROGRESS (~12h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 96 | `/dashboard/workout-builder` — plan form + week tabs + day cards + exercise sidebar | FE | 2.5h | 🔴 | D |
| 97 | `/dashboard/member` — home: 3 cards + quick actions + activity feed | FE | 2h | 🔴 | A |
| 98 | `/dashboard/member/progress` — stats + pure CSS bar chart + PRs table + AI summary | FE | 2h | 🔴 | B |
| 99 | `/dashboard/member/ai-coach` — chat UI (bubbles + input + quick prompts + recommend card) | FE | 2h | 🔴 | C |
| 100 | `/dashboard` (Manager) — 4 KPI + CSS revenue chart + CRM funnel + occupancy | FE | 2h | 🔴 | D |
| 101 | `/dashboard/reports` — tabs Sales/Members/Classes | FE | 1h | 🟡 | A |

**Workout/AI FE: D=4.5h, A=3h, B=2h, C=2h**

---

### NHÓM 12 — AI SERVICE (MỖI NGƯỜI 1 SERVICE) (~20h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 102 | `ai-crm/` — setup FastAPI app, schemas, main.py | AI | 0.5h | 🔴 | A |
| 103 | `ai-crm/ POST /score-lead` — rule-based scoring (source + goal + contact) | AI | 1h | 🔴 | A |
| 104 | `ai-crm/ POST /suggest-followup` — LLM gợi ý next action | AI | 1.5h | 🔴 | A |
| 105 | `ai-crm/ POST /conversion-tips` — LLM tips để convert lead | AI | 1h | 🟡 | A |
| 106 | `ai-commerce/` — setup FastAPI app | AI | 0.5h | 🔴 | B |
| 107 | `ai-commerce/ POST /predict-renewal` — rule-based churn probability | AI | 1h | 🔴 | B |
| 108 | `ai-commerce/ POST /renewal-action` — LLM suggest retention action | AI | 1.5h | 🔴 | B |
| 109 | `ai-commerce/ POST /suggest-upsell` — LLM suggest upgrade plan | AI | 1h | 🟡 | B |
| 110 | `ai-operations/` — setup FastAPI app | AI | 0.5h | 🔴 | C |
| 111 | `ai-operations/ POST /predict-noshow` — rule-based no-show probability | AI | 1h | 🔴 | C |
| 112 | `ai-operations/ POST /suggest-schedule` — LLM optimize class schedule | AI | 1.5h | 🔴 | C |
| 113 | `ai-operations/ POST /trainer-tips` — LLM coaching advice cho trainer | AI | 1h | 🟡 | C |
| 114 | `ai-workout/` — setup FastAPI app + safety_filter.py | AI | 1h | 🔴 | D |
| 115 | `ai-workout/ services/context_loader.py` — load customer fitness data từ DB | AI | 1.5h | 🔴 | D |
| 116 | `ai-workout/ POST /chat` — safety check + context inject + OpenAI call | AI | 1.5h | 🔴 | D |
| 117 | `ai-workout/ POST /recommend` — analyze logs → suggest workout changes | AI | 1.5h | 🔴 | D |
| 118 | `ai-workout/ POST /progress-summary` — LLM narrative summary | AI | 1h | 🟡 | D |

**AI: A=4h, B=4h, C=4h, D=6.5h** → D nặng hơn nhưng được bù bằng ít BE/FE hơn

---

### NHÓM 13 — OPS: DOCKERFILE (~6h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 119 | `backend/Dockerfile` — multi-stage Java 21 | OPS | 0.5h | 🔴 | D |
| 120 | `frontend/Dockerfile` — multi-stage Next.js standalone | OPS | 0.5h | 🔴 | B |
| 121 | `ai-crm/Dockerfile` — Python slim | OPS | 0.5h | 🔴 | A |
| 122 | `ai-commerce/Dockerfile` — Python slim | OPS | 0.5h | 🔴 | B |
| 123 | `ai-operations/Dockerfile` — Python slim | OPS | 0.5h | 🔴 | C |
| 124 | `ai-workout/Dockerfile` — Python slim | OPS | 0.5h | 🔴 | D |
| 125 | `.env.example` — tất cả variables đầy đủ | OPS | 0.5h | 🔴 | A |
| 126 | `docker-compose.yml` phần postgres + redis (infra) | OPS | 0.5h | 🔴 | C |
| 127 | `docker-compose.yml` phần 4 services (backend/frontend/ai×4) | OPS | 1h | 🔴 | C |
| 128 | `Makefile` — make up/down/migrate/seed | OPS | 0.5h | 🟡 | D |

**OPS Dockerfile: A=1h, B=1h, C=2h, D=2h**

---

### NHÓM 14 — OPS: CI/CD (~8h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 129 | `.github/workflows/ci-backend.yml` — mvn test + build | OPS | 1h | 🔴 | A |
| 130 | `.github/workflows/ci-frontend.yml` — npm build | OPS | 0.5h | 🔴 | B |
| 131 | `.github/workflows/ci-ai-crm.yml` — pytest ai-crm | OPS | 0.5h | 🔴 | A |
| 132 | `.github/workflows/ci-ai-commerce.yml` — pytest ai-commerce | OPS | 0.5h | 🔴 | B |
| 133 | `.github/workflows/ci-ai-operations.yml` — pytest ai-operations | OPS | 0.5h | 🔴 | C |
| 134 | `.github/workflows/ci-ai-workout.yml` — pytest ai-workout | OPS | 0.5h | 🔴 | D |
| 135 | `.github/workflows/ci-integration.yml` — integration test với real DB | OPS | 1h | 🔴 | C |
| 136 | `.github/workflows/cd-deploy.yml` — build+push images+deploy | OPS | 1.5h | 🔴 | D |
| 137 | Deploy backend lên Railway/Render | OPS | 1h | 🔴 | D |
| 138 | Deploy frontend lên Vercel/Railway | OPS | 0.5h | 🔴 | B |
| 139 | Deploy ai-workout lên Railway | OPS | 0.5h | 🔴 | D |

**CI/CD: A=1.5h, B=1.5h, C=2h, D=4h**

---

### NHÓM 15 — TESTING (~12h tổng)

| # | Task | Layer | Giờ | Prio | Người |
|---|------|-------|-----|------|-------|
| 140 | Unit test AuthService (5 cases) | BE | 0.5h | 🔴 | A |
| 141 | Unit test LeadService — convert, lost, score | BE | 0.5h | 🔴 | A |
| 142 | Unit test OrderService — pricing, discount | BE | 0.5h | 🔴 | B |
| 143 | Unit test PaymentService — idempotency | BE | 0.5h | 🔴 | B |
| 144 | Unit test MembershipService — pause/resume date | BE | 0.5h | 🔴 | B |
| 145 | Unit test BookingService — capacity, duplicate | BE | 0.5h | 🔴 | C |
| 146 | **Concurrency test** BookingService — 2 req cùng slot cuối | BE | 1h | 🔴 | C |
| 147 | Unit test PT complete idempotent | BE | 0.5h | 🔴 | C |
| 148 | Unit test WorkoutPlanService — activate, complete | BE | 0.5h | 🔴 | D |
| 149 | Unit test progress computation (streak, PRs) | BE | 0.5h | 🔴 | D |
| 150 | Python test ai-crm: score ranges, edge cases | AI | 0.5h | 🔴 | A |
| 151 | Python test ai-commerce: renewal probability range | AI | 0.5h | 🔴 | B |
| 152 | Python test ai-operations: noshow probability | AI | 0.5h | 🔴 | C |
| 153 | Python test ai-workout: safety_filter block medical | AI | 0.5h | 🔴 | D |
| 154 | Python test ai-workout: context_loader no data leak | AI | 0.5h | 🔴 | D |
| 155 | Integration test: Register→Login→Lead→Convert→Customer | BE | 1h | 🔴 | A |
| 156 | Integration test: Order→Payment→Membership ACTIVE | BE | 1h | 🔴 | B |
| 157 | Integration test: Book→Checkin→Attendance | BE | 1h | 🔴 | C |
| 158 | Integration test: Workout→Log→Progress computed | BE | 1h | 🔴 | D |

**Testing: A=2.5h, B=2.5h, C=3h, D=3h**

---

## TỔNG KẾT GIỜ MỖI NGƯỜI

| Nhóm task | A | B | C | D |
|-----------|---|---|---|---|
| DB migration | 1.5h | 1.5h | 2h | 2h |
| BE Auth/User | 5h | 2.5h | — | — |
| BE CRM | 6h | 2h | 1h | — |
| BE Commerce | — | 7.5h | 3h | — |
| BE Operations | 0.5h | — | 6h | 3.5h |
| BE Workout/Progress/AI | 3h | 2.5h | 1h | 5.5h |
| FE Public | 4h | 1.5h | 1h | — |
| FE Auth/CRM | 5h | 3h | 1h | 1h |
| FE Commerce | 1.5h | 4.5h | 3h | 0.5h |
| FE Operations | 0.5h | 0.5h | 5.5h | 4h |
| FE Workout/AI | 3h | 2h | 2h | 4.5h |
| AI service | 4h | 4h | 4h | 6.5h |
| OPS Dockerfile | 1h | 1h | 2h | 2h |
| OPS CI/CD | 1.5h | 1.5h | 2h | 4h |
| Testing | 2.5h | 2.5h | 3h | 3h |
| **TỔNG** | **~39h** | **~40.5h** | **~36.5h** | **~36h** |

> ⚠️ Còn dư ~15-20h/người cho: debug, review code, refactor, demo prep, nice-to-have tasks 🟡

---

## LAYER CHECK — MỖI NGƯỜI CÓ ĐỦ 5 LAYER

| Layer | A | B | C | D |
|-------|---|---|---|---|
| **DB** | V1 users+leads | V2 plans+orders+memberships | V3 trainers+bookings | V4 workout+ai |
| **BE** | Auth JWT + CRM convert | Order pricing + Payment idempotency | Booking concurrency + check-in | Workout + Progress + AI proxy |
| **FE** | /login /leads /member-home | /plans /create-sale /progress | /schedule /bookings /ai-coach | /workout-builder /trainer /dashboard |
| **AI** | ai-crm/ scoring + followup | ai-commerce/ renewal + upsell | ai-operations/ noshow + schedule | ai-workout/ chat + context + safety |
| **OPS** | ai-crm Dockerfile + CI backend | frontend Dockerfile + CI + deploy FE | docker-compose infra + CI integration | backend Dockerfile + CD pipeline + deploy |

✅ Mỗi người có đủ cả 5 layer

---

## TIMELINE 5 TUẦN

```
TUẦN 1 — Foundation
  Tất cả: viết DB migration của mình + setup AI service + OPS cơ bản
  A ưu tiên: Auth API xong trong 3 ngày đầu → B,C,D dùng được JWT

TUẦN 2 — Core BE + FE
  A: CRM lead CRUD + /login /register
  B: Order + Payment + /plans /create-sale
  C: Sessions + Booking + /schedule
  D: Workout Plan + AI chat endpoint + /workout-builder

TUẦN 3 — Complete + Integrate
  A: Customer detail + Member home FE
  B: Membership lifecycle + /member/payments
  C: Check-in + PT + /bookings /member/book
  D: Progress + AI recommend + /ai-coach /progress

TUẦN 4 — Test + Fix
  Tất cả: viết unit tests + integration tests + fix bugs

TUẦN 5 — Deploy + Polish
  A: deploy + nice-to-have (reports, renewal widget)
  B: deploy FE + upsell AI
  C: deploy + schedule AI banner
  D: deploy + CD pipeline hoàn chỉnh
```

---

## CÂU HỎI VẤND ĐÁP — MỖI NGƯỜI PHẢI TRẢ LỜI ĐƯỢC

### Người A
1. JWT access + refresh token khác nhau thế nào? Tại sao cần 2?
2. Redis blacklist logout — không có Redis thì làm thế nào?
3. Lead state machine: tại sao NEW không convert được thẳng?
4. Convert lead tạo ra những record nào trong DB?
5. lead_score tính thế nào trong Python service của mày?
6. CI job test-backend chạy với DB thật hay mock?

### Người B
1. Tại sao total phải tính server-side?
2. `reference UNIQUE` trong payments giải quyết vấn đề gì? DB-level vs app-level?
3. Membership pause/resume: end_date tính thế nào?
4. Service activation tách khỏi payment — tại sao không gộp?
5. renewal_probability tính thế nào? Input là gì?
6. Multi-stage Dockerfile Next.js — 2 stage làm gì?

### Người C
1. Concurrency problem trong booking: xảy ra thế nào?
2. SELECT FOR UPDATE là gì? Transaction isolation level nào?
3. Tại sao cần cả SELECT FOR UPDATE lẫn UNIQUE constraint?
4. booked_count denormalized — consistency risk là gì?
5. PT complete idempotent với completion_ref — explain toàn bộ flow
6. no-show probability: input nào ảnh hưởng nhiều nhất?

### Người D
1. Context injection: tại sao cần load DB data trước khi gọi OpenAI?
2. Safety filter: keyword matching hay LLM? Ưu nhược điểm?
3. JSONB cho suggested_changes — parse thế nào khi ACCEPT?
4. Streak calculation algorithm: edge cases nào?
5. Personal records SQL: GROUP BY + MAX thế nào?
6. CD pipeline: push lên main → production xảy ra từng bước gì?

---

*Version 6.0 — 158 tasks, chia đều ~39-41h/người (chưa tính debug buffer), đủ 5 layer mỗi người*
