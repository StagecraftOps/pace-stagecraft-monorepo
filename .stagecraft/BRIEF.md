# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Stripe Service (.github/workflows/ci-stripe-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and likely all subsequent jobs) fails with: `##[error]Some specified paths were not resolved, unable to cache dependencies.` This error is thrown because the `cache-dependency-path` points to `services/payment/stripe-service/package-lock.json`, but that file does not exist in the repository at that path. The npm cache setup action requires the lockfile to be present to compute a cache key; when it cannot resolve the path, it aborts the step and the job fails before any code is installed or executed.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` at `services/payment/stripe-service/package-lock.json` is a repository-content problem — the file (and possibly the service directory itself) needs to be added to the repo, not a change to the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
2026-08-03T16:28:56.5498738Z ##[group]Run case "failure" in
2026-08-03T16:28:56.5499923Z [36;1mcase "failure" in[0m
2026-08-03T16:28:56.5500963Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:28:56.5502058Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5503405Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5504904Z [36;1m    ;;[0m
2026-08-03T16:28:56.5505859Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:28:56.5507131Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5508468Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5509710Z [36;1m    ;;[0m
2026-08-03T16:28:56.5510576Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:28:56.5511718Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5513049Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5514524Z [36;1m    ;;[0m
2026-08-03T16:28:56.5515645Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:28:56.5516851Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5518236Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5519456Z [36;1m    ;;[0m
2026-08-03T16:28:56.5520366Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:28:56.5521635Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5522984Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5524474Z [36;1m    ;;[0m
2026-08-03T16:28:56.5525300Z [36;1m  *)[0m
2026-08-03T16:28:56.5526212Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5527579Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:28:56.5528808Z [36;1m    ;;[0m
2026-08-03T16:28:56.5529607Z [36;1mesac[0m
2026-08-03T16:28:56.5574338Z shell: /usr/bin/bash -e {0}
2026-08-03T16:28:56.5575364Z ##[endgroup]
﻿2026-08-03T16:28:56.5738664Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:28:56.5739938Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:28:56.5741185Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:28:56.5742455Z [36;1melse[0m
2026-08-03T16:28:56.5743441Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:28:56.5745621Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:28:56.5747437Z [36;1mfi[0m
2026-08-03T16:28:56.5788948Z shell: /usr/bin/bash -e {0}
2026-08-03T16:28:56.5789936Z env:
2026-08-03T16:28:56.5790682Z   WEBHOOK: 
2026-08-03T16:28:56.5791449Z ##[endgroup]
2026-08-03T16:28:56.5883376Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:28:51.7570000Z Evaluating notify.if
2026-08-03T16:28:51.7570000Z Evaluating: always()
2026-08-03T16:28:51.7570000Z Result: true
2026-08-03T16:28:51.7570000Z Evaluating notify.notify-slack.if
2026-08-03T16:28:51.7570000Z Evaluating: success()
2026-08-03T16:28:51.7570000Z Result: true
2026-08-03T16:28:51.7610000Z Requested labels: ubuntu-latest
2026-08-03T16:28:51.7610000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:28:51.7610000Z Reusable workflow chain:
2026-08-03T16:28:51.7610000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-stripe-service.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:51.7610000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:51.7610000Z Waiting for a runner to pick up this job...
2026-08-03T16:28:52.0190000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:28:53.1390000Z Job is about to start running on the hosted runner: GitHub Actions 1000002222
2026-08-03T16:28:53.1390000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.