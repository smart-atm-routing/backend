import { HealthController } from './health.controller';

describe('HealthController', () => {
  it('check() reports ok', () => {
    const controller = new HealthController();
    expect(controller.check()).toEqual({ status: 'ok' });
  });
});
