// Conventional Commits, aligned to .github/CommitConvention.md:
// - allowed types restricted to the team's set
// - subject in imperative mood, no trailing period, max 50 chars
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'ci'],
    ],
    'header-max-length': [2, 'always', 50],
    'subject-full-stop': [2, 'never', '.'],
  },
};
