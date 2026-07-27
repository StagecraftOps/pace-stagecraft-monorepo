# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Stripe Service (.github/workflows/ci-stripe-service.yml)

## Root cause (from automated analysis)

The actions/setup-node@v7 step in the lint job (and all subsequent jobs) fails with '##[error]Some specified paths were not resolved, unable to cache dependencies.' because the file services/payment/stripe-service/package-lock.json does not exist in the repository at this commit. The workflow's cache-dependency-path correctly references that path, but the lockfile (and possibly the entire service directory) is missing from the repo, causing setup-node to abort before npm ci can even run.

## Why this is a code-level issue, not a pipeline config issue

The fix requires adding the missing package-lock.json (and any other absent service source files) to services/payment/stripe-service/ in the repository, not changing the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
2026-07-27T16:27:24.7431056Z ##[group]Run case "failure" in
2026-07-27T16:27:24.7432333Z [36;1mcase "failure" in[0m
2026-07-27T16:27:24.7433441Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:24.7434631Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7436035Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7437607Z [36;1m    ;;[0m
2026-07-27T16:27:24.7438646Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:24.7439987Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7441378Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7442650Z [36;1m    ;;[0m
2026-07-27T16:27:24.7443615Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:24.7444800Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7446177Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7447640Z [36;1m    ;;[0m
2026-07-27T16:27:24.7448845Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:24.7450112Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7451519Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7452769Z [36;1m    ;;[0m
2026-07-27T16:27:24.7453769Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:24.7455058Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7456407Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7457895Z [36;1m    ;;[0m
2026-07-27T16:27:24.7458826Z [36;1m  *)[0m
2026-07-27T16:27:24.7459826Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7461188Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7462432Z [36;1m    ;;[0m
2026-07-27T16:27:24.7463352Z [36;1mesac[0m
2026-07-27T16:27:24.7508457Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:24.7509552Z ##[endgroup]
﻿2026-07-27T16:27:24.7671904Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:24.7673189Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:24.7674461Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:24.7675701Z [36;1melse[0m
2026-07-27T16:27:24.7676736Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:24.7678933Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:24.7680730Z [36;1mfi[0m
2026-07-27T16:27:24.7723602Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:24.7724646Z env:
2026-07-27T16:27:24.7725453Z   WEBHOOK: 
2026-07-27T16:27:24.7726289Z ##[endgroup]
2026-07-27T16:27:24.7816303Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:12.9800000Z Evaluating notify.if
2026-07-27T16:27:12.9800000Z Evaluating: always()
2026-07-27T16:27:12.9800000Z Result: true
2026-07-27T16:27:12.9800000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:12.9800000Z Evaluating: success()
2026-07-27T16:27:12.9800000Z Result: true
2026-07-27T16:27:13.4560000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:13.4150000Z Requested labels: ubuntu-latest
2026-07-27T16:27:13.4150000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:13.4150000Z Reusable workflow chain:
2026-07-27T16:27:13.4150000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-stripe-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:13.4150000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:13.4150000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:19.8530000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:19.8540000Z Job is about to start running on the hosted runner: GitHub Actions 1000002084
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.