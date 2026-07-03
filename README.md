# Zillow Multiservice Monorepo

A comprehensive monorepo containing **300+ microservices** covering the full Zillow platform stack.

## 🏗️ Architecture Overview

```
multiservice-monorepo/
├── services/
│   ├── backend/          # Node.js, Python, Go, Java backend services (~120 services)
│   ├── frontend/         # React, Next.js, Vue frontend apps (~50 services)
│   ├── data/             # Data pipelines, ETL, Spark jobs (~40 services)
│   ├── ml/               # Machine learning models & APIs (~25 services)
│   ├── auth/             # Authentication & authorization (~15 services)
│   ├── search/           # Elasticsearch, Solr search services (~15 services)
│   ├── media/            # Image, video, document processing (~15 services)
│   ├── notification/     # Email, SMS, push, webhooks (~15 services)
│   ├── analytics/        # Tracking, metrics, BI (~15 services)
│   ├── payment/          # Payment processing (~10 services)
│   ├── geo/              # Geospatial services (~10 services)
│   ├── messaging/        # Kafka, RabbitMQ consumers/producers (~15 services)
│   └── infra/            # Infra tools, proxies, gateways (~10 services)
├── packages/             # Shared libraries
│   ├── shared-types/
│   ├── shared-utils/
│   ├── shared-ui/
│   ├── shared-config/
│   └── shared-db/
├── infrastructure/       # Terraform, Helm charts, K8s manifests
├── scripts/              # Build, codegen, automation scripts
└── docs/                 # Architecture docs
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run all services in dev mode
npm run dev

# Build all services
npm run build

# Run all tests
npm run test

# Lint all services
npm run lint
```

## 📦 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Backend** | Node.js (Express, Fastify, NestJS), Python (FastAPI, Flask), Go, Java (Spring Boot) |
| **Frontend** | React, Next.js, Vue.js, Vite |
| **Database** | PostgreSQL, MongoDB, Redis, Cassandra, DynamoDB |
| **Messaging** | Apache Kafka, RabbitMQ, AWS SQS |
| **Search** | Elasticsearch, Algolia |
| **ML/AI** | Python, TensorFlow, PyTorch, scikit-learn |
| **Data** | Apache Spark, Airflow, dbt, Flink |
| **Infra** | Kubernetes, Terraform, Helm, Docker |
| **CI/CD** | GitHub Actions, ArgoCD |
| **Observability** | Prometheus, Grafana, Jaeger, Datadog |

## 🗂️ Service Categories

### Backend Services (Node.js / Express)
- `property-service` — Core property listing CRUD
- `listing-service` — MLS listing sync
- `search-api` — Property search orchestration
- `user-service` — User profiles & preferences
- `agent-service` — Real estate agent management
- ... and 115+ more

### Frontend Applications
- `zillow-web` — Main Next.js web app
- `agent-portal` — Agent dashboard (React)
- `admin-dashboard` — Internal admin (Next.js)
- ... and 47+ more

### Data Services
- `etl-pipeline` — Property data ETL
- `mls-ingestion` — MLS data ingestion
- `data-warehouse` — BigQuery/Redshift models
- ... and 37+ more

## 🔧 Adding a New Service

```bash
node scripts/generate-service.js --name my-service --type backend --lang node
```

## 📋 Service Naming Convention

```
services/{category}/{service-name}/
```

## 🏷️ Versioning

All services follow [Semantic Versioning](https://semver.org/).

## 📝 License

Private — Zillow Group Internal
