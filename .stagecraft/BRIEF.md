# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Clickstream Pipeline (.github/workflows/ci-clickstream-pipeline.yml)

## Root cause (from automated analysis)

The 'Run flake8' step (and all subsequent lint steps) fail with 'FileNotFoundError: [Errno 2] No such file or directory: src/' because the src/ subdirectory does not exist under services/data/clickstream-pipeline in the checked-out commit (PR #36 merge ref 3e2748244e). The workflow correctly sets working-directory to services/data/clickstream-pipeline, but the source tree that all lint and test steps depend on is simply absent from the repository at that path.

## Why this is a code-level issue, not a pipeline config issue

The src/ directory (and likely the entire service source tree) is missing from services/data/clickstream-pipeline in the repository content — the workflow configuration is correct and no YAML change will resolve a missing application source directory.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
3271587Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3326369Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:57.3327677Z ##[endgroup]
﻿2026-08-10T16:25:57.3659647Z ##[group]Run case "success" in
2026-08-10T16:25:57.3660839Z [36;1mcase "success" in[0m
2026-08-10T16:25:57.3661893Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:25:57.3663233Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3664552Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3665763Z [36;1m    ;;[0m
2026-08-10T16:25:57.3666730Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:25:57.3667978Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3669286Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3670494Z [36;1m    ;;[0m
2026-08-10T16:25:57.3671423Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:25:57.3672536Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3674024Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3675468Z [36;1m    ;;[0m
2026-08-10T16:25:57.3676420Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:25:57.3677607Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3678945Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3680156Z [36;1m    ;;[0m
2026-08-10T16:25:57.3681114Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:25:57.3682353Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3683783Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3684962Z [36;1m    ;;[0m
2026-08-10T16:25:57.3685825Z [36;1m  *)[0m
2026-08-10T16:25:57.3686782Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3688070Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:57.3689265Z [36;1m    ;;[0m
2026-08-10T16:25:57.3690137Z [36;1mesac[0m
2026-08-10T16:25:57.3739190Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:57.3740243Z ##[endgroup]
﻿2026-08-10T16:25:57.3903996Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:25:57.3905259Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:25:57.3906471Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:57.3907698Z [36;1melse[0m
2026-08-10T16:25:57.3908711Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:57.3910465Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:25:57.3912111Z [36;1mfi[0m
2026-08-10T16:25:57.3958422Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:57.3959452Z env:
2026-08-10T16:25:57.3960269Z   WEBHOOK: 
2026-08-10T16:25:57.3961108Z ##[endgroup]
2026-08-10T16:25:57.4056676Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:48.4500000Z Requested labels: ubuntu-latest
2026-08-10T16:25:48.4500000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:48.4500000Z Reusable workflow chain:
2026-08-10T16:25:48.4500000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-clickstream-pipeline.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:48.4500000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:48.4500000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:48.4460000Z Evaluating notify.if
2026-08-10T16:25:48.4460000Z Evaluating: always()
2026-08-10T16:25:48.4460000Z Result: true
2026-08-10T16:25:48.4460000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:48.4460000Z Evaluating: success()
2026-08-10T16:25:48.4460000Z Result: true
2026-08-10T16:25:53.4370000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:53.4380000Z Job is about to start running on the hosted runner: GitHub Actions 1000002755
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.