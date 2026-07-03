# Running Workflows Locally

## Prerequisites

```bash
# GitHub CLI (to trigger and watch runs)
winget install GitHub.cli        # Windows
brew install gh                  # macOS

gh auth login                    # authenticate as yampss

# act (run workflows locally without pushing)
winget install nektos.act        # Windows
brew install act                 # macOS
```

---

## Trigger a Single Service Workflow

```bash
# Trigger ci-email-service on the current branch
gh workflow run ci-email-service.yml \
  --repo StagecraftOps/pace-stagecraft-monorepo \
  --ref main

# Watch it live
gh run watch --repo StagecraftOps/pace-stagecraft-monorepo
```

## Trigger All 30 Service CIs at Once

```bash
# The orchestrator fan-out workflow dispatches every service CI
gh workflow run orchestrator.yml \
  --repo StagecraftOps/pace-stagecraft-monorepo \
  --ref main
```

## List Recent Runs and Their Status

```bash
gh run list \
  --repo StagecraftOps/pace-stagecraft-monorepo \
  --limit 20

# Filter to failures only
gh run list \
  --repo StagecraftOps/pace-stagecraft-monorepo \
  --status failure \
  --limit 20
```

## View Logs for a Failed Run

```bash
# Get the run ID from `gh run list`, then:
gh run view <RUN_ID> --repo StagecraftOps/pace-stagecraft-monorepo --log-failed
```

---

## Run a Workflow Locally with `act`

`act` executes workflow YAML on your local Docker daemon instead of GitHub runners. Useful for fast iteration without pushing.

```bash
cd pace-stagecraft-monorepo

# Run the email-service CI locally
act push \
  --workflows .github/workflows/ci-email-service.yml \
  --secret-file .secrets.local    # file with KEY=VALUE pairs, never commit this

# Dry-run (just parse + plan, don't execute)
act push \
  --workflows .github/workflows/ci-email-service.yml \
  --dryrun
```

### `.secrets.local` format (create locally, never commit)

```
DOCKERHUB_USERNAME=yampss
DOCKERHUB_TOKEN=dckr_pat_...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

---

## Validate YAML Before Pushing

Run the AST-based template audit tool — it checks every `with:` block against the template's declared `inputs:` without touching GitHub:

```bash
cd pace-stagecraft-monorepo
python docs/tools/audit_templates.py
```

Expected output when all inputs are valid:
```
All template calls are valid.
```

Any mismatch prints `UNKNOWN inputs` or `MISSING required` with the exact job and template name, so you can fix it before the push.

---

## Add a New Service CI

1. Copy an existing service CI that uses the same language stack, e.g.:
   ```bash
   cp .github/workflows/ci-email-service.yml .github/workflows/ci-my-new-service.yml
   ```

2. Replace the four service-specific values at the top:
   ```yaml
   env:
     SERVICE_DIR: services/notification/my-new-service
     IMAGE_NAME:  my-new-service
   ```

3. Fix the `with:` blocks in every template call to use `service_name: my-new-service`.

4. Run the audit tool to verify no typos:
   ```bash
   python docs/tools/audit_templates.py
   ```

5. Add the new workflow to the orchestrator's `workflow_call` list in `orchestrator.yml`.

6. Push. GitHub validates the YAML on push and triggers the workflow on the next matching event.
