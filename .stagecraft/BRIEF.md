# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Push Notification Service (.github/workflows/ci-push-notification-service.yml)

## Root cause (from automated analysis)

actions/setup-node@v7 fails with '##[error]Some specified paths were not resolved, unable to cache dependencies.' because the file referenced by cache-dependency-path — services/notification/push-notification-service/package-lock.json — does not exist in the repository. The package-lock.json (and likely the package.json it is generated from) is missing from the push-notification-service directory, so the npm dependency cache cannot be keyed and the setup-node step aborts, blocking lint and all downstream jobs.

## Why this is a code-level issue, not a pipeline config issue

The package-lock.json lockfile is absent from the service directory in the repository itself — adding or committing it (along with a package.json if also missing) is a repository-content fix, not a workflow YAML change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
16:29:13.2208782Z ##[group]Run case "success" in
2026-08-03T16:29:13.2209713Z [36;1mcase "success" in[0m
2026-08-03T16:29:13.2210478Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:13.2211300Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2212282Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2213198Z [36;1m    ;;[0m
2026-08-03T16:29:13.2213886Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:13.2214815Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2215788Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2216699Z [36;1m    ;;[0m
2026-08-03T16:29:13.2217357Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:13.2218332Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2219326Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2220419Z [36;1m    ;;[0m
2026-08-03T16:29:13.2221090Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:13.2221972Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2223008Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2223923Z [36;1m    ;;[0m
2026-08-03T16:29:13.2224606Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:13.2225535Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2226516Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2227421Z [36;1m    ;;[0m
2026-08-03T16:29:13.2228163Z [36;1m  *)[0m
2026-08-03T16:29:13.2228875Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2229861Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:13.2230778Z [36;1m    ;;[0m
2026-08-03T16:29:13.2231400Z [36;1mesac[0m
2026-08-03T16:29:13.2272069Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:13.2272861Z ##[endgroup]
﻿2026-08-03T16:29:13.2471797Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:13.2472828Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:13.2473751Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:13.2474672Z [36;1melse[0m
2026-08-03T16:29:13.2475403Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:13.2476825Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:13.2478354Z [36;1mfi[0m
2026-08-03T16:29:13.2518390Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:13.2519161Z env:
2026-08-03T16:29:13.2519723Z   WEBHOOK: 
2026-08-03T16:29:13.2520299Z ##[endgroup]
2026-08-03T16:29:13.2672084Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:29:07.7240000Z Evaluating notify.if
2026-08-03T16:29:07.7240000Z Evaluating: always()
2026-08-03T16:29:07.7240000Z Result: true
2026-08-03T16:29:07.7240000Z Evaluating notify.notify-slack.if
2026-08-03T16:29:07.7240000Z Evaluating: success()
2026-08-03T16:29:07.7240000Z Result: true
2026-08-03T16:29:07.7260000Z Requested labels: ubuntu-latest
2026-08-03T16:29:07.7260000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:29:07.7260000Z Reusable workflow chain:
2026-08-03T16:29:07.7260000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-push-notification-service.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:07.7260000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:07.7260000Z Waiting for a runner to pick up this job...
2026-08-03T16:29:08.1040000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:29:08.4000000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:29:08.4010000Z Job is about to start running on the hosted runner: GitHub Actions 1000002245
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.