Add a towncrier news fragment for the current change.

## Fragment format

**Filename:** `+<camelCaseSlug>.<type>` (camelCase only — no hyphens in the slug)

**Types:** `feature`, `bugfix`, `breaking`, `internal`, `documentation`, `test`

**Content:** One line — description ending with `. @iFlameing`

Example filename: `+updateDsgvoBannerVersion.internal`
Example content: `Update volto-dsgvo-banner to 4.0.0-alpha.2. @iFlameing`

## Where to write the fragment

Determine what kind of change was made (look at `git diff` or ask the user if unclear):

- **Frontend change** → `news/<fragment>`
- **Backend change** → `backend/news/<fragment>` AND `news/<fragment>` (both)
- **Docs change** → `docs/news/<fragment>` (create the directory if it doesn't exist)

## Steps

1. Run `git diff --stat HEAD` (or review the current conversation) to understand what changed.
2. Ask the user for clarification only if the change type (feature/bugfix/internal/etc.) is genuinely ambiguous. Otherwise infer it:
   - Dependency/version bumps → `internal`
   - New functionality → `feature`
   - Bug fixes → `bugfix`
   - Breaking API/behavior changes → `breaking`
   - Test-only changes → `test`
   - Docs-only changes → `documentation`
3. Propose a camelCase slug and one-line description to the user before writing. Keep it short.
4. Write the fragment file(s) to the correct location(s).
5. Confirm what was created and where.
