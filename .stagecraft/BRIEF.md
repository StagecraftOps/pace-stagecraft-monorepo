# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - SMS Service (.github/workflows/ci-sms-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and identically in `unit-test` and `opt-out-compliance-check`) fails with "Some specified paths were not resolved, unable to cache dependencies" because `services/notification/sms-service/package-lock.json` does not exist in the repository. The file is either missing entirely — the sms-service directory has no committed `package-lock.json` — or the service directory itself is absent. This prevents the npm cache from being configured, immediately aborting the job before any lint, test, or compliance steps run.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` (and potentially the entire service directory) is a repository content problem — the application artifact must be added to the repo — not a workflow YAML misconfiguration, since the `cache-dependency-path` value correctly points to where a lockfile should exist for this service.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
16:29:01.3058400Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3108201Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:01.3109295Z ##[endgroup]
﻿2026-08-03T16:29:01.3362375Z ##[group]Run case "success" in
2026-08-03T16:29:01.3363570Z [36;1mcase "success" in[0m
2026-08-03T16:29:01.3364570Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:01.3365649Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3366996Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3368517Z [36;1m    ;;[0m
2026-08-03T16:29:01.3369421Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:01.3370661Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3371972Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3373203Z [36;1m    ;;[0m
2026-08-03T16:29:01.3374041Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:01.3375113Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3376418Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3377626Z [36;1m    ;;[0m
2026-08-03T16:29:01.3378891Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:01.3380069Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3381419Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3382622Z [36;1m    ;;[0m
2026-08-03T16:29:01.3383510Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:01.3384753Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3386054Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3387265Z [36;1m    ;;[0m
2026-08-03T16:29:01.3388168Z [36;1m  *)[0m
2026-08-03T16:29:01.3389050Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3390354Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:01.3391556Z [36;1m    ;;[0m
2026-08-03T16:29:01.3392332Z [36;1mesac[0m
2026-08-03T16:29:01.3436835Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:01.3437841Z ##[endgroup]
﻿2026-08-03T16:29:01.3599267Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:01.3600498Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:01.3601694Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:01.3602889Z [36;1melse[0m
2026-08-03T16:29:01.3603821Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:01.3605695Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:01.3607426Z [36;1mfi[0m
2026-08-03T16:29:01.3650210Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:01.3651164Z env:
2026-08-03T16:29:01.3651854Z   WEBHOOK: 
2026-08-03T16:29:01.3652562Z ##[endgroup]
2026-08-03T16:29:01.3744942Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:28:54.1150000Z Evaluating notify.if
2026-08-03T16:28:54.1150000Z Evaluating: always()
2026-08-03T16:28:54.1150000Z Result: true
2026-08-03T16:28:54.1150000Z Evaluating notify.notify-slack.if
2026-08-03T16:28:54.1150000Z Evaluating: success()
2026-08-03T16:28:54.1150000Z Result: true
2026-08-03T16:28:54.1200000Z Requested labels: ubuntu-latest
2026-08-03T16:28:54.1200000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:28:54.1200000Z Reusable workflow chain:
2026-08-03T16:28:54.1200000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-sms-service.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:54.1200000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:54.1200000Z Waiting for a runner to pick up this job...
2026-08-03T16:28:58.0230000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:28:58.0230000Z Job is about to start running on the hosted runner: GitHub Actions 1000002232
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.