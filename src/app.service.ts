// src/app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '¡Hola Mundo! Servidor activo - Crypto Trading API';
  }

  healthCheck(): { status: string } {
    return { status: 'ok' };
  }
}