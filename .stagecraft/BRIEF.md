# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Market Data Pipeline (.github/workflows/ci-market-data-pipeline.yml)

## Root cause (from automated analysis)

The 'Run flake8' step fails with 'FileNotFoundError: No such file or directory: src/' because the services/data/market-data-pipeline/src/ directory does not exist in the repository. All lint tools (flake8 7.3.0, black 26.5.1, isort 8.0.1, mypy 2.3.0) install successfully — the failure is not a tool version conflict. The working-directory resolves correctly to services/data/market-data-pipeline, but the src/ subdirectory that flake8 (and subsequently black, isort, mypy) is told to scan is absent from the checked-out tree. This is a missing application source directory in the repository content.

## Why this is a code-level issue, not a pipeline config issue

The src/ source directory is missing from services/data/market-data-pipeline/ in the repository itself — the fix requires adding that directory (and its Python source files) to the repo, not changing the workflow YAML.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
7-27T16:27:24.7033738Z ##[group]Run case "success" in
2026-07-27T16:27:24.7034966Z [36;1mcase "success" in[0m
2026-07-27T16:27:24.7036060Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:24.7037244Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7038952Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7040265Z [36;1m    ;;[0m
2026-07-27T16:27:24.7041247Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:24.7042543Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7043926Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7045204Z [36;1m    ;;[0m
2026-07-27T16:27:24.7046141Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:24.7047292Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7049152Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7050736Z [36;1m    ;;[0m
2026-07-27T16:27:24.7051690Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:24.7052936Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7054358Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7055625Z [36;1m    ;;[0m
2026-07-27T16:27:24.7056605Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:24.7058123Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7059527Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7060800Z [36;1m    ;;[0m
2026-07-27T16:27:24.7061679Z [36;1m  *)[0m
2026-07-27T16:27:24.7062642Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7064010Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:24.7065302Z [36;1m    ;;[0m
2026-07-27T16:27:24.7066175Z [36;1mesac[0m
2026-07-27T16:27:24.7114840Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:24.7115937Z ##[endgroup]
﻿2026-07-27T16:27:24.7291674Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:24.7293024Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:24.7294372Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:24.7295717Z [36;1melse[0m
2026-07-27T16:27:24.7296800Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:24.7299069Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:24.7301022Z [36;1mfi[0m
2026-07-27T16:27:24.7347742Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:24.7349060Z env:
2026-07-27T16:27:24.7349907Z   WEBHOOK: 
2026-07-27T16:27:24.7350774Z ##[endgroup]
2026-07-27T16:27:24.7449071Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:14.6750000Z Evaluating notify.if
2026-07-27T16:27:14.6750000Z Evaluating: always()
2026-07-27T16:27:14.6750000Z Result: true
2026-07-27T16:27:14.6750000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:14.6750000Z Evaluating: success()
2026-07-27T16:27:14.6750000Z Result: true
2026-07-27T16:27:14.6810000Z Requested labels: ubuntu-latest
2026-07-27T16:27:14.6810000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:14.6810000Z Reusable workflow chain:
2026-07-27T16:27:14.6810000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-market-data-pipeline.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:14.6810000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:14.6810000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:15.1650000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:20.2550000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:20.5070000Z Job is about to start running on the hosted runner: GitHub Actions 1000002086
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.