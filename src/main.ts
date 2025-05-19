import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { APP } from './config/environment/env.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestMethod } from '@nestjs/common';
import { LoggingInterceptorService } from './common/interceptors/loggin.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerFilter = app.get(HttpExceptionFilter);
  const loggerInterceptor = app.get(LoggingInterceptorService);

  app.useGlobalFilters(loggerFilter);
  app.useGlobalInterceptors(loggerInterceptor);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.ALL }],
  });

  const config = new DocumentBuilder()
    .setTitle('API de Pedidos ya Live coding')
    .setDescription('Documentación de la API de prueba para entrevista')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>(`${APP}.port`, 3001);

  await app.listen(port);
  console.log(`App running on port ${port}`);
}

void bootstrap();
