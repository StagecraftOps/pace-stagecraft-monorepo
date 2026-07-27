# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Semantic Search Service (.github/workflows/ci-semantic-search-service.yml)

## Root cause (from automated analysis)

The `lint` job fails at the 'Run flake8' step due to PEP 8 style violations in `services/search/semantic-search-service/main.py`. flake8 reports three specific errors: E302 (expected 2 blank lines, found 1) at lines 9 and 12, E501 (line too long: 127 > 120 characters) at line 13, and E305 (expected 2 blank lines after class or function definition, found 1) at line 15. flake8 exits with code 1, causing the lint job to fail and blocking the downstream `unit-test` job (which `needs: lint`).

## Why this is a code-level issue, not a pipeline config issue

The violations are in the application source file `main.py` itself — fixing blank-line spacing and shortening a too-long line requires editing that file, not changing any workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
7T16:27:33.9877910Z ##[group]Run case "failure" in
2026-07-27T16:27:33.9879157Z [36;1mcase "failure" in[0m
2026-07-27T16:27:33.9880219Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:33.9881360Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9882740Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9884013Z [36;1m    ;;[0m
2026-07-27T16:27:33.9885320Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:33.9886659Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9888035Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9889297Z [36;1m    ;;[0m
2026-07-27T16:27:33.9890195Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:33.9891328Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9892684Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9894171Z [36;1m    ;;[0m
2026-07-27T16:27:33.9895351Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:33.9896614Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9898067Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9899327Z [36;1m    ;;[0m
2026-07-27T16:27:33.9900281Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:33.9901577Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9902932Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9904178Z [36;1m    ;;[0m
2026-07-27T16:27:33.9905176Z [36;1m  *)[0m
2026-07-27T16:27:33.9906126Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9907491Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:33.9908758Z [36;1m    ;;[0m
2026-07-27T16:27:33.9909606Z [36;1mesac[0m
2026-07-27T16:27:33.9958033Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:33.9959163Z ##[endgroup]
﻿2026-07-27T16:27:34.0143666Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:34.0145233Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:34.0146589Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:34.0147907Z [36;1melse[0m
2026-07-27T16:27:34.0148964Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:34.0150957Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:34.0152800Z [36;1mfi[0m
2026-07-27T16:27:34.0201091Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:34.0202143Z env:
2026-07-27T16:27:34.0202954Z   WEBHOOK: 
2026-07-27T16:27:34.0203790Z ##[endgroup]
2026-07-27T16:27:34.0309529Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:22.7940000Z Requested labels: ubuntu-latest
2026-07-27T16:27:22.7940000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:22.7940000Z Reusable workflow chain:
2026-07-27T16:27:22.7940000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-semantic-search-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:22.7940000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:22.7940000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:22.7910000Z Evaluating notify.if
2026-07-27T16:27:22.7910000Z Evaluating: always()
2026-07-27T16:27:22.7910000Z Result: true
2026-07-27T16:27:22.7910000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:22.7910000Z Evaluating: success()
2026-07-27T16:27:22.7910000Z Result: true
2026-07-27T16:27:23.0370000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:28.0270000Z Job is about to start running on the hosted runner: GitHub Actions 1000002094
2026-07-27T16:27:28.0270000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.