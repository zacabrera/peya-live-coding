import { SQSClient } from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { AWS } from 'src/config/environment/env.config';

export const SqsClientProvider = {
  provide: SQSClient,
  useFactory: (configService: ConfigService) => {
    const { region, accessKeyId, secretAccessKey } = configService.get(AWS);

    return new SQSClient({
      region,
      credentials: { accessKeyId, secretAccessKey },
      endpoint: 'https://bcf0-152-170-49-5.ngrok-free.app',
    });
  },
  inject: [ConfigService],
};
