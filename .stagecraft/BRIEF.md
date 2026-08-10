# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Semantic Search Service (.github/workflows/ci-semantic-search-service.yml)

## Root cause (from automated analysis)

flake8 linting failed in the 'lint' job due to four PEP 8 style violations in services/search/semantic-search-service/main.py: two E302 errors (missing 2 blank lines before function/class definitions at lines 9 and 12), one E501 error (line 13 is 127 characters, exceeding the 120-character limit), and one E305 error (missing 2 blank lines after a function/class definition at line 15). The pipeline configuration is correct; the source file itself needs to be reformatted.

## Why this is a code-level issue, not a pipeline config issue

The failures are genuine PEP 8 formatting violations in main.py's source code that must be fixed by editing the application file, not the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
2714Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1033243Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:09.1034428Z ##[endgroup]
﻿2026-08-10T16:26:09.1282055Z ##[group]Run case "failure" in
2026-08-10T16:26:09.1283290Z [36;1mcase "failure" in[0m
2026-08-10T16:26:09.1284341Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:09.1285450Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1286774Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1287981Z [36;1m    ;;[0m
2026-08-10T16:26:09.1288962Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:09.1290206Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1291753Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1293053Z [36;1m    ;;[0m
2026-08-10T16:26:09.1293956Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:09.1295082Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1296402Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1297838Z [36;1m    ;;[0m
2026-08-10T16:26:09.1298774Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:09.1299974Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1301335Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1302852Z [36;1m    ;;[0m
2026-08-10T16:26:09.1303824Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:09.1305080Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1306395Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1307584Z [36;1m    ;;[0m
2026-08-10T16:26:09.1308442Z [36;1m  *)[0m
2026-08-10T16:26:09.1309388Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1310687Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:09.1312138Z [36;1m    ;;[0m
2026-08-10T16:26:09.1313020Z [36;1mesac[0m
2026-08-10T16:26:09.1356857Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:09.1357901Z ##[endgroup]
﻿2026-08-10T16:26:09.1516661Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:09.1517936Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:09.1519198Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:09.1520436Z [36;1melse[0m
2026-08-10T16:26:09.1521467Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:09.1523627Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:09.1525303Z [36;1mfi[0m
2026-08-10T16:26:09.1567750Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:09.1568765Z env:
2026-08-10T16:26:09.1569573Z   WEBHOOK: 
2026-08-10T16:26:09.1570403Z ##[endgroup]
2026-08-10T16:26:09.1660132Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:26:04.6230000Z Requested labels: ubuntu-latest
2026-08-10T16:26:04.6230000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:26:04.6230000Z Reusable workflow chain:
2026-08-10T16:26:04.6230000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-semantic-search-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:26:04.6230000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:26:04.6230000Z Waiting for a runner to pick up this job...
2026-08-10T16:26:04.6170000Z Evaluating notify.if
2026-08-10T16:26:04.6170000Z Evaluating: always()
2026-08-10T16:26:04.6170000Z Result: true
2026-08-10T16:26:04.6170000Z Evaluating notify.notify-slack.if
2026-08-10T16:26:04.6170000Z Evaluating: success()
2026-08-10T16:26:04.6170000Z Result: true
2026-08-10T16:26:04.8430000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:26:04.8420000Z Job is about to start running on the hosted runner: GitHub Actions 1000002767
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.