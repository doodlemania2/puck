# Fork of puckeditor/puck

This is the public Doodle Project fork of Puck (MIT). The church-specific blocks live in
STFoA-Church (`src/modules/sites/`), not here. This fork holds only changes that help every user.

## Branches
- `main`: a clean mirror of `upstream/main`. Never commit to it.
- `doodle`: `main` plus our patches and fork CI. This is the default working branch.

## Sync steps
1. `git fetch upstream`
2. `git checkout main && git merge --ff-only upstream/main && git push origin main`
3. `git checkout doodle && git rebase main`
4. Run `pnpm install --frozen-lockfile && pnpm test && pnpm build`.
5. Push `doodle`. Update the "Synced to" line below.

Synced to: upstream v0.24.0

## Publishing
- npm name: `@doodlemania/puck`, built from `packages/core`.
- The source name stays `@puckeditor/core`. The publish workflow renames it at build time.
- Consumers install it with an alias, so import paths do not change:
  `"@puckeditor/core": "npm:@doodlemania/puck@^0.24.0"`
- Release: tag `vX.Y.Z` on `doodle`. A manual run of the workflow is a dry run.

## Patches carried
None yet. List every patch here with its reason, so a rebase conflict is easy to judge.
