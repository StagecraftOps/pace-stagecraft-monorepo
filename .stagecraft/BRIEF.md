# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: PR — Validation (.github/workflows/pr-validation.yml)

## Root cause (from automated analysis)

The `lint-shared` job fails because `actions/setup-node@v7` with `cache: "npm"` cannot find a dependency lock file (package-lock.json, npm-shrinkwrap.json, or yarn.lock) at the repository root. The error is: 'Dependencies lock file is not found in /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo.' This prevents the job from completing, which in turn causes the `pr-gate` required status check to fail.

## Why this is a code-level issue, not a pipeline config issue

The repository root is missing a committed npm lock file (package-lock.json or equivalent), which is a repository content problem that must be fixed by running `npm install` and committing the resulting lock file, not by editing the workflow YAML.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
sr/bin/git config --local --unset-all extensions.worktreeConfig
2026-07-27T16:27:23.4996154Z ##[group]Checking out the ref
2026-07-27T16:27:23.4997892Z [command]/usr/bin/git checkout --progress --force refs/remotes/pull/36/merge
2026-07-27T16:27:23.5351871Z Note: switching to 'refs/remotes/pull/36/merge'.
2026-07-27T16:27:23.5352494Z 
2026-07-27T16:27:23.5352784Z You are in 'detached HEAD' state. You can look around, make experimental
2026-07-27T16:27:23.5354081Z changes and commit them, and you can discard any commits you make in this
2026-07-27T16:27:23.5354866Z state without impacting any branches by switching back to a branch.
2026-07-27T16:27:23.5362211Z 
2026-07-27T16:27:23.5363208Z If you want to create a new branch to retain commits you create, you may
2026-07-27T16:27:23.5363891Z do so (now or later) by using -c with the switch command. Example:
2026-07-27T16:27:23.5364296Z 
2026-07-27T16:27:23.5364734Z   git switch -c <new-branch-name>
2026-07-27T16:27:23.5365087Z 
2026-07-27T16:27:23.5365493Z Or undo this operation with:
2026-07-27T16:27:23.5365724Z 
2026-07-27T16:27:23.5365936Z   git switch -
2026-07-27T16:27:23.5366162Z 
2026-07-27T16:27:23.5366402Z Turn off this advice by setting config variable advice.detachedHead to false
2026-07-27T16:27:23.5366746Z 
2026-07-27T16:27:23.5367055Z HEAD is now at 0a1264b Merge f6c7b25958cf37e7060ebdb8c7676796b9e6ff0d into 46d340685b0c99494c98c26afcd3ea69d7313357
2026-07-27T16:27:23.5368453Z ##[endgroup]
2026-07-27T16:27:23.5394193Z [command]/usr/bin/git log -1 --format=%H
2026-07-27T16:27:23.5415141Z 0a1264bb06c5166e8711d59940d0eabe89d17ce2
﻿2026-07-27T16:27:23.5669223Z ##[group]Run actions/setup-node@v7
2026-07-27T16:27:23.5669550Z with:
2026-07-27T16:27:23.5669828Z   node-version: 20
2026-07-27T16:27:23.5670085Z   cache: npm
2026-07-27T16:27:23.5670319Z   check-latest: false
2026-07-27T16:27:23.5672381Z   [SECRET_REDACTED]
2026-07-27T16:27:23.5672673Z   package-manager-cache: true
2026-07-27T16:27:23.5672988Z env:
2026-07-27T16:27:23.5673228Z   NODE_VERSION: 20
2026-07-27T16:27:23.5673462Z ##[endgroup]
2026-07-27T16:27:23.6716797Z Attempting to download 20...
2026-07-27T16:27:24.6366418Z Acquiring 20.20.2 - x64 from https://github.com/actions/node-versions/releases/download/20.20.2-23521894959/node-20.20.2-linux-x64.tar.gz
2026-07-27T16:27:25.1657732Z Extracting ...
2026-07-27T16:27:25.1745943Z [command]/usr/bin/tar xz --strip 1 --warning=no-unknown-keyword --overwrite -C /home/runner/work/_temp/10eadc68-7721-4f92-a77f-3d88480245b6 -f /home/runner/work/_temp/27bb2e2b-159d-4c3b-8a73-4539b6633629
2026-07-27T16:27:26.1020756Z Adding to the cache ...
2026-07-27T16:27:27.7337290Z ##[group]Environment details
2026-07-27T16:27:27.9113516Z node: v20.20.2
2026-07-27T16:27:27.9113898Z npm: 10.8.2
2026-07-27T16:27:27.9114226Z yarn: 1.22.22
2026-07-27T16:27:27.9115004Z ##[endgroup]
2026-07-27T16:27:27.9128175Z [command]/opt/hostedtoolcache/node/20.20.2/x64/bin/npm config get cache
2026-07-27T16:27:27.9971835Z /home/runner/.npm
2026-07-27T16:27:28.0058318Z ##[error]Dependencies lock file is not found in /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo. Supported file patterns: package-lock.json,npm-shrinkwrap.json,yarn.lock
2026-07-27T16:27:01.0020000Z Evaluating lint-shared.if
2026-07-27T16:27:01.0020000Z Evaluating: success()
2026-07-27T16:27:01.0020000Z Result: true
2026-07-27T16:27:01.0040000Z Requested labels: ubuntu-latest
2026-07-27T16:27:01.0040000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/pr-validation.yml@refs/pull/36/merge
2026-07-27T16:27:01.0040000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:01.4330000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:11.5300000Z Job is waiting for a hosted runner to come online.
2026-07-27T16:27:11.5300000Z Job is about to start running on the hosted runner: GitHub Actions 1000002074
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.