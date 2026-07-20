# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Geocoder Service (.github/workflows/ci-geocoder-service.yml)

## Root cause (from automated analysis)

The file services/geo/geocoder-service/go.mod contains a UTF-8 BOM (byte-order mark, U+FEFF) at the very first byte. The Go toolchain explicitly rejects this: 'go.mod:1: unexpected input character '\ufeff''. When golangci-lint invokes go/packages to load the module graph, the Go parser fails with exit status 1, causing golangci-lint to exit with code 3 ('context loading failed'). This is a repository-content problem — the go.mod file itself was saved with a BOM, most likely by a Windows editor or IDE. The fix is to strip the BOM from go.mod (e.g. `sed -i '1s/^\xef\xbb\xbf//' go.mod`) and commit the corrected file.

## Why this is a code-level issue, not a pipeline config issue

The go.mod file in the service directory was committed with a UTF-8 BOM character, which is a repository-content defect that must be fixed by editing and recommitting the file, not by changing the workflow YAML.

Failure category: LINT_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
26-07-20T16:28:42.2360560Z ##[group]Run case "failure" in
2026-07-20T16:28:42.2361742Z [36;1mcase "failure" in[0m
2026-07-20T16:28:42.2362799Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:42.2363933Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2365317Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2366887Z [36;1m    ;;[0m
2026-07-20T16:28:42.2367851Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:42.2369162Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2370531Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2371793Z [36;1m    ;;[0m
2026-07-20T16:28:42.2372688Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:42.2373828Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2375202Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2376966Z [36;1m    ;;[0m
2026-07-20T16:28:42.2377898Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:42.2379141Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2380598Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2381866Z [36;1m    ;;[0m
2026-07-20T16:28:42.2382820Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:42.2384138Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2385529Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2387012Z [36;1m    ;;[0m
2026-07-20T16:28:42.2387858Z [36;1m  *)[0m
2026-07-20T16:28:42.2388801Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2390165Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:42.2391433Z [36;1m    ;;[0m
2026-07-20T16:28:42.2392287Z [36;1mesac[0m
2026-07-20T16:28:42.2451353Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:42.2452400Z ##[endgroup]
﻿2026-07-20T16:28:42.2631453Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:42.2632753Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:42.2634030Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:42.2635314Z [36;1melse[0m
2026-07-20T16:28:42.2636602Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:42.2638556Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:42.2640365Z [36;1mfi[0m
2026-07-20T16:28:42.2701665Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:42.2702696Z env:
2026-07-20T16:28:42.2703470Z   WEBHOOK: 
2026-07-20T16:28:42.2704266Z ##[endgroup]
2026-07-20T16:28:42.2818251Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:33.3010000Z Requested labels: ubuntu-latest
2026-07-20T16:28:33.3010000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:33.3010000Z Reusable workflow chain:
2026-07-20T16:28:33.3010000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-geocoder-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:33.3010000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:33.3010000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:33.2980000Z Evaluating notify.if
2026-07-20T16:28:33.2980000Z Evaluating: always()
2026-07-20T16:28:33.2980000Z Result: true
2026-07-20T16:28:33.2980000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:33.2980000Z Evaluating: success()
2026-07-20T16:28:33.2980000Z Result: true
2026-07-20T16:28:33.6900000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-20T16:28:36.9550000Z Job is waiting for a hosted runner to come online.
2026-07-20T16:28:36.9550000Z Job is about to start running on the hosted runner: GitHub Actions 1000001924
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.