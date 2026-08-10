# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - AVM Training Pipeline (.github/workflows/ci-avm-training-pipeline.yml)

## Root cause (from automated analysis)

The 'Run flake8' step fails with `E902 FileNotFoundError: [Errno 2] No such file or directory: 'src/'` when flake8 runs with `working-directory: services/data/avm-training-pipeline`. The `src/` subdirectory does not exist within that service directory in the repository at commit 3e27482 (PR #36). The same missing-directory issue would cascade to the `black` and `isort` steps targeting `src/` as well. This is an absent source directory in the repository content — the `services/data/avm-training-pipeline/src/` tree has not been committed.

## Why this is a code-level issue, not a pipeline config issue

The `src/` directory referenced by all three linting steps does not exist in the committed repository content for this service, requiring the missing source tree to be added to the repo rather than any change to the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
-10T16:25:53.0769302Z ##[group]Run case "success" in
2026-08-10T16:25:53.0770534Z [36;1mcase "success" in[0m
2026-08-10T16:25:53.0771615Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:25:53.0773064Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0774507Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0775803Z [36;1m    ;;[0m
2026-08-10T16:25:53.0776766Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:25:53.0778093Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0779490Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0780779Z [36;1m    ;;[0m
2026-08-10T16:25:53.0781692Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:25:53.0783093Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0784500Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0786010Z [36;1m    ;;[0m
2026-08-10T16:25:53.0786957Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:25:53.0788200Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0789657Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0790934Z [36;1m    ;;[0m
2026-08-10T16:25:53.0791898Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:25:53.0793524Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0794923Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0796199Z [36;1m    ;;[0m
2026-08-10T16:25:53.0797067Z [36;1m  *)[0m
2026-08-10T16:25:53.0798018Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0799403Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:25:53.0800682Z [36;1m    ;;[0m
2026-08-10T16:25:53.0801546Z [36;1mesac[0m
2026-08-10T16:25:53.0848872Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:53.0849946Z ##[endgroup]
﻿2026-08-10T16:25:53.1020080Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:25:53.1021462Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:25:53.1022982Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:53.1024320Z [36;1melse[0m
2026-08-10T16:25:53.1025369Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:25:53.1027382Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:25:53.1029231Z [36;1mfi[0m
2026-08-10T16:25:53.1075404Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:53.1076458Z env:
2026-08-10T16:25:53.1077267Z   WEBHOOK: 
2026-08-10T16:25:53.1078109Z ##[endgroup]
2026-08-10T16:25:53.1175458Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:44.1900000Z Evaluating notify.if
2026-08-10T16:25:44.1900000Z Evaluating: always()
2026-08-10T16:25:44.1900000Z Result: true
2026-08-10T16:25:44.1900000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:44.1900000Z Evaluating: success()
2026-08-10T16:25:44.1900000Z Result: true
2026-08-10T16:25:44.1920000Z Requested labels: ubuntu-latest
2026-08-10T16:25:44.1920000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:44.1920000Z Reusable workflow chain:
2026-08-10T16:25:44.1920000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-avm-training-pipeline.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:44.1920000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:44.1920000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:44.5310000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-10T16:25:47.5640000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:47.5630000Z Job is about to start running on the hosted runner: GitHub Actions 1000002748
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.