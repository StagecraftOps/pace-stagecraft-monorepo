# Adding and Modifying Templates

## The Golden Rule

**The `with:` keys you pass to a template must exactly match the `inputs:` keys declared in that template's `on.workflow_call.inputs` block.** GitHub validates this at parse time. A single typo causes `startup_failure` on every workflow that calls the template.

---

## Modifying an Existing Template

Say you want to add a `skip_push` input to `_template-docker-build.yml`:

### Step 1 — Declare the input in the template

```yaml
# _template-docker-build.yml
on:
  workflow_call:
    inputs:
      service_name:
        type: string
        required: true
      ecr_repository:
        type: string
        required: true
      dockerfile_path:
        type: string
        default: Dockerfile
      image_tag:
        type: string
        default: latest
      push_image:
        type: boolean
        default: true
      skip_push:            # ← NEW
        type: boolean
        default: false      # ← make it optional so existing callers don't break
```

### Step 2 — Use it inside the template

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Push image
        if: ${{ inputs.push_image && !inputs.skip_push }}
        run: docker push ...
```

### Step 3 — Optionally pass it from callers that need it

```yaml
# ci-some-service.yml
  docker-build:
    uses: ./.github/workflows/_template-docker-build.yml
    with:
      service_name: some-service
      ecr_repository: some-service
      skip_push: true       # only needed where you want the new behaviour
    secrets: inherit
```

### Step 4 — Validate with the audit tool

```bash
python docs/tools/audit_templates.py
```

---

## Creating a New Template

1. Create `.github/workflows/_template-my-template.yml`
2. Declare all inputs under `on.workflow_call.inputs` — mark as `required: true` only if callers must always provide them
3. Write the `jobs:` section — access inputs as `${{ inputs.input_name }}`
4. Add calls to it from service CI files, passing the correct `with:` keys
5. Run `python docs/tools/audit_templates.py` — must output "All template calls are valid."

### Minimal template skeleton

```yaml
name: Template — My Template

on:
  workflow_call:
    inputs:
      service_name:
        type: string
        required: true
      my_option:
        type: string
        default: default_value

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Do something
        run: echo "Running for ${{ inputs.service_name }}"
```

---

## Input Type Reference

| Type | Notes |
|---|---|
| `string` | Most common — use for paths, names, tags |
| `boolean` | Must pass `true`/`false` (not `"true"`) from caller |
| `number` | Integers, e.g. `test_timeout_minutes: 30` |

`default:` makes an input optional. Without `default:`, the input is optional but will be an empty string/false/0 if not supplied — mark it `required: true` if you want GitHub to enforce it.

---

## Audit Tool

The AST-based audit script lives at `docs/tools/audit_templates.py`. It:

1. Loads all `_template-*.yml` files and extracts their declared `inputs:` (both required and optional)
2. Walks every `ci-*.yml`, finds all `uses:` calls to templates, and compares the supplied `with:` keys
3. Reports `UNKNOWN inputs` (will cause `startup_failure`) and `MISSING required` (will also cause `startup_failure`)

Run it before every push that touches a template or a service CI:

```bash
cd pace-stagecraft-monorepo
python docs/tools/audit_templates.py
# Expected: "All template calls are valid."
```
