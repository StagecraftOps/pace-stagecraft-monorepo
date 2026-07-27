# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Price Alert Service (.github/workflows/ci-price-alert-service.yml)

## Root cause (from automated analysis)

The `mypy src/` step in the lint job fails with exit code 2 and the message 'There are no .py[i] files in directory src'. The `src/` directory under `services/notification/price-alert-service/` contains no Python source files (confirmed by `black` also reporting 'No Python files are present'). This means the application source code is entirely absent from the checked-out tree for this PR — either the `src/` directory was never created or all `.py` files were accidentally removed/not committed.

## Why this is a code-level issue, not a pipeline config issue

The failure is caused by missing application source files (no `.py` files in `src/`), which requires adding or restoring Python source code to the repository, not changing the workflow YAML.

Failure category: LINT_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
07-27T16:27:32.0388542Z ##[group]Run case "success" in
2026-07-27T16:27:32.0389879Z [36;1mcase "success" in[0m
2026-07-27T16:27:32.0391227Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:32.0392516Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0393922Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0395253Z [36;1m    ;;[0m
2026-07-27T16:27:32.0396302Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:32.0397630Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0399031Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0400348Z [36;1m    ;;[0m
2026-07-27T16:27:32.0401458Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:32.0402677Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0404031Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0405577Z [36;1m    ;;[0m
2026-07-27T16:27:32.0406618Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:32.0407886Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0409406Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0410687Z [36;1m    ;;[0m
2026-07-27T16:27:32.0411967Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:32.0413328Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0414748Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0416012Z [36;1m    ;;[0m
2026-07-27T16:27:32.0416974Z [36;1m  *)[0m
2026-07-27T16:27:32.0418065Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0419440Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.0420704Z [36;1m    ;;[0m
2026-07-27T16:27:32.0421867Z [36;1mesac[0m
2026-07-27T16:27:32.0454612Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:32.0455795Z ##[endgroup]
﻿2026-07-27T16:27:32.0630195Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:32.0631830Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:32.0633271Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:32.0634574Z [36;1melse[0m
2026-07-27T16:27:32.0635695Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:32.0637589Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:32.0639462Z [36;1mfi[0m
2026-07-27T16:27:32.0671599Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:32.0673045Z env:
2026-07-27T16:27:32.0673972Z   WEBHOOK: 
2026-07-27T16:27:32.0674929Z ##[endgroup]
2026-07-27T16:27:32.0762585Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:21.2520000Z Evaluating notify.if
2026-07-27T16:27:21.2520000Z Evaluating: always()
2026-07-27T16:27:21.2520000Z Result: true
2026-07-27T16:27:21.2520000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:21.2520000Z Evaluating: success()
2026-07-27T16:27:21.2520000Z Result: true
2026-07-27T16:27:21.4560000Z Requested labels: ubuntu-latest
2026-07-27T16:27:21.4560000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:21.4560000Z Reusable workflow chain:
2026-07-27T16:27:21.4560000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-price-alert-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:21.4560000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:21.4560000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:21.5250000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:27.8870000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:27.8880000Z Job is about to start running on the hosted runner: GitHub Actions 1000002093
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.