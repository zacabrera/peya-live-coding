import { Injectable } from '@nestjs/common';
import { SQSClient, ReceiveMessageCommand } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { AWS } from 'src/config/environment/env.config';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class SqsConsumerService {
  private readonly maxNumberOfMessages: number;
  private readonly waitTimeSeconds: number;

  constructor(
    private readonly client: SQSClient,
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const {
      sqs: { maxNumberOfMessages, waitTimeSeconds },
    } = this.configService.get(AWS);

    this.maxNumberOfMessages = maxNumberOfMessages;
    this.waitTimeSeconds = waitTimeSeconds;
  }

  async receiveMessages(queueUrl: string) {
    try {
      const command = new ReceiveMessageCommand({
        QueueUrl: queueUrl,
        MaxNumberOfMessages: this.maxNumberOfMessages,
        WaitTimeSeconds: this.waitTimeSeconds,
      });

      const { Messages } = await this.client.send(command);

      return (
        Messages?.map((msg) => ({
          body: JSON.parse(msg.Body),
          receiptHandle: msg.ReceiptHandle,
        })) ?? []
      );
    } catch (error) {
      this.logger.error('Error receiving messages', error);
      return [];
    }
  }
}
