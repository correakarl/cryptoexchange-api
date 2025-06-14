// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Configuración global
  const globalPrefix = configService.get<string>(
    'config.app.globalPrefix',
    'api',
  );
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configuración Swagger
  if (configService.get<boolean>('config.swagger.enabled', true)) {
    const config = new DocumentBuilder()
      .setTitle(
        configService.get<string>('config.swagger.title', 'API Documentation'),
      )
      .setDescription('Incluye sistema de replicación histórica')
      .setDescription(
        configService.get<string>(
          'config.swagger.description',
          'API description',
        ),
      )
      .setVersion(configService.get<string>('config.swagger.version', '1.0'))
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const swaggerPath = configService.get<string>(
      'config.swagger.path',
      'docs',
    );
    SwaggerModule.setup(swaggerPath, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }

  const port = configService.get<number>('config.app.port', 3000);
  await app.listen(port);
  console.log(
    `Application is running on: ${await app.getUrl()}/${globalPrefix}`,
  );
  console.log(
    `Swagger docs available at: ${await app.getUrl()}/${configService.get<string>('config.swagger.path', 'docs')}`,
  );
}
bootstrap();
