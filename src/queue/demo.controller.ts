import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';
import { DEMO_QUEUE } from './queue.constants';

@Controller('queue/demo')
export class DemoController {
  constructor(@InjectQueue(DEMO_QUEUE) private readonly queue: Queue) {}

  // Enqueue a demo job — used to exercise the worker and Bull Board dashboard.
  @Post('enqueue')
  async enqueue(): Promise<{ jobId: string | undefined }> {
    const job = await this.queue.add('demo-job', { at: Date.now() });
    return { jobId: job.id };
  }
}
