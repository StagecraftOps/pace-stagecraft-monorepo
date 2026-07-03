# Architecture

## CI/CD Layer

```
GitHub Push / PR
       │
       ▼
  orchestrator.yml  ─── fans out ──► ci-listing-etl.yml
  (parent workflow)                  ci-email-service.yml
                                     ci-data-warehouse-service.yml
                                     ... (30 service CIs)
                                              │
                              ┌───────────────┼───────────────┐
                              ▼               ▼               ▼
                    _template-          _template-      _template-
                    docker-build    integration-test   deploy-k8s
                    (ECR push)      (pytest/jest)      (Helm → EKS)
                              └───────────────┼───────────────┘
                                              ▼
                                    _template-notify-slack
```

### Template Composition Rules

- A job can either have `runs-on:` **or** `uses:` — never both (GitHub enforces this).
- `secrets: inherit` must appear at the job level (not inside `with:`).
- Optional template inputs can be omitted; required inputs raise `startup_failure` if missing.
- `if:` conditions on a `uses:` job work normally (e.g. `if: github.ref == 'refs/heads/develop'`).

---

## Service Domains

### Data Services (Python/Spark/dbt)

| Service | Tech | Trigger |
|---|---|---|
| `listing-etl` | Python + Spark | MLS feed update |
| `data-warehouse-service` | Python + SQLAlchemy + Alembic | Push to develop |
| `data-quality-pipeline` | Great Expectations | Post-ETL |
| `clickstream-pipeline` | Python + Kafka | Real-time events |
| `market-data-pipeline` | Python | Daily schedule |
| `avm-training-pipeline` | Python + MLflow | Weekly model retraining |
| `realtime-aggregation` | Python + Redis | Sub-second stats |
| `mls-ingestion` | Python | MLS delta feed |
| `feature-store-pipeline` | Python + Feast | Feature computation |
| `dbt-models` | dbt + Snowflake | Code change |

### Notification Services (Node/TypeScript)

| Service | Tech | Channel |
|---|---|---|
| `email-service` | Node + Handlebars | SES / SendGrid |
| `sms-service` | Node | Twilio |
| `push-notification-service` | Node | FCM / APNs |
| `notification-service` | Node | Orchestrator (fan-out) |
| `price-alert-service` | Node | All channels |

### Frontend

| Service | Tech | Deploy |
|---|---|---|
| `zillow-web` | Next.js 14 | Vercel / EKS |

---

## Kubernetes Deployment Model

```
EKS Cluster (staging-cluster)
├── namespace: data-pipeline
│   ├── listing-etl              (Helm chart: charts/listing-etl)
│   ├── data-warehouse-service
│   ├── clickstream-pipeline
│   └── ...
└── namespace: notification
    ├── email-service
    ├── sms-service
    └── ...
```

The `_template-deploy-k8s` template runs `helm upgrade --install` with the image tag baked in as a values override. Rollout is waited on with `kubectl rollout status` when `wait_for_rollout: true`.

---

## Image Registry

All service images are pushed to **DockerHub** under the `yampss` account:

```
yampss/stagecraft-api:latest
yampss/stagecraft-worker:latest
yampss/stagecraft-frontend:latest
yampss/stagecraft-webhook:latest
yampss/stagecraft-mcp:latest
```

Monorepo services (listing-etl, email-service, etc.) push to ECR via the docker-build template using the `ecr_repository` input as the repository name.

---

## GitHub Org Secrets (StagecraftOps)

Secrets set at org level are inherited by all repos:

```
DOCKERHUB_USERNAME        yampss
DOCKERHUB_TOKEN           dckr_pat_...
AWS_ACCESS_KEY_ID         for ECR + S3
AWS_SECRET_ACCESS_KEY
SLACK_WEBHOOK_URL         for notify-slack template
SNOWFLAKE_ACCOUNT         for dbt / data-warehouse jobs
SNOWFLAKE_CI_USER
SNOWFLAKE_CI_PASSWORD
KUBECONFIG_STAGING        base64-encoded kubeconfig for staging-cluster
DATA_WAREHOUSE_DB_URL     Postgres/Snowflake connection string (db-migration)
```
