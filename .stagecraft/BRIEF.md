# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Email Service (.github/workflows/ci-email-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and downstream jobs) fails with: `##[error]Some specified paths were not resolved, unable to cache dependencies.` This error is thrown because the `cache-dependency-path` points to `services/notification/email-service/package-lock.json`, but that file does not exist in the repository at the checked-out commit. With no `package-lock.json` present, the npm cache action cannot resolve the path, causing the entire job to abort before `npm ci` is even attempted. This is an application/repository-content problem: the `package-lock.json` file (and likely the entire `services/notification/email-service/` directory or its npm manifest) is missing from the repo.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` at `services/notification/email-service/package-lock.json` is a repository content problem — the file (and possibly the service directory itself) needs to be committed to the repo, not a change to the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
:28:47.7870951Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.7961532Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:47.7962964Z ##[endgroup]
﻿2026-07-20T16:28:47.8331440Z ##[group]Run case "success" in
2026-07-20T16:28:47.8332806Z [36;1mcase "success" in[0m
2026-07-20T16:28:47.8334004Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:47.8335296Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8336841Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8338265Z [36;1m    ;;[0m
2026-07-20T16:28:47.8339513Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:47.8340977Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8342504Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8343939Z [36;1m    ;;[0m
2026-07-20T16:28:47.8344974Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:47.8346251Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8347776Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8349288Z [36;1m    ;;[0m
2026-07-20T16:28:47.8350551Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:47.8351935Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8353526Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8354940Z [36;1m    ;;[0m
2026-07-20T16:28:47.8356028Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:47.8357476Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8359167Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8360629Z [36;1m    ;;[0m
2026-07-20T16:28:47.8361615Z [36;1m  *)[0m
2026-07-20T16:28:47.8362704Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8364231Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.8365645Z [36;1m    ;;[0m
2026-07-20T16:28:47.8366614Z [36;1mesac[0m
2026-07-20T16:28:47.8433939Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:47.8435163Z ##[endgroup]
﻿2026-07-20T16:28:47.8631719Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:47.8633173Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:47.8634615Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:47.8636032Z [36;1melse[0m
2026-07-20T16:28:47.8637195Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:47.8639532Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:47.8641670Z [36;1mfi[0m
2026-07-20T16:28:47.8708707Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:47.8710016Z env:
2026-07-20T16:28:47.8710944Z   WEBHOOK: 
2026-07-20T16:28:47.8711899Z ##[endgroup]
2026-07-20T16:28:47.8831071Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:43.3090000Z Job is about to start running on the hosted runner: GitHub Actions 1000001935
2026-07-20T16:28:43.2970000Z Evaluating notify.if
2026-07-20T16:28:43.2970000Z Evaluating: always()
2026-07-20T16:28:43.2970000Z Result: true
2026-07-20T16:28:43.2970000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:43.2970000Z Evaluating: success()
2026-07-20T16:28:43.2970000Z Result: true
2026-07-20T16:28:43.3000000Z Requested labels: ubuntu-latest
2026-07-20T16:28:43.3000000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:43.3000000Z Reusable workflow chain:
2026-07-20T16:28:43.3000000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-email-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:43.3000000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:43.3000000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:43.3090000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.