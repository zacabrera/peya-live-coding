import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptorService } from './interceptors/loggin.interceptor';

@Global()
@Module({
  providers: [LoggerService, HttpExceptionFilter, LoggingInterceptorService],
  exports: [LoggerService, HttpExceptionFilter, LoggingInterceptorService],
})
export class CommonModule {}
