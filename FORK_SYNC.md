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
- Secret: the workflow reads the GitHub Actions secret `NPM_TOKEN` (an npm automation token for the
  `@doodlemania` scope). The value is also in OpenBao. Never put it in a file.
- Pre-release policy: a tag with a hyphen, such as `v0.25.0-doodle.1`, publishes under the `next`
  dist-tag. `latest` moves only on a plain `vX.Y.Z` tag. Consumers pin the exact version.
- Sync: the `Sync upstream` workflow runs each Monday. It opens a pull request that merges the latest
  upstream release tag into `doodle`. On a conflict it opens an issue.

## Patches carried
List every patch here with its reason, so a rebase conflict is easy to judge.

1. `RichTextRenderFallback` (`packages/core/components/RichTextEditor/components/RenderFallback.tsx`):
   shows plain text only. Upstream injected the raw string with `dangerouslySetInnerHTML`, so a
   stored `<script>`, `javascript:` link or `onerror` handler reached server-rendered output.
   Test: `components/RichTextEditor/__tests__/render-fallback.spec.tsx`.
