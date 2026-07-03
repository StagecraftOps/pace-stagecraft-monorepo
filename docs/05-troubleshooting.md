# Troubleshooting

## `startup_failure` — Workflow Never Starts

**Cause:** GitHub couldn't parse the workflow YAML, usually because a `with:` key doesn't match the template's declared `inputs:`.

**Diagnose:**
```bash
# Run locally without pushing
python docs/tools/audit_templates.py
```
The tool will print exactly which file, which job, and which input names are wrong.

**Common mistakes:**

| Wrong key | Correct key | Template |
|---|---|---|
| `image_name` | `service_name` | `_template-docker-build` |
| `service_dir` | `working_directory` | `_template-security-scan`, `_template-python-ci` |
| `dockerfile` | `dockerfile_path` | `_template-docker-build` |
| `node_version` | *(not a declared input)* | `_template-integration-test` |
| `test_path` | *(not a declared input)* | `_template-integration-test` |
| `workflow_name` | *(not a declared input)* | `_template-notify-slack` |
| `migration_dir` | *(not a declared input)* | `_template-db-migration` |
| `target_db` | *(not a declared input)* | `_template-db-migration` |

**Also check:** A job with `uses:` must NOT also have `runs-on:` — that causes a different parse error.

---

## `failure` — Workflow Starts But a Job Fails

This is a runtime failure, not a YAML issue. Typical causes:

- **Lint failure:** Fix the code in the service directory, not the workflow file.
- **Missing secret:** Add the secret to the StagecraftOps org under Settings → Secrets → Actions.
- **Docker push failure:** Ensure `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` are set at org level. Token must have `read/write` scope.
- **Test failure:** The test itself is failing — run locally: `cd services/<domain>/<service> && npm test` or `pytest`.
- **Missing Dockerfile:** The `dockerfile_path` input must point to an existing file in the repo.

---

## Viewing Failure Logs

```bash
# List recent runs
gh run list --repo StagecraftOps/pace-stagecraft-monorepo --limit 10

# View logs for a specific failed run (get RUN_ID from above)
gh run view <RUN_ID> --repo StagecraftOps/pace-stagecraft-monorepo --log-failed

# Or open in browser
gh run view <RUN_ID> --repo StagecraftOps/pace-stagecraft-monorepo --web
```

---

## Re-running a Failed Workflow

```bash
# Re-run all jobs
gh run rerun <RUN_ID> --repo StagecraftOps/pace-stagecraft-monorepo

# Re-run only failed jobs (skips succeeded jobs)
gh run rerun <RUN_ID> --failed --repo StagecraftOps/pace-stagecraft-monorepo
```

---

## Template Change Broke All Callers

If you rename or remove a declared input from a template, every service CI that was passing that input will immediately get `startup_failure` on the next push.

**Safe approach:**
1. Keep the old input name declared (even if unused in the job body)
2. Add the new input name alongside it
3. Update callers one by one
4. Remove the old input name once all callers are updated

Or run the audit tool after step 3 to verify all callers have migrated before step 4.

---

## `if: ${{ secrets.X != '' }}` in Reusable Workflow

Secret context is not available in reusable workflow step-level `if:` conditions. Use a "check" step pattern instead:

```yaml
# In the template:
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Check Slack secret
        id: check
        run: |
          if [ -n "$SLACK_URL" ]; then
            echo "has_secret=true" >> $GITHUB_OUTPUT
          fi
        env:
          SLACK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Send Slack message
        if: steps.check.outputs.has_secret == 'true'
        run: curl -X POST "${{ secrets.SLACK_WEBHOOK_URL }}" ...
```

---

## CRLF Line Ending Warnings on Windows

When Python writes files with `newline='\n'` on Windows, git may warn about LF→CRLF conversion. This is cosmetic — the YAML is valid and GitHub reads LF correctly. The warnings look like:

```
warning: in the working copy of '...yml', LF will be replaced by CRLF
```

To silence them permanently:
```bash
git config core.autocrlf false
```
