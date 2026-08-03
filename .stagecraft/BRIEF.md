# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Semantic Search Service (.github/workflows/ci-semantic-search-service.yml)

## Root cause (from automated analysis)

The 'Run flake8' step in the lint job failed with exit code 1 due to PEP 8 style violations in `services/search/semantic-search-service/main.py`. Specifically: three E302 errors (missing two blank lines before a function/class definition at lines 9 and 12), one E501 error (line 13 exceeds the 120-character max-line-length limit at 127 characters), and one E305 error (missing two blank lines after a function or class definition at line 15). flake8 reported these and exited non-zero, halting the lint job and cascading to block the unit-test job (which depends on lint via `needs: lint`).

## Why this is a code-level issue, not a pipeline config issue

The failures are real Python style violations in application source code (`main.py`) that must be fixed by reformatting that file — adding the required blank lines and shortening the offending line — not by changing any workflow configuration.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
3T16:29:09.9552806Z ##[group]Run case "failure" in
2026-08-03T16:29:09.9553956Z [36;1mcase "failure" in[0m
2026-08-03T16:29:09.9554918Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:09.9556258Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9557574Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9558750Z [36;1m    ;;[0m
2026-08-03T16:29:09.9559616Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:09.9560818Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9562102Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9563276Z [36;1m    ;;[0m
2026-08-03T16:29:09.9564094Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:09.9565131Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9566664Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9568114Z [36;1m    ;;[0m
2026-08-03T16:29:09.9568951Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:09.9570086Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9571401Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9572565Z [36;1m    ;;[0m
2026-08-03T16:29:09.9573428Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:09.9574618Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9576118Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9577294Z [36;1m    ;;[0m
2026-08-03T16:29:09.9578054Z [36;1m  *)[0m
2026-08-03T16:29:09.9578901Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9580166Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:09.9581326Z [36;1m    ;;[0m
2026-08-03T16:29:09.9582084Z [36;1mesac[0m
2026-08-03T16:29:09.9627539Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:09.9628501Z ##[endgroup]
﻿2026-08-03T16:29:09.9789525Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:09.9790755Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:09.9791955Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:09.9793152Z [36;1melse[0m
2026-08-03T16:29:09.9794076Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:09.9796233Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:09.9797990Z [36;1mfi[0m
2026-08-03T16:29:09.9840950Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:09.9841904Z env:
2026-08-03T16:29:09.9842596Z   WEBHOOK: 
2026-08-03T16:29:09.9843324Z ##[endgroup]
2026-08-03T16:29:09.9935650Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:28:54.0320000Z Evaluating notify.if
2026-08-03T16:28:54.0320000Z Evaluating: always()
2026-08-03T16:28:54.0320000Z Result: true
2026-08-03T16:28:54.0320000Z Evaluating notify.notify-slack.if
2026-08-03T16:28:54.0320000Z Evaluating: success()
2026-08-03T16:28:54.0320000Z Result: true
2026-08-03T16:28:54.0350000Z Requested labels: ubuntu-latest
2026-08-03T16:28:54.0350000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:28:54.0350000Z Reusable workflow chain:
2026-08-03T16:28:54.0350000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-semantic-search-service.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:54.0350000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:54.0350000Z Waiting for a runner to pick up this job...
2026-08-03T16:28:54.2490000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:28:57.6770000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:28:57.6780000Z Job is about to start running on the hosted runner: GitHub Actions 1000002231
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.