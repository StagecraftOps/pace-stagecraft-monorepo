# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Geocoder Service (.github/workflows/ci-geocoder-service.yml)

## Root cause (from automated analysis)

The go.mod file at services/geo/geocoder-service/go.mod begins with a UTF-8 BOM character (U+FEFF), causing the Go toolchain to fail with 'go.mod:1: unexpected input character '\ufeff''. This is reported by golangci-lint as a context loading failure (exit code 3). The `working-directory` is correctly set to `${{ env.SERVICE_DIR }}` so the module root is being resolved properly — the issue is that the go.mod file itself is malformed due to the BOM byte-order mark prepended to the file.

## Why this is a code-level issue, not a pipeline config issue

The go.mod file in the service's source tree contains an illegal UTF-8 BOM character that must be removed from the repository content itself — no workflow YAML change can fix a malformed file in the repo.

Failure category: LINT_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
:01.1531357Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1581638Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:01.1582881Z ##[endgroup]
﻿2026-08-10T16:26:01.1834164Z ##[group]Run case "failure" in
2026-08-10T16:26:01.1835446Z [36;1mcase "failure" in[0m
2026-08-10T16:26:01.1836570Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:01.1837760Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1839211Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1840523Z [36;1m    ;;[0m
2026-08-10T16:26:01.1841521Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:01.1842862Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1844417Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1845739Z [36;1m    ;;[0m
2026-08-10T16:26:01.1846684Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:01.1847876Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1849292Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1850607Z [36;1m    ;;[0m
2026-08-10T16:26:01.1851807Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:01.1853137Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1854929Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1856267Z [36;1m    ;;[0m
2026-08-10T16:26:01.1857254Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:01.1858601Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1860035Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1861344Z [36;1m    ;;[0m
2026-08-10T16:26:01.1862237Z [36;1m  *)[0m
2026-08-10T16:26:01.1863237Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1864895Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:01.1866242Z [36;1m    ;;[0m
2026-08-10T16:26:01.1867136Z [36;1mesac[0m
2026-08-10T16:26:01.1909205Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:01.1910312Z ##[endgroup]
﻿2026-08-10T16:26:01.2077565Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:01.2078940Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:01.2080288Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:01.2081648Z [36;1melse[0m
2026-08-10T16:26:01.2082733Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:01.2085057Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:01.2086972Z [36;1mfi[0m
2026-08-10T16:26:01.2129235Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:01.2130301Z env:
2026-08-10T16:26:01.2131125Z   WEBHOOK: 
2026-08-10T16:26:01.2131973Z ##[endgroup]
2026-08-10T16:26:01.2223201Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:54.4750000Z Evaluating notify.if
2026-08-10T16:25:54.4750000Z Evaluating: always()
2026-08-10T16:25:54.4750000Z Result: true
2026-08-10T16:25:54.4750000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:54.4750000Z Evaluating: success()
2026-08-10T16:25:54.4750000Z Result: true
2026-08-10T16:25:54.7240000Z Requested labels: ubuntu-latest
2026-08-10T16:25:54.7240000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:54.7240000Z Reusable workflow chain:
2026-08-10T16:25:54.7240000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-geocoder-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:54.7240000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:54.7240000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:56.7560000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:56.7570000Z Job is about to start running on the hosted runner: GitHub Actions 1000002760
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.