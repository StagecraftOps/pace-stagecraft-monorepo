# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Semantic Search Service (.github/workflows/ci-semantic-search-service.yml)

## Root cause (from automated analysis)

flake8 linting failed in services/search/semantic-search-service/main.py with four PEP 8 violations: E302 (missing 2 blank lines before function/class definitions at lines 9 and 12), E501 (line 13 exceeds the 120-character limit at 127 chars), and E305 (missing 2 blank lines after a function/class definition at line 15). The lint job exited with code 1, blocking the dependent unit-test job from running.

## Why this is a code-level issue, not a pipeline config issue

The failures are PEP 8 style violations in application source code (main.py) that must be fixed by reformatting the file — adding blank lines and shortening the long line — not by changing any workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
4554Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.0826065Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:49.0826709Z ##[endgroup]
﻿2026-07-20T16:28:49.1048415Z ##[group]Run case "failure" in
2026-07-20T16:28:49.1049303Z [36;1mcase "failure" in[0m
2026-07-20T16:28:49.1050046Z [36;1m  SUCCESS|success)[0m
2026-07-20T16:28:49.1050830Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1051743Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1052580Z [36;1m    ;;[0m
2026-07-20T16:28:49.1053252Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-20T16:28:49.1054377Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1055316Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1056185Z [36;1m    ;;[0m
2026-07-20T16:28:49.1056815Z [36;1m  ROLLBACK|rollback)[0m
2026-07-20T16:28:49.1057592Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1058495Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1059548Z [36;1m    ;;[0m
2026-07-20T16:28:49.1060210Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-20T16:28:49.1061044Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1061989Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1062819Z [36;1m    ;;[0m
2026-07-20T16:28:49.1063497Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-20T16:28:49.1064634Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1065558Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1066403Z [36;1m    ;;[0m
2026-07-20T16:28:49.1067024Z [36;1m  *)[0m
2026-07-20T16:28:49.1067699Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1068610Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-20T16:28:49.1069458Z [36;1m    ;;[0m
2026-07-20T16:28:49.1070067Z [36;1mesac[0m
2026-07-20T16:28:49.1124766Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:49.1125543Z ##[endgroup]
﻿2026-07-20T16:28:49.1264941Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-20T16:28:49.1265858Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-20T16:28:49.1266580Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:49.1267294Z [36;1melse[0m
2026-07-20T16:28:49.1267840Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-20T16:28:49.1268970Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-20T16:28:49.1270091Z [36;1mfi[0m
2026-07-20T16:28:49.1324165Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:49.1324773Z env:
2026-07-20T16:28:49.1325192Z   WEBHOOK: 
2026-07-20T16:28:49.1325617Z ##[endgroup]
2026-07-20T16:28:49.1420989Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-20T16:28:44.1250000Z Job is waiting for a hosted runner to come online.
2026-07-20T16:28:44.1190000Z Evaluating notify.if
2026-07-20T16:28:44.1190000Z Evaluating: always()
2026-07-20T16:28:44.1190000Z Result: true
2026-07-20T16:28:44.1190000Z Evaluating notify.notify-slack.if
2026-07-20T16:28:44.1190000Z Evaluating: success()
2026-07-20T16:28:44.1190000Z Result: true
2026-07-20T16:28:44.1250000Z Job is about to start running on the hosted runner: GitHub Actions 1000001936
2026-07-20T16:28:44.1200000Z Requested labels: ubuntu-latest
2026-07-20T16:28:44.1200000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-20T16:28:44.1200000Z Reusable workflow chain:
2026-07-20T16:28:44.1200000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-semantic-search-service.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:44.1200000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (06678b4deceda863c9791dcf1b4ee2d7706bbd8e)
2026-07-20T16:28:44.1200000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.