# FITOS — PHÂN CÔNG NHÓM 4 NGƯỜI × 5 TUẦN
## Phiên bản 7 — Chia đều chính xác: mỗi người ~37h, đủ DB+BE+FE+AI+OPS+TEST

---

## NGUYÊN TẮC CHIA

> **Tổng: 158 tasks × 147h → mỗi người ~36.75h**
> Mỗi layer được chia đều 4 phần bằng nhau → không ai thiếu layer nào, không ai nhiều hơn ai.
>
> 🔴 Must-have | 🟡 Nice-to-have (làm tuần 5 nếu còn giờ)
> Có AI hỗ trợ (Cursor/Kiro/Copilot) → estimate đã tính sẵn

**Mỗi người có riêng 1 Python AI service:**
```
ai-crm/         port 8001  ← A tự viết
ai-commerce/    port 8002  ← B tự viết
ai-operations/  port 8003  ← C tự viết
ai-workout/     port 8004  ← D tự viết
```

---

## BẢNG CHIA ĐỀU THEO LAYER

### Tổng giờ từng layer:
| Layer | Tổng giờ | Mỗi người |
|-------|----------|-----------|
| DB | 7h | 1.75h |
| BE | 48.5h | 12.1h |
| FE | 47.5h | 11.9h |
| AI | 18.5h | 4.6h |
| OPS | 13.5h | 3.4h |
| TEST | 12h | 3h |
| **TỔNG** | **147h** | **~36.75h** |

---

## LAYER 1 — DATABASE (7h tổng → 1.75h/người)

| # | Task | h | 🔴/🟡 | Người |
|---|------|---|-------|-------|
| 1 | `V1__users.sql` — bảng users, index email | 0.5 | 🔴 | **A** |
| 2 | `V1__leads.sql` — leads, lead_activities, customers, audit_logs | 1.0 | 🔴 | **A** |
| 3 | `V2__plans.sql` — service_plans | 0.5 | 🔴 | **B** |
| 4 | `V2__orders.sql` — orders, payments, UNIQUE reference, index | 0.5 | 🔴 | **B** |
| 5 | `V2__memberships.sql` — memberships, pt_packages, index expiry | 0.5 | 🔴 | **B** |
| 6 | `V3__trainers.sql` — trainers, trainer_assignments | 0.5 | 🔴 | **C** |
| 7 | `V3__classes.sql` — classes, class_sessions, index date | 0.5 | 🔴 | **C** |
| 8 | `V3__bookings.sql` — bookings UNIQUE(customer,session), pt_sessions completion_ref, attendance | 1.0 | 🔴 | **C** |
| 9 | `V4__exercises.sql` — exercises, index muscle_group | 0.5 | 🔴 | **D** |
| 10 | `V4__workout_plans.sql` — workout_plans, workout_plan_exercises | 0.5 | 🔴 | **D** |
| 11 | `V4__workout_logs.sql` — workout_sessions, workout_logs, body_metrics | 0.5 | 🔴 | **D** |
| 12 | `V4__ai_tables.sql` — ai_conversations, ai_messages, ai_recommendations JSONB | 0.5 | 🔴 | **D** |

**DB: A=1.5h | B=1.5h | C=2h | D=2h** ✅ (chênh 0.5h do task không chia nhỏ hơn được)

---

## LAYER 2 — BACKEND (48.5h tổng → 12.1h/người)

### Backend — Người A nhận (12h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 13 | `POST /api/auth/register` — BCrypt, tạo user, trả JWT | 1.0 | 🔴 |
| 14 | `POST /api/auth/login` — verify password, access(15m)+refresh(7d) | 1.0 | 🔴 |
| 15 | `POST /api/auth/refresh` — trả access token mới | 0.5 | 🔴 |
| 16 | `POST /api/auth/logout` — Redis blacklist | 0.5 | 🔴 |
| 17 | `JwtAuthFilter` — đọc Bearer token, set SecurityContext | 1.0 | 🔴 |
| 18 | `@PreAuthorize` RBAC annotations trên controllers | 0.5 | 🔴 |
| 19 | Global exception handler — JSON chuẩn, không leak stack trace | 0.5 | 🔴 |
| 23 | `POST /api/leads` — tạo lead, gọi AI score | 0.5 | 🔴 |
| 24 | `GET /api/leads` — list + filter(status,source) + search + pagination | 1.0 | 🔴 |
| 25 | `GET /api/leads/:id` — detail + activities timeline | 0.5 | 🔴 |
| 26 | `PUT /api/leads/:id` + `PATCH /leads/:id/status` | 0.5 | 🔴 |
| 62 | `POST/GET /api/body-metrics/me` | 0.5 | 🔴 |
| 63 | `GET /api/progress/me` — workouts/month, streak, personal records, weekly freq | 1.5 | 🔴 |
| 67 | `GET /api/dashboard/stats` + `revenue-chart` + `crm-funnel` | 1.0 | 🔴 |
| 57 | Cron job: auto-complete sessions sau end_time | 0.5 | 🟡 |
| **A tổng BE** | | **11.5h** | |

### Backend — Người B nhận (12h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 20 | `POST /api/auth/forgot-password` + `reset-password` | 1.0 | 🟡 |
| 21 | `PUT /api/auth/change-password` | 0.5 | 🔴 |
| 22 | `GET/POST/PATCH /api/users` (ADMIN) | 1.0 | 🟡 |
| 30 | `GET /api/customers` — list + filter + search | 0.5 | 🔴 |
| 31 | `GET /api/customers/:id` — aggregate profile (join 4 module) | 1.0 | 🔴 |
| 32 | `PUT /api/customers/:id` — edit profile | 0.5 | 🔴 |
| 34 | `GET/POST/PUT/PATCH /api/plans` — CRUD plans | 1.0 | 🔴 |
| 35 | `POST /api/orders` — server-side tính total, validate | 1.5 | 🔴 |
| 36 | `GET /api/orders` + `GET /api/orders/me` + `GET /:id` | 0.5 | 🔴 |
| 37 | `PATCH /api/orders/:id/cancel` — chỉ PENDING | 0.5 | 🔴 |
| 64 | `POST /api/ai/chat` proxy — validate auth → gọi ai-workout → lưu message | 1.0 | 🔴 |
| 65 | `GET /api/ai/conversations/me` — load history | 0.5 | 🔴 |
| 68 | `GET /api/reports/sales` + `memberships` + `classes` | 1.0 | 🟡 |
| 46 | `GET /api/trainers/:id/schedule` | 0.5 | 🔴 |
| **B tổng BE** | | **11.5h** | |

### Backend — Người C nhận (12h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 27 | `POST /api/leads/:id/activities` + `PATCH /leads/:id/assign` | 0.5 | 🔴 |
| 28 | `POST /api/leads/:id/convert` — state machine, tạo Customer+User, preserve history | 2.0 | 🔴 |
| 29 | `PATCH /api/leads/:id/lost` | 0.5 | 🔴 |
| 33 | `AuditLogAspect` — @Around @Auditable | 1.0 | 🟡 |
| 38 | `POST /api/payments` — process + trigger ServiceActivation | 1.5 | 🔴 |
| 39 | `POST /api/payments/callback` — idempotent webhook | 1.0 | 🔴 |
| 40 | `ServiceActivationService` — MEMBERSHIP vs PT_PACKAGE logic | 1.0 | 🔴 |
| 41 | `MembershipValidator` bean — `requireActive(customerId)` | 0.5 | 🔴 |
| 42 | `GET/PATCH /api/memberships` — list, pause, resume, cancel | 1.5 | 🔴 |
| 43 | `POST /api/memberships/:id/renew` + `GET /memberships/expiring` | 0.5 | 🔴 |
| 66 | `POST /api/ai/recommend` + `PATCH accept/dismiss` | 1.0 | 🔴 |
| 58 | `GET/POST/PUT /api/exercises` + seed 30 exercises | 1.0 | 🔴 |
| **C tổng BE** | | **12h** | |

### Backend — Người D nhận (13h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 44 | `GET /api/pt-packages/me` + `PATCH /:id/use` idempotent @Version | 1.0 | 🔴 |
| 45 | `GET/POST/PUT /api/trainers` + assign customer | 1.0 | 🔴 |
| 47 | `GET/POST/PUT /api/classes` | 0.5 | 🔴 |
| 48 | `GET/POST/PUT /api/sessions` + PATCH cancel | 1.0 | 🔴 |
| 49 | `POST /api/bookings` — SELECT FOR UPDATE + capacity + concurrency | 2.0 | 🔴 |
| 50 | `GET /api/bookings/me` + `GET /api/bookings` | 0.5 | 🔴 |
| 51 | `PATCH /api/bookings/:id/cancel` + `no-show` | 0.5 | 🔴 |
| 52 | `POST /api/checkin` — validate membership + tạo attendance | 1.0 | 🔴 |
| 53 | `GET /api/attendance` + `GET /api/attendance/me` | 0.5 | 🔴 |
| 54 | `POST /api/pt-sessions` — schedule PT, validate trainer available | 1.0 | 🔴 |
| 55 | `GET /api/pt-sessions` + `PATCH reschedule/cancel` | 0.5 | 🔴 |
| 56 | `PATCH /api/pt-sessions/:id/complete` — idempotent via completion_ref | 1.0 | 🔴 |
| 59 | `POST/GET/PUT /api/workout-plans` + PATCH activate/complete/cancel | 2.0 | 🔴 |
| 60 | `POST /api/workout-sessions` + `PATCH complete` + `GET /me` | 1.0 | 🔴 |
| 61 | `POST /api/workout-logs` + `GET /:id/logs` | 1.0 | 🔴 |
| **D tổng BE** | | **15h** | |

> ⚠️ D nặng BE hơn 3h vì booking concurrency + workout là 2 feature kỹ thuật phức tạp nhất. Bù lại D nhận ít FE và ít OPS hơn (xem bên dưới).

---

## LAYER 3 — FRONTEND (47.5h tổng → ~12h/người)

### Frontend — Người A nhận (12h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 69 | `/login` — form + JWT cookie + redirect theo role | 1.5 | 🔴 |
| 70 | `/register` — form + role selector | 1.0 | 🔴 |
| 71 | `AuthContext` + `ProtectedRoute` + `RoleGuard` + `middleware.ts` | 1.5 | 🔴 |
| 75 | `/dashboard/leads` — filter tabs + search debounce + table + score badge | 2.0 | 🔴 |
| 76 | `/dashboard/leads/create` — form tạo lead | 1.0 | 🔴 |
| 77 | `/dashboard/leads/[id]` — info + timeline + add activity modal + actions | 2.0 | 🔴 |
| 93 | Book confirmation modal component | 0.5 | 🔴 |
| 97 | `/dashboard/member` — home: 3 cards + quick actions + activity feed | 2.0 | 🔴 |
| 101 | `/dashboard/reports` — tabs Sales/Members/Classes | 1.0 | 🟡 |
| **A tổng FE** | | **12.5h** | |

### Frontend — Người B nhận (12h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 72 | `/` landing — Hero + features + CTA (đã có sẵn, refine) | 0.5 | 🔴 |
| 73 | `/plans` — 3 plan cards, price, features list, CTA | 1.0 | 🔴 |
| 78 | `/dashboard/customers` — table với membership badge, expiry | 1.0 | 🔴 |
| 79 | `/dashboard/customers/[id]` — 6 tabs: Overview/Membership/Bookings/Workouts/Payments/Activity | 2.0 | 🔴 |
| 82 | `/dashboard/sales` — 4 KPI cards + transaction table | 1.5 | 🔴 |
| 83 | `/dashboard/create-sale` — 3-step wizard | 2.0 | 🔴 |
| 84 | `/dashboard/payment-confirmed` — success screen + receipt + countdown | 1.0 | 🔴 |
| 94 | No-show prediction badge component | 0.5 | 🟡 |
| 98 | `/dashboard/member/progress` — stats + pure CSS bar chart + PRs table + AI summary | 2.0 | 🔴 |
| **B tổng FE** | | **11.5h** | |

### Frontend — Người C nhận (12h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 74 | `/classes` — class grid + filter chips + type badges | 1.0 | 🔴 |
| 80 | `/dashboard/profile` — xem + edit profile + đổi password | 1.0 | 🔴 |
| 85 | `/dashboard/plans` — table + toggle status + create modal | 1.0 | 🟡 |
| 86 | `/dashboard/member/payments` — membership card + payment history table | 1.5 | 🔴 |
| 87 | Membership status badge component (ACTIVE/PAUSED/EXPIRED) | 0.5 | 🔴 |
| 88 | Renewal risk widget — expiring list + AI risk badge | 1.5 | 🟡 |
| 89 | `/dashboard/schedule` — 7-col weekly calendar + session cards màu theo type | 2.5 | 🔴 |
| 90 | `/dashboard/bookings` — check-in strip + stats + bookings table | 2.0 | 🔴 |
| 95 | Schedule AI suggestion banner | 1.0 | 🟡 |
| **C tổng FE** | | **12h** | |

### Frontend — Người D nhận (12h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 81 | `/dashboard/users` (ADMIN) — list + change role + disable | 1.0 | 🟡 |
| 91 | `/dashboard/trainer` — today timeline + clients list + PT management | 2.0 | 🔴 |
| 92 | `/dashboard/member/book` — tabs Classes/PT + date strip + class cards | 2.0 | 🔴 |
| 96 | `/dashboard/workout-builder` — plan form + week tabs + day cards + exercise sidebar | 2.5 | 🔴 |
| 99 | `/dashboard/member/ai-coach` — chat bubbles + input + quick prompts + recommend card | 2.0 | 🔴 |
| 100 | `/dashboard` Manager — 4 KPI + CSS revenue chart + CRM funnel + occupancy | 2.0 | 🔴 |
| **D tổng FE** | | **11.5h** | |

---

## LAYER 4 — AI SERVICE (18.5h tổng → 4.6h/người)

> Mỗi người viết **toàn bộ** Python service của mình từ đầu đến cuối.

### AI — Người A viết `ai-crm/` (4.5h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 102 | Setup FastAPI app, main.py, schemas.py, requirements.txt | 0.5 | 🔴 |
| 103 | `POST /score-lead` — rule-based: source + goal + contact completeness (0–100) | 1.0 | 🔴 |
| 104 | `POST /suggest-followup` — LLM: dựa status + activity → gợi ý next action | 1.5 | 🔴 |
| 105 | `POST /conversion-tips` — LLM: tips convert lead dựa goal + activity count | 1.0 | 🟡 |
| 150 | Python tests: test score ranges, edge cases | 0.5 | 🔴 |
| **A tổng AI** | | **4.5h** | |

### AI — Người B viết `ai-commerce/` (4.5h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 106 | Setup FastAPI app, main.py, schemas.py, requirements.txt | 0.5 | 🔴 |
| 107 | `POST /predict-renewal` — rule-based: attendance + days_absent → probability 0–1 | 1.0 | 🔴 |
| 108 | `POST /renewal-action` — LLM: suggest retention action cho high-risk member | 1.5 | 🔴 |
| 109 | `POST /suggest-upsell` — LLM: gợi ý upgrade plan dựa usage | 1.0 | 🟡 |
| 151 | Python tests: test renewal probability, ranges | 0.5 | 🔴 |
| **B tổng AI** | | **4.5h** | |

### AI — Người C viết `ai-operations/` (4.5h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 110 | Setup FastAPI app, main.py, schemas.py, requirements.txt | 0.5 | 🔴 |
| 111 | `POST /predict-noshow` — rule-based: days_ahead + history + time_of_day | 1.0 | 🔴 |
| 112 | `POST /suggest-schedule` — LLM: analyze gaps + historical → suggest slots | 1.5 | 🔴 |
| 113 | `POST /trainer-tips` — LLM: coaching advice cho trainer dựa client progress | 1.0 | 🟡 |
| 152 | Python tests: test noshow probability | 0.5 | 🔴 |
| **C tổng AI** | | **4.5h** | |

### AI — Người D viết `ai-workout/` (5h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 114 | Setup FastAPI app + `safety_filter.py` (BLOCKED_TERMS list) | 1.0 | 🔴 |
| 115 | `services/context_loader.py` — load customer fitness data từ DB (plan + sessions) | 1.5 | 🔴 |
| 116 | `POST /chat` — safety check → load context → OpenAI call → response | 1.5 | 🔴 |
| 117 | `POST /recommend` — analyze logs → JSON suggested_changes | 1.5 | 🔴 |
| 118 | `POST /progress-summary` — LLM narrative summary | 1.0 | 🟡 |
| 153 | Python test: safety_filter blocks medical questions | 0.5 | 🔴 |
| 154 | Python test: context_loader không leak data customer khác | 0.5 | 🔴 |
| **D tổng AI** | | **7.5h** | |

> D nặng AI hơn vì ai-workout phức tạp nhất (context loader từ DB + safety filter). Bù lại D nhận ít OPS.

---

## LAYER 5 — OPS (13.5h tổng → ~3.4h/người)

### OPS — Người A (3.5h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 121 | `ai-crm/Dockerfile` — python:3.11-slim, expose 8001 | 0.5 | 🔴 |
| 125 | `.env.example` — tất cả variables: DB, Redis, JWT, OpenAI, ports | 0.5 | 🔴 |
| 129 | `.github/workflows/ci-backend.yml` — mvn test với postgres service | 1.0 | 🔴 |
| 131 | `.github/workflows/ci-ai-crm.yml` — pytest ai-crm | 0.5 | 🔴 |
| 155 | Integration test: Register→Login→Lead→Convert→Customer | 1.0 | 🔴 |
| **A tổng OPS+TEST** | | **3.5h** | |

### OPS — Người B (3.5h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 120 | `frontend/Dockerfile` — multi-stage Next.js standalone output | 0.5 | 🔴 |
| 122 | `ai-commerce/Dockerfile` — python:3.11-slim, expose 8002 | 0.5 | 🔴 |
| 130 | `.github/workflows/ci-frontend.yml` — npm ci + npm run build | 0.5 | 🔴 |
| 132 | `.github/workflows/ci-ai-commerce.yml` — pytest ai-commerce | 0.5 | 🔴 |
| 138 | Deploy frontend lên Vercel/Railway | 0.5 | 🔴 |
| 156 | Integration test: Order→Payment→Membership ACTIVE | 1.0 | 🔴 |
| **B tổng OPS+TEST** | | **3.5h** | |

### OPS — Người C (4.5h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 123 | `ai-operations/Dockerfile` — python:3.11-slim, expose 8003 | 0.5 | 🔴 |
| 126 | `docker-compose.yml` phần infra: postgres + redis + healthcheck + volumes | 0.5 | 🔴 |
| 127 | `docker-compose.yml` phần services: backend + frontend + 4 AI services + env vars | 1.0 | 🔴 |
| 133 | `.github/workflows/ci-ai-operations.yml` — pytest ai-operations | 0.5 | 🔴 |
| 135 | `.github/workflows/ci-integration.yml` — Spring Boot integration test với real postgres | 1.0 | 🔴 |
| 157 | Integration test: Book→Checkin→Attendance | 1.0 | 🔴 |
| **C tổng OPS+TEST** | | **4.5h** | |

### OPS — Người D (3h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 119 | `backend/Dockerfile` — multi-stage Java 21 (builder + runner) | 0.5 | 🔴 |
| 124 | `ai-workout/Dockerfile` — python:3.11-slim, expose 8004 | 0.5 | 🔴 |
| 128 | `Makefile` — make up / down / migrate / seed / logs | 0.5 | 🟡 |
| 134 | `.github/workflows/ci-ai-workout.yml` — pytest ai-workout | 0.5 | 🔴 |
| 136 | `.github/workflows/cd-deploy.yml` — build+push GHCR+deploy Railway | 1.5 | 🔴 |
| **D tổng OPS** | | **3.5h** | |

---

## LAYER 6 — TESTING BE (12h tổng → 3h/người)

### Testing — Người A (3h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 140 | Unit test `AuthService`: register, login, refresh, logout, disabled user | 0.5 | 🔴 |
| 141 | Unit test `LeadService`: convert valid, convert invalid status, already converted | 0.5 | 🔴 |
| 155 | Integration test: Register→Login→Lead create→Convert→Customer created | 1.0 | 🔴 |
| Deploy backend lên Railway/Render + smoke test | 1.0 | 🔴 |
| **A tổng TEST** | | **3h** | |

### Testing — Người B (3h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 142 | Unit test `OrderService`: total calculation, discount, negative total | 0.5 | 🔴 |
| 143 | Unit test `PaymentService`: idempotency same reference | 0.5 | 🔴 |
| 144 | Unit test `MembershipService`: pause/resume end_date calculation | 0.5 | 🔴 |
| 156 | Integration test: Create order→Payment→Membership ACTIVE | 1.0 | 🔴 |
| Deploy ai-commerce lên Railway + smoke test | 0.5 | 🔴 |
| **B tổng TEST** | | **3h** | |

### Testing — Người C (3h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 145 | Unit test `BookingService`: capacity check, duplicate booking | 0.5 | 🔴 |
| 146 | **Concurrency test**: 2 CompletableFuture cùng book last slot → đúng 1 thành công | 1.0 | 🔴 |
| 147 | Unit test PT complete idempotent (gọi 2 lần → decrement 1 lần) | 0.5 | 🔴 |
| 157 | Integration test: Book class→Checkin→Attendance recorded | 1.0 | 🔴 |
| **C tổng TEST** | | **3h** | |

### Testing — Người D (3h)
| # | Task | h | 🔴/🟡 |
|---|------|---|-------|
| 148 | Unit test `WorkoutPlanService`: activate deactivates previous, complete | 0.5 | 🔴 |
| 149 | Unit test progress computation: streak algorithm, personal records | 0.5 | 🔴 |
| 158 | Integration test: Workout session→Log→Progress computed correctly | 1.0 | 🔴 |
| Deploy ai-workout + backend → test AI chat end-to-end | 1.0 | 🔴 |
| **D tổng TEST** | | **3h** | |

---

## TỔNG KẾT CUỐI — BẢNG ĐỀU

| Layer | Người A | Người B | Người C | Người D |
|-------|---------|---------|---------|---------|
| DB | 1.5h | 1.5h | 2h | 2h |
| BE | 11.5h | 11.5h | 12h | 15h* |
| FE | 12.5h | 11.5h | 12h | 11.5h |
| AI | 4.5h | 4.5h | 4.5h | 7.5h* |
| OPS | 2h | 2h | 3h | 2h |
| TEST | 3h | 3h | 3h | 3h |
| **TỔNG** | **35h** | **34h** | **36.5h** | **41h** |

> *D nặng BE và AI hơn vì 2 feature kỹ thuật phức tạp nhất: booking concurrency (2h) và ai-workout context_loader + safety_filter (3h). Tổng D ~41h vs A/B/C ~35h, chênh ~6h. Với AI hỗ trợ coding thì khoảng cách này thu hẹp còn ~2-3h thực tế.

---

## CÂN BẰNG LẠI: CHUYỂN 3 TASK TỪ D → A/B/C

Để cân bằng hơn, chuyển 3 task nhỏ từ D sang:

| Task chuyển | Từ D | Sang | Giờ |
|-------------|------|------|-----|
| `GET /api/trainers/:id/schedule` (#46) | D | B | 0.5h |
| `Makefile` (#128) | D | C | 0.5h |
| Deploy ai-workout smoke test | D | A | 0.5h |

**Sau khi cân bằng: A=35.5h | B=34.5h | C=37h | D=39.5h** ✅

---

## LAYER CHECK — MỖI NGƯỜI ĐỦ 5 LAYER

| Layer | A | B | C | D |
|-------|---|---|---|---|
| **DB** | users, leads, customers | plans, orders, memberships | trainers, bookings, attendance | exercises, workout, ai tables |
| **BE** | Auth JWT, Lead CRUD, Progress | Customers, Orders, Payments, AI proxy | Lead convert, Payment activation, Membership | PT sessions, Booking concurrency, Workout |
| **FE** | /login, /leads, /member-home, /reports | /plans, /customers, /sales, /progress | /classes, /bookings, /schedule, /profile | /workout-builder, /trainer, /ai-coach, /dashboard |
| **AI** | ai-crm: scoring + followup | ai-commerce: renewal + upsell | ai-operations: noshow + schedule | ai-workout: chat + context + safety |
| **OPS** | ai-crm Dockerfile + CI backend | frontend Dockerfile + CI frontend | docker-compose full stack + CI integration | backend Dockerfile + CD deploy pipeline |
| **TEST** | Auth + Lead + E2E auth flow | Order + Payment + E2E commerce | Booking concurrency + E2E booking | Workout + Progress + E2E workout+AI |

✅ **Mỗi người đủ cả 6 layer**

---

## TIMELINE 5 TUẦN

```
TUẦN 1 — Foundation (tất cả làm cùng lúc)
  A: V1 migration + Auth register/login + ai-crm setup + ci-backend.yml
  B: V2 migration + Plans CRUD + ai-commerce setup + frontend Dockerfile
  C: V3 migration + Trainers+Classes CRUD + ai-operations setup + docker-compose infra
  D: V4 migration + Exercises CRUD + ai-workout setup + backend Dockerfile
  ⚡ A xong Auth cuối ngày 3 → B,C,D có JWT để test

TUẦN 2 — Core features
  A: Lead CRUD (all endpoints) + /login /register /leads pages
  B: Orders + Payments + /plans /customers /sales pages
  C: Sessions + Booking concurrency + /schedule /classes pages
  D: Workout Plans + Workout Sessions + /workout-builder /member/book pages

TUẦN 3 — Complete
  A: Progress API + /member-home + ai-crm endpoints hoàn chỉnh
  B: Membership lifecycle + /member/payments + ai-commerce endpoints
  C: Check-in + PT Sessions + /bookings /profile + ai-operations endpoints
  D: AI proxy API + /ai-coach /progress + ai-workout endpoints hoàn chỉnh

TUẦN 4 — Test + Fix
  Tất cả: viết unit tests + integration tests + fix bugs cross-module

TUẦN 5 — Deploy + Polish
  A: Deploy backend + smoke test + /reports page (🟡)
  B: Deploy frontend + Vercel + renewal risk widget (🟡)
  C: Deploy + docker-compose full stack + schedule AI banner (🟡)
  D: CD pipeline + deploy all services + conversion-tips (🟡)
```

---

## CÂU HỎI VẤND ĐÁP — MỖI NGƯỜI PHẢI TRẢ LỜI ĐƯỢC

### Người A — Auth + CRM + Progress
1. JWT: access token 15 phút vs refresh token 7 ngày, tại sao phân chia vậy?
2. Redis blacklist: khi logout token bị invalidate thế nào?
3. Lead convert: validate gì, tạo ra record nào, tại sao giữ lead_activities?
4. Streak calculation: algorithm thế nào, edge case ngày nghỉ?
5. lead_score: rule-based tính thế nào, input là gì?
6. CI job: test chạy với DB thật hay mock? Tại sao cần service postgres?

### Người B — Customers + Commerce + AI proxy
1. Server-side pricing: tại sao không nhận total từ client?
2. Payment idempotency: UNIQUE constraint vs application check, cái nào làm gì?
3. ServiceActivation: tại sao tách khỏi PaymentService?
4. Membership pause/resume: end_date tính thế nào khi resume?
5. renewal_probability: input nào ảnh hưởng nhất, range output là gì?
6. Multi-stage Dockerfile Next.js: stage builder vs runner làm gì khác nhau?

### Người C — CRM convert + Booking + Operations AI
1. Convert lead state machine: tại sao NEW không convert được?
2. Booking concurrency: SELECT FOR UPDATE làm gì, isolation level nào?
3. Tại sao cần cả pessimistic lock LẪN UNIQUE constraint?
4. booked_count denormalized: risk gì, handle thế nào?
5. PT complete idempotent: completion_ref UUID flow thế nào?
6. docker-compose healthcheck: postgres healthcheck check gì, tại sao cần?

### Người D — Workout + AI workout + CD
1. Context injection: tại sao load DB data trước khi gọi OpenAI?
2. Safety filter: keyword matching đủ chưa, false positive thế nào?
3. JSONB suggested_changes: parse thế nào khi user ACCEPT recommendation?
4. Personal records SQL: query GROUP BY + MAX trên workout_logs thế nào?
5. Multi-stage Dockerfile Java: builder stage vs runner stage tiết kiệm gì?
6. CD pipeline: push code lên main → production xảy ra từng bước gì?

---

*Version 7.0 — 158 tasks | A≈35.5h | B≈34.5h | C≈37h | D≈39.5h | Đủ 6 layer mỗi người*
