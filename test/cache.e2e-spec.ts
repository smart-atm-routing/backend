import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import type { Cache } from 'cache-manager';

// Proves the Redis-backed cache store round-trips. Requires Redis up on 6379.
describe('Redis cache (e2e)', () => {
  let moduleRef: TestingModule;
  let cache: Cache;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        CacheModule.registerAsync({
          useFactory: () => ({
            stores: [createKeyv('redis://localhost:6379')],
          }),
        }),
      ],
    }).compile();
    cache = moduleRef.get<Cache>(CACHE_MANAGER);
  });

  afterAll(async () => {
    await cache.del('test:cache:key');
    await moduleRef.close();
  });

  it('sets and gets a value through Redis', async () => {
    await cache.set('test:cache:key', 'hello', 5000);
    expect(await cache.get('test:cache:key')).toBe('hello');
  });
});
