# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - API Gateway (.github/workflows/ci-api-gateway.yml)

## Root cause (from automated analysis)

The file services/infra/api-gateway/go.mod was saved with a UTF-8 BOM (U+FEFF) as its first byte. Go's module parser rejects this character ('unexpected input character \ufeff' at go.mod:1), causing go/packages to fail loading, which propagates as a golangci-lint context-loading failure (exit code 3). The fix is to strip the BOM from go.mod — e.g. with `sed -i '1s/^\xef\xbb\xbf//' go.mod` or by re-saving the file without BOM in the editor/toolchain that introduced it.

## Why this is a code-level issue, not a pipeline config issue

The go.mod file in the service's source directory contains a malformed BOM character that must be removed from repository content — no workflow YAML change can compensate for a syntactically invalid go.mod.

Failure category: LINT_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
16:27:33.3795792Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.3853614Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:33.3854964Z ##[endgroup]
﻿2026-07-27T16:27:33.4216120Z ##[group]Run case "failure" in
2026-07-27T16:27:33.4217537Z [36;1mcase "failure" in[0m
2026-07-27T16:27:33.4218668Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:33.4219884Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4221335Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4222669Z [36;1m    ;;[0m
2026-07-27T16:27:33.4223695Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:33.4225075Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4226520Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4228124Z [36;1m    ;;[0m
2026-07-27T16:27:33.4229111Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:33.4230328Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4231776Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4233112Z [36;1m    ;;[0m
2026-07-27T16:27:33.4234366Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:33.4235691Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4237409Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4238749Z [36;1m    ;;[0m
2026-07-27T16:27:33.4239789Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:33.4241167Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4242614Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4243934Z [36;1m    ;;[0m
2026-07-27T16:27:33.4244843Z [36;1m  *)[0m
2026-07-27T16:27:33.4245849Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4247386Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.4248730Z [36;1m    ;;[0m
2026-07-27T16:27:33.4249653Z [36;1mesac[0m
2026-07-27T16:27:33.4301947Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:33.4303054Z ##[endgroup]
﻿2026-07-27T16:27:33.4481520Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:33.4482848Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:33.4484136Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:33.4485439Z [36;1melse[0m
2026-07-27T16:27:33.4486470Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:33.4488676Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:33.4490604Z [36;1mfi[0m
2026-07-27T16:27:33.4541325Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:33.4542384Z env:
2026-07-27T16:27:33.4543210Z   WEBHOOK: 
2026-07-27T16:27:33.4544062Z ##[endgroup]
2026-07-27T16:27:33.4651300Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:29.1420000Z Evaluating notify.if
2026-07-27T16:27:29.1420000Z Evaluating: always()
2026-07-27T16:27:29.1420000Z Result: true
2026-07-27T16:27:29.1420000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:29.1420000Z Evaluating: success()
2026-07-27T16:27:29.1420000Z Result: true
2026-07-27T16:27:29.1450000Z Requested labels: ubuntu-latest
2026-07-27T16:27:29.1450000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:29.1450000Z Reusable workflow chain:
2026-07-27T16:27:29.1450000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-api-gateway.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:29.1450000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:29.1450000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:29.7720000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:29.7730000Z Job is about to start running on the hosted runner: GitHub Actions 1000002099
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.