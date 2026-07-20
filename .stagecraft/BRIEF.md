# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: Security & Compliance Audit (.github/workflows/compliance-security-audit.yml)

## Root cause (from automated analysis)

Three distinct failures are present in this Security & Compliance Audit run: (1) PRIMARY/BLOCKING — The 'Secrets Scan' job failed because TruffleHog detected 2 potential hardcoded secrets committed directly in the repository (exit code 1, 'TruffleHog findings: 2'). This is an application/repository-content problem — secrets must be removed from git history and rotated. (2) SAST scan — Snyk returned HTTP 401 'Authentication credentials not recognized' (SNYK-0005), meaning the SNYK_TOKEN secret is either not set, expired, or provisioned to a different org; the workflow references `secrets.SNYK_TOKEN` but the token is invalid. This is a pipeline/config problem. (3) SAST scan side-effect — Because the Snyk scan failed (no SARIF output produced), the subsequent `github/codeql-action/upload-sarif` step also failed with 'Path does not exist: snyk-ml.sarif', compounded by missing `security-events: write` permission on the GITHUB_TOKEN (only `contents: read`, `metadata: read`, `packages: read` are granted), which would block SARIF upload even if the file existed. Additionally, multiple `services/search/` package.json files contain a UTF-8 BOM character (﻿) making them invalid JSON, and several Go services failed scanning because `go` is not installed in the SAST job — but these are non-blocking due to `continue-on-error: true`.

## Why this is a code-level issue, not a pipeline config issue

The primary blocking failure is TruffleHog finding 2 hardcoded secrets committed into the repository's source content, which requires removing those secrets from git history and rotating the exposed credentials — not a workflow YAML change. The Snyk token misconfiguration and missing `security-events: write` permission are secondary pipeline-level issues also requiring fixes.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
07-20T05:44:37.9631312Z [36;1mecho "TruffleHog findings: $SECRETS_FOUND"[0m
2026-07-20T05:44:37.9631841Z [36;1mif [ "$SECRETS_FOUND" -gt 0 ]; then[0m
2026-07-20T05:44:37.9632485Z [36;1m  echo "::error::TruffleHog detected potential secrets in the repository"[0m
2026-07-20T05:44:37.9633116Z [36;1m  exit 1[0m
2026-07-20T05:44:37.9633471Z [36;1mfi[0m
2026-07-20T05:44:37.9702551Z shell: /usr/bin/bash -e {0}
2026-07-20T05:44:37.9703037Z ##[endgroup]
2026-07-20T05:44:46.6718091Z TruffleHog findings: 2
2026-07-20T05:44:46.6733797Z ##[error]TruffleHog detected potential secrets in the repository
2026-07-20T05:44:46.6745009Z ##[error]Process completed with exit code 1.
﻿2026-07-20T05:44:46.6813084Z Node 20 is being deprecated. This workflow is running with Node 24 by default. If you need to temporarily use Node 20, you can set the ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
2026-07-20T05:44:46.6814715Z ##[group]Run actions/upload-artifact@v4
2026-07-20T05:44:46.6814973Z with:
2026-07-20T05:44:46.6815180Z   name: secrets-scan-results
2026-07-20T05:44:46.6815454Z   path: trufflehog-results.json
gitleaks-report.json

2026-07-20T05:44:46.6815749Z   retention-days: 30
2026-07-20T05:44:46.6815960Z   if-no-files-found: warn
2026-07-20T05:44:46.6816187Z   compression-level: 6
2026-07-20T05:44:46.6816394Z   overwrite: false
2026-07-20T05:44:46.6816600Z   include-hidden-files: false
2026-07-20T05:44:46.6816831Z ##[endgroup]
2026-07-20T05:44:46.8166271Z (node:2270) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
2026-07-20T05:44:46.8167510Z (Use `node --trace-deprecation ...` to show where the warning was created)
2026-07-20T05:44:46.8228237Z Multiple search paths detected. Calculating the least common ancestor of all paths
2026-07-20T05:44:46.8232563Z The least common ancestor is /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo. This will be the root directory of the artifact
2026-07-20T05:44:46.8233913Z With the provided path, there will be 1 file uploaded
2026-07-20T05:44:46.8234892Z Artifact name is valid!
2026-07-20T05:44:46.8235287Z Root directory input is valid!
2026-07-20T05:44:47.0010978Z Beginning upload of artifact content to blob storage
2026-07-20T05:44:47.0154256Z (node:2270) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2026-07-20T05:44:47.1170637Z Uploaded bytes 620
2026-07-20T05:44:47.1509420Z Finished uploading artifact content to blob storage!
2026-07-20T05:44:47.1510236Z SHA256 digest of uploaded artifact zip is 486536336b9bcd0f7f70e1106c367be419e2668c6c2f5ac78820f49f0a324220
2026-07-20T05:44:47.1511899Z Finalizing artifact upload
2026-07-20T05:44:47.3153280Z Artifact secrets-scan-results.zip successfully finalized. Artifact ID 8451932406
2026-07-20T05:44:47.3153999Z Artifact secrets-scan-results has been successfully uploaded! Final size is 620 bytes. Artifact ID is 8451932406
2026-07-20T05:44:47.3159167Z Artifact download URL: https://github.com/StagecraftOps/pace-stagecraft-monorepo/actions/runs/29719835043/artifacts/8451932406
2026-07-20T05:44:34.6510000Z Evaluating secrets-scan.if
2026-07-20T05:44:34.6510000Z Evaluating: success()
2026-07-20T05:44:34.6510000Z Result: true
2026-07-20T05:44:34.6530000Z Requested labels: ubuntu-latest
2026-07-20T05:44:34.6530000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/compliance-security-audit.yml@refs/heads/main
2026-07-20T05:44:34.6530000Z Waiting for a runner to pick up this job...
2026-07-20T05:44:34.9940000Z Job is waiting for a hosted runner to come online.
2026-07-20T05:44:34.9940000Z Job is about to start running on the hosted runner: GitHub Actions 1000001862
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.