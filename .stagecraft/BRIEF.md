# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Data Quality Pipeline (.github/workflows/ci-data-quality-pipeline.yml)

## Root cause (from automated analysis)

The flake8 lint step fails with 'FileNotFoundError: [Errno 2] No such file or directory: src/' (flake8 E902, exit code 1). After checking out the repo and changing into the service directory services/data/data-quality-pipeline, the expected src/ subdirectory does not exist. This means the source code directory for the data-quality-pipeline service is either missing from the repository entirely or was never committed, causing every linting and subsequent step that targets src/ to fail immediately.

## Why this is a code-level issue, not a pipeline config issue

The src/ directory is simply absent from services/data/data-quality-pipeline in the repository; the workflow's working-directory and flake8 invocation are correctly configured, so the fix requires adding the missing source directory (and its contents) to the repo, not editing the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
-10T16:26:03.2873980Z ##[group]Run case "success" in
2026-08-10T16:26:03.2875162Z [36;1mcase "success" in[0m
2026-08-10T16:26:03.2876146Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:03.2877230Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2878714Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2879925Z [36;1m    ;;[0m
2026-08-10T16:26:03.2880815Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:03.2882058Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2883369Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2884577Z [36;1m    ;;[0m
2026-08-10T16:26:03.2885420Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:03.2886510Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2888129Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2889602Z [36;1m    ;;[0m
2026-08-10T16:26:03.2890472Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:03.2891646Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2893001Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2894202Z [36;1m    ;;[0m
2026-08-10T16:26:03.2895093Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:03.2896323Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2897862Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2899064Z [36;1m    ;;[0m
2026-08-10T16:26:03.2899857Z [36;1m  *)[0m
2026-08-10T16:26:03.2900731Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2902038Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:03.2903247Z [36;1m    ;;[0m
2026-08-10T16:26:03.2904036Z [36;1mesac[0m
2026-08-10T16:26:03.2949782Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:03.2950774Z ##[endgroup]
﻿2026-08-10T16:26:03.3118344Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:03.3119625Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:03.3120813Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:03.3122010Z [36;1melse[0m
2026-08-10T16:26:03.3122979Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:03.3124871Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:03.3126576Z [36;1mfi[0m
2026-08-10T16:26:03.3170826Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:03.3171763Z env:
2026-08-10T16:26:03.3172449Z   WEBHOOK: 
2026-08-10T16:26:03.3173167Z ##[endgroup]
2026-08-10T16:26:03.3269287Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:57.4340000Z Requested labels: ubuntu-latest
2026-08-10T16:25:57.4340000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:57.4340000Z Reusable workflow chain:
2026-08-10T16:25:57.4340000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-data-quality-pipeline.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:57.4340000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:57.4340000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:57.4310000Z Evaluating notify.if
2026-08-10T16:25:57.4310000Z Evaluating: always()
2026-08-10T16:25:57.4310000Z Result: true
2026-08-10T16:25:57.4310000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:57.4310000Z Evaluating: success()
2026-08-10T16:25:57.4310000Z Result: true
2026-08-10T16:25:57.4450000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-10T16:25:57.8420000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:57.8430000Z Job is about to start running on the hosted runner: GitHub Actions 1000002762
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.