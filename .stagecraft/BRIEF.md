# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Event Bus Service (.github/workflows/ci-event-bus-service.yml)

## Root cause (from automated analysis)

The `working-directory` for the 'Run golangci-lint' (and subsequent) steps is set to `services/infra/event-bus-service`, but that directory does not exist in the checked-out repository. The runner aborts immediately with: `An error occurred trying to start process '/usr/bin/bash' with working directory '/home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo/services/infra/event-bus-service'. No such file or directory`. Notably, `GOMOD='/dev/null'` in the Go env output confirms no `go.mod` was found either, meaning the service directory (`services/infra/event-bus-service`) — along with its Go module files — is entirely absent from the repository at this commit (refs/pull/36/merge). This is not a golangci-lint module-resolution issue (exit code 7 / path-prefix flag); the shell process itself cannot even be started because the directory is missing.

## Why this is a code-level issue, not a pipeline config issue

The service directory `services/infra/event-bus-service` does not exist in the repository at this commit, meaning the fix requires adding the directory and its contents (Go source files, go.mod, go.sum) to the repo — a repository content change, not a workflow YAML change.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
46.9798547Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:46.9881873Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:46.9883119Z ##[endgroup]
﻿2026-07-20T16:28:47.0158195Z ##[group]Run case "failure" in
2026-07-20T16:28:47.0159741Z [36;1mcase "failure" in[0m
2026-07-20T16:28:47.0160867Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:47.0162075Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0163515Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0164843Z [36;1m    ;;[0m
2026-07-20T16:28:47.0165841Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:47.0167206Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0168662Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0170255Z [36;1m    ;;[0m
2026-07-20T16:28:47.0171199Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:47.0172399Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0173846Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0175175Z [36;1m    ;;[0m
2026-07-20T16:28:47.0176369Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:47.0177726Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0179479Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0180825Z [36;1m    ;;[0m
2026-07-20T16:28:47.0181824Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:47.0183183Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0184609Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0185927Z [36;1m    ;;[0m
2026-07-20T16:28:47.0186827Z [36;1m  *)[0m
2026-07-20T16:28:47.0187819Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0189483Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:47.0190843Z [36;1m    ;;[0m
2026-07-20T16:28:47.0191747Z [36;1mesac[0m
2026-07-20T16:28:47.0252434Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:47.0253530Z ##[endgroup]
﻿2026-07-20T16:28:47.0436275Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:47.0437644Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:47.0438980Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:47.0440610Z [36;1melse[0m
2026-07-20T16:28:47.0441700Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:47.0443820Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:47.0445757Z [36;1mfi[0m
2026-07-20T16:28:47.0505505Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:47.0506597Z env:
2026-07-20T16:28:47.0507423Z   WEBHOOK: 
2026-07-20T16:28:47.0508280Z ##[endgroup]
2026-07-20T16:28:47.0620715Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:41.7780000Z Requested labels: ubuntu-latest
2026-07-20T16:28:41.7780000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:41.7780000Z Reusable workflow chain:
2026-07-20T16:28:41.7780000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-event-bus-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:41.7780000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:41.7780000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:41.7700000Z Evaluating notify.if
2026-07-20T16:28:41.7700000Z Evaluating: always()
2026-07-20T16:28:41.7700000Z Result: true
2026-07-20T16:28:41.7700000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:41.7700000Z Evaluating: success()
2026-07-20T16:28:41.7700000Z Result: true
2026-07-20T16:28:42.1110000Z Job is about to start running on the hosted runner: GitHub Actions 1000001934
2026-07-20T16:28:42.1110000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.