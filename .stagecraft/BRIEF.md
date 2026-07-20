# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Listing ETL Pipeline (.github/workflows/ci-listing-etl.yml)

## Root cause (from automated analysis)

The `src/` subdirectory does not exist at `services/data/listing-etl/src/` in the repository. Flake8 (and all subsequent lint tools — black, isort, mypy) are invoked with `working-directory: services/data/listing-etl` and target `src/`, producing `FileNotFoundError: [Errno 2] No such file or directory: 'src/'` at exit code 1. All lint dependencies installed successfully; this is purely a missing source directory in the repo, not a tool version or workflow configuration issue.

## Why this is a code-level issue, not a pipeline config issue

The `services/data/listing-etl/src/` directory is absent from the repository content itself — the workflow YAML correctly sets the working directory and targets `src/`, so the fix requires adding the missing source directory (and its Python source files) to the repo, not changing the pipeline.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
16:28:35.8781179Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8862058Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:35.8862750Z ##[endgroup]
﻿2026-07-20T16:28:35.9082370Z ##[group]Run case "success" in
2026-07-20T16:28:35.9082984Z [36;1mcase "success" in[0m
2026-07-20T16:28:35.9083495Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:35.9084047Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9084710Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9085316Z [36;1m    ;;[0m
2026-07-20T16:28:35.9085767Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:35.9086350Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9086966Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9087533Z [36;1m    ;;[0m
2026-07-20T16:28:35.9087957Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:35.9088488Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9089106Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9089679Z [36;1m    ;;[0m
2026-07-20T16:28:35.9090588Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:35.9091165Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9091836Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9092407Z [36;1m    ;;[0m
2026-07-20T16:28:35.9092864Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:35.9093459Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9094084Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9094656Z [36;1m    ;;[0m
2026-07-20T16:28:35.9095053Z [36;1m  *)[0m
2026-07-20T16:28:35.9095495Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9096109Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.9096684Z [36;1m    ;;[0m
2026-07-20T16:28:35.9097083Z [36;1mesac[0m
2026-07-20T16:28:35.9150653Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:35.9151236Z ##[endgroup]
﻿2026-07-20T16:28:35.9290689Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:35.9291437Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:35.9292108Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:35.9292769Z [36;1melse[0m
2026-07-20T16:28:35.9293306Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:35.9294293Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:35.9295278Z [36;1mfi[0m
2026-07-20T16:28:35.9348583Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:35.9349185Z env:
2026-07-20T16:28:35.9349648Z   WEBHOOK: 
2026-07-20T16:28:35.9350371Z ##[endgroup]
2026-07-20T16:28:35.9451749Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:29.1330000Z Evaluating notify.if
2026-07-20T16:28:29.1330000Z Evaluating: always()
2026-07-20T16:28:29.1330000Z Result: true
2026-07-20T16:28:29.1330000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:29.1330000Z Evaluating: success()
2026-07-20T16:28:29.1330000Z Result: true
2026-07-20T16:28:29.1330000Z Requested labels: ubuntu-latest
2026-07-20T16:28:29.1330000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:29.1330000Z Reusable workflow chain:
2026-07-20T16:28:29.1330000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-listing-etl.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:29.1330000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:29.1330000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:32.4720000Z Job is about to start running on the hosted runner: GitHub Actions 1000001917
2026-07-20T16:28:32.4720000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.