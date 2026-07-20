# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Data Quality Pipeline (.github/workflows/ci-data-quality-pipeline.yml)

## Root cause (from automated analysis)

The flake8 lint step fails with 'FileNotFoundError: [Errno 2] No such file or directory: src/' because the src/ directory does not exist under services/data/data-quality-pipeline/ in the checked-out commit (PR #36 / SHA 06678b4). All lint and test steps target this missing directory. All lint tools installed successfully, so this is a missing application source tree, not a dependency version or pipeline misconfiguration issue.

## Why this is a code-level issue, not a pipeline config issue

The src/ directory — and likely the entire service source tree — is absent from the repository at services/data/data-quality-pipeline/src/, which must be added as application/repository content; no workflow YAML change can compensate for a missing source directory.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
084230Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4169026Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:45.4170172Z ##[endgroup]
﻿2026-07-20T16:28:45.4446181Z ##[group]Run case "success" in
2026-07-20T16:28:45.4447341Z [36;1mcase "success" in[0m
2026-07-20T16:28:45.4448308Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:45.4449361Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4450644Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4452028Z [36;1m    ;;[0m
2026-07-20T16:28:45.4452909Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:45.4454120Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4455402Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4456576Z [36;1m    ;;[0m
2026-07-20T16:28:45.4457392Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:45.4458446Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4459714Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4461107Z [36;1m    ;;[0m
2026-07-20T16:28:45.4462245Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:45.4463409Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4464756Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4465945Z [36;1m    ;;[0m
2026-07-20T16:28:45.4466817Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:45.4468032Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4469376Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4470581Z [36;1m    ;;[0m
2026-07-20T16:28:45.4471611Z [36;1m  *)[0m
2026-07-20T16:28:45.4472536Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4473842Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.4475056Z [36;1m    ;;[0m
2026-07-20T16:28:45.4475828Z [36;1mesac[0m
2026-07-20T16:28:45.4537139Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:45.4538145Z ##[endgroup]
﻿2026-07-20T16:28:45.4717423Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:45.4718687Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:45.4719877Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:45.4721072Z [36;1melse[0m
2026-07-20T16:28:45.4722319Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:45.4724234Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:45.4725981Z [36;1mfi[0m
2026-07-20T16:28:45.4786277Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:45.4787225Z env:
2026-07-20T16:28:45.4787952Z   WEBHOOK: 
2026-07-20T16:28:45.4788678Z ##[endgroup]
2026-07-20T16:28:45.4903441Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:40.2390000Z Evaluating notify.if
2026-07-20T16:28:40.2390000Z Evaluating: always()
2026-07-20T16:28:40.2390000Z Result: true
2026-07-20T16:28:40.2390000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:40.2390000Z Evaluating: success()
2026-07-20T16:28:40.2390000Z Result: true
2026-07-20T16:28:40.2390000Z Requested labels: ubuntu-latest
2026-07-20T16:28:40.2390000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:40.2390000Z Reusable workflow chain:
2026-07-20T16:28:40.2390000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-data-quality-pipeline.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:40.2390000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:40.2390000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:40.2430000Z Job is about to start running on the hosted runner: GitHub Actions 1000001932
2026-07-20T16:28:40.2430000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.