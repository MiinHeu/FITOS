# FITOS — PHÂN CÔNG 4 NGƯỜI × 5 TUẦN
## Đảm bảo: Mỗi người tự làm DB + BE + FE + AI + OPS | Đủ chức năng spec | Xong trong 4-5 tuần

---

## NGUYÊN TẮC

> **Mỗi người TỰ LÀM đủ 5 layer** cho feature của mình:
> DB schema → BE API → FE page → AI endpoint (tự viết Python) → OPS (Dockerfile + CI job)
>
> **Có AI hỗ trợ (Cursor/Kiro/Copilot)** → code nhanh hơn 3-4x, nhưng phải hiểu code mình generate.
>
> **Must-have 🔴** = bắt buộc xong trước demo
> **Nice-to-have 🟡** = làm nếu còn thời gian tuần 5

---

## ESTIMATE THỰC TẾ CÓ AI HỖ TRỢ

| Task | Có AI |
|------|-------|
| 1 CRUD endpoint Spring Boot | 30-45 phút |
| 1 FE page Next.js | 1-2h |
| 1 Python AI endpoint | 1-2h |
| Setup Dockerfile | 30-45 phút |
| 1 GitHub Actions job | 30-45 phút |
| Debug integration bug | 1-3h |
| Unit test 5 cases | 30-45 phút |

**Capacity mỗi người:** 2-3h/ngày × 5 ngày × 5 tuần = **50-75h**
**Scope mỗi người:** ~50-60h có AI → **vừa khít, cần ưu tiên đúng**

---

## AI SERVICE — MỖI NGƯỜI VIẾT 1 PYTHON SERVICE RIÊNG

```
ai-crm/         port 8001  ← Người A tự viết
ai-commerce/    port 8002  ← Người B tự viết
ai-operations/  port 8003  ← Người C tự viết
ai-workout/     port 8004  ← Người D tự viết
```

Mỗi service có cấu trúc giống nhau, người đó tự implement logic riêng.

---

## TIMELINE TỔNG QUAN

```
TUẦN 1: Foundation — Auth + DB + Docker + CI cơ bản
TUẦN 2: Core features — từng người implement domain chính
TUẦN 3: Integrate — kết nối giữa các domain + AI service
TUẦN 4: Complete + Test — hoàn thiện, fix bug, E2E test
TUẦN 5: Polish + Deploy — deploy cloud, demo prep, nice-to-have
```

---
---

# 👤 NGƯỜI A — AUTH + CRM + AI-CRM

**Estimate: ~55h có AI**

---

## TUẦN 1 — Foundation (10h)

### DB — Mày tự viết `V1__auth_crm.sql` (~1h)
```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(50) NOT NULL,
  status        VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name   VARCHAR(255) NOT NULL,
  phone       VARCHAR(20) NOT NULL,
  email       VARCHAR(255),
  goal        VARCHAR(50),
  source      VARCHAR(50),
  status      VARCHAR(50) NOT NULL DEFAULT 'NEW',
  assigned_to UUID REFERENCES users(id),
  notes       TEXT,
  lead_score  SMALLINT DEFAULT 0,
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lead_activities (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    UUID NOT NULL REFERENCES leads(id),
  actor_id   UUID NOT NULL REFERENCES users(id),
  type       VARCHAR(50) NOT NULL,
  note       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE customers (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id   UUID REFERENCES users(id),
  full_name VARCHAR(255) NOT NULL,
  phone     VARCHAR(20),
  email     VARCHAR(255),
  goal      VARCHAR(50),
  lead_id   UUID REFERENCES leads(id),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    UUID REFERENCES users(id),
  action      VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id   UUID,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_phone  ON leads(phone);
```

### BE — Auth cơ bản (~3h) 🔴
```
POST /api/auth/register   — BCrypt hash, tạo user, trả JWT
POST /api/auth/login      — verify, trả access(15m) + refresh(7d)
POST /api/auth/refresh    — access token mới
POST /api/auth/logout     — Redis blacklist
```
- JwtAuthFilter: đọc Bearer token, set SecurityContext
- @PreAuthorize cho RBAC
- Global exception handler (không leak stack trace)

### OPS — Docker + CI (~2h) 🔴
```dockerfile
# ai-crm/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
EXPOSE 8001
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
```
```yaml
# .github/workflows/ci-auth.yml
name: CI Auth+CRM
on:
  push:
    paths: ['backend/**', 'ai-crm/**']
jobs:
  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env: {POSTGRES_DB: fitos_test, POSTGRES_USER: test, POSTGRES_PASSWORD: test}
        options: --health-cmd pg_isready
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: {java-version: '21', distribution: 'temurin'}
      - run: cd backend && mvn test -Dspring.profiles.active=test
  test-ai-crm:
    steps:
      - uses: actions/setup-python@v5
        with: {python-version: '3.11'}
      - run: cd ai-crm && pip install -r requirements.txt && pytest
```

### AI — Setup `ai-crm/` service (~2h)
```
ai-crm/
├── app/
│   ├── main.py          ← FastAPI app
│   ├── routers/
│   │   └── lead.py      ← endpoints
│   ├── services/
│   │   └── scorer.py    ← logic
│   └── schemas.py
├── Dockerfile
└── requirements.txt     ← fastapi, uvicorn, openai, pytest
```

### FE — Login/Register (~2h) 🔴
```
/login    — form email+password, redirect theo role
/register — form với role selector
AuthContext + ProtectedRoute + RoleGuard
middleware.ts — server-side auth check
```

---

## TUẦN 2 — CRM Core (15h)

### BE — CRM API (~6h) 🔴
```
POST   /api/leads                  — tạo lead
GET    /api/leads                  — list + filter(status,source) + search + pagination
GET    /api/leads/:id              — detail + activities
PUT    /api/leads/:id              — cập nhật
PATCH  /api/leads/:id/status       — đổi status (validate transition)
POST   /api/leads/:id/activities   — thêm activity
PATCH  /api/leads/:id/assign       — gán staff
POST   /api/leads/:id/convert      — convert → Customer + User (logic quan trọng)
PATCH  /api/leads/:id/lost         — mark lost
```

**Convert logic — tự viết, không bỏ qua:**
```java
@Transactional
public Customer convertLead(UUID leadId) {
    Lead lead = findAndValidate(leadId); // status phải INTERESTED/TRIAL
    Customer customer = createCustomer(lead);
    User user = createUserAccount(lead.getEmail());
    customer.setUserId(user.getId());
    lead.setStatus("CONVERTED"); // KHÔNG xóa lead_activities
    auditLog("CONVERT_LEAD", leadId);
    return customer;
}
```

### AI — Lead Scoring endpoint (~3h) 🔴
```python
# ai-crm/app/routers/lead.py
@router.post("/score-lead")
async def score_lead(req: LeadScoreRequest):
    # Rule-based: source + goal + contact completeness
    score = 0
    score += {"REFERRAL":30,"WALK_IN":25,"INSTAGRAM":20,"FACEBOOK":15}.get(req.source,10)
    score += {"WEIGHT_LOSS":25,"MUSCLE_GAIN":25,"STRENGTH":20}.get(req.goal,10)
    if req.has_email: score += 15
    if req.phone_valid: score += 20
    level = "HIGH" if score>=70 else "MEDIUM" if score>=40 else "LOW"
    return {"score": min(score,100), "level": level}

@router.post("/suggest-followup")  # dùng LLM
async def suggest_followup(req: FollowupRequest):
    prompt = f"Lead status: {req.status}, goal: {req.goal}, last contact: {req.days_ago} days ago. Suggest ONE specific next action in 1-2 sentences."
    reply = await call_openai(prompt)
    return {"suggestion": reply}
```

**Spring Boot gọi AI sau khi tạo lead:**
```java
int score = aiCrmClient.scoreLead(buildScoreReq(lead));
lead.setLeadScore(score);
```

### FE — CRM pages (~6h) 🔴
```
/dashboard/leads
  - Filter tabs: All|New|Contacted|Trial|Converted|Lost
  - Search (debounce 300ms)
  - Table: name, phone, source, status badge, lead_score badge (màu theo level), actions

/dashboard/leads/create
  - Form: name*, phone*, email, source dropdown, goal dropdown, notes

/dashboard/leads/[id]
  - Info card + edit
  - Activity timeline
  - Add activity modal
  - Action buttons: Contact / Trial / Convert / Lost
  - Lead score badge hiển thị
```

---

## TUẦN 3 — Customer + Auth hoàn chỉnh (12h)

### BE (~5h) 🔴
```
GET    /api/customers              — list + filter
GET    /api/customers/:id          — profile + membership + bookings + payments
PUT    /api/customers/:id          — edit
POST   /api/auth/forgot-password   🟡
POST   /api/auth/reset-password    🟡
PUT    /api/auth/change-password   🔴
GET    /api/users (ADMIN)          🟡
PATCH  /api/users/:id/role         🟡
PATCH  /api/users/:id/disable      🟡
```

### AI — Follow-up suggestion hoàn chỉnh (~2h) 🟡
```python
@router.post("/conversion-tips")  # dựa trên activity history
async def conversion_tips(req: ConversionRequest):
    prompt = f"""
    Lead has {req.activity_count} interactions over {req.days_active} days.
    Most recent: {req.last_activity}. Goal: {req.goal}.
    What's the most effective conversion approach? Be specific, 2-3 sentences.
    """
    return {"tips": await call_openai(prompt)}
```

### FE (~5h) 🔴
```
/dashboard/customers
  - Table với membership status badge, expiry

/dashboard/customers/[id]
  - 6 tabs: Overview | Membership | Bookings | Workouts | Payments | Activity
  - (data từ các module khác join vào)

/dashboard/profile
  - Xem + edit profile, đổi password
```

---

## TUẦN 4 — Testing + Integration (8h)

### Tests JUnit (~3h) 🔴
```java
@Test void register_returns_jwt()
@Test void register_duplicate_email_409()
@Test void login_wrong_password_401()
@Test void disabled_user_cannot_login()
@Test void convert_lead_new_status_throws()
@Test void convert_lead_trial_creates_customer()
@Test void convert_already_converted_throws()
```

### Tests Python (~1h) 🔴
```python
def test_referral_scores_high()
def test_missing_info_scores_low()
def test_score_max_100()
```

### Integration (~2h) 🔴
- Register → Login → tạo lead → convert → customer created
- CUSTOMER role không access /api/leads → 403

### AuditLog AOP (~2h) 🟡
```java
@Aspect @Component
public class AuditLogAspect {
    @Around("@annotation(Auditable)")
    public Object log(ProceedingJoinPoint pjp) throws Throwable { ... }
}
```

---

## TUẦN 5 — Polish + Manager Dashboard (5h)

### BE (~2h) 🟡
```
GET /api/dashboard/summary  — active members, new leads, conversion rate
GET /api/renewals            — members expiring in 7 days (cron job)
```

### FE (~3h) 🟡
```
/dashboard  (Manager home)
  - 4 KPI cards: Revenue | Active Members | New Leads | Conversion Rate
  - Renewal widget: list members sắp hết hạn
  - Recent activity feed
```

---

## Người A — Khi vấn đáp phải trả lời được
- JWT access + refresh token hoạt động thế nào?
- Tại sao dùng Redis blacklist cho logout?
- Lead state machine: NEW → CONVERTED, validate gì?
- lead_score tính thế nào trong Python service của mày?
- AOP audit log là gì, khi nào chạy?
- CI job của mày test cái gì?

---
---

# 👤 NGƯỜI B — COMMERCE + MEMBERSHIP + AI-COMMERCE

**Estimate: ~55h có AI**

---

## TUẦN 1 — Foundation (10h)

### DB — Mày tự viết `V2__commerce.sql` (~1h) 🔴
```sql
CREATE TABLE service_plans (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(255) NOT NULL,
  type             VARCHAR(50) NOT NULL CHECK (type IN ('MEMBERSHIP','PT_PACKAGE')),
  price            NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  duration_days    INT,
  included_sessions INT,
  status           VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  plan_id     UUID NOT NULL REFERENCES service_plans(id),
  status      VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  subtotal    NUMERIC(12,2) NOT NULL,
  discount    NUMERIC(12,2) NOT NULL DEFAULT 0,
  total       NUMERIC(12,2) NOT NULL CHECK (total >= 0),
  created_by  UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id  UUID NOT NULL REFERENCES orders(id),
  method    VARCHAR(50) NOT NULL,
  reference VARCHAR(255) UNIQUE NOT NULL,
  amount    NUMERIC(12,2) NOT NULL,
  status    VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  paid_at   TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE memberships (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  plan_id     UUID NOT NULL REFERENCES service_plans(id),
  order_id    UUID REFERENCES orders(id),
  start_date  DATE NOT NULL,
  end_date    DATE NOT NULL,
  status      VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  paused_at   TIMESTAMPTZ,
  paused_days INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE pt_packages (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id        UUID NOT NULL REFERENCES customers(id),
  plan_id            UUID NOT NULL REFERENCES service_plans(id),
  total_sessions     INT NOT NULL CHECK (total_sessions > 0),
  remaining_sessions INT NOT NULL,
  expires_at         DATE,
  status             VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_memberships_customer ON memberships(customer_id);
CREATE INDEX idx_memberships_expiry   ON memberships(end_date) WHERE status='ACTIVE';
```

### BE — Plans API (~2h) 🔴
```
GET  /api/plans        — public
GET  /api/plans/:id
POST /api/plans        — MANAGER
PUT  /api/plans/:id
PATCH /api/plans/:id/status
```

### OPS (~2h) 🔴
```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```
```dockerfile
# ai-commerce/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
EXPOSE 8002
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8002"]
```
```yaml
# .github/workflows/ci-commerce.yml
jobs:
  test-frontend:
    steps:
      - run: cd frontend && npm ci && npm run build
  test-ai-commerce:
    steps:
      - run: cd ai-commerce && pip install -r requirements.txt && pytest
```

### AI — Setup `ai-commerce/` + renewal endpoint (~2h)
```python
# ai-commerce/app/routers/renewal.py
@router.post("/predict-renewal")
async def predict_renewal(req: RenewalRequest):
    # Input: attendance_rate, days_since_last_visit, payment_count, plan_type
    score = 1.0
    if req.attendance_rate < 0.3: score -= 0.4
    elif req.attendance_rate < 0.6: score -= 0.2
    if req.days_since_last_visit > 14: score -= 0.3
    elif req.days_since_last_visit > 7: score -= 0.1
    score += min(req.payment_count * 0.05, 0.2)
    prob = max(0.0, min(1.0, score))
    level = "HIGH" if prob < 0.3 else "MEDIUM" if prob < 0.6 else "LOW"
    return {"probability": prob, "risk_level": level}
```

### FE — Plans public page (~2h) 🔴
```
/plans  — 3 plan cards (Move/Perform/PT Focus), price, features, CTA
```

---

## TUẦN 2 — Order + Payment (15h)

### BE (~7h) 🔴
```
POST  /api/orders              — server-side tính total (KHÔNG nhận total từ client)
GET   /api/orders              — MANAGER/RECEPTIONIST
GET   /api/orders/me           — CUSTOMER
GET   /api/orders/:id
PATCH /api/orders/:id/cancel   — chỉ PENDING

POST  /api/payments            — tạo + trigger activation nếu SUCCESS
POST  /api/payments/callback   — idempotent webhook
GET   /api/payments/me
```

**2 logic bắt buộc phải hiểu:**
```java
// 1. Server-side pricing
BigDecimal total = plan.getPrice().subtract(discount);
if (total.compareTo(BigDecimal.ZERO) < 0)
    throw new InvalidOrderException();

// 2. Idempotency
if (paymentRepo.existsByReference(ref)) return existing;
// UNIQUE constraint trên payments.reference là safety net
```

**Service activation sau payment:**
```
payment SUCCESS
  → plan.type = MEMBERSHIP → tạo Membership(ACTIVE, start=today, end=today+duration_days)
  → plan.type = PT_PACKAGE → tạo PtPackage(remaining=total_sessions)
  → order.status = PAID
```

### AI — Upsell suggestion (~2h) 🟡
```python
@router.post("/suggest-upsell")
async def suggest_upsell(req: UpsellRequest):
    # Dựa trên plan hiện tại + usage pattern → gợi ý upgrade
    prompt = f"Member on {req.current_plan} plan, used {req.sessions_used}/{req.sessions_total} sessions. Suggest an upsell in 1 sentence."
    return {"suggestion": await call_openai(prompt)}
```

### FE (~6h) 🔴
```
/dashboard/sales
  - 4 KPI cards: Today Revenue | Month | Pending | Avg Order
  - Transactions table: customer, plan, amount, method, status, date

/dashboard/create-sale  — 3-step wizard:
  Step 1: search customer (type-ahead)
  Step 2: plan cards (click = select, lime border)
  Step 3: order summary + payment method (Cash/Bank/Sandbox) + Confirm

/dashboard/payment-confirmed
  - ✓ icon lớn, receipt card, 2 buttons, countdown "Back in 10s"
```

---

## TUẦN 3 — Membership Lifecycle (12h)

### BE (~5h) 🔴
```
GET   /api/memberships            — MANAGER
GET   /api/memberships/me         — CUSTOMER
PATCH /api/memberships/:id/pause
PATCH /api/memberships/:id/resume  — tính lại end_date
PATCH /api/memberships/:id/cancel
POST  /api/memberships/:id/renew   — tạo order mới
GET   /api/memberships/expiring    — sắp hết hạn 7 ngày (người A dùng)

GET   /api/pt-packages/me
PATCH /api/pt-packages/:id/use     — idempotent decrement với @Version
```

**Pause/resume — phải hiểu:**
```java
void resume(UUID id) {
    Membership m = findPaused(id);
    long days = ChronoUnit.DAYS.between(m.getPausedAt(), Instant.now());
    m.setEndDate(m.getEndDate().plusDays(days));
    m.setStatus(ACTIVE);
    m.setPausedAt(null);
}
```

**Membership validator cho Người C dùng:**
```java
@Component
public class MembershipValidator {
    public void requireActive(UUID customerId) {
        if (!membershipRepo.existsActive(customerId))
            throw new MembershipRequiredException();
    }
}
// Người C import bean này — KHÔNG viết lại
```

### AI — Renewal risk hoàn chỉnh (~2h) 🔴
```python
# Thêm LLM suggestion cho high-risk members
@router.post("/renewal-action")
async def renewal_action(req: RenewalActionRequest):
    if req.risk_level == "HIGH":
        prompt = f"Member hasn't visited in {req.days_absent} days, plan expires in {req.days_left} days. Suggest ONE specific retention action."
        action = await call_openai(prompt)
    else:
        action = "Send standard renewal reminder email."
    return {"action": action}
```

### FE (~5h) 🔴
```
/dashboard/member/payments
  - Membership card: plan, status badge, expiry, pause/cancel buttons
  - Payment history table

/dashboard/plans  (MANAGER)
  - Table plans, toggle status, create modal

Tab Membership trong /dashboard/customers/[id]
  - Membership info, pause/resume/cancel/renew buttons
  - Renewal risk badge (từ AI)
```

---

## TUẦN 4 — Testing (8h)

### Tests JUnit (~3h) 🔴
```java
@Test void order_total_server_side_calculated()
@Test void order_total_cannot_be_negative()
@Test void payment_idempotency_same_reference()
@Test void payment_success_activates_membership()
@Test void membership_pause_resume_date_correct()
@Test void pt_use_session_decrements_once()
```

### Tests Python (~1h) 🔴
```python
def test_high_attendance_predicts_renewal()
def test_long_absence_predicts_churn()
def test_probability_between_0_and_1()
```

### Integration (~4h) 🔴
- Create order → payment → membership ACTIVE
- Duplicate payment callback → chỉ 1 membership
- Cancel order PAID → rejected
- Membership expired → booking rejected (test chéo với C)

---

## TUẦN 5 — Deploy + Polish (5h)

### OPS Deploy (~3h) 🔴
```yaml
# docker-compose stanza
ai-commerce:
  build: ./ai-commerce
  ports: ["8002:8002"]
  environment:
    - OPENAI_API_KEY=${OPENAI_API_KEY}
frontend:
  build: ./frontend
  ports: ["3000:3000"]
  environment:
    - NEXT_PUBLIC_API_URL=http://backend:8080
```

### FE polish (~2h) 🟡
- Renewal risk table trong Manager Dashboard (gọi /api/memberships/expiring + AI risk)
- Upsell suggestion trong membership page

---

## Người B — Khi vấn đáp phải trả lời được
- Tại sao total tính server-side?
- UNIQUE trên payments.reference giải quyết gì?
- Pause/resume membership tính end_date thế nào?
- Service activation tách khỏi payment logic — ý nghĩa gì?
- renewal_probability tính thế nào trong Python?
- Multi-stage Dockerfile next.js hoạt động thế nào?

---
---

# 👤 NGƯỜI C — CLASS + BOOKING + TRAINER + AI-OPERATIONS

**Estimate: ~55h có AI**

---

## TUẦN 1 — Foundation (10h)

### DB — Mày tự viết `V3__operations.sql` (~1.5h) 🔴
```sql
CREATE TABLE trainers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID UNIQUE REFERENCES users(id),
  full_name      VARCHAR(255) NOT NULL,
  specialization VARCHAR(255),
  bio            TEXT,
  status         VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE classes (
  id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name   VARCHAR(255) NOT NULL,
  type   VARCHAR(50),
  description TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE class_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id     UUID NOT NULL REFERENCES classes(id),
  trainer_id   UUID REFERENCES trainers(id),
  session_date DATE NOT NULL,
  start_time   TIME NOT NULL,
  end_time     TIME NOT NULL,
  room         VARCHAR(100),
  capacity     INT NOT NULL CHECK (capacity > 0),
  booked_count INT NOT NULL DEFAULT 0,
  status       VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED'
);

CREATE TABLE bookings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      UUID NOT NULL REFERENCES customers(id),
  class_session_id UUID NOT NULL REFERENCES class_sessions(id),
  status           VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',
  booked_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cancelled_at     TIMESTAMPTZ,
  UNIQUE (customer_id, class_session_id)
);

CREATE TABLE pt_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id    UUID NOT NULL REFERENCES trainers(id),
  customer_id   UUID NOT NULL REFERENCES customers(id),
  pt_package_id UUID REFERENCES pt_packages(id),
  scheduled_at  TIMESTAMPTZ NOT NULL,
  duration_min  INT NOT NULL DEFAULT 60,
  status        VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
  notes         TEXT,
  completion_ref UUID UNIQUE DEFAULT gen_random_uuid()
);

CREATE TABLE attendance (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      UUID NOT NULL REFERENCES customers(id),
  class_session_id UUID REFERENCES class_sessions(id),
  pt_session_id    UUID REFERENCES pt_sessions(id),
  type             VARCHAR(20) NOT NULL,
  checked_in_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_session ON bookings(class_session_id);
CREATE INDEX idx_sessions_date    ON class_sessions(session_date);
```

### BE — Trainer + Class CRUD (~2.5h) 🔴
```
GET  /api/trainers
POST /api/trainers   — MANAGER
PUT  /api/trainers/:id
GET  /api/classes
POST /api/classes    — MANAGER
PUT  /api/classes/:id
```

### OPS — docker-compose infra (~2h) 🔴
```yaml
# Mày viết phần postgres + redis + ai-operations trong docker-compose.yml
postgres:
  image: postgres:15-alpine
  environment: {POSTGRES_DB: fitos, POSTGRES_USER: fitos, POSTGRES_PASSWORD: "${DB_PASS}"}
  volumes: [postgres_data:/var/lib/postgresql/data]
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U fitos"]
    interval: 10s
    retries: 5

redis:
  image: redis:7-alpine
  volumes: [redis_data:/data]
  command: redis-server --appendonly yes

ai-operations:
  build: ./ai-operations
  ports: ["8003:8003"]
  environment: [OPENAI_API_KEY=${OPENAI_API_KEY}]

volumes:
  postgres_data:
  redis_data:
```
```yaml
# .github/workflows/ci-integration.yml
name: Integration Tests
on: [push]
jobs:
  integration-test:
    services:
      postgres: {image: postgres:15, env: {POSTGRES_DB: fitos_test, POSTGRES_USER: test, POSTGRES_PASSWORD: test}}
    steps:
      - run: cd backend && mvn test -Dtest="*IntegrationTest" -Dspring.profiles.active=test
```

### AI — Setup `ai-operations/` + no-show prediction (~2h)
```python
# ai-operations/app/routers/operations.py
@router.post("/predict-noshow")
async def predict_noshow(req: NoshowRequest):
    # Input: days_booked_ahead, member_noshow_history_rate, time_of_day, day_of_week
    prob = 0.1
    if req.days_booked_ahead > 5: prob += 0.15
    if req.noshow_history_rate > 0.3: prob += 0.25
    if req.time_of_day in ["06:00","07:00"]: prob -= 0.05  # early birds show up
    if req.day_of_week in ["Monday","Friday"]: prob += 0.05
    return {"probability": min(max(prob, 0.0), 1.0),
            "should_send_reminder": prob > 0.25}
```

### FE — Trainer view cơ bản (~2h) 🔴
```
/dashboard/trainer
  - Today's sessions timeline
  - My clients list
```

---

## TUẦN 2 — Sessions + Booking (15h)

### BE — Booking concurrency (~7h) 🔴
```
POST  /api/sessions                  — tạo class session
GET   /api/sessions                  — filter date/trainer/class
PATCH /api/sessions/:id/cancel
POST  /api/bookings                  — CONCURRENCY SAFE
GET   /api/bookings/me
GET   /api/bookings
PATCH /api/bookings/:id/cancel
PATCH /api/bookings/:id/no-show
```

**Booking — phần kỹ thuật quan trọng nhất của mày:**
```java
@Transactional(isolation = Isolation.READ_COMMITTED)
public Booking createBooking(UUID customerId, UUID sessionId) {
    // 1. Check membership (query trực tiếp, không gọi service của B)
    //    Người B đã tạo MembershipValidator bean → mày inject và dùng
    membershipValidator.requireActive(customerId);

    // 2. Lock để serialize concurrent requests
    ClassSession session = sessionRepo.findByIdWithPessimisticLock(sessionId);

    // 3. Check capacity
    if (session.getBookedCount() >= session.getCapacity())
        throw new ClassFullException();

    // 4. Create + increment
    session.setBookedCount(session.getBookedCount() + 1);
    sessionRepo.save(session);
    return bookingRepo.save(new Booking(customerId, sessionId));
    // UNIQUE constraint bắt duplicate nếu lock fail
}

// Repository
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT s FROM ClassSession s WHERE s.id = :id")
ClassSession findByIdWithPessimisticLock(@Param("id") UUID id);
```

### AI — Schedule suggestion (~3h) 🟡
```python
@router.post("/suggest-schedule")
async def suggest_schedule(req: ScheduleRequest):
    # Tìm slot trống + historical occupancy cao
    gaps = [s for s in req.time_slots if s not in req.occupied_slots]
    high_demand = sorted(req.historical_occupancy.items(),
                        key=lambda x: x[1], reverse=True)[:3]
    prompt = f"""
    Schedule gaps this week: {gaps[:5]}
    Historically popular slots: {[s for s,_ in high_demand]}
    Suggest 2 additional class sessions to maximize occupancy. JSON format:
    [{{"day":"Monday","time":"18:00","type":"HIIT","reason":"..."}}]
    """
    raw = await call_openai(prompt)
    return {"suggestions": parse_json(raw)}
```

### FE (~5h) 🔴
```
/dashboard/schedule
  - Toggle Week/List view
  - Week: 7 columns Mon-Sun, session cards màu theo type:
    Yoga=purple, HIIT=orange, Strength=lime, Cycling=blue
  - Click session → drawer: trainer, capacity bar, booking list

/dashboard/member/book
  - Tabs: Classes | PT
  - Date strip (today + 6 ngày)
  - Class cards: type badge, name, trainer, time, spots bar, Book button
  - Book button → confirm modal → POST /api/bookings
```

---

## TUẦN 3 — Check-in + PT Sessions (12h)

### BE (~5h) 🔴
```
POST  /api/checkin                      — validate membership + tạo attendance
GET   /api/attendance                   — MANAGER
GET   /api/attendance/me                — CUSTOMER
POST  /api/pt-sessions                  — schedule PT
GET   /api/pt-sessions
PATCH /api/pt-sessions/:id/reschedule
PATCH /api/pt-sessions/:id/cancel
PATCH /api/pt-sessions/:id/complete     — idempotent
```

**PT complete idempotent:**
```java
@Transactional
public void completePTSession(UUID sessionId) {
    PtSession s = ptSessionRepo.findById(sessionId).orElseThrow();
    if (s.getStatus().equals("COMPLETED")) return; // idempotent
    s.setStatus("COMPLETED");

    // Decrement PT package — gọi bean của B
    if (s.getPtPackageId() != null)
        ptPackageService.useSession(s.getPtPackageId(), s.getCompletionRef());

    attendanceRepo.save(new Attendance(s.getCustomerId(), sessionId, "PT"));
}
```

### AI — No-show prediction hoàn chỉnh + schedule AI call (~2h) 🔴
```java
// Spring Boot gọi AI sau khi booking confirmed
NoshowPrediction pred = aiOpsClient.predictNoshow(buildRequest(booking, customer));
if (pred.isShouldSendReminder()) {
    reminderService.scheduleReminder(booking, "2 hours before");
}
```

### FE (~5h) 🔴
```
/dashboard/bookings
  - Check-in strip: search input + "Check in" button lớn
  - Stats: Checked In | Booked | No-show | Capacity %
  - Bookings table với actions

/dashboard/trainer (hoàn chỉnh)
  - PT session management: schedule/reschedule/cancel/complete buttons
  - No-show prediction badge trên booking cards
```

---

## TUẦN 4 — Testing (8h)

### Tests JUnit (~4h) 🔴
```java
@Test void booking_success_increments_booked_count()
@Test void booking_full_class_throws_ClassFullException()
@Test void duplicate_booking_throws()
@Test void booking_expired_membership_throws_403()
@Test void pt_complete_is_idempotent()
@Test void checkin_creates_attendance_record()

// Concurrency test — quan trọng nhất
@Test
void concurrent_booking_last_spot_only_one_succeeds() throws Exception {
    // session capacity = 1
    var f1 = CompletableFuture.supplyAsync(() ->
        bookingService.createBooking(customer1Id, sessionId));
    var f2 = CompletableFuture.supplyAsync(() ->
        bookingService.createBooking(customer2Id, sessionId));
    CompletableFuture.allOf(f1, f2).join();
    // Đúng 1 thành công, 1 ClassFullException
    long success = Stream.of(f1, f2)
        .filter(f -> !f.isCompletedExceptionally()).count();
    assertEquals(1, success);
}
```

### Tests Python (~1h) 🔴
```python
def test_high_noshow_history_predicts_noshow()
def test_early_morning_lowers_noshow_probability()
def test_probability_range_valid()
```

### Integration (~3h) 🔴
- Book → check-in → attendance recorded
- Membership expired → book rejected (với mock B's validator)

---

## TUẦN 5 — Deploy (5h)

### OPS Deploy (~3h) 🔴
- Thêm ai-operations vào docker-compose đầy đủ
- CI integration test job chạy được trên GitHub Actions
- Test docker-compose up toàn stack

### Schedule AI display (~2h) 🟡
```
/dashboard/schedule (Manager)
  - AI suggestion banner: "AI suggests adding HIIT on Wednesday 7PM"
  - Based on /suggest-schedule endpoint
```

---

## Người C — Khi vấn đáp phải trả lời được
- Concurrency problem trong booking là gì?
- SELECT FOR UPDATE làm gì? Tại sao cần nếu đã có UNIQUE?
- booked_count denormalized — trade-off là gì?
- PT complete idempotent với completion_ref — explain flow
- no-show probability tính thế nào?
- Integration test CI của mày dùng DB thật hay mock?

---
---

# 👤 NGƯỜI D — WORKOUT + PROGRESS + AI COACH + DEVOPS

**Estimate: ~60h có AI** *(nhiều nhất vì có AI service phức tạp nhất + full CD)*

---

## TUẦN 1 — Foundation (12h)

### DB — Mày tự viết `V4__workout.sql` (~2h) 🔴
```sql
CREATE TABLE exercises (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         VARCHAR(255) NOT NULL,
  muscle_group VARCHAR(100),
  equipment    VARCHAR(100),
  difficulty   VARCHAR(20),
  instructions TEXT,
  created_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE workout_plans (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  trainer_id  UUID REFERENCES trainers(id),
  goal        VARCHAR(50),
  start_date  DATE,
  end_date    DATE,
  status      VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE workout_plan_exercises (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id       UUID NOT NULL REFERENCES workout_plans(id),
  day_number    INT NOT NULL CHECK (day_number BETWEEN 1 AND 7),
  exercise_id   UUID NOT NULL REFERENCES exercises(id),
  sets          INT,
  reps          INT,
  target_weight NUMERIC(6,2),
  rest_seconds  INT,
  order_index   INT NOT NULL DEFAULT 0
);

CREATE TABLE workout_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id  UUID NOT NULL REFERENCES customers(id),
  plan_id      UUID REFERENCES workout_plans(id),
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status       VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS',
  notes        TEXT
);

CREATE TABLE workout_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     UUID NOT NULL REFERENCES workout_sessions(id),
  exercise_id    UUID NOT NULL REFERENCES exercises(id),
  set_number     INT NOT NULL,
  reps_completed INT,
  weight         NUMERIC(6,2),
  rpe            SMALLINT CHECK (rpe BETWEEN 1 AND 10),
  notes          TEXT
);

CREATE TABLE body_metrics (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  weight      NUMERIC(5,2),
  body_fat    NUMERIC(5,2),
  muscle_mass NUMERIC(5,2),
  waist       NUMERIC(5,2)
);

CREATE TABLE ai_conversations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ai_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id),
  role            VARCHAR(20) NOT NULL CHECK (role IN ('user','assistant')),
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE ai_recommendations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      UUID NOT NULL REFERENCES customers(id),
  title            VARCHAR(255),
  reason           TEXT,
  suggested_changes JSONB,
  status           VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_workout_sessions_customer ON workout_sessions(customer_id, performed_at DESC);
CREATE INDEX idx_ai_messages_conversation  ON ai_messages(conversation_id, created_at);
```

### BE — Exercise API (~1.5h) 🔴
```
GET  /api/exercises         — search + filter
POST /api/exercises         — TRAINER/MANAGER
PUT  /api/exercises/:id
```
Seed 30 exercises phổ biến.

### OPS — Backend Dockerfile + CD pipeline (~3h) 🔴
```dockerfile
# backend/Dockerfile
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
```
```dockerfile
# ai-workout/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
EXPOSE 8004
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8004"]
```
```yaml
# .github/workflows/cd-deploy.yml
name: CD Deploy
on:
  push:
    branches: [main]
jobs:
  build-push-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - run: |
          docker build -t ghcr.io/${{ github.repository }}/backend:${{ github.sha }} ./backend
          docker build -t ghcr.io/${{ github.repository }}/frontend:${{ github.sha }} ./frontend
          docker build -t ghcr.io/${{ github.repository }}/ai-workout:${{ github.sha }} ./ai-workout
          docker push ghcr.io/${{ github.repository }}/backend:${{ github.sha }}
          docker push ghcr.io/${{ github.repository }}/frontend:${{ github.sha }}
          docker push ghcr.io/${{ github.repository }}/ai-workout:${{ github.sha }}
      - name: Deploy to Railway
        run: curl -X POST "${{ secrets.RAILWAY_WEBHOOK }}"
```

### AI — Setup `ai-workout/` + safety filter (~3h) 🔴
```
ai-workout/
├── app/
│   ├── main.py
│   ├── routers/
│   │   ├── chat.py          ← POST /chat
│   │   ├── recommend.py     ← POST /recommend
│   │   └── progress.py      ← POST /progress-summary
│   ├── services/
│   │   ├── context_loader.py
│   │   ├── safety_filter.py
│   │   └── llm.py
│   └── schemas.py
├── Dockerfile
└── tests/
```

```python
# services/safety_filter.py
BLOCKED = ["diagnose","diagnosis","prescription","medication",
           "disease","symptom","treatment","cure","therapy"]

def check_safety(msg: str) -> str | None:
    if any(t in msg.lower() for t in BLOCKED):
        return "FITOS AI Coach provides fitness guidance only. Please consult a healthcare professional for medical questions."
    return None
```

### FE — Exercise library component (~2.5h) 🔴
```
/dashboard/workout-builder (layout cơ bản)
  - Exercise search + filter sidebar
  - Week grid skeleton
```

---

## TUẦN 2 — Workout Plan + Log (15h)

### BE (~7h) 🔴
```
POST   /api/workout-plans
GET    /api/workout-plans             — filter customer/trainer/status
GET    /api/workout-plans/:id         — detail grouped by day
PUT    /api/workout-plans/:id
PATCH  /api/workout-plans/:id/activate
PATCH  /api/workout-plans/:id/complete
PATCH  /api/workout-plans/:id/cancel

POST   /api/workout-sessions          — start session
PATCH  /api/workout-sessions/:id/complete
GET    /api/workout-sessions/me       — với logs

POST   /api/workout-logs              — log 1 set
GET    /api/workout-sessions/:id/logs

POST   /api/body-metrics
GET    /api/body-metrics/me
```

### AI — Context loader + Chat endpoint (~4h) 🔴
```python
# services/context_loader.py
async def load_context(customer_id: str, db) -> dict:
    """Chỉ load data của đúng customer_id này — không leak"""
    plan = await db.fetchrow("""
        SELECT wp.goal, json_agg(json_build_object(
            'day', wpe.day_number, 'exercise', e.name,
            'sets', wpe.sets, 'reps', wpe.reps
        )) as exercises
        FROM workout_plans wp
        JOIN workout_plan_exercises wpe ON wpe.plan_id = wp.id
        JOIN exercises e ON e.id = wpe.exercise_id
        WHERE wp.customer_id = $1 AND wp.status = 'ACTIVE'
        GROUP BY wp.id LIMIT 1
    """, customer_id)

    sessions = await db.fetch("""
        SELECT performed_at, json_agg(json_build_object(
            'exercise', e.name, 'reps', wl.reps_completed, 'weight', wl.weight
        )) as logs
        FROM workout_sessions ws
        JOIN workout_logs wl ON wl.session_id = ws.id
        JOIN exercises e ON e.id = wl.exercise_id
        WHERE ws.customer_id = $1
        ORDER BY performed_at DESC LIMIT 5
    """, customer_id)

    return {"active_plan": dict(plan) if plan else None,
            "recent_sessions": [dict(s) for s in sessions]}

# routers/chat.py
@router.post("/chat")
async def chat(req: ChatRequest, db=Depends(get_db)):
    warning = check_safety(req.message)
    if warning: return {"reply": warning, "blocked": True}

    ctx = await load_context(req.customer_id, db)
    messages = [
        {"role": "system", "content": "You are FITOS AI Coach. Answer fitness questions only. Base advice on user's training data. Never provide medical advice."},
        {"role": "system", "content": f"User context: {json.dumps(ctx)}"},
        *[{"role": m["role"], "content": m["content"]} for m in req.history[-8:]],
        {"role": "user", "content": req.message}
    ]
    resp = await openai_client.chat.completions.create(
        model="gpt-4o-mini", messages=messages, max_tokens=400)
    return {"reply": resp.choices[0].message.content, "blocked": False}
```

### FE (~4h) 🔴
```
/dashboard/workout-builder (hoàn chỉnh)
  - Plan form: name, customer, goal, date range
  - Week tabs W1/W2/W3/W4
  - Day cards Mon-Sat: exercise list + "Add exercise"
  - Exercise library sidebar: search + filter chips + "+" button

/dashboard/member (member home cơ bản)
  - Top 3 cards: Membership | Next Booking | Streak
  - Quick actions: Book | Log workout | Progress | AI Coach
```

---

## TUẦN 3 — Progress + AI Coach (12h)

### BE (~4h) 🔴
```
GET    /api/progress/me               — computed stats
POST   /api/ai/chat                   — validate auth → gọi ai-workout → lưu message
GET    /api/ai/conversations/me       — load history
POST   /api/ai/recommend              — trigger recommendation
PATCH  /api/ai/recommendations/:id/accept   — apply vào workout plan
PATCH  /api/ai/recommendations/:id/dismiss
```

**Progress computation:**
```java
public ProgressStats getMyProgress(UUID customerId) {
    int workoutsThisMonth = sessionRepo.countByCustomerThisMonth(customerId);

    // Streak: đếm ngày liên tiếp gần nhất có workout
    List<LocalDate> dates = sessionRepo.getRecentWorkoutDates(customerId);
    int streak = calcStreak(dates);

    // Personal records: max weight per exercise
    List<PersonalRecord> prs = logRepo.findPersonalRecords(customerId);

    // Weekly frequency: last 8 weeks
    List<Integer> weekly = sessionRepo.weeklyFrequency(customerId, 8);

    return new ProgressStats(workoutsThisMonth, streak, prs, weekly);
}
```

### AI — Recommend + Progress summary (~3h) 🔴
```python
@router.post("/recommend")
async def recommend(req: RecommendRequest, db=Depends(get_db)):
    ctx = await load_context(req.customer_id, db)
    prompt = f"""
    Analyze this member's recent training:
    {json.dumps(ctx['recent_sessions'], indent=2)}
    Current plan goal: {ctx['active_plan']['goal'] if ctx['active_plan'] else 'not set'}

    Suggest 1-2 specific workout adjustments (sets, reps, new exercise).
    Return JSON: [{{"exercise": "...", "change": "...", "reason": "..."}}]
    """
    raw = await call_openai(prompt)
    changes = parse_json(raw)
    return {"title": "AI Workout Suggestion",
            "reason": "Based on your recent training patterns",
            "suggested_changes": changes}

@router.post("/progress-summary")
async def progress_summary(req: ProgressRequest, db=Depends(get_db)):
    ctx = await load_context(req.customer_id, db)
    prompt = f"Summarize this member's fitness progress in 2-3 encouraging sentences. Data: {json.dumps(ctx)}"
    summary = await call_openai(prompt)
    return {"summary": summary}
```

### FE (~5h) 🔴
```
/dashboard/member/ai-coach
  - Split layout:
    - Left (60%): chat thread (user/AI bubbles), input + send button, quick prompts chips
    - Right (40%): "Your context" card (plan + goal), recommendation card (Accept/Dismiss)

/dashboard/member/progress
  - 4 stat cards: Workouts/month | Attendance | Streak | PRs
  - Weekly bar chart (PURE CSS — không dùng chart library):
    <div style={{height: `${(count/max)*100}%`}} className="bg-[#D7FF3F]"/>
  - Personal records table
  - AI progress summary text (từ /progress-summary endpoint)
```

---

## TUẦN 4 — Reports + Testing (8h)

### BE — Dashboard + Reports (~3h) 🔴
```
GET /api/dashboard/stats          — revenue, active members, new leads, conversion
GET /api/dashboard/revenue-chart  — 8 tuần gần nhất
GET /api/dashboard/crm-funnel     — lead count per stage
GET /api/reports/sales            — period filter
GET /api/reports/memberships      — active/expiring/expired
GET /api/reports/classes          — occupancy, no-show
```

### FE (~2h) 🔴
```
/dashboard  (Manager home — hoàn chỉnh)
  - 4 KPI cards với real data
  - CSS bar chart revenue (thuần CSS, mày tự viết)
  - CRM funnel horizontal bars
  - Class occupancy list
```

### Tests (~3h) 🔴
```java
@Test void activate_plan_deactivates_previous()
@Test void progress_stats_computed_correctly()
@Test void streak_calculation_consecutive_days()
@Test void ai_recommendation_accept_updates_plan()
```
```python
def test_safety_filter_blocks_medical()
def test_safety_filter_allows_fitness()
def test_context_loader_no_data_leak()
def test_progress_summary_generated()
```

---

## TUẦN 5 — Deploy + Polish (8h)

### OPS — Full deploy (~5h) 🔴
```yaml
# docker-compose.yml (hoàn chỉnh toàn stack)
services:
  postgres: ...
  redis: ...
  backend: {build: ./backend, ports: ["8080:8080"], depends_on: [postgres, redis]}
  frontend: {build: ./frontend, ports: ["3000:3000"], depends_on: [backend]}
  ai-crm: {build: ./ai-crm, ports: ["8001:8001"]}
  ai-commerce: {build: ./ai-commerce, ports: ["8002:8002"]}
  ai-operations: {build: ./ai-operations, ports: ["8003:8003"]}
  ai-workout: {build: ./ai-workout, ports: ["8004:8004"]}
```
- Deploy lên Railway/Render: backend + frontend + ai-workout
- Test production URLs
- `.env.example` đầy đủ tất cả variables

### FE polish (~3h) 🟡
```
/dashboard/member (hoàn chỉnh)
  - This week workout grid với completion dots
  - Recent activity feed
  - Body metrics card

/dashboard/reports/page.tsx
  - Tabs: Sales | Members | Classes
```

---

## Người D — Khi vấn đáp phải trả lời được
- Context injection là gì, tại sao cần trước khi gọi LLM?
- Safety filter — keyword matching hay LLM? Trade-off?
- JSONB cho suggested_changes — tại sao không dùng column riêng?
- Streak calculation algorithm thế nào?
- Personal records query — SQL thế nào (GROUP BY + MAX)?
- Pure CSS chart — tại sao không dùng recharts?
- CD pipeline: push lên main → production xảy ra những bước gì?
- Multi-stage Dockerfile backend — tại sao cần 2 stage?

---
---

# TIMELINE TỔNG HỢP

```
         A (Auth+CRM)          B (Commerce)        C (Booking)         D (Workout+AI)
T1  Auth JWT + DB leads    Plans + DB orders    Trainer+Class + DB  Exercises + DB workout
    /login /register       /plans public        /dashboard/trainer  Workout builder layout
    ai-crm setup           ai-commerce setup    ai-operations setup ai-workout + safety filter
    CI backend job         CI frontend job      docker-compose DB   CD deploy pipeline

T2  Lead CRUD + convert    Order + Payment      Sessions + Booking  Workout Plan + Log
    /dashboard/leads       /dashboard/sales     /dashboard/schedule AI chat endpoint
    Lead score AI          Service activation   Booking concurrency Context loader
                                                                    /dashboard/member

T3  Customer detail        Membership lifecycle Check-in + PT       Progress + AI Coach
    User admin             Pause/resume/renew   /dashboard/bookings /dashboard/ai-coach
    Renewal detection      Renewal AI           No-show AI          /dashboard/progress
    Dashboard manager      Upsell AI            Schedule AI

T4  Tests + integration    Tests + integration  Concurrency test!   Tests + Reports
    Audit log AOP          Deploy BE + DB       Integration test    Dashboard KPIs

T5  Polish + nice-to-have  Deploy FE            Deploy              Full stack deploy
```

---

# INTEGRATION POINTS (team cần sync)

| Tuần | Sync cần làm |
|------|-------------|
| **Cuối T1** | A push Auth → B,C,D clone, chạy được với JWT |
| **Giữa T2** | B expose `MembershipValidator` bean → C import để gate booking |
| **Cuối T2** | B expose `ptPackageService.useSession()` → C gọi khi complete PT |
| **Cuối T3** | A cần data từ B (membership), C (bookings), D (workouts) cho customer detail |
| **T4** | Full integration test: Lead→Order→Pay→Membership→Book→Workout→AI |

---

# BẢNG CHECKLIST CUỐI — TICK ĐỦ MỚI DEMO

| Layer | A | B | C | D |
|-------|---|---|---|---|
| **DB** | V1__auth_crm.sql | V2__commerce.sql | V3__operations.sql | V4__workout.sql |
| **BE** | Auth + CRM | Order + Payment + Membership | Booking concurrency + Check-in | Workout + Progress + AI proxy |
| **FE** | /login, /leads, /customers | /plans, /create-sale, /member/payments | /schedule, /bookings, /member/book | /workout-builder, /ai-coach, /progress |
| **AI** | ai-crm/ score-lead + followup | ai-commerce/ renewal + upsell | ai-operations/ noshow + schedule | ai-workout/ chat + recommend + safety |
| **OPS** | ai-crm Dockerfile + CI backend job | frontend Dockerfile + CI frontend job | docker-compose infra + CI integration | backend Dockerfile + CD deploy pipeline |

---

*Version 5.0 — Sprint-based, 4-5 tuần, mỗi người tự làm đủ 5 layer, có AI hỗ trợ coding*
