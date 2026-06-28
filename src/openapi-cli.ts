import { writeFileSync } from 'node:fs';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { buildOpenApiDocument } from './config/swagger';

// Compiled CLI: emits a static openapi.json for Orval. Run via the compiled
// dist (not ts-node) so Nest's decorator metadata is preserved. Needs infra up.
// The app is never `listen`ed and we hard-exit after writing — no graceful
// shutdown needed for this one-shot, read-only document build.
async function run(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false },
  );
  const document = buildOpenApiDocument(app);
  writeFileSync('openapi.json', JSON.stringify(document, null, 2));
  process.stdout.write('openapi.json written\n');
  process.exit(0);
}

run().catch((err) => {
  process.stderr.write(`${String(err)}\n`);
  process.exit(1);
});
