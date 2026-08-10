# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Notification Service (.github/workflows/ci-notification-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job fails with: `##[error]Some specified paths were not resolved, unable to cache dependencies.` This means the file referenced by `cache-dependency-path: services/notification/notification-service/package-lock.json` does not exist in the repository at that path. npm's cache setup requires the lock file to be present at the exact path specified; when it cannot find it, the entire step errors out and the job fails before any linting or testing can occur. The `package-lock.json` is either missing from the repo (was never committed or was .gitignored) or the service directory `services/notification/notification-service` itself does not yet exist in the repository.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` at `services/notification/notification-service/package-lock.json` is a repository content problem — the file (and likely the service directory) needs to be added to the repo, not a workflow YAML change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
5339745Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.5392381Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:55.5393494Z ##[endgroup]
﻿2026-08-10T16:25:55.6851835Z ##[group]Run case "success" in
2026-08-10T16:25:55.6853013Z [36;1mcase "success" in[0m
2026-08-10T16:25:55.6853990Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:25:55.6855050Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6856342Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6857541Z [36;1m    ;;[0m
2026-08-10T16:25:55.6858420Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:25:55.6859631Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6860917Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6862255Z [36;1m    ;;[0m
2026-08-10T16:25:55.6863091Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:25:55.6864161Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6865446Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6866868Z [36;1m    ;;[0m
2026-08-10T16:25:55.6867710Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:25:55.6868862Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6870218Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6871400Z [36;1m    ;;[0m
2026-08-10T16:25:55.6872409Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:25:55.6873638Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6874917Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6876093Z [36;1m    ;;[0m
2026-08-10T16:25:55.6876865Z [36;1m  *)[0m
2026-08-10T16:25:55.6877736Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6879022Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:55.6880204Z [36;1m    ;;[0m
2026-08-10T16:25:55.6880985Z [36;1mesac[0m
2026-08-10T16:25:55.6929972Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:55.6930976Z ##[endgroup]
﻿2026-08-10T16:25:55.8338473Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:25:55.8339833Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:25:55.8341040Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:55.8342455Z [36;1melse[0m
2026-08-10T16:25:55.8343417Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:55.8345304Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:25:55.8347080Z [36;1mfi[0m
2026-08-10T16:25:55.8397578Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:55.8398552Z env:
2026-08-10T16:25:55.8399287Z   WEBHOOK: 
2026-08-10T16:25:55.8400026Z ##[endgroup]
2026-08-10T16:25:55.8504806Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:46.5910000Z Evaluating notify.if
2026-08-10T16:25:46.5910000Z Evaluating: always()
2026-08-10T16:25:46.5910000Z Result: true
2026-08-10T16:25:46.5910000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:46.5910000Z Evaluating: success()
2026-08-10T16:25:46.5910000Z Result: true
2026-08-10T16:25:46.5950000Z Requested labels: ubuntu-latest
2026-08-10T16:25:46.5950000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:46.5950000Z Reusable workflow chain:
2026-08-10T16:25:46.5950000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-notification-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:46.5950000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:46.5950000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:49.1440000Z Job is about to start running on the hosted runner: GitHub Actions 1000002751
2026-08-10T16:25:49.1430000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.