# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Data Quality Pipeline (.github/workflows/ci-data-quality-pipeline.yml)

## Root cause (from automated analysis)

The flake8 lint step fails with 'FileNotFoundError: [Errno 2] No such file or directory: src/' (flake8 E902, exit code 1) when running with working-directory set to services/data/data-quality-pipeline. The src/ subdirectory does not exist inside that service directory in the checked-out repository. This matches known failure mode #2: the service directory is referenced in the workflow path filters but the actual source tree (src/) has never been committed to the repo. The pip cache key also degraded to an empty hash suffix, confirming no requirements*.txt files are present either — meaning the entire service content is missing, not just a misconfigured path in the YAML.

## Why this is a code-level issue, not a pipeline config issue

The src/ directory (and likely requirements*.txt) is absent from the repository under services/data/data-quality-pipeline/, so the fix requires adding the missing source tree and packaging manifests to the repo, not changing any workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
-27T16:27:36.1182434Z ##[group]Run case "success" in
2026-07-27T16:27:36.1183631Z [36;1mcase "success" in[0m
2026-07-27T16:27:36.1184718Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:36.1186061Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1187368Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1188600Z [36;1m    ;;[0m
2026-07-27T16:27:36.1189707Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:36.1190935Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1192524Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1193720Z [36;1m    ;;[0m
2026-07-27T16:27:36.1194561Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:36.1195635Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1196912Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1198317Z [36;1m    ;;[0m
2026-07-27T16:27:36.1199175Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:36.1200543Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1202173Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1203388Z [36;1m    ;;[0m
2026-07-27T16:27:36.1204270Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:36.1205476Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1206760Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1207939Z [36;1m    ;;[0m
2026-07-27T16:27:36.1208728Z [36;1m  *)[0m
2026-07-27T16:27:36.1209607Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1210900Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:36.1212356Z [36;1m    ;;[0m
2026-07-27T16:27:36.1213147Z [36;1mesac[0m
2026-07-27T16:27:36.1259989Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:36.1260988Z ##[endgroup]
﻿2026-07-27T16:27:36.1483018Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:36.1484339Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:36.1485540Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:36.1486744Z [36;1melse[0m
2026-07-27T16:27:36.1487705Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:36.1489632Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:36.1491433Z [36;1mfi[0m
2026-07-27T16:27:36.1538235Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:36.1539217Z env:
2026-07-27T16:27:36.1539923Z   WEBHOOK: 
2026-07-27T16:27:36.1540666Z ##[endgroup]
2026-07-27T16:27:36.1649498Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:20.7130000Z Evaluating notify.if
2026-07-27T16:27:20.7130000Z Evaluating: always()
2026-07-27T16:27:20.7130000Z Result: true
2026-07-27T16:27:20.7130000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:20.7130000Z Evaluating: success()
2026-07-27T16:27:20.7130000Z Result: true
2026-07-27T16:27:20.7190000Z Requested labels: ubuntu-latest
2026-07-27T16:27:20.7190000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:20.7190000Z Reusable workflow chain:
2026-07-27T16:27:20.7190000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-data-quality-pipeline.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:20.7190000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:20.7190000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:20.9520000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:24.6170000Z Job is about to start running on the hosted runner: GitHub Actions 1000002090
2026-07-27T16:27:24.6170000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.