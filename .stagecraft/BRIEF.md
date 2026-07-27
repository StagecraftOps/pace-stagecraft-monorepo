# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Email Service (.github/workflows/ci-email-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node@v7` step in the `lint` job (and identically in `unit-test` and `template-validation`) fails with "Some specified paths were not resolved, unable to cache dependencies" because the file `services/notification/email-service/package-lock.json` does not exist in the repository. The `cache-dependency-path` parameter points to a lockfile that is absent, causing the npm cache setup to abort and the job to fail before any `npm ci` or lint/test step is even reached.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` at `services/notification/email-service/package-lock.json` is a repository-content problem — the lockfile (and likely the entire `package.json` / `npm install` bootstrapping for the service) needs to be committed to the repo, not a change to the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
:27:23.1554274Z [36;1mecho "EOF" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1602154Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:23.1602735Z ##[endgroup]
﻿2026-07-27T16:27:23.1810096Z ##[group]Run case "success" in
2026-07-27T16:27:23.1810726Z [36;1mcase "success" in[0m
2026-07-27T16:27:23.1811246Z [36;1m  SUCCESS|success)[0m
2026-07-27T16:27:23.1811818Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1812481Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1813071Z [36;1m    ;;[0m
2026-07-27T16:27:23.1813539Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-07-27T16:27:23.1814147Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1814780Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1815377Z [36;1m    ;;[0m
2026-07-27T16:27:23.1815820Z [36;1m  ROLLBACK|rollback)[0m
2026-07-27T16:27:23.1816359Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1816987Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1817569Z [36;1m    ;;[0m
2026-07-27T16:27:23.1818505Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-07-27T16:27:23.1819100Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1819767Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1820350Z [36;1m    ;;[0m
2026-07-27T16:27:23.1820825Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-07-27T16:27:23.1821448Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1822076Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1822656Z [36;1m    ;;[0m
2026-07-27T16:27:23.1823078Z [36;1m  *)[0m
2026-07-27T16:27:23.1823551Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1824192Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-07-27T16:27:23.1824779Z [36;1m    ;;[0m
2026-07-27T16:27:23.1825218Z [36;1mesac[0m
2026-07-27T16:27:23.1868792Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:23.1869335Z ##[endgroup]
﻿2026-07-27T16:27:23.1989524Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-07-27T16:27:23.1990205Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-07-27T16:27:23.1990831Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:23.1991443Z [36;1melse[0m
2026-07-27T16:27:23.1991950Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-07-27T16:27:23.1992833Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-07-27T16:27:23.1993698Z [36;1mfi[0m
2026-07-27T16:27:23.2034703Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:23.2035232Z env:
2026-07-27T16:27:23.2035632Z   WEBHOOK: 
2026-07-27T16:27:23.2036045Z ##[endgroup]
2026-07-27T16:27:23.2119604Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-07-27T16:27:12.3940000Z Evaluating notify.if
2026-07-27T16:27:12.3940000Z Evaluating: always()
2026-07-27T16:27:12.3940000Z Result: true
2026-07-27T16:27:12.3940000Z Evaluating notify.notify-slack.if
2026-07-27T16:27:12.3940000Z Evaluating: success()
2026-07-27T16:27:12.3940000Z Result: true
2026-07-27T16:27:12.4020000Z Requested labels: ubuntu-latest
2026-07-27T16:27:12.4020000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-07-27T16:27:12.4020000Z Reusable workflow chain:
2026-07-27T16:27:12.4020000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-email-service.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:12.4020000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (0a1264bb06c5166e8711d59940d0eabe89d17ce2)
2026-07-27T16:27:12.4020000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:19.9950000Z Job is about to start running on the hosted runner: GitHub Actions 1000002083
2026-07-27T16:27:19.9940000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.