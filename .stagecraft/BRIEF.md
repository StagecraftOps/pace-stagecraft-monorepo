# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Push Notification Service (.github/workflows/ci-push-notification-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and likely other jobs) failed with `##[error]Some specified paths were not resolved, unable to cache dependencies.` This error occurs because the `cache-dependency-path` is set to `services/notification/push-notification-service/package-lock.json`, but that file does not exist in the repository at that path. Without a `package-lock.json` present, the npm caching mechanism cannot resolve the dependency path and hard-fails the setup step, preventing the entire job from proceeding. This is a missing repository content issue — the `package-lock.json` (and likely the entire service directory or its npm artifacts) has not been committed to the repo.

## Why this is a code-level issue, not a pipeline config issue

The failure is caused by a missing `package-lock.json` file at `services/notification/push-notification-service/package-lock.json` in the repository, which is a missing repository artifact that must be added to source control — not a workflow YAML misconfiguration.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
16:27:33.1764784Z ##[group]Run case "success" in
2026-07-27T16:27:33.1766030Z [36;1mcase "success" in[0m
2026-07-27T16:27:33.1767134Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:33.1768572Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1769973Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1771247Z [36;1m    ;;[0m
2026-07-27T16:27:33.1772266Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:33.1773575Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1774965Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1776234Z [36;1m    ;;[0m
2026-07-27T16:27:33.1777188Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:33.1778553Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1779952Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1781432Z [36;1m    ;;[0m
2026-07-27T16:27:33.1782429Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:33.1783691Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1785105Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1786381Z [36;1m    ;;[0m
2026-07-27T16:27:33.1787397Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:33.1788960Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1790337Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1791570Z [36;1m    ;;[0m
2026-07-27T16:27:33.1792471Z [36;1m  *)[0m
2026-07-27T16:27:33.1793478Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1794846Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.1796103Z [36;1m    ;;[0m
2026-07-27T16:27:33.1797004Z [36;1mesac[0m
2026-07-27T16:27:33.1840240Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:33.1841318Z ##[endgroup]
﻿2026-07-27T16:27:33.2005853Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:33.2007219Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:33.2008804Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:33.2010104Z [36;1melse[0m
2026-07-27T16:27:33.2011195Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:33.2013110Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:33.2014856Z [36;1mfi[0m
2026-07-27T16:27:33.2060004Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:33.2061077Z env:
2026-07-27T16:27:33.2061923Z   WEBHOOK: 
2026-07-27T16:27:33.2062810Z ##[endgroup]
2026-07-27T16:27:33.2156167Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:25.3430000Z Evaluating notify.if
2026-07-27T16:27:25.3430000Z Evaluating: always()
2026-07-27T16:27:25.3430000Z Result: true
2026-07-27T16:27:25.3430000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:25.3430000Z Evaluating: success()
2026-07-27T16:27:25.3430000Z Result: true
2026-07-27T16:27:25.5960000Z Requested labels: ubuntu-latest
2026-07-27T16:27:25.5960000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:25.5960000Z Reusable workflow chain:
2026-07-27T16:27:25.5960000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-push-notification-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:25.5960000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:25.5960000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:25.6250000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:28.2330000Z Job is about to start running on the hosted runner: GitHub Actions 1000002096
2026-07-27T16:27:28.2320000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.