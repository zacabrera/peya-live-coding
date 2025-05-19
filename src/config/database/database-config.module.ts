import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  EnvValidationSchema,
  EnvConfiguration,
} from './database-config.config';
import { DatabaseConfigService } from './database-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: EnvValidationSchema,
      load: [EnvConfiguration],
    }),
  ],
  providers: [DatabaseConfigService],
  exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
