# StageCraft Remediation Brief -- StagecraftOps/pace-stagecraft-monorepo

## Finding (fix this one only)

- Source: code_scanning
- Subject: **apache-airflow**
- Severity: high
- Fix: bump to `3.2.2` in `services/data/price-feed-pipeline/requirements.txt`
- Closes #99

## Root cause

Apache Airflow: Incomplete redaction allowlist exposes secrets in Connection `extra`  to read-permitted users

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: PCI