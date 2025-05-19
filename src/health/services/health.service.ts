import { Injectable } from '@nestjs/common';

import { IGetHealthResponse } from '../interfaces/health.interface';
import { LoggerService } from 'src/common/logger/logger.service';

@Injectable()
export class HealthService {
  constructor(private readonly logger: LoggerService) {}

  public getHealth(): IGetHealthResponse {
    this.logger.log('Getting Health...');
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
