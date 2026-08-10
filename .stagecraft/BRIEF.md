# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Search Indexer (.github/workflows/ci-search-indexer.yml)

## Root cause (from automated analysis)

The service directory 'services/search/search-indexer' contains no Python source files (.py or .pyi). Both 'black' (which exited gracefully with 'No Python files are present to be formatted. Nothing to do 😴') and 'mypy' (which exited with code 2: 'There are no .py[i] files in directory "."') confirm the directory is devoid of Python code. This is a missing application content problem — the service's source files have not been committed to the repository under the expected path, not a pipeline misconfiguration.

## Why this is a code-level issue, not a pipeline config issue

The service directory exists but contains no Python source files, meaning the application code itself has never been committed (or was accidentally deleted) — adding or restoring those .py files is a repository content fix, not a workflow YAML change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
2026-08-10T16:26:01.1497852Z ##[group]Run case "failure" in
2026-08-10T16:26:01.1498723Z [36;1mcase "failure" in[0m
2026-08-10T16:26:01.1499420Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:01.1500171Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1501110Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1501960Z [36;1m    ;;[0m
2026-08-10T16:26:01.1502529Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:01.1503787Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1504752Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1505629Z [36;1m    ;;[0m
2026-08-10T16:26:01.1506162Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:01.1506894Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1507847Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1508678Z [36;1m    ;;[0m
2026-08-10T16:26:01.1509445Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:01.1510271Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1511239Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1512092Z [36;1m    ;;[0m
2026-08-10T16:26:01.1512661Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:01.1513732Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1514665Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1515508Z [36;1m    ;;[0m
2026-08-10T16:26:01.1515990Z [36;1m  *)[0m
2026-08-10T16:26:01.1516549Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1517472Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1518312Z [36;1m    ;;[0m
2026-08-10T16:26:01.1518797Z [36;1mesac[0m
2026-08-10T16:26:01.1563877Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:01.1564633Z ##[endgroup]
﻿2026-08-10T16:26:01.1711324Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:01.1712241Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:01.1713415Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:01.1714323Z [36;1melse[0m
2026-08-10T16:26:01.1714964Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:01.1716439Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:01.1717863Z [36;1mfi[0m
2026-08-10T16:26:01.1760002Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:01.1760660Z env:
2026-08-10T16:26:01.1761093Z   WEBHOOK: 
2026-08-10T16:26:01.1761544Z ##[endgroup]
2026-08-10T16:26:01.1850588Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:50.1850000Z Requested labels: ubuntu-latest
2026-08-10T16:25:50.1850000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:50.1850000Z Reusable workflow chain:
2026-08-10T16:25:50.1850000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-search-indexer.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:50.1850000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:50.1850000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:50.1810000Z Evaluating notify.if
2026-08-10T16:25:50.1810000Z Evaluating: always()
2026-08-10T16:25:50.1810000Z Result: true
2026-08-10T16:25:50.1810000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:50.1810000Z Evaluating: success()
2026-08-10T16:25:50.1810000Z Result: true
2026-08-10T16:25:50.4510000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-10T16:25:56.2210000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:56.2220000Z Job is about to start running on the hosted runner: GitHub Actions 1000002758
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.