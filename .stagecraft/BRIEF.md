# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - MLS Ingestion Service (.github/workflows/ci-mls-ingestion.yml)

## Root cause (from automated analysis)

The `validate-schema` job fails at the 'Validate MLS feed schemas' step with exit code 2 because the script file does not exist at the expected path. Specifically, Python reports: `can't open file '/home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo/services/data/mls-ingestion/scripts/validate_schemas.py': [Errno 2] No such file or directory`. The `working-directory` is correctly set to `services/data/mls-ingestion`, but the file `scripts/validate_schemas.py` (and very likely the accompanying `schemas/` directory, `scripts/validate_rets_config.py`, `config/rets_feeds.yml`, and potentially `src/` and `requirements*.txt`) are simply absent from the repository at this commit. This cascades to block all downstream jobs (lint, test, docker-build, deploy-staging, security-scan).

## Why this is a code-level issue, not a pipeline config issue

The missing file `services/data/mls-ingestion/scripts/validate_schemas.py` (and likely the entire service directory scaffold) must be added to the repository source tree — no change to the workflow YAML will resolve a genuinely absent file.

Failure category: UNKNOWN

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
:20.6045885Z   Downloading jsonschema_specifications-2025.9.1-py3-none-any.whl.metadata (2.9 kB)
2026-07-27T16:27:20.6255643Z Collecting referencing>=0.28.4 (from jsonschema)
2026-07-27T16:27:20.6355357Z   Downloading referencing-0.37.0-py3-none-any.whl.metadata (2.8 kB)
2026-07-27T16:27:20.8295164Z Collecting rpds-py>=0.25.0 (from jsonschema)
2026-07-27T16:27:20.8398835Z   Downloading rpds_py-2026.6.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.1 kB)
2026-07-27T16:27:20.8612717Z Collecting typing-extensions>=4.4.0 (from referencing>=0.28.4->jsonschema)
2026-07-27T16:27:20.8709489Z   Downloading typing_extensions-4.16.0-py3-none-any.whl.metadata (3.3 kB)
2026-07-27T16:27:20.8840603Z Downloading jsonschema-4.26.0-py3-none-any.whl (90 kB)
2026-07-27T16:27:20.9079357Z Downloading pyyaml-6.0.3-cp311-cp311-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (806 kB)
2026-07-27T16:27:20.9634946Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 806.6/806.6 kB 14.9 MB/s  0:00:00
2026-07-27T16:27:20.9733355Z Downloading attrs-26.1.0-py3-none-any.whl (67 kB)
2026-07-27T16:27:20.9848434Z Downloading jsonschema_specifications-2025.9.1-py3-none-any.whl (18 kB)
2026-07-27T16:27:20.9966584Z Downloading referencing-0.37.0-py3-none-any.whl (26 kB)
2026-07-27T16:27:21.0162688Z Downloading rpds_py-2026.6.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (371 kB)
2026-07-27T16:27:21.0306634Z Downloading typing_extensions-4.16.0-py3-none-any.whl (45 kB)
2026-07-27T16:27:21.0545994Z Installing collected packages: typing-extensions, rpds-py, pyyaml, attrs, referencing, jsonschema-specifications, jsonschema
2026-07-27T16:27:21.2430281Z 
2026-07-27T16:27:21.2438373Z Successfully installed attrs-26.1.0 jsonschema-4.26.0 jsonschema-specifications-2025.9.1 pyyaml-6.0.3 referencing-0.37.0 rpds-py-2026.6.3 typing-extensions-4.16.0
﻿2026-07-27T16:27:21.2927714Z ##[group]Run python scripts/validate_schemas.py --schema-dir schemas/
2026-07-27T16:27:21.2928156Z [36;1mpython scripts/validate_schemas.py --schema-dir schemas/[0m
2026-07-27T16:27:21.2984397Z shell: /usr/bin/bash -e {0}
2026-07-27T16:27:21.2984613Z env:
2026-07-27T16:27:21.2984790Z   SERVICE_DIR: services/data/mls-ingestion
2026-07-27T16:27:21.2985025Z   PYTHON_VERSION: 3.11
2026-07-27T16:27:21.2985207Z   IMAGE_NAME: mls-ingestion
2026-07-27T16:27:21.2985460Z   pythonLocation: /opt/hostedtoolcache/Python/3.11.15/x64
2026-07-27T16:27:21.2985784Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.11.15/x64/lib/pkgconfig
2026-07-27T16:27:21.2986104Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-07-27T16:27:21.2986384Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-07-27T16:27:21.2986671Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-07-27T16:27:21.2986959Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.11.15/x64/lib
2026-07-27T16:27:21.2987211Z ##[endgroup]
2026-07-27T16:27:21.3119002Z python: can't open file '/home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo/services/data/mls-ingestion/scripts/validate_schemas.py': [Errno 2] No such file or directory
2026-07-27T16:27:21.3145549Z ##[error]Process completed with exit code 2.
2026-07-27T16:27:01.0450000Z Evaluating validate-schema.if
2026-07-27T16:27:01.0450000Z Evaluating: success()
2026-07-27T16:27:01.0450000Z Result: true
2026-07-27T16:27:01.0510000Z Requested labels: ubuntu-latest
2026-07-27T16:27:01.0510000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-mls-ingestion.yml@refs/pull/36/merge
2026-07-27T16:27:01.0510000Z Waiting for a runner to pick up this job...
2026-07-27T16:27:01.4330000Z All GitHub-hosted runners with label [ubuntu-latest] are busy. For more information, see https://gh.io/job-concurrency-limits
2026-07-27T16:27:13.4280000Z Job is about to start running on the hosted runner: GitHub Actions 1000002078
2026-07-27T16:27:13.4280000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.