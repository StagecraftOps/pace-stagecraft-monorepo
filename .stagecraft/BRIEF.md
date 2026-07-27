# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Listing ETL Pipeline (.github/workflows/ci-listing-etl.yml)

## Root cause (from automated analysis)

The flake8 lint step fails with 'FileNotFoundError: [Errno 2] No such file or directory: src/' (exit code 1) because the directory services/data/listing-etl/src/ does not exist in the repository at commit 0a1264bb. All lint tools (flake8 7.3.0, black 26.5.1, isort 8.0.1, mypy 2.3.0) installed successfully, so this is not a version resolution failure — it is a missing source directory. Every subsequent lint step (black, isort, mypy) and the unit-test job would also fail for the same reason. The workflow YAML correctly uses working-directory: services/data/listing-etl and targets src/, so the pipeline configuration itself is sound; the src/ subtree simply has not been committed.

## Why this is a code-level issue, not a pipeline config issue

The src/ source directory is missing from services/data/listing-etl/ in the repository itself, requiring the application source tree to be added or restored — no workflow YAML change can fix an absent directory.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
]
﻿2026-07-27T16:27:31.5711595Z ##[group]Run case "success" in
2026-07-27T16:27:31.5713151Z [36;1mcase "success" in[0m
2026-07-27T16:27:31.5714183Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:31.5715260Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5716587Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5717789Z [36;1m    ;;[0m
2026-07-27T16:27:31.5718676Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:31.5719882Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5721335Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5723116Z [36;1m    ;;[0m
2026-07-27T16:27:31.5724296Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:31.5725496Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5727434Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5729065Z [36;1m    ;;[0m
2026-07-27T16:27:31.5730394Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:31.5731707Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5733870Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5735739Z [36;1m    ;;[0m
2026-07-27T16:27:31.5737062Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:31.5738478Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5740484Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5741861Z [36;1m    ;;[0m
2026-07-27T16:27:31.5743212Z [36;1m  *)[0m
2026-07-27T16:27:31.5744620Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5746650Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:31.5748040Z [36;1m    ;;[0m
2026-07-27T16:27:31.5748851Z [36;1mesac[0m
2026-07-27T16:27:31.5796004Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:31.5797002Z ##[endgroup]
﻿2026-07-27T16:27:31.6035122Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:31.6036372Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:31.6037603Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:31.6038826Z [36;1melse[0m
2026-07-27T16:27:31.6039802Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:31.6041701Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:31.6043818Z [36;1mfi[0m
2026-07-27T16:27:31.6085604Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:31.6086569Z env:
2026-07-27T16:27:31.6087299Z   WEBHOOK: 
2026-07-27T16:27:31.6088067Z ##[endgroup]
2026-07-27T16:27:31.6180838Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:19.2520000Z Requested labels: ubuntu-latest
2026-07-27T16:27:19.2520000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:19.2520000Z Reusable workflow chain:
2026-07-27T16:27:19.2520000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-listing-etl.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:19.2520000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:19.2520000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:19.2480000Z Evaluating notify.if
2026-07-27T16:27:19.2480000Z Evaluating: always()
2026-07-27T16:27:19.2480000Z Result: true
2026-07-27T16:27:19.2480000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:19.2480000Z Evaluating: success()
2026-07-27T16:27:19.2480000Z Result: true
2026-07-27T16:27:19.2640000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:22.0510000Z Job is about to start running on the hosted runner: GitHub Actions 1000002087
2026-07-27T16:27:22.0500000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.