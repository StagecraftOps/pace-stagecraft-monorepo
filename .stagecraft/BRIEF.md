# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - SMS Service (.github/workflows/ci-sms-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job fails with `##[error]Some specified paths were not resolved, unable to cache dependencies.` This error is thrown because the `cache-dependency-path` points to `services/notification/sms-service/package-lock.json`, but that file does not exist in the repository at the checked-out commit. Without a resolvable `package-lock.json`, the npm cache setup action cannot proceed and aborts the job immediately, before `npm ci` is ever executed.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` at `services/notification/sms-service/package-lock.json` is a repository content problem — the file (and likely the surrounding `npm install`-initialized project) must be committed to the repo; changing the workflow YAML's `cache-dependency-path` would only mask the symptom, not fix the underlying absence of the lockfile that `npm ci` itself also requires.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
]
﻿2026-08-10T16:25:53.7860181Z ##[group]Run case "success" in
2026-08-10T16:25:53.7862397Z [36;1mcase "success" in[0m
2026-08-10T16:25:53.7864179Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:25:53.7866047Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7868216Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7870268Z [36;1m    ;;[0m
2026-08-10T16:25:53.7871936Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:25:53.7874300Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7876541Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7878594Z [36;1m    ;;[0m
2026-08-10T16:25:53.7880211Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:25:53.7882348Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7884546Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7886551Z [36;1m    ;;[0m
2026-08-10T16:25:53.7888377Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:25:53.7890327Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7892860Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7894918Z [36;1m    ;;[0m
2026-08-10T16:25:53.7896594Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:25:53.7898774Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7900965Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7903333Z [36;1m    ;;[0m
2026-08-10T16:25:53.7904818Z [36;1m  *)[0m
2026-08-10T16:25:53.7906472Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7908629Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.7910645Z [36;1m    ;;[0m
2026-08-10T16:25:53.7912342Z [36;1mesac[0m
2026-08-10T16:25:53.7973215Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:53.7974333Z ##[endgroup]
﻿2026-08-10T16:25:53.8200308Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:25:53.8202754Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:25:53.8204862Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:53.8206946Z [36;1melse[0m
2026-08-10T16:25:53.8208736Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:53.8211803Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:25:53.8214928Z [36;1mfi[0m
2026-08-10T16:25:53.8274801Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:53.8275887Z env:
2026-08-10T16:25:53.8276709Z   WEBHOOK: 
2026-08-10T16:25:53.8277584Z ##[endgroup]
2026-08-10T16:25:53.8388323Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:44.5590000Z Requested labels: ubuntu-latest
2026-08-10T16:25:44.5590000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:44.5590000Z Reusable workflow chain:
2026-08-10T16:25:44.5590000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-sms-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:44.5590000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:44.5590000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:44.5580000Z Evaluating notify.if
2026-08-10T16:25:44.5580000Z Evaluating: always()
2026-08-10T16:25:44.5580000Z Result: true
2026-08-10T16:25:44.5580000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:44.5580000Z Evaluating: success()
2026-08-10T16:25:44.5580000Z Result: true
2026-08-10T16:25:44.5710000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-10T16:25:48.7060000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:48.7070000Z Job is about to start running on the hosted runner: GitHub Actions 1000002749
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.