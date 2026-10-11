# FITOS — PHÂN CÔNG 4 NGƯỜI × 5 TUẦN
# (Mỗi người bắt buộc đụng: DB + BE + FE + AI + OPS)

---

## NGUYÊN TẮC PHÂN CÔNG

> **Mỗi người = 1 feature nhỏ × đủ 5 layer = DB + BE + FE + AI tích hợp + OPS**
>
> Không ai được chỉ làm FE hoặc chỉ làm BE.
> Mỗi feature được giao cho 1 người, người đó tự lo từ schema → API → UI → AI hook → Dockerfile → test.
> Khi vấn đáp, hỏi bất kỳ layer nào trong feature của mình → phải trả lời được.

### 5 Layer bắt buộc mỗi người phải có trong CV

| Layer | Tối thiểu phải làm |
|-------|--------------------|
| **DB** | Viết SQL schema, Flyway migration, index |
| **BE** | Spring Boot Controller + Service + Repository + Business logic |
| **FE** | Next.js page + component + Tailwind + state management |
| **AI** | Gọi AI service (Python FastAPI) hoặc viết AI service hoặc dùng AI output trong FE |
| **OPS** | Viết Dockerfile, docker-compose service, GitHub Actions job |

---

## TỔNG QUAN PHÂN CÔNG

```
┌──────────┬────────────────────────────────┬───────────────────────────────────────────┐
│ Người    │ Feature chính                  │ Tất cả layer đều đụng                     │
├──────────┼────────────────────────────────┼───────────────────────────────────────────┤
│ Người A  │ Auth + CRM Lead                │ DB:users/leads  BE:JWT/RBAC  FE:login/CRM │
│          │                                │ AI:lead scoring  OPS:Dockerfile backend   │
├──────────┼────────────────────────────────┼───────────────────────────────────────────┤
│ Người B  │ Commerce + Membership          │ DB:orders/memberships  BE:payment flow    │
│          │                                │ FE:sales/membership  AI:renewal predict   │
│          │                                │ OPS:Dockerfile frontend + deploy          │
├──────────┼────────────────────────────────┼───────────────────────────────────────────┤
│ Người C  │ Class + Booking + Attendance   │ DB:sessions/bookings  BE:concurrency      │
│          │                                │ FE:schedule/checkin  AI:schedule suggest  │
│          │                                │ OPS:docker-compose + CI test job          │
├──────────┼────────────────────────────────┼───────────────────────────────────────────┤
│ Người D  │ Workout + Progress + AI Coach  │ DB:workout/ai tables  BE:workout API      │
│          │                                │ FE:workout/progress  AI:FastAPI service   │
│          │                                │ OPS:AI Dockerfile + CD deploy pipeline    │
└──────────┴────────────────────────────────┴───────────────────────────────────────────┘
```

---

## CHECKLIST 5 LAYER — MỖI NGƯỜI TỰ KIỂM TRA

Trước khi nộp, mỗi người tick đủ 5 ô này:

```
Người A:  [ ] DB  [ ] BE  [ ] FE  [ ] AI  [ ] OPS
Người B:  [ ] DB  [ ] BE  [ ] FE  [ ] AI  [ ] OPS
Người C:  [ ] DB  [ ] BE  [ ] FE  [ ] AI  [ ] OPS
Người D:  [ ] DB  [ ] BE  [ ] FE  [ ] AI  [ ] OPS
```

---

---

# NGƯỜI A — AUTH + CRM LEAD

## Layer DB (bắt buộc)

**File:** `backend/src/main/resources/db/migration/V1__auth_crm.sql`

```sql
-- USERS
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          VARCHAR(50)  NOT NULL CHECK (role IN ('ADMIN','MANAGER','RECEPTIONIST','TRAINER','CUSTOMER')),
  status        VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- LEADS
CREATE TABLE leads (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    VARCHAR(255) NOT NULL,
  phone        VARCHAR(20)  NOT NULL,
  email        VARCHAR(255),
  goal         VARCHAR(50),   -- WEIGHT_LOSS | MUSCLE_GAIN | STRENGTH | GENERAL_FITNESS
  source       VARCHAR(50),   -- WALK_IN | FACEBOOK | INSTAGRAM | REFERRAL | WEBSITE
  status       VARCHAR(50)  NOT NULL DEFAULT 'NEW',
  assigned_to  UUID REFERENCES users(id),
  notes        TEXT,
  lead_score   INT DEFAULT 0,  -- AI scoring field
  created_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- LEAD ACTIVITIES
CREATE TABLE lead_activities (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id   UUID NOT NULL REFERENCES leads(id),
  actor_id  UUID NOT NULL REFERENCES users(id),
  type      VARCHAR(50) NOT NULL,  -- CALL | MESSAGE | CONSULTATION | TRIAL | FOLLOW_UP
  note      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CUSTOMERS (sau khi convert lead)
CREATE TABLE customers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID REFERENCES users(id),
  full_name    VARCHAR(255) NOT NULL,
  phone        VARCHAR(20),
  email        VARCHAR(255),
  goal         VARCHAR(50),
  lead_id      UUID REFERENCES leads(id),  -- giữ lịch sử lead
  joined_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AUDIT LOG
CREATE TABLE audit_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    UUID REFERENCES users(id),
  action      VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id   UUID,
  metadata    JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_status   ON leads(status);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
```

**Giải thích khi vấn đáp:** "Tôi dùng UUID thay INT để tránh enumerable IDs, CHECK constraint cho role để DB-level validation, lead_score là INT cho AI scoring sau này."

---

## Layer BE (bắt buộc)

**Package:** `com.fitos.auth`, `com.fitos.crm`

### Auth endpoints
```
POST   /api/auth/register          - tạo user, hash BCrypt, trả JWT
POST   /api/auth/login             - verify password, trả access(15m) + refresh(7d)
POST   /api/auth/refresh           - dùng refresh token → access token mới
POST   /api/auth/logout            - blacklist refresh token vào Redis
POST   /api/auth/forgot-password   - tạo reset token, mock email
POST   /api/auth/reset-password    - validate token, đổi password
PUT    /api/auth/change-password   - đổi password khi đang login
```

**JWT Filter logic:**
```java
// JwtAuthFilter.java
// 1. Đọc header Authorization: Bearer <token>
// 2. Verify signature + expiry
// 3. Load UserDetails từ DB
// 4. Set SecurityContextHolder
```

**RBAC:**
```java
@PreAuthorize("hasRole('MANAGER')")
public ResponseEntity<?> createLead(...) { ... }
```

**Global Exception Handler:**
```java
@RestControllerAdvice
// Bắt NotFoundException → 404
// Bắt AccessDeniedException → 403
// Không để 500 leak stack trace ra client
```

**AuditLog AOP:**
```java
@Around("@annotation(Auditable)")
// Tự động ghi audit_logs sau mỗi action quan trọng
```

### CRM endpoints
```
POST   /api/leads                  - tạo lead
GET    /api/leads                  - list + filter(status,source) + search(name,phone) + pagination
GET    /api/leads/:id              - detail + activity timeline
PUT    /api/leads/:id              - cập nhật
PATCH  /api/leads/:id/status       - đổi status (validate transition)
POST   /api/leads/:id/activities   - thêm activity
PATCH  /api/leads/:id/assign       - gán staff
POST   /api/leads/:id/convert      - convert → tạo Customer + User account
PATCH  /api/leads/:id/lost         - mark lost
GET    /api/customers              - list + filter
GET    /api/customers/:id          - full profile (join membership/bookings/payments từ module khác)
PUT    /api/customers/:id          - edit
GET    /api/users                  - (ADMIN) list
PATCH  /api/users/:id/role         - change role
PATCH  /api/users/:id/disable      - disable
```

**Convert Lead — business logic quan trọng nhất:**
```
Validate: lead.status IN [INTERESTED, TRIAL]
→ Tạo Customer record
→ Tạo User account (role=CUSTOMER)
→ Mock send invitation email
→ lead.status = CONVERTED
→ GIỮ NGUYÊN lead_activities (không xóa)
→ Ghi audit_log
```

---

## Layer FE (bắt buộc)

**Pages và components mày tự viết:**

```
/login
  - Form email + password
  - Submit → POST /api/auth/login → lưu token httpOnly cookie
  - Redirect theo role (MANAGER→/dashboard, CUSTOMER→/dashboard/member)

/register
  - Fields: name, email, password, role selector (Member/Staff)
  - Submit → POST /api/auth/register

src/context/AuthContext.tsx
  - Provider: expose user, role, isLoading, logout
  - Đọc token từ cookie, call GET /api/auth/me

src/components/ProtectedRoute.tsx
  - Redirect /login nếu chưa auth

src/components/RoleGuard.tsx
  - Props: role="MANAGER"
  - Ẩn children nếu user không có role đó

/dashboard/leads
  - Filter tabs: All | New | Contacted | Trial | Converted | Lost
  - Search input (debounce 300ms)
  - Data table: name, phone, source, status badge, assigned to, actions

/dashboard/leads/create
  - Form: name*, phone*, email, source dropdown, goal dropdown, notes

/dashboard/leads/:id
  - Card: thông tin lead + edit
  - Timeline: activity list (cuộn được)
  - Modal: Add activity (type, note)
  - Action buttons: Contact / Schedule Trial / Convert / Mark Lost

/dashboard/customers
  - Table với plan badge, expiry, status

/dashboard/customers/:id
  - 6 tabs: Overview | Membership | Bookings | Workouts | Payments | Activity
```

---

## Layer AI (bắt buộc)

**Mày làm: Lead Scoring tự động**

```
Khi tạo/cập nhật lead → gọi AI service để tính lead_score (0-100)
Score cao → ưu tiên follow-up hơn
```

**Spring Boot gọi AI:**
```java
// LeadService.java
public Lead createLead(LeadRequest req) {
    Lead lead = leadRepo.save(mapToEntity(req));

    // Gọi AI service để score lead
    int score = aiClient.scoreLead(AiScoreRequest.builder()
        .goal(lead.getGoal())
        .source(lead.getSource())
        .hasEmail(lead.getEmail() != null)
        .hasPhone(true)
        .build());

    lead.setLeadScore(score);
    return leadRepo.save(lead);
}
```

**AI service endpoint mày gọi** (Người D viết service, mày tích hợp):
```
POST /ai/score-lead
Body: { goal, source, hasEmail, hasPhone }
Response: { score: 75, reason: "High intent source with clear goal" }
```

**FE hiển thị:** Score badge màu (0-40 red, 41-70 yellow, 71-100 green) trên lead card và table.

---

## Layer OPS (bắt buộc)

**File mày tự viết:**

```dockerfile
# backend/Dockerfile
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```yaml
# Phần backend trong docker-compose.yml
backend:
  build: ./backend
  ports:
    - "8080:8080"
  environment:
    - SPRING_DATASOURCE_URL=${DB_URL}
    - SPRING_DATASOURCE_USERNAME=${DB_USER}
    - SPRING_DATASOURCE_PASSWORD=${DB_PASS}
    - JWT_SECRET=${JWT_SECRET}
    - REDIS_URL=${REDIS_URL}
  depends_on:
    - postgres
    - redis
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
```

```yaml
# .github/workflows/ci.yml — job của mày
jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '21' }
      - run: cd backend && mvn test
      - run: cd backend && mvn package -DskipTests
```

---

## Tests mày phải viết

```java
// AuthServiceTest.java
@Test void register_success()
@Test void register_duplicate_email_throws()
@Test void login_wrong_password_throws()
@Test void refresh_token_expired_throws()
@Test void disabled_user_cannot_login()

// LeadServiceTest.java
@Test void convert_lead_creates_customer()
@Test void convert_already_converted_throws()
@Test void lead_score_assigned_after_create()
@Test void lost_lead_cannot_be_converted()
```

---

## Mày nói gì khi vấn đáp / ghi CV

```
DB    → "Thiết kế schema users/leads với UUID PK, CHECK constraint role, index status+assigned_to"
BE    → "JWT access+refresh token, Redis blacklist logout, RBAC @PreAuthorize, AOP audit log"
FE    → "AuthContext với httpOnly cookie, ProtectedRoute redirect, RoleGuard hide UI"
AI    → "Lead scoring: gọi AI service để tự động tính điểm ưu tiên follow-up, hiển thị badge màu"
OPS   → "Multi-stage Dockerfile giảm image size, healthcheck, GitHub Actions test backend"
```

---
---

# NGƯỜI B — COMMERCE + MEMBERSHIP

## Layer DB (bắt buộc)

**File:** `V2__commerce.sql`

```sql
-- PLANS
CREATE TABLE service_plans (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             VARCHAR(255) NOT NULL,
  type             VARCHAR(50)  NOT NULL CHECK (type IN ('MEMBERSHIP','PT_PACKAGE')),
  description      TEXT,
  price            NUMERIC(12,2) NOT NULL CHECK (price >= 0),
  duration_days    INT,
  included_sessions INT,
  status           VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ORDERS
CREATE TABLE orders (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id  UUID NOT NULL REFERENCES customers(id),
  plan_id      UUID NOT NULL REFERENCES service_plans(id),
  status       VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  subtotal     NUMERIC(12,2) NOT NULL,
  discount     NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
  total        NUMERIC(12,2) NOT NULL CHECK (total >= 0),
  created_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PAYMENTS
CREATE TABLE payments (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID NOT NULL REFERENCES orders(id),
  method     VARCHAR(50) NOT NULL,
  reference  VARCHAR(255) UNIQUE NOT NULL,  -- idempotency key
  amount     NUMERIC(12,2) NOT NULL,
  status     VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  paid_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MEMBERSHIPS
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

-- PT PACKAGES
CREATE TABLE pt_packages (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id        UUID NOT NULL REFERENCES customers(id),
  plan_id            UUID NOT NULL REFERENCES service_plans(id),
  order_id           UUID REFERENCES orders(id),
  total_sessions     INT NOT NULL CHECK (total_sessions > 0),
  remaining_sessions INT NOT NULL,
  expires_at         DATE,
  status             VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_memberships_customer ON memberships(customer_id);
CREATE INDEX idx_memberships_status   ON memberships(status);
CREATE INDEX idx_orders_customer      ON orders(customer_id);
```

**Giải thích vấn đáp:** "Tôi để `reference UNIQUE` trong payments để DB tự enforce idempotency — dù application có bug gọi 2 lần thì DB constraint sẽ reject cái thứ 2."

---

## Layer BE (bắt buộc)

```
GET    /api/plans              - list plans (public)
GET    /api/plans/:id          - detail
POST   /api/plans              - tạo (MANAGER)
PUT    /api/plans/:id          - cập nhật (MANAGER)
PATCH  /api/plans/:id/status   - toggle active/inactive

POST   /api/orders             - tạo order (server-side tính total)
GET    /api/orders             - list (MANAGER/RECEPTIONIST)
GET    /api/orders/me          - own orders (CUSTOMER)
GET    /api/orders/:id         - detail
PATCH  /api/orders/:id/cancel  - cancel (chỉ PENDING)

POST   /api/payments           - tạo payment + trigger activation
POST   /api/payments/callback  - webhook (idempotent)
GET    /api/payments           - list
GET    /api/payments/me        - own payments

GET    /api/memberships        - list (MANAGER)
GET    /api/memberships/me     - own (CUSTOMER)
GET    /api/memberships/:id    - detail
PATCH  /api/memberships/:id/pause
PATCH  /api/memberships/:id/resume
PATCH  /api/memberships/:id/cancel
POST   /api/memberships/:id/renew
GET    /api/memberships/expiring   - sắp hết hạn 7 ngày

GET    /api/pt-packages/me     - own PT packages
PATCH  /api/pt-packages/:id/use - decrement session (idempotent)
```

**Business logic quan trọng — Server-side price:**
```java
// OrderService.java — KHÔNG nhận total từ client
public Order createOrder(UUID customerId, UUID planId, BigDecimal discountAmount) {
    ServicePlan plan = planRepo.findById(planId).orElseThrow();
    BigDecimal subtotal = plan.getPrice();
    BigDecimal discount = discountAmount != null ? discountAmount : BigDecimal.ZERO;
    BigDecimal total = subtotal.subtract(discount);
    if (total.compareTo(BigDecimal.ZERO) < 0) throw new InvalidOrderException("Total cannot be negative");
    // tạo order...
}
```

**Payment idempotency:**
```java
// PaymentService.java
@Transactional
public Payment processPayment(PaymentRequest req) {
    // DB UNIQUE constraint đã block duplicate reference
    // Nhưng cũng check thêm ở application layer
    if (paymentRepo.existsByReference(req.getReference())) {
        return paymentRepo.findByReference(req.getReference());
    }
    Payment payment = createPayment(req);
    if (payment.getStatus() == SUCCESS) {
        serviceActivationService.activate(req.getOrderId());
    }
    return payment;
}
```

**Membership pause/resume:**
```java
public void pause(UUID membershipId) {
    Membership m = findActive(membershipId);
    m.setStatus(PAUSED);
    m.setPausedAt(Instant.now());
}

public void resume(UUID membershipId) {
    Membership m = findPaused(membershipId);
    long daysPaused = ChronoUnit.DAYS.between(m.getPausedAt(), Instant.now());
    m.setEndDate(m.getEndDate().plusDays(daysPaused));  // cộng thêm số ngày đã pause
    m.setPausedDays((int)(m.getPausedDays() + daysPaused));
    m.setStatus(ACTIVE);
}
```

**MembershipValidator — Người C dùng:**
```java
@Component
public class MembershipValidator {
    public void requireActive(UUID customerId) {
        boolean active = membershipRepo.existsActiveByCustomerId(customerId);
        if (!active) throw new MembershipRequiredException();
    }
}
```

---

## Layer FE (bắt buộc)

```
/plans  (public page)
  - 3 plan cards: Move | Perform (highlighted) | PT Focus
  - Price, features list, "Get started" button
  - "NO JOINING FEE" badge

/dashboard/plans  (MANAGER)
  - Table: name, type, price, status toggle
  - Create plan form modal

/dashboard/sales  (RECEPTIONIST)
  - KPI cards: Today Revenue | Month Revenue | Pending Orders
  - Transactions table: customer, plan, amount, method, status, date

/dashboard/create-sale  (RECEPTIONIST)
  - Step 1: Search customer (search by name/phone, show results dropdown)
  - Step 2: Plan cards (click to select, lime border on selected)
  - Step 3: Order summary + Payment method (Cash/Bank/Sandbox) + Confirm button

/dashboard/payment-confirmed
  - ✓ checkmark (lime circle, 80px)
  - "Payment confirmed!" heading
  - Receipt card: member, plan, amount, method, date, receipt number
  - Buttons: Print receipt | Back to sales
  - Auto-redirect countdown: "Back in 10s..."

/dashboard/member/payments  (CUSTOMER)
  - Membership card: plan name, status badge, expiry date, "Pause" / "Cancel" buttons
  - Payment history table: date, description, amount, status
```

---

## Layer AI (bắt buộc)

**Mày làm: Renewal Risk Prediction**

Khi Manager vào dashboard xem expiring members, mỗi member có thêm AI-predicted renewal probability.

**Spring Boot gọi AI:**
```java
// RenewalService.java
public List<RenewalRisk> getExpiringWithRisk() {
    List<Membership> expiring = membershipRepo.findExpiringIn7Days();

    return expiring.stream().map(m -> {
        // Lấy thêm data: attendance rate, payment history, last active
        RenewalContext ctx = buildContext(m.getCustomerId());

        // Gọi AI
        RenewalPrediction pred = aiClient.predictRenewal(ctx);

        return RenewalRisk.builder()
            .membership(m)
            .renewalProbability(pred.getProbability())  // 0.0 - 1.0
            .riskLevel(pred.getRiskLevel())             // LOW/MEDIUM/HIGH
            .suggestion(pred.getSuggestion())           // "Offer 10% discount"
            .build();
    }).toList();
}
```

**FE hiển thị:** Renewal risk table trong dashboard — cột "Risk" có badge LOW/MEDIUM/HIGH màu, cột "AI Suggestion" hiển thị text gợi ý.

---

## Layer OPS (bắt buộc)

```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```yaml
# Phần frontend trong docker-compose.yml
frontend:
  build: ./frontend
  ports:
    - "3000:3000"
  environment:
    - NEXT_PUBLIC_API_URL=http://backend:8080
  depends_on:
    - backend
```

```yaml
# GitHub Actions job của mày
test-frontend:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: '20' }
    - run: cd frontend && npm ci
    - run: cd frontend && npm run build

deploy-frontend:
  needs: test-frontend
  steps:
    - run: echo "Deploy to Vercel or Railway"
```

---

## Tests mày phải viết

```java
@Test void order_total_calculated_server_side()
@Test void order_total_cannot_be_negative()
@Test void payment_idempotency_duplicate_reference()
@Test void payment_success_creates_membership()
@Test void membership_pause_resume_date_correct()
@Test void pt_session_use_decrements_once()
```

---

## Mày nói gì khi vấn đáp / ghi CV

```
DB  → "UNIQUE constraint trên payment.reference enforce idempotency ở DB level"
BE  → "Server-side price calculation, payment idempotency, membership pause/resume với date math"
FE  → "3-step sale wizard, payment method selector, receipt screen với auto-redirect"
AI  → "Renewal risk prediction: AI tính xác suất gia hạn dựa trên attendance + payment history"
OPS → "Multi-stage Next.js Dockerfile với standalone output, deploy Vercel/Railway"
```

---
---

# NGƯỜI C — CLASS + BOOKING + ATTENDANCE

## Layer DB (bắt buộc)

**File:** `V3__operations.sql`

```sql
-- TRAINERS
CREATE TABLE trainers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID UNIQUE REFERENCES users(id),
  full_name      VARCHAR(255) NOT NULL,
  specialization VARCHAR(255),
  bio            TEXT,
  status         VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

-- TRAINER ASSIGNMENTS
CREATE TABLE trainer_assignments (
  trainer_id  UUID NOT NULL REFERENCES trainers(id),
  customer_id UUID NOT NULL REFERENCES customers(id),
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (trainer_id, customer_id)
);

-- CLASSES
CREATE TABLE classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        VARCHAR(255) NOT NULL,
  type        VARCHAR(50),   -- YOGA | HIIT | CYCLING | STRENGTH | BOXING
  description TEXT,
  status      VARCHAR(20) NOT NULL DEFAULT 'ACTIVE'
);

-- CLASS SESSIONS (lịch cụ thể)
CREATE TABLE class_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id     UUID NOT NULL REFERENCES classes(id),
  trainer_id   UUID REFERENCES trainers(id),
  session_date DATE NOT NULL,
  start_time   TIME NOT NULL,
  end_time     TIME NOT NULL,
  room         VARCHAR(100),
  capacity     INT NOT NULL CHECK (capacity > 0),
  booked_count INT NOT NULL DEFAULT 0 CHECK (booked_count >= 0),
  status       VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED'
);

-- BOOKINGS
CREATE TABLE bookings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      UUID NOT NULL REFERENCES customers(id),
  class_session_id UUID NOT NULL REFERENCES class_sessions(id),
  status           VARCHAR(20) NOT NULL DEFAULT 'CONFIRMED',
  booked_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cancelled_at     TIMESTAMPTZ,
  UNIQUE (customer_id, class_session_id)  -- chặn duplicate ở DB level
);

-- PT SESSIONS
CREATE TABLE pt_sessions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id     UUID NOT NULL REFERENCES trainers(id),
  customer_id    UUID NOT NULL REFERENCES customers(id),
  pt_package_id  UUID REFERENCES pt_packages(id),
  scheduled_at   TIMESTAMPTZ NOT NULL,
  duration_min   INT NOT NULL DEFAULT 60,
  status         VARCHAR(20) NOT NULL DEFAULT 'SCHEDULED',
  notes          TEXT,
  completion_ref UUID UNIQUE DEFAULT gen_random_uuid()  -- idempotency khi complete
);

-- ATTENDANCE
CREATE TABLE attendance (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      UUID NOT NULL REFERENCES customers(id),
  class_session_id UUID REFERENCES class_sessions(id),
  pt_session_id    UUID REFERENCES pt_sessions(id),
  type             VARCHAR(20) NOT NULL,  -- CLASS | PT | GYM
  checked_in_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_session    ON bookings(class_session_id);
CREATE INDEX idx_bookings_customer   ON bookings(customer_id);
CREATE INDEX idx_sessions_date       ON class_sessions(session_date);
CREATE INDEX idx_attendance_customer ON attendance(customer_id);
```

**Giải thích vấn đáp:** "Tôi để `booked_count` denormalized trong class_sessions để tránh COUNT(*) mỗi lần check capacity. Và `UNIQUE(customer_id, class_session_id)` trong bookings để DB tự chặn duplicate booking dù có race condition."

---

## Layer BE (bắt buộc)

```
POST   /api/trainers                     - tạo trainer (MANAGER)
GET    /api/trainers                     - list
PUT    /api/trainers/:id                 - cập nhật
PATCH  /api/trainers/:id/assign          - assign customer
GET    /api/trainers/:id/schedule        - schedule của trainer

GET    /api/classes                      - list
POST   /api/classes                      - tạo (MANAGER)
PUT    /api/classes/:id                  - cập nhật

GET    /api/sessions                     - list filter(date, trainer, class)
POST   /api/sessions                     - tạo session (MANAGER)
PUT    /api/sessions/:id                 - cập nhật
PATCH  /api/sessions/:id/cancel          - cancel + cancel all bookings

POST   /api/bookings                     - tạo booking (CONCURRENCY-SAFE)
GET    /api/bookings/me                  - own bookings (CUSTOMER)
GET    /api/bookings                     - all (MANAGER/RECEPTIONIST)
PATCH  /api/bookings/:id/cancel          - cancel + decrement
PATCH  /api/bookings/:id/no-show         - mark no-show

POST   /api/checkin                      - check-in (validate membership)
GET    /api/attendance                   - list (MANAGER)
GET    /api/attendance/me                - own (CUSTOMER)

POST   /api/pt-sessions                  - schedule PT
GET    /api/pt-sessions                  - list
PATCH  /api/pt-sessions/:id/reschedule   - đổi giờ
PATCH  /api/pt-sessions/:id/cancel       - cancel
PATCH  /api/pt-sessions/:id/complete     - complete (idempotent, gọi B's useSession)
```

**Booking concurrency — phần quan trọng nhất:**
```java
@Transactional(isolation = Isolation.READ_COMMITTED)
public Booking createBooking(UUID customerId, UUID sessionId) {

    // Step 1: Validate membership (gọi module B)
    membershipValidator.requireActive(customerId);

    // Step 2: Lock session row để serialize concurrent requests
    ClassSession session = sessionRepo.findByIdWithPessimisticLock(sessionId);
    // → SQL: SELECT * FROM class_sessions WHERE id = ? FOR UPDATE

    // Step 3: Check capacity
    if (session.getBookedCount() >= session.getCapacity()) {
        throw new ClassFullException("No spots remaining");
    }

    // Step 4: Increment counter + create booking
    // UNIQUE constraint sẽ bắt duplicate nếu race condition qua được lock
    session.setBookedCount(session.getBookedCount() + 1);
    sessionRepo.save(session);

    Booking booking = new Booking(customerId, sessionId, CONFIRMED);
    return bookingRepo.save(booking);
    // Nếu duplicate → DataIntegrityViolationException → trả lỗi rõ ràng
}
```

**Repository method:**
```java
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT s FROM ClassSession s WHERE s.id = :id")
ClassSession findByIdWithPessimisticLock(@Param("id") UUID id);
```

---

## Layer FE (bắt buộc)

```
/dashboard/schedule  (MANAGER)
  - Toggle: Week view | List view
  - Week view: 7 columns Mon-Sun
    - Mỗi cột: ngày + session cards xếp theo giờ
    - Card màu theo type: Yoga=purple, HIIT=orange, Strength=lime, Cycling=blue
    - Click card → drawer: trainer, capacity bar, booking list
  - "Add session" button → modal form

/dashboard/bookings  (RECEPTIONIST)
  - Check-in strip (top):
    - Search input "Search member name or code..."
    - "Check in" button (lime, lớn)
    - Real-time today stats: Checked In | Booked | No-show | Capacity %
  - Bookings table: name, class, time, status badge, actions

/dashboard/trainer  (TRAINER)
  - Today's sessions: timeline list (time | client | type | status chip)
  - My clients: table (name, plan, next session, notes)
  - PT Session actions: schedule / reschedule / complete

/dashboard/member/book  (CUSTOMER)
  - Tabs: Classes | Personal Training
  - Classes tab:
    - Date strip (today + 6 ngày tới), click để chọn ngày
    - Class cards: type badge | name | trainer | time | spots bar | Book button
    - Book button → confirm modal → POST /api/bookings
  - PT tab:
    - Trainer cards: avatar | name | specialty | availability badge
    - "Request session" button
```

---

## Layer AI (bắt buộc)

**Mày làm: Smart Schedule Suggestions**

Khi Manager vào `/dashboard/schedule`, AI gợi ý thêm class nào để tối ưu occupancy.

**Spring Boot gọi AI:**
```java
// ScheduleService.java
public ScheduleSuggestion getAiSuggestion(LocalDate weekStart) {
    // Lấy data tuần hiện tại
    List<SessionSummary> currentWeek = sessionRepo.getWeeklySummary(weekStart);
    List<String> lowOccupancySlots = findLowOccupancySlots(currentWeek);

    // Gọi AI
    return aiClient.suggestSchedule(ScheduleContext.builder()
        .currentSessions(currentWeek)
        .lowOccupancySlots(lowOccupancySlots)
        .historicalData(getHistoricalOccupancy())
        .build());
}
```

**FE hiển thị:** Banner vàng trong schedule page: "AI suggests adding a HIIT class on Wednesday 7PM — historically 85% occupancy at this slot."

---

## Layer OPS (bắt buộc)

```yaml
# docker-compose.yml — phần của mày
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: ${DB_NAME}
    POSTGRES_USER: ${DB_USER}
    POSTGRES_PASSWORD: ${DB_PASS}
  volumes:
    - postgres_data:/var/lib/postgresql/data
  ports:
    - "5432:5432"
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
    interval: 10s
    timeout: 5s
    retries: 5

redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
  command: redis-server --appendonly yes
  volumes:
    - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

```yaml
# GitHub Actions — CI integration test job của mày
integration-test:
  runs-on: ubuntu-latest
  services:
    postgres:
      image: postgres:15
      env:
        POSTGRES_DB: fitos_test
        POSTGRES_USER: test
        POSTGRES_PASSWORD: test
  steps:
    - uses: actions/checkout@v4
    - run: cd backend && mvn test -Dspring.profiles.active=test
```

---

## Tests mày phải viết

```java
// BookingServiceTest.java
@Test void booking_success_decrements_available_spots()
@Test void booking_when_full_throws_ClassFullException()
@Test void duplicate_booking_throws_error()
@Test void booking_expired_membership_throws_403()

// Concurrency test — quan trọng nhất
@Test void concurrent_bookings_only_one_succeeds_when_last_spot() {
    // Tạo session capacity=1
    // Gửi 2 CompletableFuture cùng lúc
    // Assert: 1 success, 1 ClassFullException
    var f1 = CompletableFuture.supplyAsync(() -> bookingService.create(customer1, session));
    var f2 = CompletableFuture.supplyAsync(() -> bookingService.create(customer2, session));
    // Đúng 1 thành công
}

@Test void pt_complete_is_idempotent_using_completion_ref()
@Test void checkin_without_active_membership_throws()
```

---

## Mày nói gì khi vấn đáp / ghi CV

```
DB  → "UNIQUE(customer_id, session_id) trong bookings + booked_count denormalized để check capacity O(1)"
BE  → "SELECT FOR UPDATE để serialize concurrent bookings, UNIQUE constraint làm safety net"
FE  → "Weekly calendar 7 columns với color-coded class types, date strip cho member booking"
AI  → "Schedule optimization: AI analyze occupancy patterns → suggest thêm class vào slot trống"
OPS → "Docker Compose postgres + redis với healthcheck, GitHub Actions integration test với real DB"
```

---
---

# NGƯỜI D — WORKOUT + PROGRESS + AI COACH

## Layer DB (bắt buộc)

**File:** `V4__workout_ai.sql`

```sql
-- EXERCISES
CREATE TABLE exercises (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         VARCHAR(255) NOT NULL,
  muscle_group VARCHAR(100),  -- CHEST | BACK | LEGS | SHOULDERS | ARMS | CORE
  equipment    VARCHAR(100),  -- BARBELL | DUMBBELL | MACHINE | BODYWEIGHT | CABLE
  difficulty   VARCHAR(20),   -- BEGINNER | INTERMEDIATE | ADVANCED
  instructions TEXT,
  created_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- WORKOUT PLANS
CREATE TABLE workout_plans (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  trainer_id  UUID REFERENCES trainers(id),
  goal        VARCHAR(50),
  start_date  DATE,
  end_date    DATE,
  status      VARCHAR(20) NOT NULL DEFAULT 'DRAFT',  -- DRAFT|ACTIVE|COMPLETED|CANCELLED
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- EXERCISES TRONG PLAN (theo ngày)
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

-- SESSION (mỗi lần tập)
CREATE TABLE workout_sessions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id  UUID NOT NULL REFERENCES customers(id),
  plan_id      UUID REFERENCES workout_plans(id),
  performed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status       VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS',
  notes        TEXT
);

-- LOG (từng set trong session)
CREATE TABLE workout_logs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     UUID NOT NULL REFERENCES workout_sessions(id),
  exercise_id    UUID NOT NULL REFERENCES exercises(id),
  set_number     INT NOT NULL,
  reps_completed INT,
  weight         NUMERIC(6,2),
  rpe            INT CHECK (rpe BETWEEN 1 AND 10),
  notes          TEXT
);

-- BODY METRICS
CREATE TABLE body_metrics (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id  UUID NOT NULL REFERENCES customers(id),
  recorded_at  DATE NOT NULL DEFAULT CURRENT_DATE,
  weight       NUMERIC(5,2),
  body_fat     NUMERIC(5,2),
  muscle_mass  NUMERIC(5,2),
  waist        NUMERIC(5,2)
);

-- AI CONVERSATIONS
CREATE TABLE ai_conversations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES customers(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI MESSAGES
CREATE TABLE ai_messages (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES ai_conversations(id),
  role            VARCHAR(20) NOT NULL CHECK (role IN ('user','assistant')),
  content         TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI RECOMMENDATIONS
CREATE TABLE ai_recommendations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id      UUID NOT NULL REFERENCES customers(id),
  title            VARCHAR(255),
  reason           TEXT,
  suggested_changes JSONB,  -- [{"exercise":"Squat","old_sets":3,"new_sets":4}]
  status           VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_workout_sessions_customer ON workout_sessions(customer_id);
CREATE INDEX idx_workout_logs_session      ON workout_logs(session_id);
CREATE INDEX idx_ai_messages_conversation  ON ai_messages(conversation_id);
```

**Giải thích vấn đáp:** "Tôi lưu suggested_changes là JSONB để flexible — AI có thể suggest thay đổi bất kỳ field nào mà không cần thêm column. Khi ACCEPT thì parse JSONB và apply vào workout_plan_exercises."

---

## Layer BE (bắt buộc)

```
GET    /api/exercises              - search + filter
POST   /api/exercises              - tạo (TRAINER/MANAGER)
PUT    /api/exercises/:id          - cập nhật

POST   /api/workout-plans          - tạo plan (TRAINER)
GET    /api/workout-plans          - list filter(customer, trainer, status)
GET    /api/workout-plans/:id      - detail với exercises grouped by day
PUT    /api/workout-plans/:id      - cập nhật plan + exercises
PATCH  /api/workout-plans/:id/activate
PATCH  /api/workout-plans/:id/complete
PATCH  /api/workout-plans/:id/cancel

POST   /api/workout-sessions       - start session
PATCH  /api/workout-sessions/:id/complete
GET    /api/workout-sessions/me    - own sessions với logs

POST   /api/workout-logs           - log 1 set
GET    /api/workout-sessions/:id/logs

POST   /api/body-metrics           - log metrics
GET    /api/body-metrics/me        - list theo thời gian

GET    /api/progress/me            - computed progress stats

POST   /api/ai/chat                - chat với AI (lưu conversation)
GET    /api/ai/conversations/me    - load conversation history
POST   /api/ai/recommend           - trigger recommendation
PATCH  /api/ai/recommendations/:id/accept   - apply changes
PATCH  /api/ai/recommendations/:id/dismiss

GET    /api/dashboard/stats            - Manager KPIs
GET    /api/dashboard/revenue-chart    - 8 tuần gần nhất
GET    /api/dashboard/crm-funnel       - lead counts per stage
GET    /api/reports/sales
GET    /api/reports/memberships
GET    /api/reports/classes
```

**Progress computation:**
```java
public ProgressStats getMyProgress(UUID customerId) {
    // Workouts this month
    int workoutsThisMonth = sessionRepo.countCompletedThisMonth(customerId);

    // Current streak (consecutive days with workout)
    int streak = calculateStreak(customerId);

    // Personal records: max weight per exercise in last 90 days
    List<PersonalRecord> prs = logRepo.findPersonalRecords(customerId);

    // Weekly frequency: last 8 weeks
    List<Integer> weeklyFreq = sessionRepo.getWeeklyFrequency(customerId, 8);

    return new ProgressStats(workoutsThisMonth, streak, prs, weeklyFreq);
}
```

---

## Layer FE (bắt buộc)

```
/dashboard/workout-builder  (TRAINER)
  - Left panel (2/3): plan info form + week tabs (W1/W2/W3/W4)
    - Day cards Mon-Sat: exercise list, sets×reps, drag handle icon
    - "Add exercise" button per day → opens library sidebar
  - Right panel (1/3): exercise library
    - Search input (debounce)
    - Filter chips: All | Push | Pull | Legs | Core | Cardio
    - Exercise list items với "+" button để add vào ngày

/dashboard/member  (CUSTOMER — member home)
  - Page header: "Ready, [Name]?" + "Book a session" button
  - Top row: 3 cards
    - Membership: plan name, status badge, "X days left" progress bar
    - Next Booking: class name, time, trainer
    - Streak: current streak, week dots (filled/empty)
  - This week grid (Mon-Sat cards):
    - Exercise count per day, completion dots
    - "Start workout" button on today's card
  - Quick actions: Book class | Log workout | View progress | AI Coach
  - Recent activity feed (5 items)

/dashboard/member/progress  (CUSTOMER)
  - 4 stat cards: Workouts/month | Attendance | Streak | Weight logged
  - Body metrics card: current vs target weight, progress bar
  - Weekly frequency chart (pure CSS — KHÔNG dùng chart library):
    ```
    8 bars, height proportional to session count
    Labels: W1, W2, ... W8
    Bars: bg-[#D7FF3F] với dynamic height style
    ```
  - Personal records table: Exercise | Best weight | Best reps | Date
  - Recent workouts list: date | name | duration | exercise count

/dashboard/member/ai-coach  (CUSTOMER)
  - Split layout min-h-screen:
    - Left (60%): chat area
      - Message thread (scrollable): user bubble (right, lime bg) + AI bubble (left, white)
      - Input bar (sticky bottom): textarea + send button
    - Right (40%):
      - "Quick prompts" card: 6 suggestion chips
        ("What should I train today?", "Summarize my progress", ...)
      - "Your context" card: current plan + goal + last workout
      - AI recommendation card (if pending):
        - Title + reason
        - "Accept changes" button (lime) | "Dismiss" button (outline)
```

---

## Layer AI (bắt buộc) — mày viết Python FastAPI service

```python
# ai/app/main.py
from fastapi import FastAPI
app = FastAPI()

# Routes
@app.post("/chat")           # AI chat với context
@app.post("/recommend")      # Workout recommendation
@app.post("/score-lead")     # Lead scoring (người A dùng)
@app.post("/predict-renewal") # Renewal prediction (người B dùng)
@app.post("/suggest-schedule") # Schedule suggestion (người C dùng)
@app.get("/progress-summary") # Progress summary
```

**context_loader.py** — quan trọng nhất:
```python
def load_customer_context(customer_id: str, db) -> dict:
    """Load toàn bộ fitness context của customer để inject vào LLM"""
    return {
        "name": ...,
        "goal": ...,
        "active_plan": {
            "name": ...,
            "exercises_this_week": [...]
        },
        "recent_sessions": [...],  # last 10 sessions với logs
        "personal_records": [...],
        "body_metrics": [...],     # last 3 measurements
        "attendance_rate": "75%"
    }
```

**llm_service.py:**
```python
SYSTEM_PROMPT = """
You are FITOS AI Coach — a fitness assistant for gym members.

RULES:
1. Only answer fitness, training, and nutrition questions
2. NEVER provide medical diagnosis, prescriptions, or treatment advice
3. If asked about medical symptoms → say "Please consult a healthcare professional"
4. Base ALL recommendations on the provided user context
5. Keep responses concise (max 3 paragraphs)
6. When suggesting workout changes, format as structured JSON
"""

async def chat(message: str, context: dict) -> str:
    response = await openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "system", "content": f"User context: {json.dumps(context)}"},
            {"role": "user", "content": message}
        ]
    )
    return response.choices[0].message.content
```

**safety_filter.py:**
```python
MEDICAL_KEYWORDS = ["diagnose", "diagnosis", "prescription", "medication",
                    "disease", "symptom", "doctor", "treatment", "cure"]

def is_medical_question(message: str) -> bool:
    return any(kw in message.lower() for kw in MEDICAL_KEYWORDS)

def safe_respond(message: str) -> str | None:
    if is_medical_question(message):
        return "This question requires medical expertise. Please consult a healthcare professional."
    return None  # proceed with AI
```

---

## Layer OPS (bắt buộc)

```dockerfile
# ai/Dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```yaml
# docker-compose.yml — phần AI service
ai-service:
  build: ./ai
  ports:
    - "8000:8000"
  environment:
    - OPENAI_API_KEY=${OPENAI_API_KEY}
    - DATABASE_URL=${DATABASE_URL}
  depends_on:
    - postgres
  healthcheck:
    test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
```

```yaml
# GitHub Actions — CI/CD job của mày
build-and-deploy:
  runs-on: ubuntu-latest
  needs: [test-backend, test-frontend]
  steps:
    - uses: actions/checkout@v4
    - name: Build all images
      run: docker compose build
    - name: Push to registry
      run: |
        docker tag fitos-backend ghcr.io/${{ github.repository }}/backend:latest
        docker tag fitos-frontend ghcr.io/${{ github.repository }}/frontend:latest
        docker tag fitos-ai ghcr.io/${{ github.repository }}/ai:latest
        docker push ghcr.io/${{ github.repository }}/backend:latest
        docker push ghcr.io/${{ github.repository }}/frontend:latest
        docker push ghcr.io/${{ github.repository }}/ai:latest
    - name: Deploy to Railway/Render
      run: curl -X POST ${{ secrets.DEPLOY_WEBHOOK }}
```

---

## Tests mày phải viết

```java
// WorkoutPlanServiceTest.java
@Test void activate_plan_deactivates_previous_active_plan()
@Test void complete_session_logs_saved_correctly()
@Test void progress_stats_calculation_correct()

// AI recommendation
@Test void accept_recommendation_updates_workout_plan()
@Test void dismiss_recommendation_marks_dismissed()
```

```python
# test_safety_filter.py
def test_medical_question_blocked():
    assert is_medical_question("diagnose my knee pain") == True
    response = safe_respond("diagnose my knee pain")
    assert response is not None  # blocked

def test_fitness_question_allowed():
    assert is_medical_question("how many sets for squat") == False
    response = safe_respond("how many sets for squat")
    assert response is None  # proceed to AI

# test_context_loader.py
def test_context_only_loads_own_customer():
    ctx = load_customer_context(customer_a_id, db)
    assert ctx["name"] != customer_b_name  # không leak data
```

---

## Mày nói gì khi vấn đáp / ghi CV

```
DB  → "JSONB cho suggested_changes flexible, không cần thêm column khi AI suggest field mới"
BE  → "Progress computation: streak calculation, personal records query, weekly frequency aggregation"
FE  → "Pure CSS bar chart (không dùng recharts), chat bubble UI với real-time feel"
AI  → "Python FastAPI service: context injection, safety filter chặn medical advice, structured recommendation output"
OPS → "AI service Dockerfile, docker-compose orchestration toàn stack, GitHub Actions build+push+deploy pipeline"
```

---
---

# TIMELINE 5 TUẦN

```
         A                    B                    C                    D
TUẦN 1
         DB schema users      DB schema commerce   DB schema operations DB schema workout/ai
         Auth API (JWT)       Plans API + FE       Trainer + Class API  Exercise API
         Login/Register FE    /plans public page   /dashboard/trainer   Exercise library FE
         Dockerfile backend   Dockerfile frontend  docker-compose DB    Dockerfile AI service
         ─────────────────────────────────────────────────────────────────────────────────
         ← Auth xong → B, C, D clone và test với JWT ngay cuối tuần 1

TUẦN 2
         Lead CRUD API        Order + Payment API  Sessions + Booking   Workout Plan API
         CRM FE (table+form)  Sales wizard FE      Schedule calendar FE Workout Builder FE
         Lead scoring AI      Renewal predict AI   Schedule suggest AI  AI FastAPI service
         CI test-backend job  CI test-frontend job CI integration job   CI build-images job
         ─────────────────────────────────────────────────────────────────────────────────
         ← B xong MembershipValidator → C bắt đầu dùng để gate booking

TUẦN 3
         Customer detail      Membership lifecycle Check-in + PT        Workout Log + Progress
         User admin           Pause/resume FE      Booking FE (member)  AI chat + recommend
         Convert lead flow    PT package tracking  Attendance history   Progress charts FE
         ─────────────────────────────────────────────────────────────────────────────────
         ← C xong PT complete → D test workout trigger sau PT

TUẦN 4
         Manager Dashboard    Deploy backend+DB    Concurrency tests    Reports + Dashboard
         Renewal widget       Payment idempotency  Class reports        Deploy AI service
         Auth security review Smoke test prod      E2E test booking     Full CD pipeline
         ─────────────────────────────────────────────────────────────────────────────────

TUẦN 5 (buffer)
         Bug fix + polish UI + demo prep + stretch features
```

---

# BẢNG KIỂM TRA CUỐI — MỖI NGƯỜI TICK ĐỦ 5 Ô

| Layer | Người A | Người B | Người C | Người D |
|-------|---------|---------|---------|---------|
| **DB** | users, leads, customers, audit_logs | service_plans, orders, payments, memberships | trainers, classes, sessions, bookings, attendance | exercises, workout_plans, workout_logs, ai_messages |
| **BE** | Auth JWT, RBAC, CRM CRUD, Lead convert | Order pricing, Payment idempotency, Membership lifecycle | Booking concurrency, Check-in, PT session | Workout CRUD, Progress computation, AI proxy |
| **FE** | /login, /register, /dashboard/leads, /dashboard/customers | /plans, /dashboard/sales, /dashboard/create-sale, /dashboard/member/payments | /dashboard/schedule, /dashboard/bookings, /dashboard/member/book | /dashboard/member, /dashboard/workout-builder, /dashboard/member/ai-coach, /dashboard/member/progress |
| **AI** | Gọi AI score-lead → hiển thị badge | Gọi AI predict-renewal → hiển thị risk | Gọi AI suggest-schedule → hiển thị banner | Viết Python FastAPI service + tất cả AI endpoints |
| **OPS** | Dockerfile backend, GitHub Actions test-backend job | Dockerfile frontend, GitHub Actions test-frontend + deploy frontend | docker-compose postgres + redis + healthcheck, GitHub Actions integration test | Dockerfile AI service, docker-compose ai-service, GitHub Actions build-push-deploy |

---

# CÂU HỎI VẤND ĐÁP MỖI NGƯỜI PHẢI TRẢ LỜI ĐƯỢC

### Người A
- Tại sao dùng UUID thay INT cho primary key?
- JWT access token và refresh token khác nhau thế nào, mày handle như thế nào?
- RBAC implement ở BE như thế nào, FE chỉ làm gì?
- Convert lead flow có những bước gì, validate gì?
- AOP audit log hoạt động thế nào?

### Người B
- Tại sao total phải tính server-side?
- Payment idempotency là gì, mày handle bằng cách nào?
- Membership pause/resume tính ngày như thế nào?
- Service activation pattern: tại sao tách khỏi payment logic?
- UNIQUE constraint trên payment.reference giải quyết vấn đề gì?

### Người C
- Concurrency problem trong booking là gì?
- SELECT FOR UPDATE là gì, khi nào dùng?
- Tại sao có UNIQUE(customer_id, session_id) khi đã có SELECT FOR UPDATE?
- `booked_count` denormalized có rủi ro gì, handle thế nào?
- Idempotency trong PT complete dùng completion_ref như thế nào?

### Người D
- Context injection trong AI là gì, tại sao cần thiết?
- Safety filter hoạt động thế nào, tại sao cần?
- JSONB cho suggested_changes có lợi gì so với column riêng?
- Docker multi-stage build giảm image size thế nào?
- CI/CD pipeline của mày: push code → production xảy ra gì?

---

*Version 3.0 — Mỗi người đụng đủ DB + BE + FE + AI + OPS. Không ai thiếu layer nào.*
