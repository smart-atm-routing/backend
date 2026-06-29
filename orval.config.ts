import { defineConfig } from 'orval';

// Generates a typed, React-Query API client from the OpenAPI spec.
// The output is intended for the frontend repo; generated here as the
// single source of truth lives with the backend contract.
export default defineConfig({
  salesbox: {
    input: './openapi.json',
    output: {
      target: './generated/api/endpoints.ts',
      schemas: './generated/api/model',
      client: 'react-query',
      mode: 'single',
      clean: true,
    },
  },
});
