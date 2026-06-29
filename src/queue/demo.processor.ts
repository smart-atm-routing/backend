import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { DEMO_QUEUE } from './queue.constants';

/**
 * Example worker. Real background work (email processing, embedding, CRM sync)
 * will follow this same WorkerHost pattern in the feature sprints.
 */
@Processor(DEMO_QUEUE)
export class DemoProcessor extends WorkerHost {
  private readonly logger = new Logger(DemoProcessor.name);

  process(job: Job): Promise<{ handled: string }> {
    this.logger.log(`Processing ${DEMO_QUEUE} job ${job.id}`);
    return Promise.resolve({ handled: String(job.id) });
  }
}
