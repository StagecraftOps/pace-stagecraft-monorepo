# How the CI/CD System Works

## Overview

This repository is a **Zillow-scale real-estate data platform monorepo** containing ~30 microservices across two domains: data pipelines and notification services. It has 109 GitHub Actions workflow files wired into a reusable-template system.

---

## Directory Layout

```
.github/
  workflows/
    _template-*.yml          ← 10 reusable templates (called via workflow_call)
    ci-*.yml                 ← ~30 per-service CI workflows
    orchestrator.yml         ← parent workflow that fans out to all services
services/
  data/
    listing-etl/             ← ETL: MLS → data warehouse
    data-warehouse-service/  ← Snowflake/Redshift warehouse layer
    data-quality-pipeline/   ← Great Expectations quality checks
    clickstream-pipeline/    ← Kafka → S3 event stream
    market-data-pipeline/    ← Zillow Zestimate market feeds
    avm-training-pipeline/   ← ML model training (AVM = Automated Valuation Model)
    realtime-aggregation/    ← Real-time property stats aggregation
    mls-ingestion/           ← MLS raw data ingestion
    feature-store-pipeline/  ← ML feature engineering + serving
    dbt-models/              ← dbt transformation models (Snowflake)
  notification/
    email-service/           ← Transactional email via SES/SendGrid
    sms-service/             ← SMS alerts via Twilio
    push-notification-service/ ← Mobile push via FCM/APNs
    notification-service/    ← Notification orchestrator (fan-out)
    price-alert-service/     ← Property price change alerts
  frontend/
    zillow-web/              ← Next.js frontend
```

---

## Template Architecture

Every service CI workflow delegates heavy lifting to one of 10 reusable templates via `uses: ./.github/workflows/_template-*.yml`. This keeps per-service files thin (~150 lines) and ensures consistent behaviour across all 30 services.

### Templates and Their Declared Inputs

| Template | Purpose | Required Inputs |
|---|---|---|
| `_template-docker-build` | Build & push image to ECR | `service_name`, `ecr_repository` |
| `_template-integration-test` | Run integration test suite | `service_name` |
| `_template-deploy-k8s` | Helm deploy to EKS | `service_name`, `environment`, `image_tag`, `namespace`, `cluster_name` |
| `_template-notify-slack` | Post CI result to Slack | `service_name`, `environment`, `status` |
| `_template-security-scan` | Trivy vulnerability scan | `service_name`, `working_directory` |
| `_template-db-migration` | Run/dry-run DB migrations | `service_name`, `environment`, `database_url_secret_name` |
| `_template-python-ci` | Python lint + test harness | `service_name`, `working_directory` |
| `_template-node-ci` | Node lint + build harness | `service_name`, `working_directory` |
| `_template-e2e-test` | Playwright E2E tests | `service_name`, `base_url` |
| `_template-go-ci` | Go build + test harness | `service_name`, `working_directory` |

### Why `startup_failure` Happens

GitHub validates `with:` keys against the template's declared `inputs:` block **at parse time**, before any runner starts. If you supply an input name that isn't declared, the entire workflow fails immediately with `startup_failure` (0 jobs attempted). This is different from a runtime failure.

---

## Typical Service CI Flow

```
on: push → services/data/listing-etl/**

  lint ──────────────────────────────────────────────────────┐
  unit-test (needs: lint) ──────────────────────────────────┤
  docker-build (needs: unit-test) → _template-docker-build  │
  integration-test (needs: docker-build) → _template-int..  │
  deploy-staging (needs: integration-test, if: develop) ─────┤ → _template-deploy-k8s
  notify (needs: deploy-staging OR integration-test) ────────┘ → _template-notify-slack
```

The `notify` job runs `if: always()` so Slack is notified even when earlier jobs fail.

---

## Secrets Inheritance

All reusable workflow calls use `secrets: inherit`, which passes the calling repo's secrets to the template without having to name them individually. Required org-level secrets:

| Secret | Used By |
|---|---|
| `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN` | docker-build template |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | ECR push, S3 ops |
| `SLACK_WEBHOOK_URL` | notify-slack template |
| `SNOWFLAKE_ACCOUNT` / `SNOWFLAKE_CI_USER` / `SNOWFLAKE_CI_PASSWORD` | dbt, data-warehouse |
| `KUBECONFIG_STAGING` | deploy-k8s template |
| `DATA_WAREHOUSE_DB_URL` | db-migration (data-warehouse-service) |
