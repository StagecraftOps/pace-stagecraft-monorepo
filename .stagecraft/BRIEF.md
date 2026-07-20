# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: PR — Validation (.github/workflows/pr-validation.yml)

## Root cause (from automated analysis)

The `lint-shared` job fails because `actions/setup-node@v7` with `cache: "npm"` cannot find a dependency lock file (package-lock.json, npm-shrinkwrap.json, or yarn.lock) at the repository root. The runner emits: 'Dependencies lock file is not found in /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo.' The root-level lock file is missing from the repository, which would also cause the subsequent `npm ci` step to fail.

## Why this is a code-level issue, not a pipeline config issue

The lock file (package-lock.json or equivalent) is absent from the repository root — it must be created and committed to the repo, not fixed by altering the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
26-07-20T16:28:20.5220197Z ##[endgroup]
2026-07-20T16:28:20.5225846Z [command]/usr/bin/git sparse-checkout disable
2026-07-20T16:28:20.5286890Z [command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
2026-07-20T16:28:20.5327457Z ##[group]Checking out the ref
2026-07-20T16:28:20.5331181Z [command]/usr/bin/git checkout --progress --force refs/remotes/pull/36/merge
2026-07-20T16:28:20.6223572Z Note: switching to 'refs/remotes/pull/36/merge'.
2026-07-20T16:28:20.6225354Z 
2026-07-20T16:28:20.6227078Z You are in 'detached HEAD' state. You can look around, make experimental
2026-07-20T16:28:20.6229437Z changes and commit them, and you can discard any commits you make in this
2026-07-20T16:28:20.6231285Z state without impacting any branches by switching back to a branch.
2026-07-20T16:28:20.6232447Z 
2026-07-20T16:28:20.6233306Z If you want to create a new branch to retain commits you create, you may
2026-07-20T16:28:20.6235212Z do so (now or later) by using -c with the switch command. Example:
2026-07-20T16:28:20.6236571Z 
2026-07-20T16:28:20.6237150Z   git switch -c <new-branch-name>
2026-07-20T16:28:20.6238092Z 
2026-07-20T16:28:20.6238573Z Or undo this operation with:
2026-07-20T16:28:20.6239366Z 
2026-07-20T16:28:20.6239808Z   git switch -
2026-07-20T16:28:20.6240387Z 
2026-07-20T16:28:20.6241408Z Turn off this advice by setting config variable advice.detachedHead to false
2026-07-20T16:28:20.6242889Z 
2026-07-20T16:28:20.6244517Z HEAD is now at 06678b4 Merge 9da0b103871ccb737ad63e31709a816b8e0ec0a3 into fb19941e67e77c987874adf954adb322610675ff
2026-07-20T16:28:20.6250252Z ##[endgroup]
2026-07-20T16:28:20.6291662Z [command]/usr/bin/git log -1 --format=%H
2026-07-20T16:28:20.6327133Z 06678b4deceda863c9791dcf1b4ee2d7706bbd8e
﻿2026-07-20T16:28:20.6708632Z ##[group]Run actions/setup-node@v7
2026-07-20T16:28:20.6710083Z with:
2026-07-20T16:28:20.6711145Z   node-version: 20
2026-07-20T16:28:20.6712262Z   cache: npm
2026-07-20T16:28:20.6713352Z   check-latest: false
2026-07-20T16:28:20.6723019Z   [SECRET_REDACTED]
2026-07-20T16:28:20.6724101Z   package-manager-cache: true
2026-07-20T16:28:20.6725351Z env:
2026-07-20T16:28:20.6726518Z   NODE_VERSION: 20
2026-07-20T16:28:20.6727597Z ##[endgroup]
2026-07-20T16:28:20.8398352Z Attempting to download 20...
2026-07-20T16:28:21.1772961Z Acquiring 20.20.2 - x64 from https://github.com/actions/node-versions/releases/download/20.20.2-23521894959/node-20.20.2-linux-x64.tar.gz
2026-07-20T16:28:21.5695281Z Extracting ...
2026-07-20T16:28:21.5823116Z [command]/usr/bin/tar xz --strip 1 --warning=no-unknown-keyword --overwrite -C /home/runner/work/_temp/bdb1af33-5747-4156-af95-ff93c82c1d65 -f /home/runner/work/_temp/883d91b6-5b29-4bb2-a758-6a781b7324dd
2026-07-20T16:28:22.6693309Z Adding to the cache ...
2026-07-20T16:28:24.2124675Z ##[group]Environment details
2026-07-20T16:28:24.5540926Z node: v20.20.2
2026-07-20T16:28:24.5541452Z npm: 10.8.2
2026-07-20T16:28:24.5541720Z yarn: 1.22.22
2026-07-20T16:28:24.5542473Z ##[endgroup]
2026-07-20T16:28:24.5558712Z [command]/opt/hostedtoolcache/node/20.20.2/x64/bin/npm config get cache
2026-07-20T16:28:24.6641581Z /home/runner/.npm
2026-07-20T16:28:24.6719153Z ##[error]Dependencies lock file is not found in /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo. Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
2026-07-20T16:28:16.7390000Z Evaluating lint-shared.if
2026-07-20T16:28:16.7390000Z Evaluating: success()
2026-07-20T16:28:16.7390000Z Result: true
2026-07-20T16:28:16.7400000Z Requested labels: ubuntu-latest
2026-07-20T16:28:16.7400000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/pr-validation.yml@refs/pull/36/merge
2026-07-20T16:28:16.7400000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:17.0940000Z Job is waiting for a hosted runner to come online.
2026-07-20T16:28:17.0930000Z Job is about to start running on the hosted runner: GitHub Actions 1000001888
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.