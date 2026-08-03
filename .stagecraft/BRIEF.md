# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Price Alert Service (.github/workflows/ci-price-alert-service.yml)

## Root cause (from automated analysis)

The `mypy` step exits with code 2 and the message "There are no .py[i] files in directory 'src'". This is the same underlying condition also silently reported by `black` ("No Python files are present to be formatted. Nothing to do") and implicitly by `flake8` (which succeeded with no output, meaning it found nothing to check). The `src/` directory under `services/notification/price-alert-service/` is either entirely absent from the repository or contains no `.py` files. `mypy` treats an empty/missing source directory as a hard error (exit code 2), which failed the lint job. This is a missing or empty application source directory — the Python source code for the price-alert-service has not been committed to the repository at the expected path.

## Why this is a code-level issue, not a pipeline config issue

The `src/` directory under `services/notification/price-alert-service/` is missing or empty in the repository — there are no `.py` files to lint, which is an application/repository-content problem, not a workflow configuration issue.

Failure category: LINT_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
.6104603Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6156902Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:05.6157456Z ##[endgroup]
﻿2026-08-03T16:29:05.6368489Z ##[group]Run case "success" in
2026-08-03T16:29:05.6369071Z [36;1mcase "success" in[0m
2026-08-03T16:29:05.6369559Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:05.6370084Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6370709Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6371272Z [36;1m    ;;[0m
2026-08-03T16:29:05.6371731Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:05.6372306Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6372904Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6373454Z [36;1m    ;;[0m
2026-08-03T16:29:05.6373876Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:05.6374387Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6374975Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6375921Z [36;1m    ;;[0m
2026-08-03T16:29:05.6376349Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:05.6376892Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6377532Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6378081Z [36;1m    ;;[0m
2026-08-03T16:29:05.6378522Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:05.6379093Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6379682Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6380242Z [36;1m    ;;[0m
2026-08-03T16:29:05.6380650Z [36;1m  *)[0m
2026-08-03T16:29:05.6381100Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6381702Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:05.6382252Z [36;1m    ;;[0m
2026-08-03T16:29:05.6382659Z [36;1mesac[0m
2026-08-03T16:29:05.6427035Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:05.6427529Z ##[endgroup]
﻿2026-08-03T16:29:05.6550799Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:05.6551428Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:05.6552008Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:05.6552581Z [36;1melse[0m
2026-08-03T16:29:05.6553052Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:05.6553917Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:05.6554767Z [36;1mfi[0m
2026-08-03T16:29:05.6598799Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:05.6599303Z env:
2026-08-03T16:29:05.6599685Z   WEBHOOK: 
2026-08-03T16:29:05.6600071Z ##[endgroup]
2026-08-03T16:29:05.6686012Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:28:58.2330000Z Evaluating notify.if
2026-08-03T16:28:58.2330000Z Evaluating: always()
2026-08-03T16:28:58.2330000Z Result: true
2026-08-03T16:28:58.2330000Z Evaluating notify.notify-slack.if
2026-08-03T16:28:58.2330000Z Evaluating: success()
2026-08-03T16:28:58.2330000Z Result: true
2026-08-03T16:28:58.2340000Z Requested labels: ubuntu-latest
2026-08-03T16:28:58.2340000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:28:58.2340000Z Reusable workflow chain:
2026-08-03T16:28:58.2340000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-price-alert-service.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:58.2340000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:58.2340000Z Waiting for a runner to pick up this job...
2026-08-03T16:29:02.4220000Z Job is about to start running on the hosted runner: GitHub Actions 1000002238
2026-08-03T16:29:02.4220000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.