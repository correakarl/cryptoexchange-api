import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug', 'verbose'] });
  const configService = app.get(ConfigService);

  // Configuración global de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('CryptoExchange API')
    .setDescription('API para gestión de criptomonedas y monedas fiduciarias')
    .setVersion('1.0')
    .addTag('auth', 'Autenticación de usuarios')
    .addTag('currency', 'Gestión de monedas fiduciarias')
    .addTag('cryptocurrency', 'Gestión de criptomonedas')
    .addTag('historical', 'Datos históricos')
    .addBearerAuth() // Agrega soporte para JWT en la UI
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Mantiene el token JWT entre recargas
    },
  });

  // Configuración de tamaño máximo de payload
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Habilitar CORS para desarrollo
  app.enableCors({
    origin: configService.get('CORS_ORIGIN', '*'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Puerto dinámico o por defecto 3000
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  // Inicia el servidor
  await app.listen(port);

  // Obtiene la URL completa donde está escuchando
  const url = await app.getUrl();
  console.log(`✅ Servidor corriendo en: ${url}`);
  console.log(`📄 Documentación disponible en: ${url}/docs`);

}
bootstrap();
