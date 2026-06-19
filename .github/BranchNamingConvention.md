# Backend Branch Naming Convention

We use a structured branch naming convention to classify branches by purpose.

## Naming Pattern
`<type>/<short-description-kebab-case>`

## Allowed Types

| Branch Type | Description | Example |
| :--- | :--- | :--- |
| `feature/` | New API endpoints, database schemas, services | `feature/atm-distance-calculation` |
| `bugfix/` | Fixing logic errors, db query bugs, security flaws | `bugfix/jwt-expiration-check` |
| `hotfix/` | Urgent fixes pushed directly to production | `hotfix/db-connection-pool-exhaustion` |
| `docs/` | Updates to README, OpenAPI/Swagger docs, or comments | `docs/api-endpoints-documentation` |
| `refactor/` | Code structure cleanup, optimization, moving folders | `refactor/database-repository-pattern` |
| `chore/` | Updating packages, config files, package dependencies | `chore/update-spring-boot` |

## Rules
1. **Lowercase Only**: Do not use uppercase letters.
2. **Kebab-Case**: Use hyphens (`-`) instead of spaces or underscores.
3. **Be Concise**: Keep the branch description short (3-5 words max).
