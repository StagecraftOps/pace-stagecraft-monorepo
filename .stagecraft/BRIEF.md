# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Realtime Aggregation Service (.github/workflows/ci-realtime-aggregation.yml)

## Root cause (from automated analysis)

The 'Run Python flake8' step (and all subsequent steps that use working-directory: ${{ env.SERVICE_DIR }}/python) fails immediately with 'No such file or directory' because the subdirectory services/data/realtime-aggregation/python does not exist in the repository at this commit. The checked-out tree is missing the python/ subdirectory under the realtime-aggregation service root, so the runner cannot start the bash process in that path.

## Why this is a code-level issue, not a pipeline config issue

The directory services/data/realtime-aggregation/python is absent from the repository content itself — the fix requires creating or restoring that directory (and its Python source files) in the repo, not changing the workflow YAML whose working-directory reference is correct.

Failure category: LINT_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
8-03T16:29:11.9826433Z ##[group]Run case "success" in
2026-08-03T16:29:11.9827210Z [36;1mcase "success" in[0m
2026-08-03T16:29:11.9827861Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:11.9828567Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9829488Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9830305Z [36;1m    ;;[0m
2026-08-03T16:29:11.9830862Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:11.9831862Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9832766Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9833598Z [36;1m    ;;[0m
2026-08-03T16:29:11.9834117Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:11.9834837Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9835941Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9837052Z [36;1m    ;;[0m
2026-08-03T16:29:11.9837594Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:11.9838393Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9839350Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9840169Z [36;1m    ;;[0m
2026-08-03T16:29:11.9840725Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:11.9841564Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9842464Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9843276Z [36;1m    ;;[0m
2026-08-03T16:29:11.9843757Z [36;1m  *)[0m
2026-08-03T16:29:11.9844314Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9845398Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.9846213Z [36;1m    ;;[0m
2026-08-03T16:29:11.9846680Z [36;1mesac[0m
2026-08-03T16:29:11.9892952Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:11.9893595Z ##[endgroup]
﻿2026-08-03T16:29:12.0222113Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:12.0222990Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:12.0223825Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:12.0224683Z [36;1melse[0m
2026-08-03T16:29:12.0225450Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:12.0226888Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:12.0228186Z [36;1mfi[0m
2026-08-03T16:29:12.0273364Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:12.0274025Z env:
2026-08-03T16:29:12.0274455Z   WEBHOOK: 
2026-08-03T16:29:12.0274913Z ##[endgroup]
2026-08-03T16:29:12.1292447Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:29:07.9800000Z Requested labels: ubuntu-latest
2026-08-03T16:29:07.9800000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:29:07.9800000Z Reusable workflow chain:
2026-08-03T16:29:07.9800000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-realtime-aggregation.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:07.9800000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:07.9800000Z Waiting for a runner to pick up this job...
2026-08-03T16:29:07.9780000Z Evaluating notify.if
2026-08-03T16:29:07.9780000Z Evaluating: always()
2026-08-03T16:29:07.9780000Z Result: true
2026-08-03T16:29:07.9780000Z Evaluating notify.notify-slack.if
2026-08-03T16:29:07.9780000Z Evaluating: success()
2026-08-03T16:29:07.9780000Z Result: true
2026-08-03T16:29:08.4270000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:29:08.4140000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:29:08.4270000Z Job is about to start running on the hosted runner: GitHub Actions 1000002246
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.