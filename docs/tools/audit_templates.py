"""
audit_templates.py -- AST-based validation of all reusable template calls.

For every ci-*.yml, checks that each `uses: ./.github/workflows/_template-*.yml`
job supplies only declared inputs and does not omit required ones.

Usage (from repo root):
    python docs/tools/audit_templates.py

Exit code 0 = all valid. Exit code 1 = mismatches found (safe to wire into CI).
"""

import sys
from pathlib import Path
from ruamel.yaml import YAML

# Resolve from this file's location so it works from any cwd
WDIR = Path(__file__).resolve().parent.parent.parent / ".github" / "workflows"

yaml = YAML()
yaml.preserve_quotes = True


def load_template_inputs(tpl_path: Path):
    doc = yaml.load(tpl_path)
    on_block = doc.get("on", {})
    wc = on_block.get("workflow_call", {}) if on_block else {}
    declared = wc.get("inputs", {}) or {}
    required = {k for k, v in declared.items() if (v or {}).get("required", False)}
    return set(declared.keys()), required


def extract_stem(uses: str):
    prefix = "./.github/workflows/"
    if not uses.startswith(prefix):
        return None
    return uses[len(prefix):].removesuffix(".yml")


def main():
    templates = {}
    for f in sorted(WDIR.glob("_template-*.yml")):
        declared, required = load_template_inputs(f)
        templates[f.stem] = {"declared": declared, "required": required}

    errors = []

    for f in sorted(WDIR.glob("ci-*.yml")):
        doc = yaml.load(f)
        jobs = doc.get("jobs", {}) or {}
        for job_name, job in jobs.items():
            if not isinstance(job, dict):
                continue
            stem = extract_stem(job.get("uses", ""))
            if not stem or not stem.startswith("_template-"):
                continue
            if stem not in templates:
                errors.append(f"[{f.name}] {job_name}: references non-existent template '{stem}'")
                continue
            tpl = templates[stem]
            supplied = set((job.get("with") or {}).keys())
            unknown = supplied - tpl["declared"]
            missing = tpl["required"] - supplied
            if unknown or missing:
                errors.append(f"[{f.name}] job={job_name} => {stem}")
                if unknown:
                    errors.append(f"  UNKNOWN inputs (startup_failure): {sorted(unknown)}")
                if missing:
                    errors.append(f"  MISSING required inputs: {sorted(missing)}")

    if errors:
        print("=== MISMATCHES ===")
        for e in errors:
            print(e)
        sys.exit(1)

    print("All template calls are valid.")
    sys.exit(0)


if __name__ == "__main__":
    main()
