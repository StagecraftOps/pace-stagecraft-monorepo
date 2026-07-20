# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - MLS Ingestion Service (.github/workflows/ci-mls-ingestion.yml)

## Root cause (from automated analysis)

The `validate-schema` job fails at the 'Validate MLS feed schemas' step with exit code 2 because the script `services/data/mls-ingestion/scripts/validate_schemas.py` does not exist in the repository at the checked-out commit (06678b4). The runner reports: `python: can't open file '.../services/data/mls-ingestion/scripts/validate_schemas.py': [Errno 2] No such file or directory`. This means the `scripts/` directory (and specifically `validate_schemas.py`) is missing from the service's source tree. The workflow YAML correctly sets `working-directory: ${{ env.SERVICE_DIR }}` and references the script at a relative path that is structurally sound — the problem is purely that the file is absent from the repository content, not that the pipeline is misconfigured.

## Why this is a code-level issue, not a pipeline config issue

The pipeline YAML is correctly structured; the failure is caused by a missing application-level file (`scripts/validate_schemas.py`) that must be added to `services/data/mls-ingestion/scripts/` in the repository source tree.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
s-26.1.0-py3-none-any.whl.metadata (8.8 kB)
2026-07-20T16:28:34.5792640Z Collecting jsonschema-specifications>=2023.03.6 (from jsonschema)
2026-07-20T16:28:34.5871890Z   Downloading jsonschema_specifications-2025.9.1-py3-none-any.whl.metadata (2.9 kB)
2026-07-20T16:28:34.6097337Z Collecting referencing>=0.28.4 (from jsonschema)
2026-07-20T16:28:34.6189342Z   Downloading referencing-0.37.0-py3-none-any.whl.metadata (2.8 kB)
2026-07-20T16:28:34.8677229Z Collecting rpds-py>=0.25.0 (from jsonschema)
2026-07-20T16:28:34.8758728Z   Downloading rpds_py-2026.6.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.1 kB)
2026-07-20T16:28:34.8988415Z Collecting typing-extensions>=4.4.0 (from referencing>=0.28.4->jsonschema)
2026-07-20T16:28:34.9066802Z   Downloading typing_extensions-4.16.0-py3-none-any.whl.metadata (3.3 kB)
2026-07-20T16:28:34.9189552Z Downloading jsonschema-4.26.0-py3-none-any.whl (90 kB)
2026-07-20T16:28:34.9395904Z Downloading pyyaml-6.0.3-cp311-cp311-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (806 kB)
2026-07-20T16:28:34.9916450Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 806.6/806.6 kB 16.6 MB/s  0:00:00
2026-07-20T16:28:34.9995585Z Downloading attrs-26.1.0-py3-none-any.whl (67 kB)
2026-07-20T16:28:35.0112096Z Downloading jsonschema_specifications-2025.9.1-py3-none-any.whl (18 kB)
2026-07-20T16:28:35.0208495Z Downloading referencing-0.37.0-py3-none-any.whl (26 kB)
2026-07-20T16:28:35.0305495Z Downloading rpds_py-2026.6.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (371 kB)
2026-07-20T16:28:35.0571802Z Downloading typing_extensions-4.16.0-py3-none-any.whl (45 kB)
2026-07-20T16:28:35.0872902Z Installing collected packages: typing-extensions, rpds-py, pyyaml, attrs, referencing, jsonschema-specifications, jsonschema
2026-07-20T16:28:35.3166227Z 
2026-07-20T16:28:35.3178021Z Successfully installed attrs-26.1.0 jsonschema-4.26.0 jsonschema-specifications-2025.9.1 pyyaml-6.0.3 referencing-0.37.0 rpds-py-2026.6.3 typing-extensions-4.16.0
﻿2026-07-20T16:28:35.3904861Z ##[group]Run python scripts/validate_schemas.py --schema-dir schemas/
2026-07-20T16:28:35.3905463Z [36;1mpython scripts/validate_schemas.py --schema-dir schemas/[0m
2026-07-20T16:28:35.3975046Z shell: /usr/bin/bash -e {0}
2026-07-20T16:28:35.3975342Z env:
2026-07-20T16:28:35.3975605Z   SERVICE_DIR: services/data/mls-ingestion
2026-07-20T16:28:35.3975905Z   PYTHON_VERSION: 3.11
2026-07-20T16:28:35.3976171Z   IMAGE_NAME: mls-ingestion
2026-07-20T16:28:35.3976501Z   pythonLocation: /opt/hostedtoolcache/Python/3.11.15/x64
2026-07-20T16:28:35.3976934Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.11.15/x64/lib/pkgconfig
2026-07-20T16:28:35.3977360Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-07-20T16:28:35.3977767Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-07-20T16:28:35.3978157Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-07-20T16:28:35.3978532Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.11.15/x64/lib
2026-07-20T16:28:35.3978861Z ##[endgroup]
2026-07-20T16:28:35.4174507Z python: can't open file '/home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo/services/data/mls-ingestion/scripts/validate_schemas.py': [Errno 2] No such file or directory
2026-07-20T16:28:35.4209757Z ##[error]Process completed with exit code 2.
2026-07-20T16:28:19.8790000Z Evaluating validate-schema.if
2026-07-20T16:28:19.8790000Z Evaluating: success()
2026-07-20T16:28:19.8790000Z Result: true
2026-07-20T16:28:19.8860000Z Requested labels: ubuntu-latest
2026-07-20T16:28:19.8860000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-mls-ingestion.yml@refs/pull/36/merge
2026-07-20T16:28:19.8860000Z Waiting for a runner to pick up this job...
2026-07-20T16:28:29.5650000Z Job is about to start running on the hosted runner: GitHub Actions 1000001913
2026-07-20T16:28:29.5650000Z Job is waiting for a hosted runner to come online.
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.