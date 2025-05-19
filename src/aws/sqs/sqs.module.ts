import { Module } from '@nestjs/common';
import {
  SqsPublisherService,
  SqsConsumerService,
  SqsMessageDeleterService,
} from './services';
import { SqsClientProvider } from './sqs-client.provider';
import { CommonModule } from 'src/common/common.module';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [CommonModule],
  providers: [
    SqsClientProvider,
    SqsPublisherService,
    SqsConsumerService,
    SqsMessageDeleterService,
  ],
  exports: [SqsPublisherService, SqsConsumerService, SqsMessageDeleterService],
})
export class SqsModule {}
