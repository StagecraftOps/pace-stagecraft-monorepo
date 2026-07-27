# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Notification Service (.github/workflows/ci-notification-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and mirrored in `unit-test`) fails with '##[error]Some specified paths were not resolved, unable to cache dependencies.' because the file specified in `cache-dependency-path` — `services/notification/notification-service/package-lock.json` — does not exist in the repository at the checked-out commit. The `package-lock.json` lockfile is either missing from the service directory entirely, was never committed, or the directory `services/notification/notification-service` itself does not yet exist in the repo.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` (or the entire service directory) is absent from repository content — analogous to the known failure mode of missing packaging manifests — and cannot be fixed by editing the workflow YAML alone; the lockfile must be generated (`npm install`) and committed to `services/notification/notification-service/`.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
7-27T16:27:31.3004080Z ##[group]Run case "success" in
2026-07-27T16:27:31.3005263Z [36;1mcase "success" in[0m
2026-07-27T16:27:31.3006253Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:31.3007817Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3009330Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3010541Z [36;1m    ;;[0m
2026-07-27T16:27:31.3011444Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:31.3012669Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3013955Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3015154Z [36;1m    ;;[0m
2026-07-27T16:27:31.3015998Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:31.3017066Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3018647Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3020165Z [36;1m    ;;[0m
2026-07-27T16:27:31.3021039Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:31.3022221Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3023566Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3024749Z [36;1m    ;;[0m
2026-07-27T16:27:31.3025636Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:31.3026855Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3028393Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3029576Z [36;1m    ;;[0m
2026-07-27T16:27:31.3030369Z [36;1m  *)[0m
2026-07-27T16:27:31.3031251Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3032543Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.3033742Z [36;1m    ;;[0m
2026-07-27T16:27:31.3034536Z [36;1mesac[0m
2026-07-27T16:27:31.3082511Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:31.3083562Z ##[endgroup]
﻿2026-07-27T16:27:31.3315861Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:31.3318191Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:31.3320142Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:31.3322085Z [36;1melse[0m
2026-07-27T16:27:31.3323699Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:31.3326839Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:31.3330005Z [36;1mfi[0m
2026-07-27T16:27:31.3384414Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:31.3385501Z env:
2026-07-27T16:27:31.3386198Z   WEBHOOK: 
2026-07-27T16:27:31.3386922Z ##[endgroup]
2026-07-27T16:27:31.3492423Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:12.0230000Z Evaluating notify.if
2026-07-27T16:27:12.0230000Z Evaluating: always()
2026-07-27T16:27:12.0230000Z Result: true
2026-07-27T16:27:12.0230000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:12.0230000Z Evaluating: success()
2026-07-27T16:27:12.0230000Z Result: true
2026-07-27T16:27:12.2090000Z Requested labels: ubuntu-latest
2026-07-27T16:27:12.2090000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:12.2090000Z Reusable workflow chain:
2026-07-27T16:27:12.2090000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-notification-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:12.2090000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:12.2090000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:12.5330000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:18.7300000Z Job is about to start running on the hosted runner: GitHub Actions 1000002082
2026-07-27T16:27:18.7290000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.