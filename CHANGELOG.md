# prive

## 0.0.14

### Patch Changes

- migration to SvelteKit 2 ([#87](https://github.com/moreorover/prive/pull/87))

## 0.0.13

### Patch Changes

- bump shadcn-svelte to `0.5.0` ([#85](https://github.com/moreorover/prive/pull/85))

## 0.0.12

### Patch Changes

- Skip auth related tests that require registering new account ([#82](https://github.com/moreorover/prive/pull/82))

- Hide "Register" button on production ([#82](https://github.com/moreorover/prive/pull/82))

- Change phone number generation within tests context to use numeric string to output constant 11 digits long string ([#82](https://github.com/moreorover/prive/pull/82))

- Inject SpeedInsights only in production environment ([#82](https://github.com/moreorover/prive/pull/82))

## 0.0.11

### Patch Changes

- added /admin/clients endpoint tests ([#77](https://github.com/moreorover/prive/pull/77))

- added /admin endpoint access tests based on user roles ([#77](https://github.com/moreorover/prive/pull/77))

- clean up hooks.server.ts ([#77](https://github.com/moreorover/prive/pull/77))

## 0.0.10

### Patch Changes

- Add Vercel speed insights to project ([#72](https://github.com/moreorover/prive/pull/72))

- fix clients page data reactivity ([#73](https://github.com/moreorover/prive/pull/73))

## 0.0.9

### Patch Changes

- Deploy to Vercel production if TAG created ([#70](https://github.com/moreorover/prive/pull/70))

## 0.0.8

### Patch Changes

- Update release workflow with conditional deploy step ([#69](https://github.com/moreorover/prive/pull/69))

- Use 'await' in superValidate method ([#67](https://github.com/moreorover/prive/pull/67))

- fix couple imports ([#66](https://github.com/moreorover/prive/pull/66))

## 0.0.7

### Patch Changes

- Add repository information to package.json ([#63](https://github.com/moreorover/prive/pull/63))

- Update package.json with packageManager property ([#64](https://github.com/moreorover/prive/pull/64))

- Add pnpm version to package.json ([#61](https://github.com/moreorover/prive/pull/61))

- Deleted redundant Supabase migrations ([#62](https://github.com/moreorover/prive/pull/62))

## 0.0.6

### Patch Changes

- [#59](https://github.com/moreorover/prive/pull/59) [`df6ea37`](https://github.com/moreorover/prive/commit/df6ea378f871b04379cb5314f8e1c064c8d74bdc) Thanks [@moreorover](https://github.com/moreorover)! - Change deployment trigger event from create to push

## 0.0.5

### Patch Changes

- [#57](https://github.com/moreorover/prive/pull/57) [`9035131`](https://github.com/moreorover/prive/commit/903513113aca97ec862ca3d0082f1bd530c66e13) Thanks [@moreorover](https://github.com/moreorover)! - CICD deployment on TAG

## 0.0.4

### Patch Changes

- [#35](https://github.com/moreorover/prive/pull/35) [`1013108`](https://github.com/moreorover/prive/commit/10131083530563f33336294f349daff1c020f3f8) Thanks [@moreorover](https://github.com/moreorover)! - Enabled atomatic TAG creation and deployment to Vercel

## 0.0.3

### Patch Changes

- [#29](https://github.com/moreorover/prive/pull/29) [`de95e96`](https://github.com/moreorover/prive/commit/de95e96832c1a0636efaf402d118ae300a743017) Thanks [@moreorover](https://github.com/moreorover)! - Fixed GitHub Actions and showing application version in app.
