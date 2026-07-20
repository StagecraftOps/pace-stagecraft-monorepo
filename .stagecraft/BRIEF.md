# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - SMS Service (.github/workflows/ci-sms-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and identically in `unit-test` and `opt-out-compliance-check`) fails with "Some specified paths were not resolved, unable to cache dependencies" because `services/notification/sms-service/package-lock.json` does not exist in the repository. The file is referenced by `cache-dependency-path` but has not been committed, causing setup-node to abort before `npm ci` is ever attempted. All downstream jobs are blocked as a result.

## Why this is a code-level issue, not a pipeline config issue

The fix requires committing the missing `package-lock.json` (and verifying the full `services/notification/sms-service` directory contents including `package.json`) to the repository — this is a repository content problem, not a workflow YAML misconfiguration.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
]
﻿2026-07-20T16:28:39.6158376Z ##[group]Run case "success" in
2026-07-20T16:28:39.6159068Z [36;1mcase "success" in[0m
2026-07-20T16:28:39.6159620Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:39.6160202Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6160932Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6161582Z [36;1m    ;;[0m
2026-07-20T16:28:39.6162072Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:39.6162744Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6163458Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6164131Z [36;1m    ;;[0m
2026-07-20T16:28:39.6164586Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:39.6165168Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6165861Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6166503Z [36;1m    ;;[0m
2026-07-20T16:28:39.6167155Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:39.6167978Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6168722Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6169377Z [36;1m    ;;[0m
2026-07-20T16:28:39.6169855Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:39.6170524Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6171221Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6171862Z [36;1m    ;;[0m
2026-07-20T16:28:39.6172286Z [36;1m  *)[0m
2026-07-20T16:28:39.6172758Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6173453Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.6174110Z [36;1m    ;;[0m
2026-07-20T16:28:39.6174538Z [36;1mesac[0m
2026-07-20T16:28:39.6236357Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.6236941Z ##[endgroup]
﻿2026-07-20T16:28:39.6383321Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:39.6384056Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:39.6384740Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:39.6385435Z [36;1melse[0m
2026-07-20T16:28:39.6385961Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:39.6387065Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:39.6388322Z [36;1mfi[0m
2026-07-20T16:28:39.6447074Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.6447857Z env:
2026-07-20T16:28:39.6448259Z   WEBHOOK: 
2026-07-20T16:28:39.6448671Z ##[endgroup]
2026-07-20T16:28:39.6552017Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:33.1330000Z Requested labels: ubuntu-latest
2026-07-20T16:28:33.1330000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:33.1330000Z Reusable workflow chain:
2026-07-20T16:28:33.1330000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-sms-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:33.1330000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:33.1330000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:33.1330000Z Evaluating notify.if
2026-07-20T16:28:33.1330000Z Evaluating: always()
2026-07-20T16:28:33.1330000Z Result: true
2026-07-20T16:28:33.1330000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:33.1330000Z Evaluating: success()
2026-07-20T16:28:33.1330000Z Result: true
2026-07-20T16:28:33.1420000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:36.2590000Z Job is waiting for a hosted runner to come online.
2026-07-20T16:28:36.2590000Z Job is about to start running on the hosted runner: GitHub Actions 1000001923
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.