# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Subscription Service (.github/workflows/ci-subscription-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` npm cache step in the `lint` job (and all subsequent jobs) fails with '##[error]Some specified paths were not resolved, unable to cache dependencies.' because `services/payment/subscription-service/package-lock.json` does not exist in the repository. The missing lockfile causes `setup-node` to abort, which cascades through every downstream job (`unit-test`, `billing-logic-test`, `docker-build`, `integration-test`, `deploy-staging`) since each also references the same absent file.

## Why this is a code-level issue, not a pipeline config issue

The `package-lock.json` file (and likely the entire `services/payment/subscription-service` directory or its npm dependencies) is missing from the repository, requiring the file to be committed to source control — a repository content fix, not a workflow YAML change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
9204277Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9257001Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:24.9258196Z ##[endgroup]
﻿2026-07-27T16:27:24.9566607Z ##[group]Run case "failure" in
2026-07-27T16:27:24.9568598Z [36;1mcase "failure" in[0m
2026-07-27T16:27:24.9570429Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:24.9572344Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9574611Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9577117Z [36;1m    ;;[0m
2026-07-27T16:27:24.9578784Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:24.9581031Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9583402Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9585597Z [36;1m    ;;[0m
2026-07-27T16:27:24.9587450Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:24.9588947Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9590398Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9591956Z [36;1m    ;;[0m
2026-07-27T16:27:24.9592915Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:24.9594167Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9595630Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9597239Z [36;1m    ;;[0m
2026-07-27T16:27:24.9598257Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:24.9599587Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9600972Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9602274Z [36;1m    ;;[0m
2026-07-27T16:27:24.9603145Z [36;1m  *)[0m
2026-07-27T16:27:24.9604125Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9605510Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.9607054Z [36;1m    ;;[0m
2026-07-27T16:27:24.9607944Z [36;1mesac[0m
2026-07-27T16:27:24.9652940Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:24.9654021Z ##[endgroup]
﻿2026-07-27T16:27:24.9824244Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:24.9825616Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:24.9827227Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:24.9828597Z [36;1melse[0m
2026-07-27T16:27:24.9829668Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:24.9831672Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:24.9833505Z [36;1mfi[0m
2026-07-27T16:27:24.9879161Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:24.9880230Z env:
2026-07-27T16:27:24.9881036Z   WEBHOOK: 
2026-07-27T16:27:24.9881887Z ##[endgroup]
2026-07-27T16:27:24.9978611Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:13.1080000Z Evaluating notify.if
2026-07-27T16:27:13.1080000Z Evaluating: always()
2026-07-27T16:27:13.1080000Z Result: true
2026-07-27T16:27:13.1080000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:13.1080000Z Evaluating: success()
2026-07-27T16:27:13.1080000Z Result: true
2026-07-27T16:27:13.1200000Z Requested labels: ubuntu-latest
2026-07-27T16:27:13.1200000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:13.1200000Z Reusable workflow chain:
2026-07-27T16:27:13.1200000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-subscription-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:13.1200000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:13.1200000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:19.9800000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:19.9810000Z Job is about to start running on the hosted runner: GitHub Actions 1000002085
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.