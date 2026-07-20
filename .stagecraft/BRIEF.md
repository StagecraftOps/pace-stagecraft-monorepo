# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Feature Store Pipeline (.github/workflows/ci-feature-store-pipeline.yml)

## Root cause (from automated analysis)

The `flake8` lint step fails with `E902 FileNotFoundError: [Errno 2] No such file or directory: 'src/'` because the `src/` subdirectory does not exist at `services/data/feature-store-pipeline/src/` in the checked-out repository. The workflow's working-directory is correctly set to `${{ env.SERVICE_DIR }}` (`services/data/feature-store-pipeline`) and flake8 is correctly invoked as `flake8 src/`, but the `src/` directory itself is absent from the repository content. This is not a misconfiguration of the pipeline — the tool invocation, working-directory, and lint flags are all valid — the source tree simply lacks the expected layout. The same missing `src/` directory would also cause downstream failures in the `black`, `isort`, and `mypy` steps, as well as the `unit-test` job's `pytest tests/unit/` step. Additionally, the workflow references non-existent action versions (`actions/checkout@v7`, `actions/setup-python@v7`, `actions/cache@v6`, `actions/upload-artifact@v7`), but the immediate and blocking failure is the missing `src/` directory.

## Why this is a code-level issue, not a pipeline config issue

The `src/` source directory is missing from the repository at `services/data/feature-store-pipeline/src/`, which is a repository content problem that requires adding the missing application source tree — not a change to the workflow YAML.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
20T16:28:39.9076111Z ##[group]Run case "success" in
2026-07-20T16:28:39.9077363Z [36;1mcase "success" in[0m
2026-07-20T16:28:39.9078416Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:39.9079535Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9080895Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9082132Z [36;1m    ;;[0m
2026-07-20T16:28:39.9083097Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:39.9084676Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9086079Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9087358Z [36;1m    ;;[0m
2026-07-20T16:28:39.9088293Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:39.9089440Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9090777Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9092256Z [36;1m    ;;[0m
2026-07-20T16:28:39.9093191Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:39.9094787Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9096226Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9097491Z [36;1m    ;;[0m
2026-07-20T16:28:39.9098491Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:39.9099786Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9101149Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9102356Z [36;1m    ;;[0m
2026-07-20T16:28:39.9103231Z [36;1m  *)[0m
2026-07-20T16:28:39.9104462Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9105833Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.9107081Z [36;1m    ;;[0m
2026-07-20T16:28:39.9107968Z [36;1mesac[0m
2026-07-20T16:28:39.9169956Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.9171009Z ##[endgroup]
﻿2026-07-20T16:28:39.9350164Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:39.9351431Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:39.9352676Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:39.9354153Z [36;1melse[0m
2026-07-20T16:28:39.9355208Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:39.9357049Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:39.9358814Z [36;1mfi[0m
2026-07-20T16:28:39.9419786Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.9420832Z env:
2026-07-20T16:28:39.9421641Z   WEBHOOK: 
2026-07-20T16:28:39.9422475Z ##[endgroup]
2026-07-20T16:28:39.9539261Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:31.3090000Z Evaluating notify.if
2026-07-20T16:28:31.3090000Z Evaluating: always()
2026-07-20T16:28:31.3090000Z Result: true
2026-07-20T16:28:31.3090000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:31.3090000Z Evaluating: success()
2026-07-20T16:28:31.3090000Z Result: true
2026-07-20T16:28:31.3150000Z Requested labels: ubuntu-latest
2026-07-20T16:28:31.3150000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:31.3150000Z Reusable workflow chain:
2026-07-20T16:28:31.3150000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-feature-store-pipeline.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:31.3150000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:31.3150000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:31.6190000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:34.8870000Z Job is waiting for a hosted runner to come online.
2026-07-20T16:28:34.8870000Z Job is about to start running on the hosted runner: GitHub Actions 1000001921
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.