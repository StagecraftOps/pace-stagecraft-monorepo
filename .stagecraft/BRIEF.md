# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - AVM Training Pipeline (.github/workflows/ci-avm-training-pipeline.yml)

## Root cause (from automated analysis)

The `flake8` lint step fails with `E902 FileNotFoundError: [Errno 2] No such file or directory: 'src/'` when running inside `working-directory: services/data/avm-training-pipeline`. This means the `src/` subdirectory does not exist within `services/data/avm-training-pipeline/` in the checked-out repository. The service directory itself is present (the working-directory change succeeds), but the `src/` source tree expected by all three linters (flake8, black, isort) is missing from the repository content.

## Why this is a code-level issue, not a pipeline config issue

The `src/` directory is absent from `services/data/avm-training-pipeline/` in the repository itself — this is a missing repository content problem (no source tree committed) that cannot be resolved by editing the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
-20T16:28:40.7659194Z ##[group]Run case "success" in
2026-07-20T16:28:40.7659730Z [36;1mcase "success" in[0m
2026-07-20T16:28:40.7660140Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:40.7660575Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7661087Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7661549Z [36;1m    ;;[0m
2026-07-20T16:28:40.7661939Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:40.7662414Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7662908Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7663368Z [36;1m    ;;[0m
2026-07-20T16:28:40.7663722Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:40.7664151Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7664642Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7665304Z [36;1m    ;;[0m
2026-07-20T16:28:40.7665675Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:40.7666123Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7666956Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7667416Z [36;1m    ;;[0m
2026-07-20T16:28:40.7667792Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:40.7668258Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7668738Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7669178Z [36;1m    ;;[0m
2026-07-20T16:28:40.7669521Z [36;1m  *)[0m
2026-07-20T16:28:40.7669890Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7670388Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:40.7670837Z [36;1m    ;;[0m
2026-07-20T16:28:40.7671180Z [36;1mesac[0m
2026-07-20T16:28:40.7727341Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:40.7727880Z ##[endgroup]
﻿2026-07-20T16:28:40.7854962Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:40.7855536Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:40.7856019Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:40.7856689Z [36;1melse[0m
2026-07-20T16:28:40.7857091Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:40.7857757Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:40.7858375Z [36;1mfi[0m
2026-07-20T16:28:40.7910885Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:40.7911313Z env:
2026-07-20T16:28:40.7911650Z   WEBHOOK: 
2026-07-20T16:28:40.7911980Z ##[endgroup]
2026-07-20T16:28:40.8001902Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:35.2140000Z Requested labels: ubuntu-latest
2026-07-20T16:28:35.2140000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:35.2140000Z Reusable workflow chain:
2026-07-20T16:28:35.2140000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-avm-training-pipeline.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:35.2140000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:35.2140000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:35.2120000Z Evaluating notify.if
2026-07-20T16:28:35.2120000Z Evaluating: always()
2026-07-20T16:28:35.2120000Z Result: true
2026-07-20T16:28:35.2120000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:35.2120000Z Evaluating: success()
2026-07-20T16:28:35.2120000Z Result: true
2026-07-20T16:28:35.5030000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:37.3250000Z Job is about to start running on the hosted runner: GitHub Actions 1000001926
2026-07-20T16:28:37.3240000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.