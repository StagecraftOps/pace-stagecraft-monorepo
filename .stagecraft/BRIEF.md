# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - API Gateway (.github/workflows/ci-api-gateway.yml)

## Root cause (from automated analysis)

The file services/infra/api-gateway/go.mod begins with a UTF-8 BOM character (U+FEFF, '\ufeff'). Go's module parser does not accept a BOM at the start of go.mod, so golangci-lint's package loader fails immediately with 'go: errors parsing go.mod: go.mod:1: unexpected input character \ufeff' and exits with code 3. The fix is to strip the BOM from go.mod (e.g., with `sed -i '1s/^\xef\xbb\xbf//' go.mod` or by re-saving the file as plain UTF-8 without BOM in the editor/toolchain that introduced it).

## Why this is a code-level issue, not a pipeline config issue

The BOM is an encoding artifact in the repository file services/infra/api-gateway/go.mod itself — no workflow YAML change can remove a byte from a committed source file; the file must be corrected and recommitted.

Failure category: LINT_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
16:26:10.2463673Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2513997Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:10.2515396Z ##[endgroup]
﻿2026-08-10T16:26:10.2761473Z ##[group]Run case "failure" in
2026-08-10T16:26:10.2762662Z [36;1mcase "failure" in[0m
2026-08-10T16:26:10.2763718Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:10.2765157Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2766520Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2767774Z [36;1m    ;;[0m
2026-08-10T16:26:10.2768743Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:10.2770005Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2771350Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2772571Z [36;1m    ;;[0m
2026-08-10T16:26:10.2773500Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:10.2774881Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2776261Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2777493Z [36;1m    ;;[0m
2026-08-10T16:26:10.2778671Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:10.2779889Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2781258Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2782484Z [36;1m    ;;[0m
2026-08-10T16:26:10.2783450Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:10.2784947Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2786305Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2787509Z [36;1m    ;;[0m
2026-08-10T16:26:10.2788373Z [36;1m  *)[0m
2026-08-10T16:26:10.2789338Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2790652Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:10.2791868Z [36;1m    ;;[0m
2026-08-10T16:26:10.2792739Z [36;1mesac[0m
2026-08-10T16:26:10.2836031Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:10.2837076Z ##[endgroup]
﻿2026-08-10T16:26:10.2995837Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:10.2997143Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:10.2998387Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:10.2999616Z [36;1melse[0m
2026-08-10T16:26:10.3000658Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:10.3002480Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:10.3004157Z [36;1mfi[0m
2026-08-10T16:26:10.3046680Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:10.3047698Z env:
2026-08-10T16:26:10.3048494Z   WEBHOOK: 
2026-08-10T16:26:10.3049331Z ##[endgroup]
2026-08-10T16:26:10.3141237Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:26:05.6470000Z Evaluating notify.if
2026-08-10T16:26:05.6470000Z Evaluating: always()
2026-08-10T16:26:05.6470000Z Result: true
2026-08-10T16:26:05.6470000Z Evaluating notify.notify-slack.if
2026-08-10T16:26:05.6470000Z Evaluating: success()
2026-08-10T16:26:05.6470000Z Result: true
2026-08-10T16:26:05.6500000Z Requested labels: ubuntu-latest
2026-08-10T16:26:05.6500000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:26:05.6500000Z Reusable workflow chain:
2026-08-10T16:26:05.6500000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-api-gateway.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:26:05.6500000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:26:05.6500000Z Waiting for a runner to pick up this job...
2026-08-10T16:26:05.9160000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:26:05.9170000Z Job is about to start running on the hosted runner: GitHub Actions 1000002768
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.