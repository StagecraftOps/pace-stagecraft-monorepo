# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: Security & Compliance Audit (.github/workflows/compliance-security-audit.yml)

## Root cause (from automated analysis)

Three compounding issues caused this Security & Compliance Audit run to fail, all rooted in repository/application content rather than the workflow YAML itself:

1. **TruffleHog secret detection (primary/blocking failure):** The `secrets-scan` job exited with code 1 because TruffleHog found 1 potential secret committed in the repository (`SECRETS_FOUND=1`). The workflow is correctly configured to fail-hard on any finding (`if [ "$SECRETS_FOUND" -gt 0 ]; then exit 1; fi`), so this is working as intended — a real secret (or high-confidence false positive) exists in the repo content.

2. **BOM-corrupted `package.json` files (application content):** Across the `services/search/` domain, at least 8 `package.json` files (elasticsearch-service, facet-service, query-builder-service, saved-search-alerts, school-search-service, search-analytics, search-indexer, synonym-service) are saved with a UTF-8 BOM (`\uFEFF`) prepended. This causes Snyk's JSON parser to fail with `Unexpected token '﻿'` — the BOM character is not valid at the start of JSON. These files need to be re-saved without the BOM.

3. **Missing `go` toolchain for Snyk (pipeline configuration):** The `sast-full-scan` job's `snyk/actions/python@master` and `snyk/actions/node@master` steps encounter Go `go.mod` files (e.g. `geo-search-service`, `typeahead-service`) but the workflow does not include a `actions/setup-go` step. Snyk reports `The "go" command is not available on your system` for those modules. The workflow needs a `uses: actions/setup-go` step added before the Snyk scan steps.

4. **Snyk 401 Authentication Error (pipeline configuration):** The Snyk scan fails with `SNYK-0005: Authentication credentials not recognized (401 Unauthorized)`, indicating that `secrets.SNYK_TOKEN` is either not set, expired, or not provisioned for this repository/org. The workflow YAML shows `SNYK_[SECRET_REDACTED]` which suggests the token expression may have been redacted/corrupted in the YAML itself, or the secret is genuinely missing from the repo's Actions secrets.

5. **Missing required Python packages in `requirements.txt` files:** Several Python services under `services/search/` (natural-language-search, search-personalization, semantic-search-service, spell-check-service) have `requirements.txt` files that Snyk reports as having `Missing required packages`, indicating empty or stub manifests.

6. **`security-events: write` permission missing:** The `github/codeql-action/upload-sarif@v3` step fails with `does not have permission to access the CodeQL Action API endpoints` because the workflow's `GITHUB_TOKEN` was only granted `contents: read, metadata: read, packages: read` — `security-events: write` is absent from the workflow's permissions block.

## Why this is a code-level issue, not a pipeline config issue

The primary blocking failure is a real secret detected by TruffleHog in committed repository content, which cannot be resolved by editing the workflow YAML — the secret must be removed/rotated from the repo's git history and source files; additionally, the BOM-corrupted package.json files and stub requirements.txt files are repository content defects requiring file-level fixes, though the missing `setup-go` step and absent `security-events: write` permission are genuine pipeline-level misconfigurations that should also be corrected.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
07-27T05:55:01.0185116Z [36;1mecho "TruffleHog findings: $SECRETS_FOUND"[0m
2026-07-27T05:55:01.0186399Z [36;1mif [ "$SECRETS_FOUND" -gt 0 ]; then[0m
2026-07-27T05:55:01.0187933Z [36;1m  echo "::error::TruffleHog detected potential secrets in the repository"[0m
2026-07-27T05:55:01.0189480Z [36;1m  exit 1[0m
2026-07-27T05:55:01.0190534Z [36;1mfi[0m
2026-07-27T05:55:01.0221587Z shell: /usr/bin/bash -e {0}
2026-07-27T05:55:01.0222614Z ##[endgroup]
2026-07-27T05:55:13.6620925Z TruffleHog findings: 1
2026-07-27T05:55:13.6637810Z ##[error]TruffleHog detected potential secrets in the repository
2026-07-27T05:55:13.6648594Z ##[error]Process completed with exit code 1.
﻿2026-07-27T05:55:13.6717557Z Node 20 is being deprecated. This workflow is running with Node 24 by default. If you need to temporarily use Node 20, you can set the ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true environment variable. For more information see: https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/
2026-07-27T05:55:13.6719319Z ##[group]Run actions/upload-artifact@v4
2026-07-27T05:55:13.6719801Z with:
2026-07-27T05:55:13.6720106Z   name: secrets-scan-results
2026-07-27T05:55:13.6720437Z   path: trufflehog-results.json
gitleaks-report.json

2026-07-27T05:55:13.6720777Z   retention-days: 30
2026-07-27T05:55:13.6721097Z   if-no-files-found: warn
2026-07-27T05:55:13.6721375Z   compression-level: 6
2026-07-27T05:55:13.6721635Z   overwrite: false
2026-07-27T05:55:13.6721906Z   include-hidden-files: false
2026-07-27T05:55:13.6722183Z ##[endgroup]
2026-07-27T05:55:13.8111058Z (node:2202) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
2026-07-27T05:55:13.8111858Z (Use `node --trace-deprecation ...` to show where the warning was created)
2026-07-27T05:55:13.8160229Z Multiple search paths detected. Calculating the least common ancestor of all paths
2026-07-27T05:55:13.8179551Z The least common ancestor is /home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo. This will be the root directory of the artifact
2026-07-27T05:55:13.8181051Z With the provided path, there will be 1 file uploaded
2026-07-27T05:55:13.8182214Z Artifact name is valid!
2026-07-27T05:55:13.8182753Z Root directory input is valid!
2026-07-27T05:55:14.0883662Z Beginning upload of artifact content to blob storage
2026-07-27T05:55:14.1027188Z (node:2202) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
2026-07-27T05:55:14.3423477Z Uploaded bytes 581
2026-07-27T05:55:14.4044736Z Finished uploading artifact content to blob storage!
2026-07-27T05:55:14.4045474Z SHA256 digest of uploaded artifact zip is 46b347527b6f89484224348f63454c7e984e3f380654e90899cb808bda9bb1ab
2026-07-27T05:55:14.4047923Z Finalizing artifact upload
2026-07-27T05:55:14.6000695Z Artifact secrets-scan-results.zip successfully finalized. Artifact ID 8643281094
2026-07-27T05:55:14.6001804Z Artifact secrets-scan-results has been successfully uploaded! Final size is 581 bytes. Artifact ID is 8643281094
2026-07-27T05:55:14.6003182Z Artifact download URL: https://github.com/StagecraftOps/pace-stagecraft-monorepo/actions/runs/30241100159/artifacts/8643281094
2026-07-27T05:54:53.8350000Z Requested labels: ubuntu-latest
2026-07-27T05:54:53.8350000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/compliance-security-audit.yml@refs/heads/main
2026-07-27T05:54:53.8350000Z Waiting for a runner to pick up this job...
2026-07-27T05:54:53.8260000Z Evaluating secrets-scan.if
2026-07-27T05:54:53.8260000Z Evaluating: success()
2026-07-27T05:54:53.8260000Z Result: true
2026-07-27T05:54:54.3230000Z Job is waiting for a hosted runner to come online.
2026-07-27T05:54:54.3230000Z Job is about to start running on the hosted runner: GitHub Actions 1000002029
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.