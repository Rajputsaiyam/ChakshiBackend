Chakshi Legal Dashboard – Backend

This repository contains the backend architecture for the Chakshi Legal Dashboard, a comprehensive platform designed to streamline legal practice management.
The backend is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and integrates with external APIs, cloud storage, and legal research tools.

📌 Features

User Management: Authentication, roles (advocate, admin, junior), preferences, and integrations.

Client Management: CRUD operations, billing status, and communication tracking.

Case Management: Case details, analytics, timelines, and risk assessments.

Document Handling: File uploads (PDF, DOCX, TXT, images), OCR extraction, templates, and search indexing.

Legal Research: Case laws, judgments, cause lists with search and tagging.

Simulations: Argument practice, witness Q&A, timeline predictions, and AI feedback.

Notifications: Real-time updates for hearings, billing, and documents.

Integrations: AWS S3 for file storage, Google Vision OCR, government portals (e-filing, Patta Chitta).

🗂 Database Design (MongoDB with Mongoose)

Users Collection → Profiles, authentication, preferences, integrations.

Clients Collection → Client details, cases, documents, billing.

Cases Collection → Case analytics, status, court details, progress tracking.

Documents Collection → Cloud-stored metadata, OCR text, draft management.

Templates Collection → Reusable document templates.

Research Collection → Case laws, judgments, cause lists.

Simulations Collection → AI-powered practice sessions.

Notifications Collection → User notifications.

Additional Collections → Audit logs, billing.

📡 API Endpoints

All endpoints are prefixed with /api/v1.

Authentication

POST /auth/register → Create user

POST /auth/login → Issue JWT

GET /auth/profile → Get user profile

Users

GET /users/:id → Fetch user

PUT /users/:id → Update profile/settings

Clients

GET /clients → List clients

POST /clients → Create client

PUT /clients/:id → Update client

DELETE /clients/:id → Delete client

Cases

GET /cases → List cases with analytics

POST /cases → Create case

PUT /cases/:id → Update case

DELETE /cases/:id → Archive case

Documents

POST /documents/upload → Upload file with OCR

POST /documents/draft → Save draft

GET /documents/:id → Get document metadata

Templates

POST /templates → Create template

GET /templates → List templates

Research

GET /research/caselaw → Search case laws

GET /research/cause-list → Get cause list

POST /research/save → Save research item

Simulations

POST /simulations/arguments → Generate argument

POST /simulations/timeline → Predict timelines

POST /simulations/feedback → AI feedback

Notifications

GET /notifications → List notifications

PUT /notifications/:id/read → Mark as read

🔒 Security

Authentication: JWT with refresh tokens.

Password Hashing: bcrypt (12 salt rounds).

Role-based Access Control (RBAC).

Input Validation & Sanitization.

File Security: 10MB limit, malware scanning.

HTTPS enforced.

⚡ Performance & Scalability

Redis Caching for frequent queries.

Pagination for lists.

Background Jobs with Bull/Node-cron.

Monitoring via Prometheus or New Relic.

Sharding & Cloud Storage for scalability.

🚀 Deployment

Server: Node.js v18+, Express v4+

Database: MongoDB v6+, Mongoose v7+

Environment: .env for secrets

CI/CD: GitHub Actions

File Storage: AWS S3 / GridFS

📅 Next Steps

Implement MongoDB schemas and seed data.

Build core APIs (auth, users, clients).

Integrate file storage and search.

Connect frontend with APIs.

Add external integrations.

⏳ MVP Timeline: ~4–6 weeks
