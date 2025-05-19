import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../services/health.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetHealthResponseDto } from '../responsesDto/get-health.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Check API health status' })
  @ApiResponse({
    status: 200,
    description: 'API is healthy',
    type: GetHealthResponseDto,
  })
  getHealth() {
    return this.healthService.getHealth();
  }
}
