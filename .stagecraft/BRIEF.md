# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - MLS Ingestion Service (.github/workflows/ci-mls-ingestion.yml)

## Root cause (from automated analysis)

The validate-schema job fails with exit code 2 (FileNotFoundError) because the script `services/data/mls-ingestion/scripts/validate_schemas.py` does not exist in the repository at the PR merge commit (3e27482). Python cannot open the file, so the step exits immediately, blocking all downstream jobs (lint, test, docker-build, deploy-staging, security-scan).

## Why this is a code-level issue, not a pipeline config issue

The workflow YAML correctly sets `working-directory` and references the script by a valid relative path, but the file `scripts/validate_schemas.py` (and likely the entire `scripts/` directory) is simply missing from the repository content at this commit and must be added to the repo.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
41Z   Downloading referencing-0.37.0-py3-none-any.whl.metadata (2.8 kB)
2026-08-10T16:25:38.7316811Z Collecting rpds-py>=0.25.0 (from jsonschema)
2026-08-10T16:25:38.7393455Z   Downloading rpds_py-2026.6.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.1 kB)
2026-08-10T16:25:38.8351725Z Collecting typing-extensions>=4.4.0 (from referencing>=0.28.4->jsonschema)
2026-08-10T16:25:38.8427447Z   Downloading typing_extensions-4.16.0-py3-none-any.whl.metadata (3.3 kB)
2026-08-10T16:25:38.8540020Z Downloading jsonschema-4.26.0-py3-none-any.whl (90 kB)
2026-08-10T16:25:38.8726128Z Downloading pyyaml-6.0.3-cp311-cp311-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (806 kB)
2026-08-10T16:25:38.9016170Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 806.6/806.6 kB 34.3 MB/s  0:00:00
2026-08-10T16:25:38.9087714Z Downloading attrs-26.1.0-py3-none-any.whl (67 kB)
2026-08-10T16:25:38.9179174Z Downloading jsonschema_specifications-2025.9.1-py3-none-any.whl (18 kB)
2026-08-10T16:25:38.9271182Z Downloading referencing-0.37.0-py3-none-any.whl (26 kB)
2026-08-10T16:25:38.9364952Z Downloading rpds_py-2026.6.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (371 kB)
2026-08-10T16:25:38.9472428Z Downloading typing_extensions-4.16.0-py3-none-any.whl (45 kB)
2026-08-10T16:25:38.9849102Z Installing collected packages: typing-extensions, rpds-py, pyyaml, attrs, referencing, jsonschema-specifications, jsonschema
2026-08-10T16:25:39.2097468Z 
2026-08-10T16:25:39.2107786Z Successfully installed attrs-26.1.0 jsonschema-4.26.0 jsonschema-specifications-2025.9.1 pyyaml-6.0.3 referencing-0.37.0 rpds-py-2026.6.3 typing-extensions-4.16.0
2026-08-10T16:25:39.2115602Z 
2026-08-10T16:25:39.2115973Z [notice] A new release of pip is available: 26.1.2 -> 26.2.1
2026-08-10T16:25:39.2116454Z [notice] To update, run: pip install --upgrade pip
﻿2026-08-10T16:25:39.2648200Z ##[group]Run python scripts/validate_schemas.py --schema-dir schemas/
2026-08-10T16:25:39.2648799Z [36;1mpython scripts/validate_schemas.py --schema-dir schemas/[0m
2026-08-10T16:25:39.2693256Z shell: /usr/bin/bash -e {0}
2026-08-10T16:25:39.2693529Z env:
2026-08-10T16:25:39.2693775Z   SERVICE_DIR: services/data/mls-ingestion
2026-08-10T16:25:39.2694059Z   PYTHON_VERSION: 3.11
2026-08-10T16:25:39.2694281Z   IMAGE_NAME: mls-ingestion
2026-08-10T16:25:39.2694584Z   pythonLocation: /opt/hostedtoolcache/Python/3.11.15/x64
2026-08-10T16:25:39.2695040Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.11.15/x64/lib/pkgconfig
2026-08-10T16:25:39.2695470Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-08-10T16:25:39.2695856Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-08-10T16:25:39.2696244Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-08-10T16:25:39.2696637Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.11.15/x64/lib
2026-08-10T16:25:39.2696961Z ##[endgroup]
2026-08-10T16:25:39.2850069Z python: can't open file '/home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo/services/data/mls-ingestion/scripts/validate_schemas.py': [Errno 2] No such file or directory
2026-08-10T16:25:39.2880728Z ##[error]Process completed with exit code 2.
2026-08-10T16:25:31.5530000Z Evaluating validate-schema.if
2026-08-10T16:25:31.5530000Z Evaluating: success()
2026-08-10T16:25:31.5530000Z Result: true
2026-08-10T16:25:31.5560000Z Requested labels: ubuntu-latest
2026-08-10T16:25:31.5560000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-mls-ingestion.yml@refs/pull/36/merge
2026-08-10T16:25:31.5560000Z Waiting for a runner to pick up this job...
2026-08-10T16:25:32.1500000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-08-10T16:25:32.1590000Z Job is waiting for a hosted runner to come online.
2026-08-10T16:25:32.1590000Z Job is about to start running on the hosted runner: GitHub Actions 1000002734
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.