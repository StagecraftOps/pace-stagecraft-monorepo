# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI — search-ui (.github/workflows/ci-search-ui.yml)

## Root cause (from automated analysis)

The file services/frontend/search-ui/package-lock.json is missing from the repository. npm ci requires a package-lock.json (or npm-shrinkwrap.json with lockfileVersion >= 1) and exits with EUSAGE (exit code 1) when none is found. This is confirmed by both the npm error message and the cache key degrading to 'Linux-node-search-ui-' (empty hashFiles suffix), which occurs because hashFiles() found no matching file. All jobs (lint, type-check, and transitively unit-test and perf-budget) fail at the 'Install dependencies' step for this same reason.

## Why this is a code-level issue, not a pipeline config issue

The package-lock.json lockfile is missing from the repository's service directory — this is a repository content problem requiring the file to be committed, not a workflow YAML misconfiguration.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
endgroup]
﻿2026-07-08T07:49:03.2156495Z Node 20 is being deprecated. This workflow is running with Node 24 by default. If you need to temporarily use Node 20, you can set the ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
2026-07-08T07:49:03.2157909Z ##[group]Run actions/cache@v4
2026-07-08T07:49:03.2158158Z with:
2026-07-08T07:49:03.2158351Z   path: ~/.npm
2026-07-08T07:49:03.2158584Z   key: Linux-node-search-ui-
2026-07-08T07:49:03.2158840Z   restore-keys: Linux-node-search-ui-
2026-07-08T07:49:03.2159148Z   enableCrossOsArchive: false
2026-07-08T07:49:03.2159394Z   fail-on-cache-miss: false
2026-07-08T07:49:03.2159623Z   lookup-only: false
2026-07-08T07:49:03.2159828Z   save-always: false
2026-07-08T07:49:03.2160036Z ##[endgroup]
2026-07-08T07:49:03.3238036Z (node:2337) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
2026-07-08T07:49:03.3239489Z (Use `node --trace-deprecation ...` to show where the warning was created)
2026-07-08T07:49:03.5929062Z Cache not found for input keys: Linux-node-search-ui-, Linux-node-search-ui-
﻿2026-07-08T07:49:03.6052095Z ##[group]Run npm ci
2026-07-08T07:49:03.6052585Z [36;1mnpm ci[0m
2026-07-08T07:49:03.6224482Z shell: /usr/bin/bash -e {0}
2026-07-08T07:49:03.6224808Z ##[endgroup]
2026-07-08T07:49:04.5046728Z npm error code EUSAGE
2026-07-08T07:49:04.5048440Z npm error
2026-07-08T07:49:04.5049599Z npm error The `npm ci` command can only install with an existing package-lock.json or
2026-07-08T07:49:04.5050621Z npm error npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or
2026-07-08T07:49:04.5051251Z npm error later to generate a package-lock.json file, then try again.
2026-07-08T07:49:04.5051630Z npm error
2026-07-08T07:49:04.5051889Z npm error Clean install a project
2026-07-08T07:49:04.5052165Z npm error
2026-07-08T07:49:04.5052355Z npm error Usage:
2026-07-08T07:49:04.5052574Z npm error npm ci
2026-07-08T07:49:04.5052774Z npm error
2026-07-08T07:49:04.5052985Z npm error Options:
2026-07-08T07:49:04.5053494Z npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
2026-07-08T07:49:04.5054233Z npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
2026-07-08T07:49:04.5054929Z npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
2026-07-08T07:49:04.5055802Z npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
2026-07-08T07:49:04.5056535Z npm error [--no-bin-links] [--no-fund] [--dry-run]
2026-07-08T07:49:04.5057075Z npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
2026-07-08T07:49:04.5057684Z npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
2026-07-08T07:49:04.5058064Z npm error
2026-07-08T07:49:04.5058434Z npm error aliases: clean-install, ic, install-clean, isntall-clean
2026-07-08T07:49:04.5058791Z npm error
2026-07-08T07:49:04.5059044Z npm error Run "npm help ci" for more info
2026-07-08T07:49:04.5077029Z npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2026-07-08T07_49_03_690Z-debug-0.log
2026-07-08T07:49:04.5155097Z ##[error]Process completed with exit code 1.
2026-07-08T07:48:53.9930000Z Job is about to start running on the hosted runner: GitHub Actions 1000000948
2026-07-08T07:48:53.9820000Z Requested labels: ubuntu-latest
2026-07-08T07:48:53.9820000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-search-ui.yml@refs/pull/84/merge
2026-07-08T07:48:53.9820000Z Waiting for a runner to pick up this job...
2026-07-08T07:48:53.9800000Z Evaluating type-check.if
2026-07-08T07:48:53.9800000Z Evaluating: success()
2026-07-08T07:48:53.9800000Z Result: true
2026-07-08T07:48:53.9910000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.