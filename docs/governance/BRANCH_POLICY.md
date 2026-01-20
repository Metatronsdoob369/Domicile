# Branch Management Policy

**Status:** Normative • **Last Updated:** 2026-01-20

## Purpose

Prevent branch confusion and ensure single source of truth for Domicile repository.

## Policy

### Default Branch

**The default branch is `main`.**

All development, pull requests, and deployments target `main`.

### Branch Protection

#### main Branch Protection Rules

The `main` branch requires:

1. **Pull request reviews** - At least 1 approving review
2. **Status checks** - Must pass before merging:
   - Pre-commit hooks (eslint, trufflehog)
   - Build checks (`pnpm build`)
   - Test suite (`pnpm test`)
3. **Linear history** - No merge commits (use rebase or squash)
4. **Require branches to be up to date** - Must rebase before merge

#### Prohibited Branches

The following branch names are **prohibited** at origin:

- `master`
- `develop`
- `development`

### Branch Naming Convention

Feature branches should follow:

```
feature/<description>
fix/<description>
docs/<description>
refactor/<description>
```

Examples:

- `feature/n8n-mcp-wrapper`
- `fix/propulsion-guard-import`
- `docs/governance-update`

### Git Configuration

To prevent accidental `master` branch creation, add to `.git/config`:

```ini
[branch "main"]
    remote = origin
    merge = refs/heads/main

[push]
    default = current

[init]
    defaultBranch = main
```

### GitHub Settings

**Repository Settings → Branches:**

1. Default branch: `main`
2. Branch protection rule for `main`:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (1)
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Require linear history
   - ✅ Include administrators

3. Branch name pattern restrictions:
   - Pattern: `master`
   - Deny all pushes
   - Deny deletions

## Historical Context

On 2026-01-20, a `master` branch diverged from `main` with unrelated histories:

- `main` had 321 commits not in `master`
- `master` had 5 commits not in `main` (contract governance, Domicile architecture)

**Resolution:**

- Merged `origin/master` into `main` preserving all work
- Deleted `origin/master` branch
- Established this policy to prevent future occurrences

**Merged commits preserved:**

- `701dd491`: restore contract governance and agents
- `cada9fc5`: rewrite README for Domicile architecture
- `80cd981a`: integrate Domicile packages + security overrides
- `7ec43532`: Add real-estate automation scripts + agent codex
- `6d03ecd1`: initial release of Contract-Driven AI Platform

## Verification

To verify single-branch policy:

```bash
# Check default branch
git remote show origin | grep "HEAD branch"
# Expected: HEAD branch: main

# List remote branches
git branch -r
# Expected: origin/main (no origin/master)

# Check local config
git config init.defaultBranch
# Expected: main
```

## Enforcement

This policy is **normative** and **enforceable** via:

1. GitHub branch protection rules (technical enforcement)
2. Git hooks (local enforcement)
3. Code review (human enforcement)

Violations should be caught at push time via GitHub branch protection.

## Changes

Changes to this policy require:

1. Pull request with justification
2. Review by repository owner
3. Update to this document with timestamp

---

**Invariant:** `main` is the sole branch of record. All other branches are ephemeral.
