# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI — search-ui (.github/workflows/ci-search-ui.yml)

## Root cause (from automated analysis)

The `npm ci` command fails with error code EUSAGE in every job (lint, type-check, and downstream jobs) because `services/frontend/search-ui/package-lock.json` does not exist in the repository at commit ae027e6f7c87f25c99c6fb32bb3772b9021887f7. This is confirmed by two independent signals: (1) npm explicitly errors with 'The `npm ci` command can only install with an existing package-lock.json or npm-shrinkwrap.json with lockfileVersion >= 1'; and (2) the cache key degrades to a bare `Linux-node-search-ui-` suffix (no hash appended) because `hashFiles('services/frontend/search-ui/package-lock.json')` returns an empty string when the file is absent — a hallmark telltale of the missing lockfile pattern. The `package-lock.json` must be committed to `services/frontend/search-ui/` in the repository.

## Why this is a code-level issue, not a pipeline config issue

The `package-lock.json` file is missing from the repository's `services/frontend/search-ui/` directory; it must be generated via `npm install` and committed to source control — no workflow YAML change can compensate for an absent lockfile that `npm ci` requires.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
7:49:00.7396964Z Node 20 is being deprecated. This workflow is running with Node 24 by default. If you need to temporarily use Node 20, you can set the ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
2026-07-08T07:49:00.7398342Z ##[group]Run actions/cache@v4
2026-07-08T07:49:00.7398582Z with:
2026-07-08T07:49:00.7398771Z   path: ~/.npm
2026-07-08T07:49:00.7398978Z   key: Linux-node-search-ui-
2026-07-08T07:49:00.7399236Z   restore-keys: Linux-node-search-ui-
2026-07-08T07:49:00.7399548Z   enableCrossOsArchive: false
2026-07-08T07:49:00.7399799Z   fail-on-cache-miss: false
2026-07-08T07:49:00.7400030Z   lookup-only: false
2026-07-08T07:49:00.7400236Z   save-always: false
2026-07-08T07:49:00.7400451Z ##[endgroup]
2026-07-08T07:49:00.8505566Z (node:2354) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
2026-07-08T07:49:00.8507468Z (Use `node --trace-deprecation ...` to show where the warning was created)
2026-07-08T07:49:01.1320779Z Cache not found for input keys: Linux-node-search-ui-, Linux-node-search-ui-
﻿2026-07-08T07:49:01.1458813Z ##[group]Run npm ci
2026-07-08T07:49:01.1459125Z [36;1mnpm ci[0m
2026-07-08T07:49:01.1621371Z shell: /usr/bin/bash -e {0}
2026-07-08T07:49:01.1621686Z ##[endgroup]
2026-07-08T07:49:02.0464765Z npm error code EUSAGE
2026-07-08T07:49:02.0466369Z npm error
2026-07-08T07:49:02.0467271Z npm error The `npm ci` command can only install with an existing package-lock.json or
2026-07-08T07:49:02.0468183Z npm error npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or
2026-07-08T07:49:02.0468958Z npm error later to generate a package-lock.json file, then try again.
2026-07-08T07:49:02.0469426Z npm error
2026-07-08T07:49:02.0469741Z npm error Clean install a project
2026-07-08T07:49:02.0470070Z npm error
2026-07-08T07:49:02.0470354Z npm error Usage:
2026-07-08T07:49:02.0471035Z npm error npm ci
2026-07-08T07:49:02.0471280Z npm error
2026-07-08T07:49:02.0471535Z npm error Options:
2026-07-08T07:49:02.0472083Z npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
2026-07-08T07:49:02.0473069Z npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
2026-07-08T07:49:02.0473744Z npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
2026-07-08T07:49:02.0474419Z npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
2026-07-08T07:49:02.0474928Z npm error [--no-bin-links] [--no-fund] [--dry-run]
2026-07-08T07:49:02.0475449Z npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
2026-07-08T07:49:02.0476039Z npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
2026-07-08T07:49:02.0476405Z npm error
2026-07-08T07:49:02.0476783Z npm error aliases: clean-install, ic, install-clean, isntall-clean
2026-07-08T07:49:02.0477144Z npm error
2026-07-08T07:49:02.0477402Z npm error Run "npm help ci" for more info
2026-07-08T07:49:02.0481592Z npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2026-07-08T07_49_01_230Z-debug-0.log
2026-07-08T07:49:02.0559545Z ##[error]Process completed with exit code 1.
2026-07-08T07:48:51.9200000Z Job is about to start running on the hosted runner: GitHub Actions 1000000942
2026-07-08T07:48:51.9090000Z Evaluating type-check.if
2026-07-08T07:48:51.9090000Z Evaluating: success()
2026-07-08T07:48:51.9090000Z Result: true
2026-07-08T07:48:51.9110000Z Requested labels: ubuntu-latest
2026-07-08T07:48:51.9110000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-search-ui.yml@refs/heads/stagecraft/test-code-level-bug
2026-07-08T07:48:51.9110000Z Waiting for a runner to pick up this job...
2026-07-08T07:48:51.9190000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.