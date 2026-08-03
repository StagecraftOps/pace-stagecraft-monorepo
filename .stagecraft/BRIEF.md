# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Photo Upload Service (.github/workflows/ci-photo-upload-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and likely all subsequent jobs) fails with `##[error]Some specified paths were not resolved, unable to cache dependencies.` because the file `services/media/photo-upload-service/package-lock.json` does not exist in the repository at the checked-out ref. The `cache-dependency-path` parameter points to a `package-lock.json` that is either missing from the repo entirely or was never committed. Without a resolvable lockfile path, the npm cache setup step hard-fails, aborting the job before any linting, testing, or validation can occur.

## Why this is a code-level issue, not a pipeline config issue

The lockfile `services/media/photo-upload-service/package-lock.json` is missing from the repository content itself — committing it (or running `npm install` locally and pushing the generated lockfile) is an application/repository-content fix, not a workflow YAML change.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
8-03T16:29:03.5579496Z ##[group]Run case "failure" in
2026-08-03T16:29:03.5580775Z [36;1mcase "failure" in[0m
2026-08-03T16:29:03.5582210Z [36;1m  SUCCESS|success)[0m
2026-08-03T16:29:03.5583372Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5584749Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5586029Z [36;1m    ;;[0m
2026-08-03T16:29:03.5586988Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-03T16:29:03.5588302Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5589689Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5590971Z [36;1m    ;;[0m
2026-08-03T16:29:03.5592125Z [36;1m  ROLLBACK|rollback)[0m
2026-08-03T16:29:03.5593305Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5594693Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5596325Z [36;1m    ;;[0m
2026-08-03T16:29:03.5597263Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-03T16:29:03.5598501Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5599977Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5601240Z [36;1m    ;;[0m
2026-08-03T16:29:03.5602625Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-03T16:29:03.5603979Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5605365Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5606648Z [36;1m    ;;[0m
2026-08-03T16:29:03.5607505Z [36;1m  *)[0m
2026-08-03T16:29:03.5608465Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5609826Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-03T16:29:03.5611092Z [36;1m    ;;[0m
2026-08-03T16:29:03.5612207Z [36;1mesac[0m
2026-08-03T16:29:03.5660472Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:03.5661889Z ##[endgroup]
﻿2026-08-03T16:29:03.5848444Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-03T16:29:03.5849891Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-03T16:29:03.5851252Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:03.5852780Z [36;1melse[0m
2026-08-03T16:29:03.5853860Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-03T16:29:03.5855932Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-03T16:29:03.5857827Z [36;1mfi[0m
2026-08-03T16:29:03.5906101Z shell: /usr/bin/bash -e {0}
2026-08-03T16:29:03.5907212Z env:
2026-08-03T16:29:03.5908054Z   WEBHOOK: 
2026-08-03T16:29:03.5908934Z ##[endgroup]
2026-08-03T16:29:03.6010473Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-03T16:28:55.6000000Z Evaluating notify.if
2026-08-03T16:28:55.6000000Z Evaluating: always()
2026-08-03T16:28:55.6000000Z Result: true
2026-08-03T16:28:55.6000000Z Evaluating notify.notify-slack.if
2026-08-03T16:28:55.6000000Z Evaluating: success()
2026-08-03T16:28:55.6000000Z Result: true
2026-08-03T16:28:55.6030000Z Requested labels: ubuntu-latest
2026-08-03T16:28:55.6030000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-03T16:28:55.6030000Z Reusable workflow chain:
2026-08-03T16:28:55.6030000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-photo-upload-service.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:55.6030000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06ce8ed24c08b107070b7ab8da0e8ccce8d93203)
2026-08-03T16:28:55.6030000Z Waiting for a runner to pick up this job...
2026-08-03T16:28:55.9630000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-03T16:28:58.3990000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:28:58.4040000Z Job is about to start running on the hosted runner: GitHub Actions 1000002233
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.