# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Photo Upload Service (.github/workflows/ci-photo-upload-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and by extension the `unit-test` job) fails with '##[error]Some specified paths were not resolved, unable to cache dependencies.' because the file referenced by `cache-dependency-path` — `services/media/photo-upload-service/package-lock.json` — does not exist in the repository at the checked-out commit (PR #36 / SHA 3e2748244e). The `package-lock.json` file is missing from the `services/media/photo-upload-service/` directory in the repo, causing the npm cache key computation to abort and the entire job to fail before any install or lint steps can run.

## Why this is a code-level issue, not a pipeline config issue

The fix requires committing the missing `package-lock.json` (and likely the rest of the service's package manifest) into `services/media/photo-upload-service/` in the repository — a repository content change, not a workflow YAML change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
1765394Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.1817852Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:54.1819131Z ##[endgroup]
﻿2026-08-10T16:25:54.2146705Z ##[group]Run case "failure" in
2026-08-10T16:25:54.2147906Z [36;1mcase "failure" in[0m
2026-08-10T16:25:54.2148949Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:25:54.2150084Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2151431Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2152702Z [36;1m    ;;[0m
2026-08-10T16:25:54.2153644Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:25:54.2154950Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2156622Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2157877Z [36;1m    ;;[0m
2026-08-10T16:25:54.2158755Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:25:54.2159897Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2161251Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2162742Z [36;1m    ;;[0m
2026-08-10T16:25:54.2163661Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:25:54.2164875Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2166528Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2167774Z [36;1m    ;;[0m
2026-08-10T16:25:54.2168713Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:25:54.2170003Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2171349Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2172592Z [36;1m    ;;[0m
2026-08-10T16:25:54.2173437Z [36;1m  *)[0m
2026-08-10T16:25:54.2174374Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2175933Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:54.2177193Z [36;1m    ;;[0m
2026-08-10T16:25:54.2178037Z [36;1mesac[0m
2026-08-10T16:25:54.2225063Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:54.2226399Z ##[endgroup]
﻿2026-08-10T16:25:54.2395410Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:25:54.2396920Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:25:54.2398181Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:54.2399440Z [36;1melse[0m
2026-08-10T16:25:54.2400444Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:54.2402365Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:25:54.2404134Z [36;1mfi[0m
2026-08-10T16:25:54.2449342Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:54.2450339Z env:
2026-08-10T16:25:54.2451111Z   WEBHOOK: 
2026-08-10T16:25:54.2451901Z ##[endgroup]
2026-08-10T16:25:54.2546417Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:46.1610000Z Evaluating notify.if
2026-08-10T16:25:46.1610000Z Evaluating: always()
2026-08-10T16:25:46.1610000Z Result: true
2026-08-10T16:25:46.1610000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:46.1610000Z Evaluating: success()
2026-08-10T16:25:46.1610000Z Result: true
2026-08-10T16:25:46.1630000Z Requested labels: ubuntu-latest
2026-08-10T16:25:46.1630000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:46.1630000Z Reusable workflow chain:
2026-08-10T16:25:46.1630000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-photo-upload-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:46.1630000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:46.1630000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:48.8190000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:48.8190000Z Job is about to start running on the hosted runner: GitHub Actions 1000002750
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.