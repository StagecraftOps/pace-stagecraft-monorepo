# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Market Data Pipeline (.github/workflows/ci-market-data-pipeline.yml)

## Root cause (from automated analysis)

The `flake8` lint step fails with `E902 FileNotFoundError: [Errno 2] No such file or directory: 'src/'` when run from `working-directory: services/data/market-data-pipeline`. This means the `src/` subdirectory does not exist inside the service's directory in the repository at the checked-out commit. All three downstream linters (black, isort, mypy) also target `src/`, so they would fail identically. This is not a pipeline misconfiguration — the workflow correctly sets the working directory and invokes the tools; the `src/` source tree is simply absent (or was never committed) under `services/data/market-data-pipeline/` in the repo. Additionally, the failure category label 'DEPENDENCY_VERSION' is a mislabel: no dependency resolution error occurred — the tools installed successfully (flake8 7.3.0, black 26.5.1, mypy 2.3.0, isort 8.0.1 all installed cleanly); the failure is purely a missing source directory.

## Why this is a code-level issue, not a pipeline config issue

The `src/` directory is missing from the committed repository content under `services/data/market-data-pipeline/`, which must be fixed by adding the source files to the repo — not by editing the workflow YAML.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
7-20T16:28:45.2036245Z ##[group]Run case "success" in
2026-07-20T16:28:45.2037356Z [36;1mcase "success" in[0m
2026-07-20T16:28:45.2038278Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:45.2039291Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2040529Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2041998Z [36;1m    ;;[0m
2026-07-20T16:28:45.2042833Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:45.2044009Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2045243Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2046384Z [36;1m    ;;[0m
2026-07-20T16:28:45.2047165Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:45.2048175Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2049410Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2050768Z [36;1m    ;;[0m
2026-07-20T16:28:45.2051828Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:45.2052932Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2054223Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2055354Z [36;1m    ;;[0m
2026-07-20T16:28:45.2056186Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:45.2057364Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2058606Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2059758Z [36;1m    ;;[0m
2026-07-20T16:28:45.2060484Z [36;1m  *)[0m
2026-07-20T16:28:45.2061510Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2062805Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:45.2063959Z [36;1m    ;;[0m
2026-07-20T16:28:45.2064690Z [36;1mesac[0m
2026-07-20T16:28:45.2125204Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:45.2126141Z ##[endgroup]
﻿2026-07-20T16:28:45.2299122Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:45.2300306Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:45.2301771Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:45.2302953Z [36;1melse[0m
2026-07-20T16:28:45.2303832Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:45.2305649Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:45.2307300Z [36;1mfi[0m
2026-07-20T16:28:45.2367289Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:45.2368194Z env:
2026-07-20T16:28:45.2368849Z   WEBHOOK: 
2026-07-20T16:28:45.2369532Z ##[endgroup]
2026-07-20T16:28:45.2482090Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:40.5040000Z Requested labels: ubuntu-latest
2026-07-20T16:28:40.5040000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:40.5040000Z Reusable workflow chain:
2026-07-20T16:28:40.5040000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-market-data-pipeline.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:40.5040000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:40.5040000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:40.4990000Z Evaluating notify.if
2026-07-20T16:28:40.4990000Z Evaluating: always()
2026-07-20T16:28:40.4990000Z Result: true
2026-07-20T16:28:40.4990000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:40.4990000Z Evaluating: success()
2026-07-20T16:28:40.4990000Z Result: true
2026-07-20T16:28:40.9040000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:40.9060000Z Job is about to start running on the hosted runner: GitHub Actions 1000001933
2026-07-20T16:28:40.9050000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.