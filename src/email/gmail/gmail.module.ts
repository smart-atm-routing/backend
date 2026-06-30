import { Module } from '@nestjs/common';
import { GmailParserService } from '@/email/gmail/gmail-parser.service';
import { GmailProvider } from '@/email/gmail/gmail-provider.service';
import { GmailClientFactory } from '@/email/gmail/gmail-client.factory';

@Module({
    providers: [GmailParserService, GmailProvider, GmailClientFactory],
    exports: [GmailProvider]
})
export class GmailModule {}
