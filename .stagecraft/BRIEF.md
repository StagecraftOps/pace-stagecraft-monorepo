# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: Security & Compliance Audit (.github/workflows/compliance-security-audit.yml)

## Root cause (from automated analysis)

The 'Secrets Scan' job is the hard-blocking failure: TruffleHog detected 1 potential secret committed directly in the repository (exit code 1, `##[error]TruffleHog detected potential secrets in the repository`). This is a repository content issue — a credential, token, or key-like string exists in a tracked file. The SAST scan job has two additional compounding problems: (1) the `SNYK_TOKEN` secret is either missing, revoked, or mis-named in the repository's Actions secrets, causing Snyk to return HTTP 401 `SNYK_-0005` authentication failure, which means no SARIF output file is produced and the subsequent `github/codeql-action/upload-sarif` step fails with `Path does not exist: snyk-ml.sarif`; (2) the `sast-full-scan` job runs `snyk/actions/python@master` with `--all-projects` but never installs Go via `actions/setup-go`, so all Go modules under `services/search/` fail with 'The go command is not available'; and (3) multiple `package.json` files under `services/search/` contain a UTF-8 BOM character (`\xEF\xBB\xBF`) making them unparseable as JSON by Snyk. The BOM-corrupted JSON files and missing Go setup are repository/pipeline content problems respectively, but the primary hard failure causing the run to stop is the committed secret detected by TruffleHog, which is a repository content problem, combined with the invalid/missing SNYK_TOKEN secret which is a pipeline configuration problem.

## Why this is a code-level issue, not a pipeline config issue

The blocking TruffleHog failure requires removing a committed secret from repository history/content, and the BOM-corrupted package.json files require fixing source files in the repo — neither is addressable by editing the workflow YAML alone; however the missing SNYK_TOKEN secret and absent `actions/setup-go` step are also co-present pipeline-level issues that must be fixed in the workflow.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
08-10T04:00:26.1579662Z [36;1mecho "TruffleHog findings: $SECRETS_FOUND"[0m
2026-08-10T04:00:26.1581094Z [36;1mif [ "$SECRETS_FOUND" -gt 0 ]; then[0m
2026-08-10T04:00:26.1582826Z [36;1m  echo "::error::TruffleHog detected potential secrets in the repository"[0m
2026-08-10T04:00:26.1584489Z [36;1m  exit 1[0m
2026-08-10T04:00:26.1585504Z [36;1mfi[0m
2026-08-10T04:00:26.1621290Z shell: /usr/bin/bash -e {0}
2026-08-10T04:00:26.1622499Z ##[endgroup]
2026-08-10T04:00:31.8793548Z TruffleHog findings: 1
2026-08-10T04:00:31.8813469Z ##[error]TruffleHog detected potential secrets in the repository
2026-08-10T04:00:31.8823960Z ##[error]Process completed with exit code 1.
﻿2026-08-10T04:00:31.8904026Z Node 20 is being deprecated. This workflow is running with Node 24 by default. If you need to temporarily use Node 20, you can set the ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
2026-08-10T04:00:31.8905667Z ##[group]Run actions/upload-artifact@v4
2026-08-10T04:00:31.8906018Z with:
2026-08-10T04:00:31.8906323Z   name: secrets-scan-results
2026-08-10T04:00:31.8906730Z   path: trufflehog-results.json
gitleaks-report.json

2026-08-10T04:00:31.8907118Z   retention-days: 30
2026-08-10T04:00:31.8907843Z   if-no-files-found: warn
2026-08-10T04:00:31.8908187Z   compression-level: 6
2026-08-10T04:00:31.8908825Z   overwrite: false
2026-08-10T04:00:31.8909178Z   include-hidden-files: false
2026-08-10T04:00:31.8909497Z ##[endgroup]
2026-08-10T04:00:32.0351478Z (node:2212) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
2026-08-10T04:00:32.0352507Z (Use `node --trace-deprecation ...` to show where the warning was created)
2026-08-10T04:00:32.0394533Z Multiple search paths detected. Calculating the least common ancestor of all paths
2026-08-10T04:00:32.0399428Z The least common ancestor is /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo. This will be the root directory of the artifact
2026-08-10T04:00:32.0400730Z With the provided path, there will be 1 file uploaded
2026-08-10T04:00:32.0402121Z Artifact name is valid!
2026-08-10T04:00:32.0402653Z Root directory input is valid!
2026-08-10T04:00:32.3274378Z Beginning upload of artifact content to blob storage
2026-08-10T04:00:32.3419448Z (node:2212) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2026-08-10T04:00:32.5765260Z Uploaded bytes 581
2026-08-10T04:00:32.6403524Z Finished uploading artifact content to blob storage!
2026-08-10T04:00:32.6404607Z SHA256 digest of uploaded artifact zip is c63a632296910cd8c12169a78a0f07585ca10c9d3312b94b416c2cddeba332c6
2026-08-10T04:00:32.6413297Z Finalizing artifact upload
2026-08-10T04:00:32.8648780Z Artifact secrets-scan-results.zip successfully finalized. Artifact ID 9050032653
2026-08-10T04:00:32.8649904Z Artifact secrets-scan-results has been successfully uploaded! Final size is 581 bytes. Artifact ID is 9050032653
2026-08-10T04:00:32.8659825Z Artifact download URL: https://github.com/StagecraftOps/pace-stagecraft-monorepo/actions/runs/31354180492/artifacts/9050032653
2026-08-10T04:00:21.3150000Z Evaluating secrets-scan.if
2026-08-10T04:00:21.3150000Z Evaluating: success()
2026-08-10T04:00:21.3150000Z Result: true
2026-08-10T04:00:21.3170000Z Requested labels: ubuntu-latest
2026-08-10T04:00:21.3170000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/compliance-security-audit.yml@refs/heads/main
2026-08-10T04:00:21.3170000Z Waiting for a runner to pick up this job...
2026-08-10T04:00:21.3380000Z Job is waiting for a hosted runner to come online.
2026-08-10T04:00:21.3390000Z Job is about to start running on the hosted runner: GitHub Actions 1000002692
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.