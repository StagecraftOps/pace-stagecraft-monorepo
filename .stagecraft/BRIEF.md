# StageCraft Failure Brief -- StagecraftOps/pace-stagecraft-monorepo

## Failed workflow: PR Validation (.github/workflows/pr-validation.yml)

## Root cause (from automated analysis)

A TypeError occurs in the search handler when the query parameter is missing, because the code does not null-check before accessing a property.

## Why this is a code-level issue, not a pipeline config issue

The failing test asserts on application logic in a request handler, not on any CI/workflow configuration setting.

Failure category: test_failure

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: unknown

## Relevant log excerpt

```
FAIL search.spec.ts > handles missing query param
  TypeError: Cannot read properties of undefined (reading query)
    at searchHandler (src/handlers/search.ts:12:5)
```

## Instructions

This is NOT a pipeline/workflow-config issue -- the fix is in the application's own source code. Explore the repository to find the actual root cause (the log excerpt above is a starting point, not the full picture), make the minimal correct fix, and open a PR.