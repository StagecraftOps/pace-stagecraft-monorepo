# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Stripe Service (.github/workflows/ci-stripe-service.yml)

## Root cause (from automated analysis)

The actions/setup-node@v7 step in the lint job fails with 'Some specified paths were not resolved, unable to cache dependencies' because services/payment/stripe-service/package-lock.json does not exist in the repository at this commit. The missing package-lock.json means npm's cache key cannot be computed, causing a hard error that kills the lint job and cascades failures through all downstream jobs (unit-test, webhook-signature-test, docker-build, integration-test, deploy-staging).

## Why this is a code-level issue, not a pipeline config issue

The package-lock.json file (and likely the entire service directory or its npm dependencies) is missing from the repository — this is a missing repository artifact that must be committed to source control, not a workflow YAML misconfiguration.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
26:06.4383601Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4434561Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:06.4435816Z ##[endgroup]
﻿2026-08-10T16:26:06.4697574Z ##[group]Run case "failure" in
2026-08-10T16:26:06.4698819Z [36;1mcase "failure" in[0m
2026-08-10T16:26:06.4699864Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:06.4700988Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4702311Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4703521Z [36;1m    ;;[0m
2026-08-10T16:26:06.4704483Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:06.4705729Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4707173Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4708397Z [36;1m    ;;[0m
2026-08-10T16:26:06.4709306Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:06.4710418Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4711715Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4712972Z [36;1m    ;;[0m
2026-08-10T16:26:06.4714151Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:06.4715343Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4716719Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4718264Z [36;1m    ;;[0m
2026-08-10T16:26:06.4719226Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:06.4720479Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4721774Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4722967Z [36;1m    ;;[0m
2026-08-10T16:26:06.4723833Z [36;1m  *)[0m
2026-08-10T16:26:06.4724791Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4726093Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.4727602Z [36;1m    ;;[0m
2026-08-10T16:26:06.4728469Z [36;1mesac[0m
2026-08-10T16:26:06.4775389Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:06.4776429Z ##[endgroup]
﻿2026-08-10T16:26:06.4985794Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:06.4987457Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:06.4988708Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:06.4989939Z [36;1melse[0m
2026-08-10T16:26:06.4990958Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:06.4992778Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:06.4994425Z [36;1mfi[0m
2026-08-10T16:26:06.5042872Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:06.5043904Z env:
2026-08-10T16:26:06.5044706Z   WEBHOOK: 
2026-08-10T16:26:06.5045529Z ##[endgroup]
2026-08-10T16:26:06.5154040Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:26:02.2140000Z Evaluating notify.if
2026-08-10T16:26:02.2140000Z Evaluating: always()
2026-08-10T16:26:02.2140000Z Result: true
2026-08-10T16:26:02.2140000Z Evaluating notify.notify-slack.if
2026-08-10T16:26:02.2140000Z Evaluating: success()
2026-08-10T16:26:02.2140000Z Result: true
2026-08-10T16:26:02.4360000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:26:02.4250000Z Requested labels: ubuntu-latest
2026-08-10T16:26:02.4250000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:26:02.4250000Z Reusable workflow chain:
2026-08-10T16:26:02.4250000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-stripe-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:26:02.4250000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:26:02.4250000Z Waiting for a runner to pick up this job...
2026-08-10T16:26:02.4360000Z Job is about to start running on the hosted runner: GitHub Actions 1000002766
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.