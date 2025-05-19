import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetHealthResponseDto {
  @ApiProperty({ example: 'ok' })
  @IsString()
  status: string;

  @ApiProperty({ example: '2025-05-17T19:28:26.999Z' })
  @IsString()
  timeStamp: string;
}
