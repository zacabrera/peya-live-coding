import { Injectable } from '@nestjs/common';
import { SQSClient, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class SqsMessageDeleterService {
  constructor(
    private readonly client: SQSClient,
    private readonly logger: LoggerService,
  ) {}

  async deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
    try {
      const command = new DeleteMessageCommand({
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle,
      });

      await this.client.send(command);
      this.logger.debug(`✅ Message deleted: ${receiptHandle}`);
    } catch (error) {
      this.logger.error('Error deleting message', error);
    }
  }
}
