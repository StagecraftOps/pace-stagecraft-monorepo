# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Push Notification Service (.github/workflows/ci-push-notification-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node` step failed because the `package-lock.json` file referenced in `cache-dependency-path` (`services/notification/push-notification-service/package-lock.json`) does not exist in the repository at the checked-out commit. This causes the npm cache setup to error out with: `Some specified paths were not resolved, unable to cache dependencies.` The `lint` job (and all downstream jobs that depend on it) therefore fails before `npm ci` is even attempted. The missing `package-lock.json` is a repository content problem — the service directory either lacks the file entirely or it was never committed.

## Why this is a code-level issue, not a pipeline config issue

The `package-lock.json` file is missing from the repository at `services/notification/push-notification-service/`, which is a repository content issue that must be fixed by committing the file (or the full service scaffold), not by editing the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
16:28:42.3147864Z ##[group]Run case "success" in
2026-07-20T16:28:42.3148441Z [36;1mcase "success" in[0m
2026-07-20T16:28:42.3148872Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:42.3149325Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3149849Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3150321Z [36;1m    ;;[0m
2026-07-20T16:28:42.3150719Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:42.3151205Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3151717Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3152186Z [36;1m    ;;[0m
2026-07-20T16:28:42.3152563Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:42.3153010Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3153842Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3154547Z [36;1m    ;;[0m
2026-07-20T16:28:42.3154934Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:42.3155403Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3155977Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3156440Z [36;1m    ;;[0m
2026-07-20T16:28:42.3156835Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:42.3157313Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3157809Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3158265Z [36;1m    ;;[0m
2026-07-20T16:28:42.3158619Z [36;1m  *)[0m
2026-07-20T16:28:42.3159008Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3159517Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.3159991Z [36;1m    ;;[0m
2026-07-20T16:28:42.3160349Z [36;1mesac[0m
2026-07-20T16:28:42.3220146Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:42.3220606Z ##[endgroup]
﻿2026-07-20T16:28:42.3359852Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:42.3360449Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:42.3360962Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:42.3361463Z [36;1melse[0m
2026-07-20T16:28:42.3361902Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:42.3362613Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:42.3363520Z [36;1mfi[0m
2026-07-20T16:28:42.3420180Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:42.3420642Z env:
2026-07-20T16:28:42.3421010Z   WEBHOOK: 
2026-07-20T16:28:42.3421382Z ##[endgroup]
2026-07-20T16:28:42.3518802Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:34.2160000Z Requested labels: ubuntu-latest
2026-07-20T16:28:34.2160000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:34.2160000Z Reusable workflow chain:
2026-07-20T16:28:34.2160000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-push-notification-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:34.2160000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:34.2160000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:34.2150000Z Evaluating notify.if
2026-07-20T16:28:34.2150000Z Evaluating: always()
2026-07-20T16:28:34.2150000Z Result: true
2026-07-20T16:28:34.2150000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:34.2150000Z Evaluating: success()
2026-07-20T16:28:34.2150000Z Result: true
2026-07-20T16:28:34.7070000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:37.3800000Z Job is about to start running on the hosted runner: GitHub Actions 1000001925
2026-07-20T16:28:37.3800000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.