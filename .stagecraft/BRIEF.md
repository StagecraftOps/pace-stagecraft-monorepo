# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Clickstream Pipeline (.github/workflows/ci-clickstream-pipeline.yml)

## Root cause (from automated analysis)

The 'src/' directory does not exist under services/data/clickstream-pipeline/ in the repository. flake8 (and all subsequent lint tools) fail immediately with FileNotFoundError when they are invoked with working-directory set to that service path and told to target 'src/'. This is a missing repository content issue — the service's source tree has not been committed, not a workflow misconfiguration or an actual dependency version problem.

## Why this is a code-level issue, not a pipeline config issue

The 'src/' source directory must be created and committed under services/data/clickstream-pipeline/ in the repository; no change to the workflow YAML will resolve a missing source tree.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
7-20T16:28:37.6217933Z ##[group]Run case "success" in
2026-07-20T16:28:37.6218481Z [36;1mcase "success" in[0m
2026-07-20T16:28:37.6218948Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:37.6219491Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6220077Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6220646Z [36;1m    ;;[0m
2026-07-20T16:28:37.6221326Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:37.6222008Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6222649Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6223191Z [36;1m    ;;[0m
2026-07-20T16:28:37.6223619Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:37.6224150Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6224713Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6225364Z [36;1m    ;;[0m
2026-07-20T16:28:37.6225813Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:37.6226365Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6227041Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6227567Z [36;1m    ;;[0m
2026-07-20T16:28:37.6228024Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:37.6228591Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6229142Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6229694Z [36;1m    ;;[0m
2026-07-20T16:28:37.6230103Z [36;1m  *)[0m
2026-07-20T16:28:37.6230544Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6231308Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:37.6231889Z [36;1m    ;;[0m
2026-07-20T16:28:37.6232313Z [36;1mesac[0m
2026-07-20T16:28:37.6260506Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:37.6261041Z ##[endgroup]
﻿2026-07-20T16:28:37.6355486Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:37.6356105Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:37.6356679Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:37.6357223Z [36;1melse[0m
2026-07-20T16:28:37.6357715Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:37.6358483Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:37.6359341Z [36;1mfi[0m
2026-07-20T16:28:37.6384477Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:37.6385056Z env:
2026-07-20T16:28:37.6385477Z   WEBHOOK: 
2026-07-20T16:28:37.6385918Z ##[endgroup]
2026-07-20T16:28:37.6443256Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:31.0620000Z Evaluating notify.if
2026-07-20T16:28:31.0620000Z Evaluating: always()
2026-07-20T16:28:31.0620000Z Result: true
2026-07-20T16:28:31.0620000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:31.0620000Z Evaluating: success()
2026-07-20T16:28:31.0620000Z Result: true
2026-07-20T16:28:31.0650000Z Requested labels: ubuntu-latest
2026-07-20T16:28:31.0650000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:31.0650000Z Reusable workflow chain:
2026-07-20T16:28:31.0650000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-clickstream-pipeline.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:31.0650000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:31.0650000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:31.3580000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:34.0710000Z Job is about to start running on the hosted runner: GitHub Actions 1000001920
2026-07-20T16:28:34.0710000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.