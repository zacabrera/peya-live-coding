import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class SqsPublisherService {
  constructor(
    private readonly client: SQSClient,
    private readonly logger: LoggerService,
  ) {}

  async publish<T>(queueUrl: string, payload: T): Promise<void> {
    try {
      const command = new SendMessageCommand({
        QueueUrl: queueUrl,
        MessageBody: JSON.stringify(payload),
      });

      const response = await this.client.send(command);
      this.logger.debug(`Message sent: ${response.MessageId}`);
    } catch (error) {
      this.logger.error('Error publishing message to SQS', error);
    }
  }
}
