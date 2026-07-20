# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Subscription Service (.github/workflows/ci-subscription-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and identically in `unit-test` and `billing-logic-test`) fails with: `Some specified paths were not resolved, unable to cache dependencies.` This means the file `services/payment/subscription-service/package-lock.json` does not exist in the repository at the checked-out commit. The `cache-dependency-path` points to a `package-lock.json` that is absent from the repo tree — there is no `package-lock.json` (and almost certainly no `package.json` or `node_modules` scaffold at all) committed under `services/payment/subscription-service/`. Because `setup-node` cannot find the lockfile, it aborts immediately and every downstream job (`unit-test`, `billing-logic-test`, etc.) is blocked. The `notify` job then fires with `status: failure`. This is not a workflow YAML misconfiguration — the `cache-dependency-path` value is syntactically correct and points to the right relative path; the file simply does not exist in the repository content.

## Why this is a code-level issue, not a pipeline config issue

The failure is caused by a missing `package-lock.json` (and likely the entire `services/payment/subscription-service` package scaffold) in the repository, which must be added as application/repository content — editing the workflow YAML cannot resolve a missing source file.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
7-20T16:28:39.2537901Z ##[group]Run case "failure" in
2026-07-20T16:28:39.2538614Z [36;1mcase "failure" in[0m
2026-07-20T16:28:39.2539217Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:39.2539861Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2540644Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2541357Z [36;1m    ;;[0m
2026-07-20T16:28:39.2542104Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:39.2542847Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2543619Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2544324Z [36;1m    ;;[0m
2026-07-20T16:28:39.2544823Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:39.2545460Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2546230Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2547168Z [36;1m    ;;[0m
2026-07-20T16:28:39.2547682Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:39.2548364Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2549190Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2549883Z [36;1m    ;;[0m
2026-07-20T16:28:39.2550409Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:39.2551112Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2552008Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2552697Z [36;1m    ;;[0m
2026-07-20T16:28:39.2553166Z [36;1m  *)[0m
2026-07-20T16:28:39.2553680Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2554422Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.2555116Z [36;1m    ;;[0m
2026-07-20T16:28:39.2555581Z [36;1mesac[0m
2026-07-20T16:28:39.2616270Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.2616883Z ##[endgroup]
﻿2026-07-20T16:28:39.2764769Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:39.2765532Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:39.2766265Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:39.2767008Z [36;1melse[0m
2026-07-20T16:28:39.2767571Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:39.2768726Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:39.2769798Z [36;1mfi[0m
2026-07-20T16:28:39.2828986Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.2829605Z env:
2026-07-20T16:28:39.2830058Z   WEBHOOK: 
2026-07-20T16:28:39.2830516Z ##[endgroup]
2026-07-20T16:28:39.2932759Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:31.7580000Z Requested labels: ubuntu-latest
2026-07-20T16:28:31.7580000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:31.7580000Z Reusable workflow chain:
2026-07-20T16:28:31.7580000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-subscription-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:31.7580000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:31.7580000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:31.7770000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:31.7540000Z Evaluating notify.if
2026-07-20T16:28:31.7540000Z Evaluating: always()
2026-07-20T16:28:31.7540000Z Result: true
2026-07-20T16:28:31.7540000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:31.7540000Z Evaluating: success()
2026-07-20T16:28:31.7540000Z Result: true
2026-07-20T16:28:35.7510000Z Job is waiting for a hosted runner to come online.
2026-07-20T16:28:35.7520000Z Job is about to start running on the hosted runner: GitHub Actions 1000001922
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.