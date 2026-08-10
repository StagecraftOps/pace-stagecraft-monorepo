# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - Email Service (.github/workflows/ci-email-service.yml)

## Root cause (from automated analysis)

The `actions/setup-node` step in every job fails with 'Some specified paths were not resolved, unable to cache dependencies' because the file referenced by `cache-dependency-path` — `services/notification/email-service/package-lock.json` — does not exist in the repository at commit 3e27482. The npm dependency lockfile is absent from the `services/notification/email-service/` directory, so the cache key cannot be computed and the setup step aborts before any npm install or lint/test command is even attempted.

## Why this is a code-level issue, not a pipeline config issue

The missing `package-lock.json` is a repository content problem — the lockfile must be generated (`npm install`) and committed under `services/notification/email-service/`; no change to the workflow YAML alone will resolve it (short of removing the cache entirely, which is a workaround, not a fix).

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
﻿2026-08-10T16:26:06.7914640Z ##[group]Run case "success" in
2026-08-10T16:26:06.7915900Z [36;1mcase "success" in[0m
2026-08-10T16:26:06.7917019Z [36;1m  SUCCESS|success)[0m
2026-08-10T16:26:06.7918231Z [36;1m    echo "emoji=✅" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7919662Z [36;1m    echo "color=#36a64f" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7921250Z [36;1m    ;;[0m
2026-08-10T16:26:06.7922289Z [36;1m  FAILURE|failure|FAILED|failed)[0m
2026-08-10T16:26:06.7923654Z [36;1m    echo "emoji=❌" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7925088Z [36;1m    echo "color=#ff0000" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7926418Z [36;1m    ;;[0m
2026-08-10T16:26:06.7927373Z [36;1m  ROLLBACK|rollback)[0m
2026-08-10T16:26:06.7928564Z [36;1m    echo "emoji=⏪" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7929981Z [36;1m    echo "color=#ff9900" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7931506Z [36;1m    ;;[0m
2026-08-10T16:26:06.7932718Z [36;1m  IN_PROGRESS|in_progress)[0m
2026-08-10T16:26:06.7934015Z [36;1m    echo "emoji=🔄" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7935493Z [36;1m    echo "color=#0066cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7936811Z [36;1m    ;;[0m
2026-08-10T16:26:06.7937823Z [36;1m  AUDIT_COMPLETE|audit_complete)[0m
2026-08-10T16:26:06.7939172Z [36;1m    echo "emoji=🔍" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7940588Z [36;1m    echo "color=#9933cc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7942186Z [36;1m    ;;[0m
2026-08-10T16:26:06.7943106Z [36;1m  *)[0m
2026-08-10T16:26:06.7944101Z [36;1m    echo "emoji=ℹ️" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7945536Z [36;1m    echo "color=#cccccc" >> $GITHUB_OUTPUT[0m
2026-08-10T16:26:06.7946861Z [36;1m    ;;[0m
2026-08-10T16:26:06.7947781Z [36;1mesac[0m
2026-08-10T16:26:06.7991218Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:06.7992352Z ##[endgroup]
﻿2026-08-10T16:26:06.8153732Z ##[group]Run if [ -n "$WEBHOOK" ]; then
2026-08-10T16:26:06.8155096Z [36;1mif [ -n "$WEBHOOK" ]; then[0m
2026-08-10T16:26:06.8156446Z [36;1m  echo "available=true" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:06.8157794Z [36;1melse[0m
2026-08-10T16:26:06.8158869Z [36;1m  echo "available=false" >> "$GITHUB_OUTPUT"[0m
2026-08-10T16:26:06.8161194Z [36;1m  echo "::notice::SLACK_WEBHOOK_URL not configured — notification will be skipped"[0m
2026-08-10T16:26:06.8163133Z [36;1mfi[0m
2026-08-10T16:26:06.8205108Z shell: /usr/bin/bash -e {0}
2026-08-10T16:26:06.8206192Z env:
2026-08-10T16:26:06.8207013Z   WEBHOOK: 
2026-08-10T16:26:06.8207875Z ##[endgroup]
2026-08-10T16:26:06.8297588Z ##[notice]SLACK_WEBHOOK_URL not configured — notification will be skipped
2026-08-10T16:25:53.3830000Z Evaluating notify.if
2026-08-10T16:25:53.3830000Z Evaluating: always()
2026-08-10T16:25:53.3830000Z Result: true
2026-08-10T16:25:53.3830000Z Evaluating notify.notify-slack.if
2026-08-10T16:25:53.3830000Z Evaluating: success()
2026-08-10T16:25:53.3830000Z Result: true
2026-08-10T16:25:53.3860000Z Requested labels: ubuntu-latest
2026-08-10T16:25:53.3860000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge
2026-08-10T16:25:53.3860000Z Reusable workflow chain:
2026-08-10T16:25:53.3860000Z StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-email-service.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:53.3860000Z -> StagecraftOps/pace-stagecraft-monorepo/.github/workflows/_template-notify-slack.yml@refs/pull/36/merge (3e2748244e6d8d59a67ddd32b4a10c4ebbde8d4c)
2026-08-10T16:25:53.3860000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:53.6950000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-10T16:25:56.2970000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:56.2970000Z Job is about to start running on the hosted runner: GitHub Actions 1000002759
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.