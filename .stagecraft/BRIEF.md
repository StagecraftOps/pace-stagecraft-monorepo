# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Data Warehouse Service (.github/workflows/ci-data-warehouse-service.yml)

## Root cause (from automated analysis)

The 'Run flake8' step fails with 'E902 FileNotFoundError: [Errno 2] No such file or directory: 'src/'' because the `src/` subdirectory does not exist inside `services/data/data-warehouse-service/` in the checked-out repository. All subsequent lint steps (black, isort, bandit) and the unit-test job would also fail for the same reason. The `src/` directory is simply absent from the repository at this path.

## Why this is a code-level issue, not a pipeline config issue

The `src/` source directory is missing from `services/data/data-warehouse-service/` in the repository itself — this is a missing repository content problem that requires adding the directory and its source files to the repo, not a change to the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
03T16:29:10.8927777Z ##[group]Run case "success" in
2026-08-03T16:29:10.8929118Z [36;1mcase "success" in[0m
2026-08-03T16:29:10.8930345Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:10.8931662Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8933178Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8934586Z [36;1m    ;;[0m
2026-08-03T16:29:10.8935676Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:10.8937401Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8939009Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8940348Z [36;1m    ;;[0m
2026-08-03T16:29:10.8941367Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:10.8942614Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8944023Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8945658Z [36;1m    ;;[0m
2026-08-03T16:29:10.8946806Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:10.8948192Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8949795Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8951257Z [36;1m    ;;[0m
2026-08-03T16:29:10.8952359Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:10.8953752Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8955201Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8956712Z [36;1m    ;;[0m
2026-08-03T16:29:10.8957676Z [36;1m  *)[0m
2026-08-03T16:29:10.8958781Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8960223Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:10.8961559Z [36;1m    ;;[0m
2026-08-03T16:29:10.8962514Z [36;1mesac[0m
2026-08-03T16:29:10.8992396Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:10.8993698Z ##[endgroup]
﻿2026-08-03T16:29:10.9155807Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:10.9157792Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:10.9159340Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:10.9160798Z [36;1melse[0m
2026-08-03T16:29:10.9161964Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:10.9164020Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:10.9166135Z [36;1mfi[0m
2026-08-03T16:29:10.9195143Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:10.9196651Z env:
2026-08-03T16:29:10.9197618Z   WEBHOOK: 
2026-08-03T16:29:10.9198655Z ##[endgroup]
2026-08-03T16:29:10.9281017Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:29:02.2040000Z Requested labels: ubuntu-latest
2026-08-03T16:29:02.2040000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:29:02.2040000Z Reusable workflow chain:
2026-08-03T16:29:02.2040000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-data-warehouse-service.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:02.2040000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:02.2040000Z Waiting for a runner to pick up this job...
2026-08-03T16:29:02.1990000Z Evaluating notify.if
2026-08-03T16:29:02.1990000Z Evaluating: always()
2026-08-03T16:29:02.1990000Z Result: true
2026-08-03T16:29:02.1990000Z Evaluating notify.notify-slack.if
2026-08-03T16:29:02.1990000Z Evaluating: success()
2026-08-03T16:29:02.1990000Z Result: true
2026-08-03T16:29:02.2230000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:29:06.7920000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:29:06.7930000Z Job is about to start running on the hosted runner: GitHub Actions 1000002241
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.