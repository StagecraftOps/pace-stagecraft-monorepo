# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Data Warehouse Service (.github/workflows/ci-data-warehouse-service.yml)

## Root cause (from automated analysis)

The `flake8` (and subsequent lint/test) steps fail with `E902 FileNotFoundError: [Errno 2] No such file or directory: 'src/'` when run from `working-directory: services/data/data-warehouse-service`. The `src/` subdirectory does not exist at that path in the repository. This is a missing application source directory — the `services/data/data-warehouse-service/src/` tree is absent from the checked-out commit (PR #36 / SHA 0a1264b). All downstream lint steps (black, isort, bandit) and the `unit-test` job would fail for the same reason. This is unrelated to the unpinned tool versions resolved during installation (flake8 7.3.0, black 26.5.1, mypy 2.3.0, etc.), which all installed successfully.

## Why this is a code-level issue, not a pipeline config issue

The `src/` directory is missing from the service path in the repository itself — the fix requires adding the missing source tree (or the service directory scaffold) to the repo, not changing anything in the workflow YAML.

Failure category: DEPENDENCY_VERSION

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
27T16:27:32.1003369Z ##[group]Run case "success" in
2026-07-27T16:27:32.1003984Z [36;1mcase "success" in[0m
2026-07-27T16:27:32.1004470Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:32.1004988Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1005604Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1006161Z [36;1m    ;;[0m
2026-07-27T16:27:32.1006596Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:32.1007160Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1007753Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1008303Z [36;1m    ;;[0m
2026-07-27T16:27:32.1008720Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:32.1009230Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1010095Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1010853Z [36;1m    ;;[0m
2026-07-27T16:27:32.1011284Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:32.1011836Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1012470Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1013017Z [36;1m    ;;[0m
2026-07-27T16:27:32.1013459Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:32.1014026Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1014624Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1015174Z [36;1m    ;;[0m
2026-07-27T16:27:32.1015575Z [36;1m  *)[0m
2026-07-27T16:27:32.1016010Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1016600Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:32.1017165Z [36;1m    ;;[0m
2026-07-27T16:27:32.1017567Z [36;1mesac[0m
2026-07-27T16:27:32.1066055Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:32.1066577Z ##[endgroup]
﻿2026-07-27T16:27:32.1200092Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:32.1200763Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:32.1201339Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:32.1201909Z [36;1melse[0m
2026-07-27T16:27:32.1202406Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:32.1203256Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:32.1204045Z [36;1mfi[0m
2026-07-27T16:27:32.1251418Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:32.1251923Z env:
2026-07-27T16:27:32.1252303Z   WEBHOOK: 
2026-07-27T16:27:32.1252698Z ##[endgroup]
2026-07-27T16:27:32.1346579Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:27.1850000Z Requested labels: ubuntu-latest
2026-07-27T16:27:27.1850000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:27.1850000Z Reusable workflow chain:
2026-07-27T16:27:27.1850000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-data-warehouse-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:27.1850000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:27.1850000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:27.1810000Z Evaluating notify.if
2026-07-27T16:27:27.1810000Z Evaluating: always()
2026-07-27T16:27:27.1810000Z Result: true
2026-07-27T16:27:27.1810000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:27.1810000Z Evaluating: success()
2026-07-27T16:27:27.1810000Z Result: true
2026-07-27T16:27:27.3090000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:28.9950000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:28.9950000Z Job is about to start running on the hosted runner: GitHub Actions 1000002097
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.