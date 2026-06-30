import { Injectable } from '@nestjs/common';
import { EmailProvider } from '@/email/email-provider.abstract';
import { ParsedMessage } from '@/email/email.types';

@Injectable()
export class EmailService {
    constructor(private readonly emailProvider: EmailProvider) {}

    async getMessage(messageId: string, emailAccountId: string): Promise<ParsedMessage> {
        return this.emailProvider.getMessage(messageId, emailAccountId);
    }
}
