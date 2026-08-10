# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Event Bus Service (.github/workflows/ci-event-bus-service.yml)

## Root cause (from automated analysis)

The service directory 'services/infra/event-bus-service' does not exist in the checked-out repository at the commit being tested (refs/pull/36/merge, SHA 3e2748244e). The runner fails with: "An error occurred trying to start process '/usr/bin/bash' with working directory '/home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo/services/infra/event-bus-service'. No such file or directory" when attempting to execute the 'Run golangci-lint' step, which specifies `working-directory: ${{ env.SERVICE_DIR }}`. The checkout itself succeeds (the repo root is present and git operations complete normally), but the subdirectory path `services/infra/event-bus-service` is simply absent from the tree. This is not a module-resolution or working-directory configuration mistake in the YAML — the path in the workflow matches the env var correctly — the directory itself is missing from the repository content at this PR's commit.

## Why this is a code-level issue, not a pipeline config issue

The workflow YAML references the correct path via `${{ env.SERVICE_DIR }}`, but the directory `services/infra/event-bus-service` is absent from the repository tree at the PR merge commit, meaning the fix requires adding the missing service directory and its contents to the repo, not changing the workflow.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
6-08-10T16:26:02.7727478Z ##[group]Run case "failure" in
2026-08-10T16:26:02.7728670Z [36;1mcase "failure" in[0m
2026-08-10T16:26:02.7729941Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:02.7731061Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7732361Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7733560Z [36;1m    ;;[0m
2026-08-10T16:26:02.7734500Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:02.7735727Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7736991Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7738179Z [36;1m    ;;[0m
2026-08-10T16:26:02.7739242Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:02.7740330Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7741594Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7743023Z [36;1m    ;;[0m
2026-08-10T16:26:02.7743963Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:02.7745124Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7746448Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7747605Z [36;1m    ;;[0m
2026-08-10T16:26:02.7748542Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:02.7749965Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7751215Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7752375Z [36;1m    ;;[0m
2026-08-10T16:26:02.7753223Z [36;1m  *)[0m
2026-08-10T16:26:02.7754153Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7755408Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:02.7756568Z [36;1m    ;;[0m
2026-08-10T16:26:02.7757423Z [36;1mesac[0m
2026-08-10T16:26:02.7808087Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:02.7809362Z ##[endgroup]
﻿2026-08-10T16:26:02.7981754Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:02.7983008Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:02.7984221Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:02.7985439Z [36;1melse[0m
2026-08-10T16:26:02.7986453Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:02.7988205Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:02.7990121Z [36;1mfi[0m
2026-08-10T16:26:02.8039618Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:02.8040696Z env:
2026-08-10T16:26:02.8041509Z   WEBHOOK: 
2026-08-10T16:26:02.8042353Z ##[endgroup]
2026-08-10T16:26:02.8144187Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:48.2690000Z Evaluating notify.if
2026-08-10T16:25:48.2690000Z Evaluating: always()
2026-08-10T16:25:48.2690000Z Result: true
2026-08-10T16:25:48.2690000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:48.2690000Z Evaluating: success()
2026-08-10T16:25:48.2690000Z Result: true
2026-08-10T16:25:48.2710000Z Requested labels: ubuntu-latest
2026-08-10T16:25:48.2710000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:48.2710000Z Reusable workflow chain:
2026-08-10T16:25:48.2710000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-event-bus-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:48.2710000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:48.2710000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:48.6250000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-10T16:25:52.2380000Z Job is about to start running on the hosted runner: GitHub Actions 1000002754
2026-08-10T16:25:52.2370000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.