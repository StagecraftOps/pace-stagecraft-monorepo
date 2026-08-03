# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: Security & Compliance Audit (.github/workflows/compliance-security-audit.yml)

## Root cause (from automated analysis)

Three distinct but compounding failures are present in the sast-full-scan and secrets-scan jobs. (1) PRIMARY / BLOCKING — TruffleHog detected 2 potential secrets committed directly in the repository (exit code 1, `TruffleHog findings: 2`), causing the Secrets Scan job to hard-fail. This is a repository-content problem: real credential-like strings are present in tracked files. (2) SECONDARY — The Snyk SAST scan fails with HTTP 401 SNYK-0005 'Authentication credentials not recognized', meaning the `SNYK_TOKEN` secret is either not set, expired, or not provisioned for this repository/org. The workflow references `secrets.SNYK_TOKEN` but the token is rejected at runtime — this is a pipeline-level secret configuration issue. (3) TERTIARY — Snyk also reports 359/362 projects failed dependency resolution: multiple `package.json` files under `services/search/` are corrupted with a UTF-8 BOM (`﻿{`) making them invalid JSON, several `requirements.txt` files report 'Missing required packages', and Go services are skipped because the `go` binary is not available in the Snyk action container (no `setup-go` step precedes the Snyk scan). The SARIF upload then fails because `snyk-ml.sarif` was never produced, and the job lacks `security-events: write` permission needed by `codeql-action/upload-sarif`. In summary: the blocking root cause is leaked secrets in repo content; secondary is a misconfigured/absent SNYK_TOKEN secret; tertiary issues are BOM-corrupted package.json files in source and missing `security-events: write` permission in the workflow.

## Why this is a code-level issue, not a pipeline config issue

The primary hard-fail — TruffleHog finding 2 potential secrets — can only be remediated by removing or rotating the committed credentials from the repository's source/history; the BOM corruption in multiple `services/search/*/package.json` files is also a repository-content defect requiring file fixes, not a workflow YAML change. The expired/invalid SNYK_TOKEN and the missing `security-events: write` permission are pipeline-level fixes, but they are secondary to the credential exposure which is the critical blocking issue.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
08-03T05:47:48.0450743Z [36;1mecho "TruffleHog findings: $SECRETS_FOUND"[0m
2026-08-03T05:47:48.0452018Z [36;1mif [ "$SECRETS_FOUND" -gt 0 ]; then[0m
2026-08-03T05:47:48.0453874Z [36;1m  echo "::error::TruffleHog detected potential secrets in the repository"[0m
2026-08-03T05:47:48.0455458Z [36;1m  exit 1[0m
2026-08-03T05:47:48.0456247Z [36;1mfi[0m
2026-08-03T05:47:48.0505424Z shell: /usr/bin/bash -e {0}
2026-08-03T05:47:48.0506415Z ##[endgroup]
2026-08-03T05:47:55.5017704Z TruffleHog findings: 2
2026-08-03T05:47:55.5037474Z ##[error]TruffleHog detected potential secrets in the repository
2026-08-03T05:47:55.5050580Z ##[error]Process completed with exit code 1.
﻿2026-08-03T05:47:55.5139305Z Node 20 is being deprecated. This workflow is running with Node 24 by default. If you need to temporarily use Node 20, you can set the ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
2026-08-03T05:47:55.5141097Z ##[group]Run actions/upload-artifact@v4
2026-08-03T05:47:55.5141439Z with:
2026-08-03T05:47:55.5141696Z   name: secrets-scan-results
2026-08-03T05:47:55.5142051Z   path: trufflehog-results.json
gitleaks-report.json

2026-08-03T05:47:55.5142441Z   retention-days: 30
2026-08-03T05:47:55.5142709Z   if-no-files-found: warn
2026-08-03T05:47:55.5142997Z   compression-level: 6
2026-08-03T05:47:55.5143260Z   overwrite: false
2026-08-03T05:47:55.5207631Z   include-hidden-files: false
2026-08-03T05:47:55.5208059Z ##[endgroup]
2026-08-03T05:47:55.6823628Z (node:2391) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
2026-08-03T05:47:55.6824668Z (Use `node --trace-deprecation ...` to show where the warning was created)
2026-08-03T05:47:55.6894051Z Multiple search paths detected. Calculating the least common ancestor of all paths
2026-08-03T05:47:55.6896498Z The least common ancestor is /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo. This will be the root directory of the artifact
2026-08-03T05:47:55.6897919Z With the provided path, there will be 1 file uploaded
2026-08-03T05:47:55.6898904Z Artifact name is valid!
2026-08-03T05:47:55.6899407Z Root directory input is valid!
2026-08-03T05:47:56.0263312Z Beginning upload of artifact content to blob storage
2026-08-03T05:47:56.0448696Z (node:2391) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2026-08-03T05:47:56.3385682Z Uploaded bytes 620
2026-08-03T05:47:56.4201186Z Finished uploading artifact content to blob storage!
2026-08-03T05:47:56.4202589Z SHA256 digest of uploaded artifact zip is c4241f2980fe7644baad65446d7502a70bf4dbfe816d81f8cb922f9532a57364
2026-08-03T05:47:56.4204185Z Finalizing artifact upload
2026-08-03T05:47:56.6302112Z Artifact secrets-scan-results.zip successfully finalized. Artifact ID 8846012538
2026-08-03T05:47:56.6303731Z Artifact secrets-scan-results has been successfully uploaded! Final size is 620 bytes. Artifact ID is 8846012538
2026-08-03T05:47:56.6310182Z Artifact download URL: https://github.com/StagecraftOps/pace-stagecraft-monorepo/actions/runs/30788164668/artifacts/8846012538
2026-08-03T05:47:41.9690000Z Job is waiting for a hosted runner to come online.
2026-08-03T05:47:41.9690000Z Job is about to start running on the hosted runner: GitHub Actions 1000002179
2026-08-03T05:47:41.9610000Z Evaluating secrets-scan.if
2026-08-03T05:47:41.9610000Z Evaluating: success()
2026-08-03T05:47:41.9610000Z Result: true
2026-08-03T05:47:41.9660000Z Requested labels: ubuntu-latest
2026-08-03T05:47:41.9660000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/compliance-security-audit.yml@refs/heads/main
2026-08-03T05:47:41.9660000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.