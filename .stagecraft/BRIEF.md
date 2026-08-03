# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: CI - MLS Ingestion Service (.github/workflows/ci-mls-ingestion.yml)

## Root cause (from automated analysis)

The validate-schema job fails at the 'Validate MLS feed schemas' step with exit code 2 because the script file 'services/data/mls-ingestion/scripts/validate_schemas.py' does not exist in the repository. Python's interpreter reports: "can't open file '…/services/data/mls-ingestion/scripts/validate_schemas.py': [Errno 2] No such file or directory". The scripts/ directory (or at minimum validate_schemas.py within it) was never committed to the repository, so the workflow cannot execute it regardless of how the pipeline is configured.

## Why this is a code-level issue, not a pipeline config issue

The failure is caused by a missing source file (scripts/validate_schemas.py) that must be created and committed under services/data/mls-ingestion/scripts/ — no change to the workflow YAML will resolve this.

Failure category: CONFIG_ERROR

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
fications-2025.9.1-py3-none-any.whl.metadata (2.9 kB)
2026-08-03T16:28:48.2997791Z Collecting referencing>=0.28.4 (from jsonschema)
2026-08-03T16:28:48.3067950Z   Downloading referencing-0.37.0-py3-none-any.whl.metadata (2.8 kB)
2026-08-03T16:28:48.5704158Z Collecting rpds-py>=0.25.0 (from jsonschema)
2026-08-03T16:28:48.5777664Z   Downloading rpds_py-2026.6.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl.metadata (4.1 kB)
2026-08-03T16:28:48.6004135Z Collecting typing-extensions>=4.4.0 (from referencing>=0.28.4->jsonschema)
2026-08-03T16:28:48.6073501Z   Downloading typing_extensions-4.16.0-py3-none-any.whl.metadata (3.3 kB)
2026-08-03T16:28:48.6184383Z Downloading jsonschema-4.26.0-py3-none-any.whl (90 kB)
2026-08-03T16:28:48.6366630Z Downloading pyyaml-6.0.3-cp311-cp311-manylinux2014_x86_64.manylinux_2_17_x86_64.manylinux_2_28_x86_64.whl (806 kB)
2026-08-03T16:28:48.6636537Z    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 806.6/806.6 kB 39.0 MB/s  0:00:00
2026-08-03T16:28:48.6708397Z Downloading attrs-26.1.0-py3-none-any.whl (67 kB)
2026-08-03T16:28:48.6807995Z Downloading jsonschema_specifications-2025.9.1-py3-none-any.whl (18 kB)
2026-08-03T16:28:48.6899143Z Downloading referencing-0.37.0-py3-none-any.whl (26 kB)
2026-08-03T16:28:48.6992270Z Downloading rpds_py-2026.6.3-cp311-cp311-manylinux_2_17_x86_64.manylinux2014_x86_64.whl (371 kB)
2026-08-03T16:28:48.7094165Z Downloading typing_extensions-4.16.0-py3-none-any.whl (45 kB)
2026-08-03T16:28:48.7467722Z Installing collected packages: typing-extensions, rpds-py, pyyaml, attrs, referencing, jsonschema-specifications, jsonschema
2026-08-03T16:28:48.9597111Z 
2026-08-03T16:28:48.9607473Z Successfully installed attrs-26.1.0 jsonschema-4.26.0 jsonschema-specifications-2025.9.1 pyyaml-6.0.3 referencing-0.37.0 rpds-py-2026.6.3 typing-extensions-4.16.0
2026-08-03T16:28:48.9614972Z 
2026-08-03T16:28:48.9615505Z [notice] A new release of pip is available: 26.1.2 -> 26.2
2026-08-03T16:28:48.9616249Z [notice] To update, run: pip install --upgrade pip
﻿2026-08-03T16:28:49.0196432Z ##[group]Run python scripts/validate_schemas.py --schema-dir schemas/
2026-08-03T16:28:49.0197019Z [36;1mpython scripts/validate_schemas.py --schema-dir schemas/[0m
2026-08-03T16:28:49.0242054Z shell: /usr/bin/bash -e {0}
2026-08-03T16:28:49.0242339Z env:
2026-08-03T16:28:49.0242555Z   SERVICE_DIR: services/data/mls-ingestion
2026-08-03T16:28:49.0242862Z   PYTHON_VERSION: 3.11
2026-08-03T16:28:49.0243083Z   IMAGE_NAME: mls-ingestion
2026-08-03T16:28:49.0243380Z   pythonLocation: /opt/hostedtoolcache/Python/3.11.15/x64
2026-08-03T16:28:49.0243806Z   PKG_CONFIG_PATH: /opt/hostedtoolcache/Python/3.11.15/x64/lib/pkgconfig
2026-08-03T16:28:49.0244228Z   Python_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-08-03T16:28:49.0244610Z   Python2_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-08-03T16:28:49.0245008Z   Python3_ROOT_DIR: /opt/hostedtoolcache/Python/3.11.15/x64
2026-08-03T16:28:49.0245633Z   LD_LIBRARY_PATH: /opt/hostedtoolcache/Python/3.11.15/x64/lib
2026-08-03T16:28:49.0245960Z ##[endgroup]
2026-08-03T16:28:49.0400181Z python: can't open file '/home/runner/work/pace-stagecraft-monorepo/pace-stagecraft-monorepo/services/data/mls-ingestion/scripts/validate_schemas.py': [Errno 2] No such file or directory
2026-08-03T16:28:49.0430731Z ##[error]Process completed with exit code 2.
2026-08-03T16:28:42.2150000Z Requested labels: ubuntu-latest
2026-08-03T16:28:42.2150000Z Job defined at: StagecraftOps/pace-stagecraft-monorepo/.github/workflows/ci-mls-ingestion.yml@refs/pull/36/merge
2026-08-03T16:28:42.2150000Z Waiting for a runner to pick up this job...
2026-08-03T16:28:42.2210000Z Job is waiting for a hosted runner to come online.
2026-08-03T16:28:42.2150000Z Evaluating validate-schema.if
2026-08-03T16:28:42.2150000Z Evaluating: success()
2026-08-03T16:28:42.2150000Z Result: true
2026-08-03T16:28:42.2210000Z Job is about to start running on the hosted runner: GitHub Actions 1000002208
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.