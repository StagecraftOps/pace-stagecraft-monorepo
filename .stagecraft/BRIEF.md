# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Market Data Pipeline (.github/workflows/ci-market-data-pipeline.yml)

## Root cause (from automated analysis)

The `flake8` (and by extension all subsequent lint steps) fail with `E902 FileNotFoundError: [Errno 2] No such file or directory: 'src/'` when run from `working-directory: services/data/market-data-pipeline`. The `src/` subdirectory does not exist at that path in the checked-out repository — the source tree for this service is either missing entirely or laid out under a different directory name. This is the same structural problem noted for Python services in the known failure modes: the service directory exists in the workflow's expectations but the required source layout (`src/`) is absent from the repository content. The installed tool versions (black 26.5.1, mypy 2.3.0, flake8 7.3.0, isort 8.0.1) all resolved and installed successfully, so the DEPENDENCY_VERSION category is a secondary concern at best — the primary blocker is the missing `src/` directory.

## Why this is a code-level issue, not a pipeline config issue

The `src/` directory expected under `services/data/market-data-pipeline/` is absent from the repository content, meaning the fix requires adding the missing source directory (and its code) to the repo, not changing the workflow YAML.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
8-03T16:29:09.7784993Z ##[group]Run case "success" in
2026-08-03T16:29:09.7786261Z [36;1mcase "success" in[0m
2026-08-03T16:29:09.7787355Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:09.7788539Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7789977Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7791299Z [36;1m    ;;[0m
2026-08-03T16:29:09.7792467Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:09.7793802Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7795226Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7796533Z [36;1m    ;;[0m
2026-08-03T16:29:09.7797461Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:09.7798638Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7800055Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7801644Z [36;1m    ;;[0m
2026-08-03T16:29:09.7802867Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:09.7804173Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7805674Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7806976Z [36;1m    ;;[0m
2026-08-03T16:29:09.7807978Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:09.7809337Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7810751Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7812308Z [36;1m    ;;[0m
2026-08-03T16:29:09.7813210Z [36;1m  *)[0m
2026-08-03T16:29:09.7814193Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7815626Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.7816950Z [36;1m    ;;[0m
2026-08-03T16:29:09.7817832Z [36;1mesac[0m
2026-08-03T16:29:09.7867592Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:09.7868689Z ##[endgroup]
﻿2026-08-03T16:29:09.8043572Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:09.8044962Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:09.8046304Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:09.8047637Z [36;1melse[0m
2026-08-03T16:29:09.8048696Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:09.8050765Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:09.8052862Z [36;1mfi[0m
2026-08-03T16:29:09.8099939Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:09.8101001Z env:
2026-08-03T16:29:09.8102048Z   WEBHOOK: 
2026-08-03T16:29:09.8102901Z ##[endgroup]
2026-08-03T16:29:09.8201458Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:28:56.3250000Z Requested labels: ubuntu-latest
2026-08-03T16:28:56.3250000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:28:56.3250000Z Reusable workflow chain:
2026-08-03T16:28:56.3250000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-market-data-pipeline.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:56.3250000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:56.3250000Z Waiting for a runner to pick up this job...
2026-08-03T16:28:56.3230000Z Evaluating notify.if
2026-08-03T16:28:56.3230000Z Evaluating: always()
2026-08-03T16:28:56.3230000Z Result: true
2026-08-03T16:28:56.3230000Z Evaluating notify.notify-slack.if
2026-08-03T16:28:56.3230000Z Evaluating: success()
2026-08-03T16:28:56.3230000Z Result: true
2026-08-03T16:28:56.5050000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:28:58.3860000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:28:58.3870000Z Job is about to start running on the hosted runner: GitHub Actions 1000002234
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.