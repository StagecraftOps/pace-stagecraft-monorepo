# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Notification Service (.github/workflows/ci-notification-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and identically in `unit-test`) fails with `Some specified paths were not resolved, unable to cache dependencies` because `services/notification/notification-service/package-lock.json` does not exist in the repository. The workflow's `cache-dependency-path` correctly points to that file, but the file itself is missing from the repo — no `package-lock.json` (and likely no `package.json` either) has been committed under `services/notification/notification-service/`. This blocks the entire pipeline: `lint` fails immediately, `unit-test`/`integration-test`/`docker-build` never run.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` (and likely the entire npm project scaffold) under `services/notification/notification-service/` must be added to the repository — this is a missing repository content problem, not a workflow YAML misconfiguration.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
5850998Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.5898894Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:05.5899462Z ##[endgroup]
﻿2026-08-03T16:29:05.6101160Z ##[group]Run case "success" in
2026-08-03T16:29:05.6102111Z [36;1mcase "success" in[0m
2026-08-03T16:29:05.6102650Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:05.6103190Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6103832Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6104420Z [36;1m    ;;[0m
2026-08-03T16:29:05.6104879Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:05.6105473Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6106083Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6106674Z [36;1m    ;;[0m
2026-08-03T16:29:05.6107110Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:05.6107639Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6108245Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6109066Z [36;1m    ;;[0m
2026-08-03T16:29:05.6109510Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:05.6110075Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6110752Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6111640Z [36;1m    ;;[0m
2026-08-03T16:29:05.6112410Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:05.6113385Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6114320Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6114901Z [36;1m    ;;[0m
2026-08-03T16:29:05.6115315Z [36;1m  *)[0m
2026-08-03T16:29:05.6115776Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6116394Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6116966Z [36;1m    ;;[0m
2026-08-03T16:29:05.6117375Z [36;1mesac[0m
2026-08-03T16:29:05.6161639Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:05.6162183Z ##[endgroup]
﻿2026-08-03T16:29:05.6287816Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:05.6288501Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:05.6289085Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:05.6289665Z [36;1melse[0m
2026-08-03T16:29:05.6290143Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:05.6291019Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:05.6292158Z [36;1mfi[0m
2026-08-03T16:29:05.6332789Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:05.6333295Z env:
2026-08-03T16:29:05.6333678Z   WEBHOOK: 
2026-08-03T16:29:05.6334079Z ##[endgroup]
2026-08-03T16:29:05.6416037Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:28:56.4720000Z Requested labels: ubuntu-latest
2026-08-03T16:28:56.4720000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:28:56.4720000Z Reusable workflow chain:
2026-08-03T16:28:56.4720000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-notification-service.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:56.4720000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:56.4720000Z Waiting for a runner to pick up this job...
2026-08-03T16:28:56.4700000Z Evaluating notify.if
2026-08-03T16:28:56.4700000Z Evaluating: always()
2026-08-03T16:28:56.4700000Z Result: true
2026-08-03T16:28:56.4700000Z Evaluating notify.notify-slack.if
2026-08-03T16:28:56.4700000Z Evaluating: success()
2026-08-03T16:28:56.4700000Z Result: true
2026-08-03T16:29:00.5150000Z Job is about to start running on the hosted runner: GitHub Actions 1000002235
2026-08-03T16:29:00.5150000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.