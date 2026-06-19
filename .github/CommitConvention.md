# Backend Commit Message Convention

We follow the **Conventional Commits** standard. Commit messages must be structured as follows:

```text
<type>(<scope>): <subject>
```

## Allowed Types

- `feat`: A new feature for the backend (e.g. `feat(api): add atm routing algorithm endpoint`).
- `fix`: A bug fix (e.g. `fix(db): resolve database connection leak`).
- `docs`: Documentation changes (e.g. `docs(api): update swagger spec documentation`).
- `style`: Changes that do not affect code logic (formatting, spacing, linting issues).
- `refactor`: Restructuring code without changing behavior (e.g. `refactor(services): split validation into middleware`).
- `test`: Adding or correcting tests (e.g. `test(controller): add integration test for routing`).
- `chore`: Updating configs, dependencies, builds (e.g. `chore(deps): update lombok version`).
- `ci`: Changes to GitHub actions workflows.

## Guidelines
- Write the subject line in the **imperative mood** (e.g., "add endpoint" instead of "added endpoint" or "adds endpoint").
- Limit the first line to **50 characters**.
- Do not end the subject line with a period.
