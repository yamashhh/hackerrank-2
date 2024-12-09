export default {
  // https://biomejs.dev/recipes/git-hooks/#lint-staged
  "*": [
    "pnpm check --no-errors-on-unmatched", // Check formatting and lint
  ],
};
