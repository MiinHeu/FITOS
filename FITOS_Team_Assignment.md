# FITOS — PHÂN CÔNG NHÓM 4 NGƯỜI
## Nguyên tắc: MỖI NGƯỜI TỰ LÀM ĐỦ 5 LAYER CHO TỪNG FEATURE

> **Quy tắc bất di bất dịch:**
> Mỗi người nhận N feature nhỏ. Với MỖI feature đó, người đó tự tay viết:
> - **DB** — SQL schema + Flyway migration file + index
> - **BE** — Spring Boot Controller + Service + Repository + Business logic + Unit test
> - **FE** — Next.js page + component + Tailwind + state/form
> - **AI** — Tự viết Python FastAPI endpoint + prompt + logic (không phải gọi endpoint của người khác)
> - **OPS** — Dockerfile cho service mình phụ trách + docker-compose stanza + GitHub Actions job
>
> **Không có chuyện:** "D làm AI, mình chỉ gọi" hay "A làm Auth, mình chỉ dùng JWT"
> **Đúng phải là:** Mỗi người tự implement phần AI của feature mình, tự viết Dockerfile cho service mình, tự viết auth middleware trong code của mình.

---

## CÁCH CHIA

Dự án có 4 nhóm feature lớn. Mỗi người nhận 1 nhóm. Trong nhóm đó có:
- Feature cần DB → người đó tự viết migration
- Feature cần AI → người đó tự viết Python FastAPI endpoint cho AI đó
- Feature cần deploy → người đó tự viết Dockerfile + CI job
- Feature cần FE → người đó tự viết page + component

**Mỗi người có Python FastAPI riêng** cho AI của mình, không share service.

```
Người A → ai-crm/          (Python FastAPI cho CRM AI)
Người B → ai-commerce/     (Python FastAPI cho Commerce AI)
Người C → ai-operations/   (Python FastAPI cho Operations AI)
Người D → ai-workout/      (Python FastAPI cho Workout AI)
```

---

## CẤU TRÚC THƯ MỤC MỖI NGƯỜI PHỤ TRÁCH

```
Người A phụ trách viết:
  backend/src/.../auth/          ← BE Auth
  backend/src/.../crm/           ← BE CRM
  backend/src/resources/db/migration/V1__auth_crm.sql  ← DB
  frontend/src/app/(auth)/       ← FE Auth pages
  frontend/src/app/dashboard/leads/  ← FE CRM pages
  ai-crm/                        ← Python AI service (tự viết, tự run)
  ai-crm/Dockerfile              ← OPS
  .github/workflows/ci-backend.yml   ← OPS CI job

Người B phụ trách viết:
  backend/src/.../commerce/      ← BE Commerce
  backend/src/resources/db/migration/V2__commerce.sql  ← DB
  frontend/src/app/plans/        ← FE public plans
  frontend/src/app/dashboard/sales/  ← FE sales
  ai-commerce/                   ← Python AI service (tự viết)
  ai-commerce/Dockerfile         ← OPS
  frontend/Dockerfile            ← OPS
  .github/workflows/ci-frontend.yml  ← OPS CI job

Người C phụ trách viết:
  backend/src/.../operations/    ← BE Class/Booking
  backend/src/resources/db/migration/V3__operations.sql  ← DB
  frontend/src/app/dashboard/schedule/   ← FE Schedule
  frontend/src/app/dashboard/bookings/   ← FE Bookings
  frontend/src/app/dashboard/member/book/  ← FE Book page
  ai-operations/                 ← Python AI service (tự viết)
  ai-operations/Dockerfile       ← OPS
  docker-compose.yml             ← OPS (infra: postgres, redis)
  .github/workflows/ci-integration.yml  ← OPS CI job

Người D phụ trách viết:
  backend/src/.../workout/       ← BE Workout
  backend/src/resources/db/migration/V4__workout.sql  ← DB
  frontend/src/app/dashboard/member/          ← FE Member home
  frontend/src/app/dashboard/workout-builder/ ← FE Workout builder
  frontend/src/app/dashboard/member/progress/ ← FE Progress
  frontend/src/app/dashboard/member/ai-coach/ ← FE AI chat
  ai-workout/                    ← Python AI service (tự viết)
  ai-workout/Dockerfile          ← OPS
  backend/Dockerfile             ← OPS
  .github/workflows/cd-deploy.yml  ← OPS CD pipeline
```

---

---

# NGƯỜI A — AUTH + CRM + AI-CRM SERVICE

## Tổng số task: 20 tasks × 5 layer = 100 việc nhỏ

---

### LAYER DB — Mày tự viết file migration này

**File:** `backend/src/main/resources/db/migration/V1__auth_crm.sql`

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(50)  NOT NULL,
  status        VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE leads (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    VARCHAR(255) NOT NULL,
  phone        VARCHAR(20)  NOT NULL,
  email        VARCHAR(255),
  goal         VARCHAR(50),
  source       VARCHAR(50),
  status       VARCHAR(50)  NOT NULL DEFAULT 'NEW',
  assigned_to  UUID REFERENCES users(id),
  notes        TEXT,
  lead_score   SMALLINT     DEFAULT 0,
  created_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE lead_activities (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    UUID        NOT NULL REFERENCES leads(id),
  actor_id   UUID        NOT NULL REFERENCES users(id),
  type       VARCHAR(50) NOT NULL,
  note       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE customers (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID        REFERENCES users(id),
  full_name    VARCHAR(255) NOT NULL,
  phone        VARCHAR(20),
  email        VARCHAR(255),
  goal         VARCHAR(50),
  lead_id      UUID        REFERENCES leads(id),
  joined_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    UUID        REFERENCES users(id),
  action      VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id   UUID,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_status   ON leads(status);
CREATE INDEX idx_leads_phone    ON leads(phone);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
```

**Giải thích DB khi vấn đáp:**
- UUID vs INT: tại sao chọn UUID?
- lead_score: tại sao là SMALLINT (0-100)?
- Index trên status + phone: trade-off gì?

---

### LAYER BE — Mày tự viết từng class này

**`AuthController.java`** + **`AuthService.java`** + **`JwtUtil.java`**
```java
// Endpoints mày tự implement:
POST /api/auth/register    // BCrypt hash, tạo user, trả JWT
POST /api/auth/login       // verify hash, trả access(15m) + refresh(7d)
POST /api/auth/refresh     // verify refresh → trả access mới
POST /api/auth/logout      // Redis blacklist refresh token
POST /api/auth/forgot-password
POST /api/auth/reset-password
PUT  /api/auth/change-password
```

**`JwtAuthFilter.java`** — mày tự viết filter này:
```java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            // verify + set SecurityContextHolder
        }
        chain.doFilter(req, res);
    }
}
```

**`LeadController.java`** + **`LeadService.java`** + **`LeadRepository.java`**
```java
POST   /api/leads
GET    /api/leads                // pagination + filter + search
GET    /api/leads/:id
PUT    /api/leads/:id
PATCH  /api/leads/:id/status
POST   /api/leads/:id/activities
POST   /api/leads/:id/convert   // state machine quan trọng nhất
PATCH  /api/leads/:id/lost
GET    /api/customers
GET    /api/customers/:id
PUT    /api/customers/:id
```

**Convert Lead — mày tự viết business logic:**
```java
@Transactional
public Customer convertLead(UUID leadId) {
    Lead lead = leadRepo.findById(leadId).orElseThrow();

    // Validate state transition
    if (!List.of("INTERESTED","TRIAL").contains(lead.getStatus())) {
        throw new InvalidLeadStatusException("Cannot convert from " + lead.getStatus());
    }
    if (lead.getStatus().equals("CONVERTED")) {
        throw new AlreadyConvertedException();
    }

    // Tạo Customer
    Customer customer = new Customer();
    customer.setFullName(lead.getFullName());
    customer.setPhone(lead.getPhone());
    customer.setLeadId(lead.getId()); // giữ link
    customerRepo.save(customer);

    // Tạo User account
    User user = new User(lead.getEmail(), generateTempPassword(), Role.CUSTOMER);
    userRepo.save(user);
    customer.setUserId(user.getId());

    // Update lead
    lead.setStatus("CONVERTED");
    leadRepo.save(lead);

    // Audit log
    auditLogService.log(getCurrentUser(), "CONVERT_LEAD", "Lead", leadId);

    return customer;
}
```

**AuditLogAspect — mày tự viết:**
```java
@Aspect @Component
public class AuditLogAspect {
    @Around("@annotation(Auditable)")
    public Object logAction(ProceedingJoinPoint pjp) throws Throwable {
        // before: ghi thông tin
        Object result = pjp.proceed();
        // after: lưu audit_log
        return result;
    }
}
```

---

### LAYER FE — Mày tự viết từng page/component này

**`/login/page.tsx`** — tự viết, không copy:
```tsx
// Form với:
// - email input + password input (show/hide toggle)
// - submit → POST /api/auth/login
// - lưu token vào httpOnly cookie
// - redirect theo role: MANAGER→/dashboard, CUSTOMER→/dashboard/member
```

**`/register/page.tsx`** — tự viết

**`src/context/AuthContext.tsx`** — tự viết:
```tsx
// Provider expose: user, role, isLoading, logout()
// Tự implement token refresh logic
// Tự implement redirect to login khi 401
```

**`src/middleware.ts`** — tự viết server-side auth check

**`/dashboard/leads/page.tsx`** — tự viết:
```tsx
// Filter tabs: All | New | Contacted | Trial | Converted | Lost
// Search input với debounce 300ms (useEffect + setTimeout)
// Data table với pagination
// Tự viết TableRow, StatusBadge, ActionMenu components
```

**`/dashboard/leads/[id]/page.tsx`** — tự viết:
```tsx
// Lead info card (editable inline)
// Activity timeline (virtualized list nếu dài)
// Add activity modal (tự viết modal, không dùng thư viện)
// Action buttons với confirmation dialog
// Lead score badge: 0-40 đỏ, 41-70 vàng, 71-100 xanh
```

**`/dashboard/customers/page.tsx`** — tự viết
**`/dashboard/customers/[id]/page.tsx`** — 6 tabs, tự viết tab component

---

### LAYER AI — Mày tự viết Python FastAPI service này

**Thư mục:** `ai-crm/`

```
ai-crm/
├── app/
│   ├── main.py
│   ├── routers/
│   │   ├── lead_score.py      ← endpoint score lead
│   │   └── followup.py        ← endpoint gợi ý follow-up
│   ├── services/
│   │   ├── scorer.py          ← logic tính điểm
│   │   ├── llm.py             ← gọi OpenAI
│   │   └── prompt_builder.py  ← build prompt
│   └── schemas.py
├── Dockerfile
├── requirements.txt
└── tests/
    ├── test_scorer.py
    └── test_followup.py
```

**`app/routers/lead_score.py`** — mày tự viết:
```python
from fastapi import APIRouter
from app.schemas import LeadScoreRequest, LeadScoreResponse
from app.services.scorer import calculate_score

router = APIRouter()

@router.post("/score-lead", response_model=LeadScoreResponse)
async def score_lead(req: LeadScoreRequest):
    """
    Tính điểm lead dựa trên: goal, source, có email không, có phone không,
    số lần follow-up, thời gian từ tạo lead
    """
    score = calculate_score(req)
    return LeadScoreResponse(
        score=score.value,        # 0-100
        risk_level=score.level,   # LOW/MEDIUM/HIGH
        reason=score.reason       # "High intent source with clear goal"
    )
```

**`app/services/scorer.py`** — logic tính điểm, KHÔNG dùng LLM:
```python
def calculate_score(req) -> Score:
    score = 0
    # Source scoring
    source_scores = {"REFERRAL": 30, "WALK_IN": 25, "INSTAGRAM": 20,
                     "FACEBOOK": 15, "WEBSITE": 20}
    score += source_scores.get(req.source, 10)

    # Goal scoring
    if req.goal in ["WEIGHT_LOSS", "MUSCLE_GAIN"]:
        score += 25
    elif req.goal == "STRENGTH":
        score += 20
    else:
        score += 10

    # Contact info
    if req.has_email: score += 15
    if req.phone_valid: score += 20

    # Activity
    score += min(req.activity_count * 5, 10)

    level = "HIGH" if score >= 70 else "MEDIUM" if score >= 40 else "LOW"
    return Score(value=min(score, 100), level=level, reason=build_reason(req, score))
```

**`app/routers/followup.py`** — dùng LLM:
```python
@router.post("/suggest-followup")
async def suggest_followup(req: FollowupRequest):
    """
    Dựa trên lead status + activity history → gợi ý next action
    """
    prompt = f"""
    Lead info:
    - Status: {req.status}
    - Goal: {req.goal}
    - Last activity: {req.last_activity_type} ({req.days_since_last_activity} days ago)
    - Activity count: {req.activity_count}

    Suggest the SINGLE best next action to move this lead forward.
    Be specific and actionable. Max 2 sentences.
    """
    suggestion = await call_llm(prompt)
    return {"suggestion": suggestion, "urgency": calc_urgency(req)}
```

**Spring Boot gọi AI-CRM service:**
```java
// Trong LeadService.java — SAU KHI tạo lead
LeadScoreResponse score = webClient
    .post()
    .uri("http://ai-crm:8001/score-lead")
    .bodyValue(buildScoreRequest(lead))
    .retrieve()
    .bodyToMono(LeadScoreResponse.class)
    .block();
lead.setLeadScore(score.getScore());
```

**Tests mày tự viết:**
```python
# tests/test_scorer.py
def test_referral_source_scores_high():
    req = LeadScoreRequest(source="REFERRAL", goal="WEIGHT_LOSS",
                           has_email=True, phone_valid=True, activity_count=2)
    score = calculate_score(req)
    assert score.value >= 70
    assert score.level == "HIGH"

def test_low_info_lead_scores_low():
    req = LeadScoreRequest(source="OTHER", goal=None,
                           has_email=False, phone_valid=True, activity_count=0)
    score = calculate_score(req)
    assert score.value < 40
    assert score.level == "LOW"
```

---

### LAYER OPS — Mày tự viết files này

**`ai-crm/Dockerfile`:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
EXPOSE 8001
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
```

**`ai-crm/requirements.txt`:**
```
fastapi==0.111.0
uvicorn==0.30.0
openai==1.35.0
httpx==0.27.0
pydantic==2.7.0
pytest==8.2.0
pytest-asyncio==0.23.7
```

**Phần trong `docker-compose.yml` mày tự viết:**
```yaml
ai-crm:
  build: ./ai-crm
  ports:
    - "8001:8001"
  environment:
    - OPENAI_API_KEY=${OPENAI_API_KEY}
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:8001/health"]
    interval: 30s
    timeout: 10s
    retries: 3
```

**`.github/workflows/ci-backend.yml`** — mày tự viết:
```yaml
name: CI Backend
on:
  push:
    paths: ['backend/**', 'ai-crm/**']
jobs:
  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env: { POSTGRES_DB: fitos_test, POSTGRES_USER: test, POSTGRES_PASSWORD: test }
        options: --health-cmd pg_isready
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '21', distribution: 'temurin' }
      - run: cd backend && mvn test -Dspring.profiles.active=test

  test-ai-crm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: cd ai-crm && pip install -r requirements.txt && pytest tests/
```

---

### Tests BE mày phải tự viết (JUnit)
```java
@Test void register_with_valid_data_returns_jwt()
@Test void register_duplicate_email_throws_409()
@Test void login_wrong_password_returns_401()
@Test void refresh_with_blacklisted_token_throws_401()
@Test void disabled_user_cannot_login()
@Test void convert_lead_from_new_status_throws()
@Test void convert_lead_from_trial_creates_customer()
@Test void convert_already_converted_throws()
@Test void lead_score_set_after_create()
```

---
---

# NGƯỜI B — COMMERCE + MEMBERSHIP + AI-COMMERCE SERVICE

### LAYER DB — Mày tự viết

**File:** `V2__commerce.sql`

```sql
CREATE TABLE service_plans (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(255) NOT NULL,
  type             VARCHAR(50)  NOT NULL CHECK (type IN ('MEMBERSHIP','PT_PACKAGE')),
  price            NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  duration_days    INT,
  included_sessions INT,
  status           VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID        NOT NULL REFERENCES customers(id),
  plan_id     UUID        NOT NULL REFERENCES service_plans(id),
  status      VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
  subtotal    NUMERIC(12,2) NOT NULL,
  discount    NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total       NUMERIC(12,2) NOT NULL CHECK (total >= 0),
  created_by  UUID        REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID        NOT NULL REFERENCES orders(id),
  method     VARCHAR(50)  NOT NULL,
  reference  VARCHAR(255) UNIQUE NOT NULL,
  amount     NUMERIC(12,2) NOT NULL,
  status     VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
  paid_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE memberships (
  id          UUID   PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID   NOT NULL REFERENCES customers(id),
  plan_id     UUID   NOT NULL REFERENCES service_plans(id),
  order_id    UUID   REFERENCES orders(id),
  start_date  DATE   NOT NULL,
  end_date    DATE   NOT NULL,
  status      VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  paused_at   TIMESTAMPTZ,
  paused_days INT    NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE pt_packages (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id        UUID NOT NULL REFERENCES customers(id),
  plan_id            UUID NOT NULL REFERENCES service_plans(id),
  total_sessions     INT  NOT NULL CHECK (total_sessions > 0),
  remaining_sessions INT  NOT NULL,
  expires_at         DATE,
  status             VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_memberships_customer ON memberships(customer_id);
CREATE INDEX idx_memberships_expiry   ON memberships(end_date) WHERE status = 'ACTIVE';
CREATE INDEX idx_orders_customer      ON orders(customer_id);
```

---

### LAYER BE — Mày tự viết

```java
// Plans
GET    /api/plans              // public
GET    /api/plans/:id
POST   /api/plans              // MANAGER
PUT    /api/plans/:id
PATCH  /api/plans/:id/status

// Orders
POST   /api/orders             // server-side tính total
GET    /api/orders
GET    /api/orders/me
GET    /api/orders/:id
PATCH  /api/orders/:id/cancel

// Payments
POST   /api/payments           // tạo + trigger activation
POST   /api/payments/callback  // idempotent webhook
GET    /api/payments/me

// Memberships
GET    /api/memberships
GET    /api/memberships/me
PATCH  /api/memberships/:id/pause
PATCH  /api/memberships/:id/resume
PATCH  /api/memberships/:id/cancel
POST   /api/memberships/:id/renew
GET    /api/memberships/expiring

// PT Packages
GET    /api/pt-packages/me
PATCH  /api/pt-packages/:id/use   // idempotent decrement
```

**Mày tự viết business logic — không copy:**
```java
// Server-side price — không nhận total từ client
public Order createOrder(UUID customerId, UUID planId, BigDecimal discount) {
    ServicePlan plan = planRepo.findById(planId).orElseThrow();
    BigDecimal subtotal = plan.getPrice();
    BigDecimal disc = discount != null ? discount : BigDecimal.ZERO;
    BigDecimal total = subtotal.subtract(disc);
    if (total.compareTo(BigDecimal.ZERO) < 0)
        throw new InvalidOrderException("Total cannot be negative");
    return orderRepo.save(buildOrder(customerId, planId, subtotal, disc, total));
}

// Idempotent payment
@Transactional
public Payment processPayment(PaymentRequest req) {
    if (paymentRepo.existsByReference(req.getReference()))
        return paymentRepo.findByReference(req.getReference());
    Payment p = paymentRepo.save(buildPayment(req));
    if (p.getStatus() == PaymentStatus.SUCCESS)
        activationService.activate(req.getOrderId());
    return p;
}

// Pause/resume với date math
public void resume(UUID membershipId) {
    Membership m = membershipRepo.findPaused(membershipId);
    long days = ChronoUnit.DAYS.between(m.getPausedAt(), Instant.now());
    m.setEndDate(m.getEndDate().plusDays(days));
    m.setPausedDays((int)(m.getPausedDays() + days));
    m.setStatus(MembershipStatus.ACTIVE);
    m.setPausedAt(null);
}
```

---

### LAYER FE — Mày tự viết

```tsx
// /plans/page.tsx — public, server component
// 3 plan cards, highlight Perform, feature list, CTA

// /dashboard/plans/page.tsx — MANAGER
// Table quản lý plans, toggle status, create modal

// /dashboard/sales/page.tsx
// 4 KPI cards + transaction table

// /dashboard/create-sale/page.tsx — 3-step wizard:
// Step 1: search customer (controlled input, fetch-as-type)
// Step 2: plan card selection (useState selectedPlan)
// Step 3: order summary + payment method radio + confirm

// /dashboard/payment-confirmed/page.tsx
// Success screen: checkmark animation, receipt, countdown redirect

// /dashboard/member/payments/page.tsx
// Membership status card + payment history table
```

---

### LAYER AI — Mày tự viết `ai-commerce/`

```
ai-commerce/
├── app/
│   ├── main.py
│   ├── routers/
│   │   ├── renewal.py         ← POST /predict-renewal
│   │   └── upsell.py          ← POST /suggest-upsell
│   ├── services/
│   │   ├── renewal_predictor.py
│   │   └── llm.py
│   └── schemas.py
├── Dockerfile
└── tests/
```

**`app/routers/renewal.py`** — mày tự viết:
```python
@router.post("/predict-renewal")
async def predict_renewal(req: RenewalRequest):
    """
    Input: days_until_expiry, attendance_rate, payment_history_count,
           days_since_last_visit, plan_type
    Output: probability (0.0-1.0), risk_level, suggestion
    """
    # Rule-based scoring (không cần LLM)
    prob = calculate_renewal_probability(req)

    # Dùng LLM chỉ để generate suggestion text
    if prob < 0.5:
        suggestion = await generate_suggestion(req)
    else:
        suggestion = "Member likely to renew. Standard reminder sufficient."

    return RenewalResponse(
        probability=prob,
        risk_level="HIGH" if prob < 0.3 else "MEDIUM" if prob < 0.6 else "LOW",
        suggestion=suggestion
    )

def calculate_renewal_probability(req) -> float:
    score = 1.0
    # Penalize low attendance
    if req.attendance_rate < 0.3: score -= 0.4
    elif req.attendance_rate < 0.6: score -= 0.2
    # Penalize long absence
    if req.days_since_last_visit > 14: score -= 0.3
    elif req.days_since_last_visit > 7: score -= 0.1
    # Reward payment history
    score += min(req.payment_history_count * 0.05, 0.2)
    return max(0.0, min(1.0, score))
```

**Spring Boot gọi:**
```java
// Trong MembershipService khi load expiring memberships
RenewalPrediction pred = webClient.post()
    .uri("http://ai-commerce:8002/predict-renewal")
    .bodyValue(buildRenewalRequest(membership, customer))
    .retrieve()
    .bodyToMono(RenewalPrediction.class)
    .block();
```

**FE hiển thị:** Renewal table trong Manager Dashboard với cột "Risk" badge + "AI Suggestion" text.

---

### LAYER OPS — Mày tự viết

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app
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
# GitHub Actions — mày tự viết
name: CI Frontend + Commerce AI
on:
  push:
    paths: ['frontend/**', 'ai-commerce/**']
jobs:
  test-frontend:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: cd frontend && npm ci && npm run build

  test-ai-commerce:
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: cd ai-commerce && pip install -r requirements.txt && pytest
```

---
---

# NGƯỜI C — CLASS + BOOKING + ATTENDANCE + AI-OPERATIONS SERVICE

### LAYER DB — Mày tự viết `V3__operations.sql`

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
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  type        VARCHAR(50),
  description TEXT,
  status      VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

CREATE TABLE class_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id     UUID NOT NULL REFERENCES classes(id),
  trainer_id   UUID REFERENCES trainers(id),
  session_date DATE NOT NULL,
  start_time   TIME NOT NULL,
  end_time     TIME NOT NULL,
  room         VARCHAR(100),
  capacity     INT  NOT NULL CHECK (capacity > 0),
  booked_count INT  NOT NULL DEFAULT 0,
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
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id     UUID NOT NULL REFERENCES trainers(id),
  customer_id    UUID NOT NULL REFERENCES customers(id),
  pt_package_id  UUID REFERENCES pt_packages(id),
  scheduled_at   TIMESTAMPTZ NOT NULL,
  duration_min   INT NOT NULL DEFAULT 60,
  status         VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
  notes          TEXT,
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

---

### LAYER BE — Mày tự viết

**Booking concurrency — quan trọng nhất:**
```java
@Transactional(isolation = Isolation.READ_COMMITTED)
public Booking createBooking(UUID customerId, UUID sessionId) {
    // Validate membership (query DB trực tiếp)
    boolean hasActive = membershipRepo
        .existsByCustomerIdAndStatusAndEndDateAfter(customerId, "ACTIVE", LocalDate.now());
    if (!hasActive) throw new MembershipRequiredException();

    // Lock row
    ClassSession session = sessionRepo.findByIdWithLock(sessionId);

    // Check capacity
    if (session.getBookedCount() >= session.getCapacity())
        throw new ClassFullException();

    // Create
    session.setBookedCount(session.getBookedCount() + 1);
    sessionRepo.save(session);
    return bookingRepo.save(new Booking(customerId, sessionId));
}

// Repository
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT s FROM ClassSession s WHERE s.id = :id")
ClassSession findByIdWithLock(@Param("id") UUID id);
```

---

### LAYER FE — Mày tự viết

```tsx
// /dashboard/schedule/page.tsx
// Weekly grid 7 columns, session cards màu theo type, toggle week/list view

// /dashboard/bookings/page.tsx
// Check-in strip, stats cards, bookings table với actions

// /dashboard/trainer/page.tsx
// Timeline today, my clients table

// /dashboard/member/book/page.tsx
// Tabs Classes/PT, date strip, class cards, Book button + confirm modal
```

---

### LAYER AI — Mày tự viết `ai-operations/`

```
ai-operations/
├── app/
│   ├── main.py
│   ├── routers/
│   │   ├── schedule.py        ← POST /suggest-schedule
│   │   └── noshow.py          ← POST /predict-noshow
│   ├── services/
│   │   ├── occupancy_analyzer.py
│   │   └── llm.py
│   └── schemas.py
├── Dockerfile
└── tests/
```

**`app/routers/schedule.py`** — mày tự viết:
```python
@router.post("/suggest-schedule")
async def suggest_schedule(req: ScheduleRequest):
    """
    Input: current_week_sessions (list), historical_occupancy (dict day->avg%)
    Output: suggestions (list of {day, time, class_type, reason})
    """
    # Tìm slot trống + ít class
    gaps = find_schedule_gaps(req.current_sessions)

    # Tìm slot lịch sử có occupancy cao
    high_demand_slots = find_high_demand_slots(req.historical_occupancy)

    # LLM tổng hợp + giải thích
    prompt = f"""
    Current week has gaps at: {gaps}
    Historical high-demand slots: {high_demand_slots}

    Suggest 2-3 additional class sessions to maximize studio occupancy.
    For each suggestion provide: day, time, class_type, and reason.
    Format as JSON array.
    """
    raw = await call_llm(prompt)
    suggestions = parse_json_suggestions(raw)
    return {"suggestions": suggestions}

@router.post("/predict-noshow")
async def predict_noshow(req: NoshowRequest):
    """
    Input: days_booked_in_advance, member_noshow_history, time_of_day
    Output: noshow_probability, recommendation
    """
    prob = calculate_noshow_prob(req)
    return {"probability": prob,
            "recommendation": "Send reminder 2h before" if prob > 0.3 else "No action needed"}
```

---

### LAYER OPS — Mày tự viết

```dockerfile
# ai-operations/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
EXPOSE 8003
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8003"]
```

**Mày viết phần infrastructure trong `docker-compose.yml`:**
```yaml
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: ${DB_NAME:-fitos}
    POSTGRES_USER: ${DB_USER:-fitos}
    POSTGRES_PASSWORD: ${DB_PASS}
  volumes:
    - postgres_data:/var/lib/postgresql/data
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U ${DB_USER:-fitos}"]
    interval: 10s
    retries: 5

redis:
  image: redis:7-alpine
  volumes:
    - redis_data:/data
  command: redis-server --appendonly yes

ai-operations:
  build: ./ai-operations
  ports:
    - "8003:8003"
  environment:
    - OPENAI_API_KEY=${OPENAI_API_KEY}
    - DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@postgres:5432/${DB_NAME}

volumes:
  postgres_data:
  redis_data:
```

```yaml
# .github/workflows/ci-integration.yml — mày tự viết
name: Integration Tests
on: [push]
jobs:
  integration-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env: { POSTGRES_DB: fitos_test, POSTGRES_USER: test, POSTGRES_PASSWORD: test }
        options: --health-cmd "pg_isready -U test" --health-interval 10s
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '21', distribution: 'temurin' }
      - name: Run integration tests
        run: cd backend && mvn test -Dtest=*IntegrationTest -Dspring.profiles.active=test
      - name: Test concurrent booking
        run: cd backend && mvn test -Dtest=BookingConcurrencyTest
```

---
---

# NGƯỜI D — WORKOUT + PROGRESS + AI-WORKOUT SERVICE

### LAYER DB — Mày tự viết `V4__workout.sql`

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
  day_number    INT  NOT NULL CHECK (day_number BETWEEN 1 AND 7),
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
  set_number     INT  NOT NULL,
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

CREATE INDEX idx_workout_sessions_customer ON workout_sessions(customer_id, performed_at);
CREATE INDEX idx_workout_logs_session      ON workout_logs(session_id);
```

---

### LAYER BE — Mày tự viết

```java
GET    /api/exercises
POST   /api/exercises
PUT    /api/exercises/:id

POST   /api/workout-plans
GET    /api/workout-plans
GET    /api/workout-plans/:id
PUT    /api/workout-plans/:id
PATCH  /api/workout-plans/:id/activate
PATCH  /api/workout-plans/:id/complete

POST   /api/workout-sessions
PATCH  /api/workout-sessions/:id/complete
GET    /api/workout-sessions/me

POST   /api/workout-logs
GET    /api/workout-sessions/:id/logs

POST   /api/body-metrics
GET    /api/body-metrics/me

GET    /api/progress/me

POST   /api/ai/chat
GET    /api/ai/conversations/me
POST   /api/ai/recommend
PATCH  /api/ai/recommendations/:id/accept
PATCH  /api/ai/recommendations/:id/dismiss

GET    /api/dashboard/stats
GET    /api/dashboard/revenue-chart
GET    /api/reports/sales
GET    /api/reports/memberships
```

---

### LAYER FE — Mày tự viết

```tsx
// /dashboard/member/page.tsx — member home
// /dashboard/workout-builder/page.tsx — trainer workout builder
// /dashboard/member/progress/page.tsx — pure CSS bar chart
// /dashboard/member/ai-coach/page.tsx — chat UI
// /dashboard/page.tsx — manager dashboard KPIs + charts
// /dashboard/reports/page.tsx — reports tabs
```

**Pure CSS bar chart — mày tự viết (không dùng recharts):**
```tsx
// Không import bất kỳ chart library nào
const WeeklyChart = ({ data }: { data: number[] }) => (
  <div className="flex items-end gap-2 h-32">
    {data.map((count, i) => (
      <div key={i} className="flex flex-col items-center gap-1 flex-1">
        <div
          className="w-full bg-[#D7FF3F] rounded-t-sm"
          style={{ height: `${(count / Math.max(...data)) * 100}%` }}
        />
        <span className="text-xs text-[#8A8E85]">W{i + 1}</span>
      </div>
    ))}
  </div>
);
```

---

### LAYER AI — Mày tự viết `ai-workout/`

```
ai-workout/
├── app/
│   ├── main.py
│   ├── routers/
│   │   ├── chat.py            ← POST /chat
│   │   ├── recommend.py       ← POST /recommend
│   │   └── progress.py        ← POST /progress-summary
│   ├── services/
│   │   ├── context_loader.py  ← load customer fitness data
│   │   ├── llm.py             ← OpenAI call
│   │   ├── safety_filter.py   ← block medical advice
│   │   └── prompt_builder.py
│   └── schemas.py
├── Dockerfile
└── tests/
    ├── test_safety_filter.py
    ├── test_context_loader.py
    └── test_chat.py
```

**`app/services/context_loader.py`** — mày tự viết:
```python
async def load_customer_context(customer_id: str, db) -> dict:
    """
    Load toàn bộ fitness context để inject vào LLM.
    Quan trọng: chỉ load data của đúng customer_id này.
    """
    # Query active workout plan
    plan = await db.fetchrow("""
        SELECT wp.goal, wp.notes,
               json_agg(json_build_object(
                 'day', wpe.day_number,
                 'exercise', e.name,
                 'sets', wpe.sets,
                 'reps', wpe.reps
               )) as exercises
        FROM workout_plans wp
        JOIN workout_plan_exercises wpe ON wpe.plan_id = wp.id
        JOIN exercises e ON e.id = wpe.exercise_id
        WHERE wp.customer_id = $1 AND wp.status = 'ACTIVE'
        GROUP BY wp.id
    """, customer_id)

    # Query last 10 sessions
    sessions = await db.fetch("""
        SELECT ws.performed_at,
               json_agg(json_build_object(
                 'exercise', e.name,
                 'sets', wl.set_number,
                 'reps', wl.reps_completed,
                 'weight', wl.weight
               )) as logs
        FROM workout_sessions ws
        JOIN workout_logs wl ON wl.session_id = ws.id
        JOIN exercises e ON e.id = wl.exercise_id
        WHERE ws.customer_id = $1
        ORDER BY ws.performed_at DESC
        LIMIT 10
    """, customer_id)

    return {
        "active_plan": dict(plan) if plan else None,
        "recent_sessions": [dict(s) for s in sessions],
    }
```

**`app/services/safety_filter.py`** — mày tự viết:
```python
BLOCKED_TERMS = [
    "diagnose", "diagnosis", "prescription", "medication",
    "disease", "symptom", "medical condition", "treatment",
    "doctor", "cure", "therapy", "clinical"
]

def check_safety(message: str) -> str | None:
    """Returns warning message if blocked, None if safe"""
    msg_lower = message.lower()
    if any(term in msg_lower for term in BLOCKED_TERMS):
        return ("This appears to be a medical question. "
                "FITOS AI Coach provides fitness guidance only. "
                "Please consult a qualified healthcare professional.")
    return None
```

**`app/routers/chat.py`** — mày tự viết:
```python
@router.post("/chat")
async def chat(req: ChatRequest, db=Depends(get_db)):
    # Safety check trước
    warning = check_safety(req.message)
    if warning:
        return ChatResponse(reply=warning, blocked=True)

    # Load context
    ctx = await load_customer_context(req.customer_id, db)

    # Build messages
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "system", "content": f"Customer fitness context:\n{json.dumps(ctx, indent=2)}"},
        # Load conversation history
        *[{"role": m.role, "content": m.content} for m in req.history[-10:]],
        {"role": "user", "content": req.message}
    ]

    response = await openai_client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=500
    )
    return ChatResponse(reply=response.choices[0].message.content, blocked=False)
```

**Tests mày tự viết:**
```python
# test_safety_filter.py
def test_medical_question_blocked():
    result = check_safety("Can you diagnose my knee pain?")
    assert result is not None  # blocked

def test_fitness_question_allowed():
    result = check_safety("How many sets should I do for squats?")
    assert result is None  # safe

def test_borderline_question():
    result = check_safety("My back hurts after deadlifts, what should I do?")
    # Phải decide: block hay không? Document quyết định của mày

# test_context_loader.py
async def test_context_only_loads_own_data():
    ctx_a = await load_customer_context(customer_a_id, db)
    ctx_b = await load_customer_context(customer_b_id, db)
    # Verify data không bị cross-contaminate
    assert ctx_a["active_plan"] != ctx_b["active_plan"]
```

---

### LAYER OPS — Mày tự viết

```dockerfile
# backend/Dockerfile — mày viết cái này
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine AS runner
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=10s \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1
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
# .github/workflows/cd-deploy.yml — mày viết cái này
name: CD Deploy
on:
  push:
    branches: [main]
jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push all images
        run: |
          docker build -t ghcr.io/${{ github.repository }}/backend:${{ github.sha }} ./backend
          docker build -t ghcr.io/${{ github.repository }}/frontend:${{ github.sha }} ./frontend
          docker build -t ghcr.io/${{ github.repository }}/ai-workout:${{ github.sha }} ./ai-workout
          docker push ghcr.io/${{ github.repository }}/backend:${{ github.sha }}
          docker push ghcr.io/${{ github.repository }}/frontend:${{ github.sha }}
          docker push ghcr.io/${{ github.repository }}/ai-workout:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Railway
        run: curl -X POST "${{ secrets.RAILWAY_DEPLOY_WEBHOOK }}"
```

---
---

# BẢNG KIỂM TRA CUỐI

> Trước demo, mỗi người mở bảng này và tick. Nếu ô nào chưa tick → chưa xong.

### Người A
- [ ] **DB**: Tự viết `V1__auth_crm.sql` với đủ 5 tables + indexes
- [ ] **BE**: Tự viết JWT filter, AuthService, LeadService, convert logic, AOP audit
- [ ] **FE**: Tự viết /login, /register, AuthContext, /dashboard/leads, /dashboard/leads/:id
- [ ] **AI**: Tự viết `ai-crm/` service với `/score-lead` và `/suggest-followup` endpoints
- [ ] **OPS**: Tự viết `ai-crm/Dockerfile`, stanza trong docker-compose, `.github/workflows/ci-backend.yml`

### Người B
- [ ] **DB**: Tự viết `V2__commerce.sql` với 5 tables + indexes + constraints
- [ ] **BE**: Tự viết server-side pricing, payment idempotency, membership pause/resume
- [ ] **FE**: Tự viết /plans, /dashboard/create-sale (3-step wizard), /dashboard/payment-confirmed
- [ ] **AI**: Tự viết `ai-commerce/` service với `/predict-renewal` và `/suggest-upsell`
- [ ] **OPS**: Tự viết `frontend/Dockerfile`, `ai-commerce/Dockerfile`, `.github/workflows/ci-frontend.yml`

### Người C
- [ ] **DB**: Tự viết `V3__operations.sql` với bookings UNIQUE constraint + denormalized booked_count
- [ ] **BE**: Tự viết SELECT FOR UPDATE booking, idempotent PT complete, check-in validation
- [ ] **FE**: Tự viết /dashboard/schedule (7-col grid), /dashboard/bookings, /dashboard/member/book
- [ ] **AI**: Tự viết `ai-operations/` service với `/suggest-schedule` và `/predict-noshow`
- [ ] **OPS**: Tự viết postgres+redis trong docker-compose, `ai-operations/Dockerfile`, `.github/workflows/ci-integration.yml`

### Người D
- [ ] **DB**: Tự viết `V4__workout.sql` với JSONB cho ai_recommendations
- [ ] **BE**: Tự viết progress computation, streak calc, personal records query, AI proxy endpoints
- [ ] **FE**: Tự viết member home, workout builder, progress page với pure CSS chart, AI chat UI
- [ ] **AI**: Tự viết `ai-workout/` service với context_loader, safety_filter, chat, recommend
- [ ] **OPS**: Tự viết `backend/Dockerfile`, `ai-workout/Dockerfile`, `.github/workflows/cd-deploy.yml`

---

# CÂU HỎI VẤND ĐÁP — TỪNG NGƯỜI PHẢI TRẢ LỜI ĐƯỢC HẾT

### Người A
1. Tại sao dùng UUID thay INT làm primary key?
2. JWT access token 15 phút + refresh token 7 ngày — tại sao chia vậy?
3. Redis blacklist logout token — không dùng Redis thì làm thế nào?
4. State machine của lead: tại sao NEW không được convert thẳng?
5. AOP @Around aspect — khi nào chạy, có side effect gì không?
6. lead_score tính thế nào trong Python service của mày?
7. CI job của mày test cái gì, khi nào trigger?

### Người B
1. Tại sao total phải tính server-side, không nhận từ client?
2. `reference UNIQUE` trong payments giải quyết vấn đề gì?
3. Nếu không có Redis, idempotency check bằng cách nào khác?
4. pause/resume membership: end_date tính thế nào?
5. Service activation tách khỏi payment logic — tại sao?
6. renewal_probability trong Python service của mày tính thế nào?
7. Multi-stage Dockerfile giảm image size thế nào?

### Người C
1. Concurrency problem trong booking là gì, xảy ra như thế nào?
2. SELECT FOR UPDATE là gì? Tại sao cần nếu đã có UNIQUE constraint?
3. UNIQUE constraint vs SELECT FOR UPDATE — cái nào làm gì?
4. booked_count denormalized — rủi ro gì, handle thế nào?
5. idempotent PT complete với completion_ref UUID — giải thích flow?
6. /suggest-schedule trong AI service của mày làm gì?
7. Integration test trong CI của mày chạy với DB thật hay mock?

### Người D
1. Tại sao dùng JSONB cho suggested_changes thay vì column riêng?
2. Context injection là gì, tại sao cần thiết khi gọi LLM?
3. Safety filter — dùng keyword matching hay LLM để detect?
4. Streak calculation — algorithm thế nào?
5. Personal records query — SQL thế nào để lấy max weight per exercise?
6. Pure CSS chart — tại sao không dùng recharts?
7. CD pipeline: push code → production xảy ra những bước gì?

---

*Version 4.0 — Mỗi người TỰ LÀM đủ 5 layer, không phụ thuộc người khác.*
*Mỗi người có Python AI service riêng (port khác nhau: A=8001, B=8002, C=8003, D=8004)*
