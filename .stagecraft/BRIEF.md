# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: Security & Compliance Audit (.github/workflows/compliance-security-audit.yml)

## Root cause (from automated analysis)

The sast-full-scan job runs Snyk with --all-projects across the entire monorepo but the workflow never installs the Go toolchain (no actions/setup-go step) before Snyk attempts to scan go.mod files, causing all Go-service scans to fail with 'The "go" command is not available on your system.' Additionally, multiple package.json files under services/search/* are saved with a UTF-8 BOM (U+FEFF byte-order mark), making them invalid JSON that Snyk cannot parse (Unexpected token '﻿'). A secondary issue is that several requirements.txt files are empty, triggering 'Missing required packages' errors. The Go toolchain absence is a workflow misconfiguration; the BOM-corrupted manifests and empty requirements files are repository-content defects.

## Why this is a code-level issue, not a pipeline config issue

The BOM-corrupted package.json files and empty requirements.txt files are repository-content defects that require fixing the files themselves, not the workflow YAML — though the missing Go setup step is a concurrent pipeline fix also needed.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
07-13T05:42:20.2500485Z [36;1mecho "TruffleHog findings: $SECRETS_FOUND"[0m
2026-07-13T05:42:20.2501967Z [36;1mif [ "$SECRETS_FOUND" -gt 0 ]; then[0m
2026-07-13T05:42:20.2504175Z [36;1m  echo "::error::TruffleHog detected potential secrets in the repository"[0m
2026-07-13T05:42:20.2506072Z [36;1m  exit 1[0m
2026-07-13T05:42:20.2506958Z [36;1mfi[0m
2026-07-13T05:42:20.2708243Z shell: /usr/bin/bash -e {0}
2026-07-13T05:42:20.2709352Z ##[endgroup]
2026-07-13T05:42:24.5248028Z TruffleHog findings: 2
2026-07-13T05:42:24.5270885Z ##[error]TruffleHog detected potential secrets in the repository
2026-07-13T05:42:24.5284098Z ##[error]Process completed with exit code 1.
﻿2026-07-13T05:42:24.5369033Z Node 20 is being deprecated. This workflow is running with Node 24 by default. If you need to temporarily use Node 20, you can set the ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
2026-07-13T05:42:24.5370753Z ##[group]Run actions/upload-artifact@v4
2026-07-13T05:42:24.5371077Z with:
2026-07-13T05:42:24.5371321Z   name: secrets-scan-results
2026-07-13T05:42:24.5371662Z   path: trufflehog-results.json
gitleaks-report.json

2026-07-13T05:42:24.5372039Z   retention-days: 30
2026-07-13T05:42:24.5372296Z   if-no-files-found: warn
2026-07-13T05:42:24.5372577Z   compression-level: 6
2026-07-13T05:42:24.5373146Z   overwrite: false
2026-07-13T05:42:24.5373429Z   include-hidden-files: false
2026-07-13T05:42:24.5373714Z ##[endgroup]
2026-07-13T05:42:24.7063830Z (node:2406) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
2026-07-13T05:42:24.7065571Z (Use `node --trace-deprecation ...` to show where the warning was created)
2026-07-13T05:42:24.7117444Z Multiple search paths detected. Calculating the least common ancestor of all paths
2026-07-13T05:42:24.7122197Z The least common ancestor is /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo. This will be the root directory of the artifact
2026-07-13T05:42:24.7124588Z With the provided path, there will be 1 file uploaded
2026-07-13T05:42:24.7127615Z Artifact name is valid!
2026-07-13T05:42:24.7128910Z Root directory input is valid!
2026-07-13T05:42:24.9012234Z Beginning upload of artifact content to blob storage
2026-07-13T05:42:24.9200468Z (node:2406) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2026-07-13T05:42:25.0041397Z Uploaded bytes 620
2026-07-13T05:42:25.0331832Z Finished uploading artifact content to blob storage!
2026-07-13T05:42:25.0333401Z SHA256 digest of uploaded artifact zip is 7761d62066868641e13458c4929902998ca5b18a0081a6631b4313813894af71
2026-07-13T05:42:25.0335016Z Finalizing artifact upload
2026-07-13T05:42:25.1976772Z Artifact secrets-scan-results.zip successfully finalized. Artifact ID 8270091293
2026-07-13T05:42:25.1978846Z Artifact secrets-scan-results has been successfully uploaded! Final size is 620 bytes. Artifact ID is 8270091293
2026-07-13T05:42:25.1986426Z Artifact download URL: https://github.com/StagecraftOps/pace-stagecraft-monorepo/actions/runs/29226961822/artifacts/8270091293
2026-07-13T05:42:16.6330000Z Evaluating secrets-scan.if
2026-07-13T05:42:16.6330000Z Evaluating: success()
2026-07-13T05:42:16.6330000Z Result: true
2026-07-13T05:42:16.6410000Z Job is about to start running on the hosted runner: GitHub Actions 1000001342
2026-07-13T05:42:16.6410000Z Job is waiting for a hosted runner to come online.
2026-07-13T05:42:16.6350000Z Requested labels: ubuntu-latest
2026-07-13T05:42:16.6350000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/compliance-security-audit.yml@refs/heads/main
2026-07-13T05:42:16.6350000Z Waiting for a runner to pick up this job...
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.