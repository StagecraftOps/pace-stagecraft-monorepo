# CI/CD Pipeline Architecture

## Overview

This monorepo uses a **Parent → Child Dynamic Pipeline** pattern inspired by
GitLab's dynamic child pipelines — implemented entirely in native GitHub Actions
YAML with **no external scripts**.

The design supports **300 + services** across **13 service groups** while staying
well within GitHub Actions' 256-job-per-matrix limit.

---

## The 256-Job Limit Problem & Solution

### Problem
GitHub Actions caps a single workflow''s `strategy.matrix` at **256 jobs**.
With 300+ services, a single flat matrix would immediately hit this wall.

### Solution — Parent → Child Reusable Workflow Pattern

```
PUSH / PR
    |
    v
+------------------------------------------------------------------+
|  ci-orchestrator.yml  .  PARENT PIPELINE                        |
|                                                                  |
|  Job 1: detect-changes   (pure bash, no external script)        |
|         -> outputs JSON matrix of changed groups only           |
|                    |                                             |
|  Job 2: build-shared     (compile shared packages once, cache)  |
|                    |                                             |
|  Job 3: dispatch-groups  <- PARENT MATRIX  (13 entries max)     |
|         strategy.matrix = { include: [ {group, services}, ... ] }|
|              |                                                   |
|              +-- group: analytics  -> ci-service-group.yml      |
|              +-- group: auth       -> ci-service-group.yml      |
|              +-- group: backend    -> ci-service-group.yml      |
|              +-- group: data       -> ci-service-group.yml      |
|              +-- ... (only CHANGED groups run)                  |
|                                                                  |
|  Job 4: ci-gate  (branch protection required check)             |
+------------------------------------------------------------------+
              |
              |  uses: ./.github/workflows/ci-service-group.yml
              |  (workflow_call -- each runs as an INDEPENDENT workflow run)
              v
+------------------------------------------------------------------+
|  ci-service-group.yml  .  CHILD PIPELINE  (one per group)       |
|                                                                  |
|  Stage 1: lint   <- CHILD MATRIX  (one job per service)         |
|  Stage 2: test   <- CHILD MATRIX  (one job per service)         |
|  Stage 3: build  <- CHILD MATRIX  (one job per service)         |
|  Stage 4: docker <- CHILD MATRIX  (main/develop only)           |
|  Stage 5: deploy <- CHILD MATRIX  (main/develop only)           |
+------------------------------------------------------------------+
```

### Why This Breaks the Limit

| Level  | Workflow                 | Matrix entries | Budget     |
|--------|--------------------------|----------------|------------|
| Parent | `ci-orchestrator.yml`    | 13 (groups)    | <= 256  OK |
| Child  | `ci-service-group.yml`   | ~120 (backend) | <= 256  OK |
| **Total capacity** | | **13 x 256 = 3,328** |       |

Each child workflow is an **independent workflow run** with its own 256-job
budget -- exactly equivalent to GitLab''s `trigger:` dynamic child pipeline.

---

## Workflow Files

```
.github/workflows/
+-- ci-orchestrator.yml      <- CI Parent   (push / PR trigger)
+-- ci-service-group.yml     <- CI Child    (reusable, workflow_call)
+-- cd-orchestrator.yml      <- CD Parent   (post-CI / manual trigger)
+-- cd-service-group.yml     <- CD Child    (reusable, workflow_call)
+-- pr-validation.yml        <- PR checks   (fast feedback, no child)
```

### `ci-orchestrator.yml` — CI Parent
- Triggered on: `push` to `main`/`develop`/`release/**`, `pull_request`, `workflow_dispatch`
- **Job 1 `detect-changes`**: Pure bash detects which group folders have changed files.
  Builds a `{"include":[...]}` matrix JSON inline — no Node.js script needed.
- **Job 2 `build-shared`**: Compiles `packages/shared-types` and `packages/shared-utils`
  once and saves to Actions cache keyed by `github.sha`.
- **Job 3 `dispatch-groups`**: Parent matrix (<=13 entries) — calls `ci-service-group.yml`
  via `uses:` + `with:` for each changed group.
- **Job 4 `ci-gate`**: Always-runs gate job for branch protection rules.

### `ci-service-group.yml` — CI Child (Reusable)
- Triggered by: `workflow_call` from `ci-orchestrator.yml`
- Inputs: `group`, `services` (JSON array), `environment`, `sha`, `run_deploy`
- Stages run sequentially per stage, parallel per service:
  1. **lint** — ESLint + `tsc --noEmit`
  2. **test** — Jest with coverage upload
  3. **build** — `npm run build` + artifact upload
  4. **docker** — `docker/build-push-action` -> GHCR (deploy branches only)
  5. **deploy** — `kubectl set image` + rollout status (deploy branches only)

### `cd-orchestrator.yml` — CD Parent
- Triggered by: `workflow_run` (after CI passes on main/develop) or `workflow_dispatch`
- Adds a **production approval gate** using GitHub Environments with required reviewers.
- Same parent matrix pattern — fans out to `cd-service-group.yml`.

### `cd-service-group.yml` — CD Child (Reusable)
- Triggered by: `workflow_call` from `cd-orchestrator.yml`
- Stages: **docker** -> **deploy** -> **verify** (health-check smoke test)

### `pr-validation.yml` — PR Fast Checks
- Validates PR title format (Conventional Commits)
- Lists changed services in the PR summary
- Lints shared packages
- Completes in ~2 minutes before full CI starts

---

## Change Detection Logic

The `detect-changes` job uses **pure bash** (no Node.js, no external tools):

```
1. git diff HEAD vs base branch  -> list of changed file paths
2. For each path matching  services/<group>/...  -> mark group as changed
3. If any  packages/...  file changed            -> mark ALL groups changed
4. Build {"include":[{"group":"X","services":["a","b",...]},...]}  JSON
5. Output: matrix (JSON) + has_changes (bool)
```

**Manual overrides** (via `workflow_dispatch`):
- `force_all: true` -> rebuild every group regardless of changes
- `target_group: backend` -> rebuild only the `backend` group

---

## Service Groups

| Group        | Approx. services | Examples                                   |
|--------------|------------------|--------------------------------------------|
| analytics    | 15               | event-tracking, kpi, metrics, reporting    |
| auth         | 15               | oauth, sso, mfa, token, session            |
| backend      | 120+             | listing, agent, mortgage, search-index     |
| data         | 40               | pipeline, warehouse, lake, streaming       |
| frontend     | 50               | web-app, mobile-bff, admin-portal          |
| geo          | 10               | geocoding, boundary, map-tile              |
| infra        | 10               | config, feature-flag, health-check         |
| media        | 10               | image, video, floor-plan                   |
| messaging    | 10               | email, sms, push, webhook                  |
| ml           | 15               | price-model, recommendation, nlp           |
| notification | 10               | alert, digest, in-app                      |
| payment      | 10               | billing, escrow, refund                    |
| search       | 10               | indexer, ranker, autocomplete              |

---

## Environment Strategy

| Branch     | Environment  | Approval     | Auto-deploy    |
|------------|--------------|--------------|----------------|
| `main`     | production   | Required     | After approval |
| `develop`  | staging      | None         | Auto           |
| `feature/*`| preview      | None         | Auto           |
| PR         | —            | —            | CI only        |

Configure approval reviewers in **Settings -> Environments -> production**.

---

## Caching Strategy

```
shared-build-<sha>        Shared package dist output (packages/*)
npm cache                 npm ci offline cache (per service, built-in)
docker layer cache        GHA cache (scope = group-service)
test coverage artifacts   7-day retention
build dist artifacts      3-day retention
```

---

## Adding a New Service

1. Create folder: `services/<group>/<new-service>/`
2. Add a `package.json` with `build`, `test`, `lint` scripts
3. Optionally add a `Dockerfile` and `k8s/` manifests
4. Push — change detection automatically picks up the new service

**No workflow changes required.** The `find` command in `detect-changes`
discovers new service directories dynamically at runtime.

---

## Required Secrets

| Secret                   | Used by      | Purpose                          |
|--------------------------|--------------|----------------------------------|
| `GITHUB_TOKEN`           | Built-in     | GHCR push (fallback)             |
| `GHCR_TOKEN`             | docker jobs  | Container registry auth          |
| `KUBE_CONFIG_STAGING`    | deploy jobs  | Base64-encoded kubeconfig        |
| `KUBE_CONFIG_PRODUCTION` | deploy jobs  | Base64-encoded kubeconfig        |
