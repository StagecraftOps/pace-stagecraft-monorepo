# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - AVM Training Pipeline (.github/workflows/ci-avm-training-pipeline.yml)

## Root cause (from automated analysis)

The `flake8` lint step fails with `E902 FileNotFoundError: [Errno 2] No such file or directory: 'src/'` (exit code 1). The workflow runs `flake8 src/` with `working-directory: services/data/avm-training-pipeline`, but no `src/` subdirectory exists at that path in the repository. This means the expected source layout (`services/data/avm-training-pipeline/src/`) is absent from the checked-out commit — the `src/` directory was never created, was accidentally deleted, or was not included in the PR branch. The installed tool versions (flake8 7.3.0, black 26.5.1, mypy 2.3.0, isort 8.0.1) resolve and download cleanly; the failure is purely due to the missing directory, not a pip resolution conflict despite the DEPENDENCY_VERSION category label.

## Why this is a code-level issue, not a pipeline config issue

The `src/` directory is absent from `services/data/avm-training-pipeline/` in the repository itself — this is a missing application source tree that must be added to the repo, not a workflow YAML misconfiguration.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
197077Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0246179Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:27.0246719Z ##[endgroup]
﻿2026-07-27T16:27:27.0444573Z ##[group]Run case "success" in
2026-07-27T16:27:27.0445165Z [36;1mcase "success" in[0m
2026-07-27T16:27:27.0445677Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:27.0446194Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0446820Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0447391Z [36;1m    ;;[0m
2026-07-27T16:27:27.0447834Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:27.0448410Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0449014Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0449568Z [36;1m    ;;[0m
2026-07-27T16:27:27.0450000Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:27.0450517Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0451122Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0451874Z [36;1m    ;;[0m
2026-07-27T16:27:27.0452300Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:27.0452854Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0453771Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0454332Z [36;1m    ;;[0m
2026-07-27T16:27:27.0454770Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:27.0455357Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0455961Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0456520Z [36;1m    ;;[0m
2026-07-27T16:27:27.0456917Z [36;1m  *)[0m
2026-07-27T16:27:27.0457362Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0457970Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:27.0458531Z [36;1m    ;;[0m
2026-07-27T16:27:27.0458929Z [36;1mesac[0m
2026-07-27T16:27:27.0499478Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:27.0499974Z ##[endgroup]
﻿2026-07-27T16:27:27.0616840Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:27.0617488Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:27.0618096Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:27.0618676Z [36;1melse[0m
2026-07-27T16:27:27.0619156Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:27.0620017Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:27.0620801Z [36;1mfi[0m
2026-07-27T16:27:27.0660917Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:27.0661423Z env:
2026-07-27T16:27:27.0661808Z   WEBHOOK: 
2026-07-27T16:27:27.0662200Z ##[endgroup]
2026-07-27T16:27:27.0741697Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:19.2480000Z Requested labels: ubuntu-latest
2026-07-27T16:27:19.2480000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:19.2480000Z Reusable workflow chain:
2026-07-27T16:27:19.2480000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-avm-training-pipeline.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:19.2480000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:19.2480000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:19.2370000Z Evaluating notify.if
2026-07-27T16:27:19.2370000Z Evaluating: always()
2026-07-27T16:27:19.2370000Z Result: true
2026-07-27T16:27:19.2370000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:19.2370000Z Evaluating: success()
2026-07-27T16:27:19.2370000Z Result: true
2026-07-27T16:27:23.7500000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:23.7500000Z Job is about to start running on the hosted runner: GitHub Actions 1000002088
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.