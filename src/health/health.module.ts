import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { HealthService } from './services/health.service';
import { SqsModule } from 'src/aws/sqs/sqs.module';

@Module({
  imports: [SqsModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
