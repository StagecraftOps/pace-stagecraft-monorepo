# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Photo Upload Service (.github/workflows/ci-photo-upload-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job fails with '##[error]Some specified paths were not resolved, unable to cache dependencies' because `services/media/photo-upload-service/package-lock.json` does not exist in the repository at the checked-out commit (PR #36 merge ref). The workflow's `cache-dependency-path` is correctly configured, but the file — and likely the entire service directory — is missing from the repo, causing setup-node to abort before any npm or lint commands can run.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` (and likely the service directory itself) must be added to the repository; the workflow YAML's cache-dependency-path value is correct and requires no change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
7-20T16:28:35.8235989Z ##[group]Run case "failure" in
2026-07-20T16:28:35.8236707Z [36;1mcase "failure" in[0m
2026-07-20T16:28:35.8237595Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:35.8238231Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8238973Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8239655Z [36;1m    ;;[0m
2026-07-20T16:28:35.8240140Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:35.8240827Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8241544Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8242216Z [36;1m    ;;[0m
2026-07-20T16:28:35.8242674Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:35.8243257Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8243974Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8244880Z [36;1m    ;;[0m
2026-07-20T16:28:35.8245355Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:35.8246012Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8246771Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8247673Z [36;1m    ;;[0m
2026-07-20T16:28:35.8248165Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:35.8248849Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8249574Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8250226Z [36;1m    ;;[0m
2026-07-20T16:28:35.8250657Z [36;1m  *)[0m
2026-07-20T16:28:35.8251135Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8251890Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:35.8252567Z [36;1m    ;;[0m
2026-07-20T16:28:35.8252998Z [36;1mesac[0m
2026-07-20T16:28:35.8313340Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:35.8313941Z ##[endgroup]
﻿2026-07-20T16:28:35.8469616Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:35.8470401Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:35.8471136Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:35.8471848Z [36;1melse[0m
2026-07-20T16:28:35.8472382Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:35.8473512Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:35.8474525Z [36;1mfi[0m
2026-07-20T16:28:35.8533879Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:35.8534447Z env:
2026-07-20T16:28:35.8534842Z   WEBHOOK: 
2026-07-20T16:28:35.8535251Z ##[endgroup]
2026-07-20T16:28:35.8640722Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:29.7960000Z Requested labels: ubuntu-latest
2026-07-20T16:28:29.7960000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:29.7960000Z Reusable workflow chain:
2026-07-20T16:28:29.7960000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-photo-upload-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:29.7960000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:29.7960000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:29.7930000Z Evaluating notify.if
2026-07-20T16:28:29.7930000Z Evaluating: always()
2026-07-20T16:28:29.7930000Z Result: true
2026-07-20T16:28:29.7930000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:29.7930000Z Evaluating: success()
2026-07-20T16:28:29.7930000Z Result: true
2026-07-20T16:28:30.0190000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:32.1720000Z Job is waiting for a hosted runner to come online.
2026-07-20T16:28:32.1720000Z Job is about to start running on the hosted runner: GitHub Actions 1000001918
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.