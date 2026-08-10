# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Data Warehouse Service (.github/workflows/ci-data-warehouse-service.yml)

## Root cause (from automated analysis)

The 'Run flake8' step fails with 'E902 FileNotFoundError: [Errno 2] No such file or directory: src/' because the directory services/data/data-warehouse-service/src/ does not exist in the repository at the checked-out commit (refs/pull/36/merge). The working-directory is set correctly to services/data/data-warehouse-service, but the src/ subdirectory itself — which all four lint tools (flake8, black, isort, bandit) target — is absent from the repository tree. This matches the known failure mode for missing application/repository content in Python services under this monorepo: the service directory structure is incomplete, with the source code directory never committed.

## Why this is a code-level issue, not a pipeline config issue

The src/ directory that flake8 (and downstream tools) target does not exist in the committed repository tree at services/data/data-warehouse-service/src/, making this a missing repository content problem that requires adding the source directory to the repo, not a workflow YAML change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
41030Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4190573Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:08.4191736Z ##[endgroup]
﻿2026-08-10T16:26:08.4436919Z ##[group]Run case "success" in
2026-08-10T16:26:08.4438106Z [36;1mcase "success" in[0m
2026-08-10T16:26:08.4439163Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:08.4440579Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4441927Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4443153Z [36;1m    ;;[0m
2026-08-10T16:26:08.4444113Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:08.4445369Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4446670Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4447872Z [36;1m    ;;[0m
2026-08-10T16:26:08.4448786Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:08.4450156Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4451498Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4452934Z [36;1m    ;;[0m
2026-08-10T16:26:08.4453871Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:08.4455084Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4456440Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4457655Z [36;1m    ;;[0m
2026-08-10T16:26:08.4458634Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:08.4460198Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4461542Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4462746Z [36;1m    ;;[0m
2026-08-10T16:26:08.4463618Z [36;1m  *)[0m
2026-08-10T16:26:08.4464579Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4465892Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:08.4467085Z [36;1m    ;;[0m
2026-08-10T16:26:08.4467948Z [36;1mesac[0m
2026-08-10T16:26:08.4510468Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:08.4511533Z ##[endgroup]
﻿2026-08-10T16:26:08.4667136Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:08.4668404Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:08.4669639Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:08.4671189Z [36;1melse[0m
2026-08-10T16:26:08.4672244Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:08.4674056Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:08.4675794Z [36;1mfi[0m
2026-08-10T16:26:08.4723752Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:08.4724788Z env:
2026-08-10T16:26:08.4725590Z   WEBHOOK: 
2026-08-10T16:26:08.4726419Z ##[endgroup]
2026-08-10T16:26:08.4815503Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:56.3070000Z Requested labels: ubuntu-latest
2026-08-10T16:25:56.3070000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:56.3070000Z Reusable workflow chain:
2026-08-10T16:25:56.3070000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-data-warehouse-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:56.3070000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:56.3070000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:56.3050000Z Evaluating notify.if
2026-08-10T16:25:56.3050000Z Evaluating: always()
2026-08-10T16:25:56.3050000Z Result: true
2026-08-10T16:25:56.3050000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:56.3050000Z Evaluating: success()
2026-08-10T16:25:56.3050000Z Result: true
2026-08-10T16:25:57.1870000Z Job is about to start running on the hosted runner: GitHub Actions 1000002761
2026-08-10T16:25:57.1870000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.