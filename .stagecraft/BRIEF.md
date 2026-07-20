# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Stripe Service (.github/workflows/ci-stripe-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and all subsequent jobs) fails with '##[error]Some specified paths were not resolved, unable to cache dependencies.' because the file `services/payment/stripe-service/package-lock.json` referenced by `cache-dependency-path` does not exist in the repository at commit 06678b4. The absence of `package-lock.json` means the npm dependency cache cannot be initialized, causing `setup-node` to error out and blocking the entire pipeline — lint, unit-test, webhook-signature-test, docker-build, integration-test, and deploy-staging all fail as a cascade from this single missing file.

## Why this is a code-level issue, not a pipeline config issue

The fix requires adding the missing `package-lock.json` (and likely the full `services/payment/stripe-service` npm package structure) to the repository, not changing the workflow YAML — the `cache-dependency-path` value is correctly configured but the referenced file is simply absent from repo content.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
2026-07-20T16:28:33.8904952Z ##[group]Run case "failure" in
2026-07-20T16:28:33.8905562Z [36;1mcase "failure" in[0m
2026-07-20T16:28:33.8906340Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:33.8906873Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8907501Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8908087Z [36;1m    ;;[0m
2026-07-20T16:28:33.8908537Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:33.8909112Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8909702Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8910258Z [36;1m    ;;[0m
2026-07-20T16:28:33.8910689Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:33.8911214Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8911819Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8912366Z [36;1m    ;;[0m
2026-07-20T16:28:33.8913013Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:33.8913563Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8914199Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8914742Z [36;1m    ;;[0m
2026-07-20T16:28:33.8915181Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:33.8915967Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8916569Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8917160Z [36;1m    ;;[0m
2026-07-20T16:28:33.8917557Z [36;1m  *)[0m
2026-07-20T16:28:33.8917990Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8918579Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:33.8919129Z [36;1m    ;;[0m
2026-07-20T16:28:33.8919538Z [36;1mesac[0m
2026-07-20T16:28:33.8982814Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:33.8983332Z ##[endgroup]
﻿2026-07-20T16:28:33.9125331Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:33.9126217Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:33.9126786Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:33.9127359Z [36;1melse[0m
2026-07-20T16:28:33.9127834Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:33.9128696Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:33.9129555Z [36;1mfi[0m
2026-07-20T16:28:33.9189142Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:33.9189639Z env:
2026-07-20T16:28:33.9190022Z   WEBHOOK: 
2026-07-20T16:28:33.9190428Z ##[endgroup]
2026-07-20T16:28:33.9293936Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:28.8990000Z Evaluating notify.if
2026-07-20T16:28:28.8990000Z Evaluating: always()
2026-07-20T16:28:28.8990000Z Result: true
2026-07-20T16:28:28.8990000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:28.8990000Z Evaluating: success()
2026-07-20T16:28:28.8990000Z Result: true
2026-07-20T16:28:28.9020000Z Requested labels: ubuntu-latest
2026-07-20T16:28:28.9020000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:28.9020000Z Reusable workflow chain:
2026-07-20T16:28:28.9020000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-stripe-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:28.9020000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:28.9020000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:29.1090000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:30.4250000Z Job is about to start running on the hosted runner: GitHub Actions 1000001916
2026-07-20T16:28:30.4240000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.