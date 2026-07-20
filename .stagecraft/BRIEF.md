# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Search Indexer (.github/workflows/ci-search-indexer.yml)

## Root cause (from automated analysis)

The `mypy` lint step exits with code 2 because there are no Python source files present in the `services/search/search-indexer` working directory. mypy reports: "There are no .py[i] files in directory '.'" This is corroborated by `black` also finding "No Python files are present to be formatted. Nothing to do" in the same directory. The service directory either does not contain any `.py` files (i.e., the application source code is missing from the repository at that path), or the `working-directory` path resolves to the wrong location and the Python source tree has not been committed. This is an application/repository-content problem — not a workflow misconfiguration.

## Why this is a code-level issue, not a pipeline config issue

The `services/search/search-indexer` directory exists (the step runs without a 'directory not found' error) but contains no `.py` files, meaning the actual Python application source code has never been committed to the repo at that path and must be added.

Failure category: LINT_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
28:39.0104685Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0180181Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.0181085Z ##[endgroup]
﻿2026-07-20T16:28:39.0394160Z ##[group]Run case "failure" in
2026-07-20T16:28:39.0395053Z [36;1mcase "failure" in[0m
2026-07-20T16:28:39.0395849Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:39.0396710Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0397752Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0398722Z [36;1m    ;;[0m
2026-07-20T16:28:39.0399456Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:39.0400438Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0401467Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0402412Z [36;1m    ;;[0m
2026-07-20T16:28:39.0403220Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:39.0404083Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0405279Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0406235Z [36;1m    ;;[0m
2026-07-20T16:28:39.0407140Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:39.0408073Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0409150Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0410096Z [36;1m    ;;[0m
2026-07-20T16:28:39.0410829Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:39.0411802Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0412827Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0413892Z [36;1m    ;;[0m
2026-07-20T16:28:39.0414556Z [36;1m  *)[0m
2026-07-20T16:28:39.0415281Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0416329Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:39.0417293Z [36;1m    ;;[0m
2026-07-20T16:28:39.0417953Z [36;1mesac[0m
2026-07-20T16:28:39.0468916Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.0469729Z ##[endgroup]
﻿2026-07-20T16:28:39.0614862Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:39.0615871Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:39.0616876Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:39.0617897Z [36;1melse[0m
2026-07-20T16:28:39.0618698Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:39.0620203Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:39.0621610Z [36;1mfi[0m
2026-07-20T16:28:39.0678665Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:39.0679472Z env:
2026-07-20T16:28:39.0680093Z   WEBHOOK: 
2026-07-20T16:28:39.0680733Z ##[endgroup]
2026-07-20T16:28:39.0773775Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:30.3440000Z Requested labels: ubuntu-latest
2026-07-20T16:28:30.3440000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:30.3440000Z Reusable workflow chain:
2026-07-20T16:28:30.3440000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-search-indexer.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:30.3440000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:30.3440000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:30.3440000Z Evaluating notify.if
2026-07-20T16:28:30.3440000Z Evaluating: always()
2026-07-20T16:28:30.3440000Z Result: true
2026-07-20T16:28:30.3440000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:30.3440000Z Evaluating: success()
2026-07-20T16:28:30.3440000Z Result: true
2026-07-20T16:28:33.6090000Z Job is waiting for a hosted runner to come online.
2026-07-20T16:28:33.6090000Z Job is about to start running on the hosted runner: GitHub Actions 1000001919
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.