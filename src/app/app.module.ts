import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from 'src/config/environment/env.config';
import { EnvValidationSchema } from 'src/config/environment/env.validation';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule } from '@nestjs/throttler';
import { HealthModule } from 'src/health/health.module';
import { CommonModule } from 'src/common/common.module';
import { DatabaseConfigModule } from 'src/config/database/database-config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from 'src/config/database/database-config.service';
import { SqsModule } from 'src/aws/sqs/sqs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: EnvValidationSchema,
      envFilePath: '.env',
    }),
    CacheModule.register({ isGlobal: true, ttl: 30, max: 100 }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: (configService: DatabaseConfigService) =>
        configService.getConfig(),
      inject: [DatabaseConfigService],
    }),
    DatabaseConfigModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          limit: 10,
          ttl: 60,
        },
      ],
    }),
    HealthModule,
    CommonModule,
    SqsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
