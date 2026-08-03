# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - AVM Training Pipeline (.github/workflows/ci-avm-training-pipeline.yml)

## Root cause (from automated analysis)

The 'Run flake8' step in the lint job fails with 'E902 FileNotFoundError: [Errno 2] No such file or directory: "src/"'. The working directory is set to `services/data/avm-training-pipeline`, but there is no `src/` subdirectory present at that path in the repository at this commit (refs/pull/36/merge). The `src/` source tree that flake8, black, and isort all target does not exist in the checked-out repo content, causing an immediate exit code 1 and blocking all downstream jobs (unit-test, data-validation, etc.).

## Why this is a code-level issue, not a pipeline config issue

The `src/` directory is missing from the service's repository content at `services/data/avm-training-pipeline/src/`, which is an application/repository-content problem — the fix is to add (or restore) the `src/` directory and its source files in the repo, not to edit the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
-03T16:29:12.1946206Z ##[group]Run case "success" in
2026-08-03T16:29:12.1947426Z [36;1mcase "success" in[0m
2026-08-03T16:29:12.1948483Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:12.1949609Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1950931Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1952150Z [36;1m    ;;[0m
2026-08-03T16:29:12.1953402Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:12.1954670Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1955991Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1957211Z [36;1m    ;;[0m
2026-08-03T16:29:12.1958144Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:12.1959282Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1960606Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1962074Z [36;1m    ;;[0m
2026-08-03T16:29:12.1963213Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:12.1964436Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1965854Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1967066Z [36;1m    ;;[0m
2026-08-03T16:29:12.1968042Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:12.1969283Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1970572Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1971780Z [36;1m    ;;[0m
2026-08-03T16:29:12.1972661Z [36;1m  *)[0m
2026-08-03T16:29:12.1973792Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1975076Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:12.1976271Z [36;1m    ;;[0m
2026-08-03T16:29:12.1977153Z [36;1mesac[0m
2026-08-03T16:29:12.2027964Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:12.2029048Z ##[endgroup]
﻿2026-08-03T16:29:12.2206563Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:12.2207863Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:12.2209111Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:12.2210333Z [36;1melse[0m
2026-08-03T16:29:12.2211387Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:12.2213368Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:12.2215040Z [36;1mfi[0m
2026-08-03T16:29:12.2265092Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:12.2266401Z env:
2026-08-03T16:29:12.2267340Z   WEBHOOK: 
2026-08-03T16:29:12.2268214Z ##[endgroup]
2026-08-03T16:29:12.2374178Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:29:03.0760000Z Evaluating notify.if
2026-08-03T16:29:03.0760000Z Evaluating: always()
2026-08-03T16:29:03.0760000Z Result: true
2026-08-03T16:29:03.0760000Z Evaluating notify.notify-slack.if
2026-08-03T16:29:03.0760000Z Evaluating: success()
2026-08-03T16:29:03.0760000Z Result: true
2026-08-03T16:29:03.3640000Z Requested labels: ubuntu-latest
2026-08-03T16:29:03.3640000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:29:03.3640000Z Reusable workflow chain:
2026-08-03T16:29:03.3640000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-avm-training-pipeline.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:03.3640000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:03.3640000Z Waiting for a runner to pick up this job...
2026-08-03T16:29:03.3840000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:29:08.2770000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:29:08.2780000Z Job is about to start running on the hosted runner: GitHub Actions 1000002243
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.