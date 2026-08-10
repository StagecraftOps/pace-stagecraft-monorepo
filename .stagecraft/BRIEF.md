# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Push Notification Service (.github/workflows/ci-push-notification-service.yml)

## Root cause (from automated analysis)

actions/setup-node@v7 fails with 'Some specified paths were not resolved, unable to cache dependencies' because services/notification/push-notification-service/package-lock.json does not exist in the repository. The workflow's cache-dependency-path points to the correct logical location, but the lockfile (and likely the service directory itself) has not been committed to the repo, causing the npm cache setup to abort the job before any install or lint step runs.

## Why this is a code-level issue, not a pipeline config issue

The missing package-lock.json is a repository-content gap (the file must be committed under services/notification/push-notification-service/), not a flaw in the workflow YAML itself.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
16:26:06.7438234Z ##[group]Run case "success" in
2026-08-10T16:26:06.7439446Z [36;1mcase "success" in[0m
2026-08-10T16:26:06.7440433Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:06.7441506Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7442816Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7444040Z [36;1m    ;;[0m
2026-08-10T16:26:06.7444929Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:06.7446159Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7447686Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7448924Z [36;1m    ;;[0m
2026-08-10T16:26:06.7449763Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:06.7450844Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7452140Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7453603Z [36;1m    ;;[0m
2026-08-10T16:26:06.7454471Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:06.7455635Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7456963Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7458442Z [36;1m    ;;[0m
2026-08-10T16:26:06.7459344Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:06.7460579Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7461867Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7463046Z [36;1m    ;;[0m
2026-08-10T16:26:06.7463835Z [36;1m  *)[0m
2026-08-10T16:26:06.7464717Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7466019Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7467227Z [36;1m    ;;[0m
2026-08-10T16:26:06.7468297Z [36;1mesac[0m
2026-08-10T16:26:06.7514410Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:06.7515410Z ##[endgroup]
﻿2026-08-10T16:26:06.7689279Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:06.7690541Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:06.7691743Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:06.7692958Z [36;1melse[0m
2026-08-10T16:26:06.7693952Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:06.7695828Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:06.7697873Z [36;1mfi[0m
2026-08-10T16:26:06.7742919Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:06.7743866Z env:
2026-08-10T16:26:06.7744560Z   WEBHOOK: 
2026-08-10T16:26:06.7745497Z ##[endgroup]
2026-08-10T16:26:06.7843843Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:49.9310000Z Evaluating notify.if
2026-08-10T16:25:49.9310000Z Evaluating: always()
2026-08-10T16:25:49.9310000Z Result: true
2026-08-10T16:25:49.9310000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:49.9310000Z Evaluating: success()
2026-08-10T16:25:49.9310000Z Result: true
2026-08-10T16:25:49.9440000Z Requested labels: ubuntu-latest
2026-08-10T16:25:49.9440000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:49.9440000Z Reusable workflow chain:
2026-08-10T16:25:49.9440000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-push-notification-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:49.9440000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:49.9440000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:50.1490000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-10T16:25:55.2820000Z Job is about to start running on the hosted runner: GitHub Actions 1000002757
2026-08-10T16:25:55.2810000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.