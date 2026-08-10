# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Subscription Service (.github/workflows/ci-subscription-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job fails with '##[error]Some specified paths were not resolved, unable to cache dependencies.' because `services/payment/subscription-service/package-lock.json` does not exist in the repository at the checked-out commit (SHA 3e2748244e). The `cache-dependency-path` is correctly formed in the YAML, but the file it points to is absent from repository content, causing setup-node to abort before any npm or lint command runs. All downstream jobs (unit-test, billing-logic-test, docker-build, integration-test, deploy-staging) are blocked as a consequence.

## Why this is a code-level issue, not a pipeline config issue

The workflow YAML path expression is syntactically correct; the missing `package-lock.json` (and likely the broader absence of the `services/payment/subscription-service` directory or its npm manifest) is a repository-content problem that must be fixed by committing the missing file(s), not by editing the workflow.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
3099160Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3147701Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:02.3148709Z ##[endgroup]
﻿2026-08-10T16:26:02.3395147Z ##[group]Run case "failure" in
2026-08-10T16:26:02.3396202Z [36;1mcase "failure" in[0m
2026-08-10T16:26:02.3397134Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:02.3398258Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3399510Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3400570Z [36;1m    ;;[0m
2026-08-10T16:26:02.3401394Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:02.3402793Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3403953Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3405015Z [36;1m    ;;[0m
2026-08-10T16:26:02.3405789Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:02.3406755Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3407905Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3409201Z [36;1m    ;;[0m
2026-08-10T16:26:02.3410005Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:02.3411042Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3412444Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3413494Z [36;1m    ;;[0m
2026-08-10T16:26:02.3414309Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:02.3415384Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3416511Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3417555Z [36;1m    ;;[0m
2026-08-10T16:26:02.3418288Z [36;1m  *)[0m
2026-08-10T16:26:02.3419125Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3420277Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.3421343Z [36;1m    ;;[0m
2026-08-10T16:26:02.3422213Z [36;1mesac[0m
2026-08-10T16:26:02.3468249Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:02.3469141Z ##[endgroup]
﻿2026-08-10T16:26:02.3627612Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:02.3628803Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:02.3629934Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:02.3631062Z [36;1melse[0m
2026-08-10T16:26:02.3632291Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:02.3634096Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:02.3635637Z [36;1mfi[0m
2026-08-10T16:26:02.3680287Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:02.3681195Z env:
2026-08-10T16:26:02.3681899Z   WEBHOOK: 
2026-08-10T16:26:02.3682915Z ##[endgroup]
2026-08-10T16:26:02.3776557Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:47.0000000Z Requested labels: ubuntu-latest
2026-08-10T16:25:47.0000000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:47.0000000Z Reusable workflow chain:
2026-08-10T16:25:47.0000000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-subscription-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:47.0000000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:47.0000000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:46.9970000Z Evaluating notify.if
2026-08-10T16:25:46.9970000Z Evaluating: always()
2026-08-10T16:25:46.9970000Z Result: true
2026-08-10T16:25:46.9970000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:46.9970000Z Evaluating: success()
2026-08-10T16:25:46.9970000Z Result: true
2026-08-10T16:25:49.4490000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:49.4480000Z Job is about to start running on the hosted runner: GitHub Actions 1000002752
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.