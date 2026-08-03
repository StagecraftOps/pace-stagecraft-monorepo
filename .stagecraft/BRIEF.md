# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Feature Store Pipeline (.github/workflows/ci-feature-store-pipeline.yml)

## Root cause (from automated analysis)

The 'Run flake8' step fails with 'FileNotFoundError: [Errno 2] No such file or directory: src/' (exit code 1). The workflow sets working-directory to services/data/feature-store-pipeline and runs flake8 against src/, but the src/ subdirectory does not exist at that path in the repository. All subsequent lint steps (black, isort, mypy) targeting the same src/ path would fail identically, and the unit-test job is blocked because it depends on lint. This is a missing source directory in the repository — the services/data/feature-store-pipeline/src/ directory (and its Python source files) has never been committed, or was deleted/moved without updating the repository structure.

## Why this is a code-level issue, not a pipeline config issue

The src/ source directory is absent from the repository at services/data/feature-store-pipeline/src/, making this a missing repository content problem that requires committing the directory and its source files — not a workflow YAML change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
03T16:29:09.5553496Z ##[group]Run case "success" in
2026-08-03T16:29:09.5554703Z [36;1mcase "success" in[0m
2026-08-03T16:29:09.5555784Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:09.5557005Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5558624Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5559940Z [36;1m    ;;[0m
2026-08-03T16:29:09.5560917Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:09.5562227Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5563606Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5564885Z [36;1m    ;;[0m
2026-08-03T16:29:09.5565810Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:09.5566961Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5568465Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5569976Z [36;1m    ;;[0m
2026-08-03T16:29:09.5570934Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:09.5572176Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5573634Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5574917Z [36;1m    ;;[0m
2026-08-03T16:29:09.5575908Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:09.5577223Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5578731Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5580033Z [36;1m    ;;[0m
2026-08-03T16:29:09.5580906Z [36;1m  *)[0m
2026-08-03T16:29:09.5581861Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5583239Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.5584525Z [36;1m    ;;[0m
2026-08-03T16:29:09.5585406Z [36;1mesac[0m
2026-08-03T16:29:09.5631196Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:09.5632256Z ##[endgroup]
﻿2026-08-03T16:29:09.5801446Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:09.5802739Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:09.5804019Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:09.5805296Z [36;1melse[0m
2026-08-03T16:29:09.5806318Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:09.5808465Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:09.5810281Z [36;1mfi[0m
2026-08-03T16:29:09.5854847Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:09.5855852Z env:
2026-08-03T16:29:09.5856614Z   WEBHOOK: 
2026-08-03T16:29:09.5857418Z ##[endgroup]
2026-08-03T16:29:09.5950857Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:28:53.7580000Z Requested labels: ubuntu-latest
2026-08-03T16:28:53.7580000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:28:53.7580000Z Reusable workflow chain:
2026-08-03T16:28:53.7580000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-feature-store-pipeline.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:53.7580000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:53.7580000Z Waiting for a runner to pick up this job...
2026-08-03T16:28:53.7560000Z Evaluating notify.if
2026-08-03T16:28:53.7560000Z Evaluating: always()
2026-08-03T16:28:53.7560000Z Result: true
2026-08-03T16:28:53.7560000Z Evaluating notify.notify-slack.if
2026-08-03T16:28:53.7560000Z Evaluating: success()
2026-08-03T16:28:53.7560000Z Result: true
2026-08-03T16:28:54.0880000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:28:57.3440000Z Job is about to start running on the hosted runner: GitHub Actions 1000002230
2026-08-03T16:28:57.3440000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.