# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Data Quality Pipeline (.github/workflows/ci-data-quality-pipeline.yml)

## Root cause (from automated analysis)

The 'src/' subdirectory is missing from services/data/data-quality-pipeline/ in the repository. The flake8 step runs with working-directory set to that service directory and immediately fails with 'FileNotFoundError: [Errno 2] No such file or directory: src/' (flake8 E902, exit code 1). Because the lint job fails at this first step, the downstream unit-test job (which needs: lint) never runs. All subsequent lint commands (black, isort, bandit) and unit tests are also blocked. No packaging manifest issue is involved here — the checkout itself succeeds — but the application source tree under src/ simply does not exist in the repo at this path.

## Why this is a code-level issue, not a pipeline config issue

The src/ directory must be created and populated (or committed) inside services/data/data-quality-pipeline/ in the repository; no workflow YAML change can compensate for source code that isn't there.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
-03T16:29:11.4929006Z ##[group]Run case "success" in
2026-08-03T16:29:11.4929821Z [36;1mcase "success" in[0m
2026-08-03T16:29:11.4930443Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:11.4931102Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4931895Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4932627Z [36;1m    ;;[0m
2026-08-03T16:29:11.4933187Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:11.4933922Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4934708Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4935420Z [36;1m    ;;[0m
2026-08-03T16:29:11.4935944Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:11.4936576Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4937328Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4938566Z [36;1m    ;;[0m
2026-08-03T16:29:11.4939104Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:11.4939776Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4940567Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4941258Z [36;1m    ;;[0m
2026-08-03T16:29:11.4941794Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:11.4942506Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4943248Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4943947Z [36;1m    ;;[0m
2026-08-03T16:29:11.4944442Z [36;1m  *)[0m
2026-08-03T16:29:11.4944973Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4945735Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:11.4946439Z [36;1m    ;;[0m
2026-08-03T16:29:11.4946932Z [36;1mesac[0m
2026-08-03T16:29:11.4992806Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:11.4993455Z ##[endgroup]
﻿2026-08-03T16:29:11.5134615Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:11.5135366Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:11.5136031Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:11.5136691Z [36;1melse[0m
2026-08-03T16:29:11.5137237Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:11.5138685Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:11.5139615Z [36;1mfi[0m
2026-08-03T16:29:11.5182115Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:11.5182734Z env:
2026-08-03T16:29:11.5183207Z   WEBHOOK: 
2026-08-03T16:29:11.5183693Z ##[endgroup]
2026-08-03T16:29:11.5273078Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:29:06.1670000Z Requested labels: ubuntu-latest
2026-08-03T16:29:06.1670000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:29:06.1670000Z Reusable workflow chain:
2026-08-03T16:29:06.1670000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-data-quality-pipeline.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:06.1670000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:29:06.1670000Z Waiting for a runner to pick up this job...
2026-08-03T16:29:06.1630000Z Evaluating notify.if
2026-08-03T16:29:06.1630000Z Evaluating: always()
2026-08-03T16:29:06.1630000Z Result: true
2026-08-03T16:29:06.1630000Z Evaluating notify.notify-slack.if
2026-08-03T16:29:06.1630000Z Evaluating: success()
2026-08-03T16:29:06.1630000Z Result: true
2026-08-03T16:29:06.5540000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:29:08.4080000Z Job is about to start running on the hosted runner: GitHub Actions 1000002244
2026-08-03T16:29:08.4080000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.