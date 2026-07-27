# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Event Bus Service (.github/workflows/ci-event-bus-service.yml)

## Root cause (from automated analysis)

The `services/infra/event-bus-service` directory does not exist in the repository at the PR branch (refs/pull/36/merge). The `lint` job's `Run golangci-lint` step fails immediately with: "An error occurred trying to start process '/usr/bin/bash' with working directory '/home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo/services/infra/event-bus-service'. No such file or directory". The checkout completed successfully (the repo was cloned), but the path `services/infra/event-bus-service` simply does not exist on disk. This means the service directory itself is absent from the repository — it was never committed, was deleted, or the SERVICE_DIR env variable points to a path that doesn't match the actual directory structure in the repo.

## Why this is a code-level issue, not a pipeline config issue

The working directory `services/infra/event-bus-service` does not exist in the checked-out repository content, making this a missing repository content problem (the service directory or its files were never committed or were deleted), not a workflow YAML misconfiguration — the `working-directory` value itself is consistent with the workflow's intent and the path trigger.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
36.6266756Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6322129Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:36.6323360Z ##[endgroup]
﻿2026-07-27T16:27:36.6584570Z ##[group]Run case "failure" in
2026-07-27T16:27:36.6585782Z [36;1mcase "failure" in[0m
2026-07-27T16:27:36.6586868Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:36.6588028Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6589652Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6590943Z [36;1m    ;;[0m
2026-07-27T16:27:36.6591917Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:36.6593235Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6594612Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6595882Z [36;1m    ;;[0m
2026-07-27T16:27:36.6596795Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:36.6597956Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6599516Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6601028Z [36;1m    ;;[0m
2026-07-27T16:27:36.6601975Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:36.6603208Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6604629Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6605898Z [36;1m    ;;[0m
2026-07-27T16:27:36.6606877Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:36.6608161Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6609728Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6610998Z [36;1m    ;;[0m
2026-07-27T16:27:36.6611865Z [36;1m  *)[0m
2026-07-27T16:27:36.6612833Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6614210Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.6615474Z [36;1m    ;;[0m
2026-07-27T16:27:36.6616343Z [36;1mesac[0m
2026-07-27T16:27:36.6665475Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:36.6666578Z ##[endgroup]
﻿2026-07-27T16:27:36.6841522Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:36.6842893Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:36.6844211Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:36.6845551Z [36;1melse[0m
2026-07-27T16:27:36.6846619Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:36.6848635Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:36.6850805Z [36;1mfi[0m
2026-07-27T16:27:36.6899917Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:36.6901000Z env:
2026-07-27T16:27:36.6901850Z   WEBHOOK: 
2026-07-27T16:27:36.6902717Z ##[endgroup]
2026-07-27T16:27:36.7003827Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:21.0150000Z Requested labels: ubuntu-latest
2026-07-27T16:27:21.0150000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:21.0150000Z Reusable workflow chain:
2026-07-27T16:27:21.0150000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-event-bus-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:21.0150000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:21.0150000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:21.0090000Z Evaluating notify.if
2026-07-27T16:27:21.0090000Z Evaluating: always()
2026-07-27T16:27:21.0090000Z Result: true
2026-07-27T16:27:21.0090000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:21.0090000Z Evaluating: success()
2026-07-27T16:27:21.0090000Z Result: true
2026-07-27T16:27:26.0690000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:26.0700000Z Job is about to start running on the hosted runner: GitHub Actions 1000002092
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.