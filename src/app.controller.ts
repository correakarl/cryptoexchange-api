import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiTags('root')
  @ApiOperation({ summary: 'Verificar estado del servidor' })
  @ApiResponse({ status: 200, description: 'Servidor activo' })
  getHello(): string {
    return 'Servidor funcionando!';
  }

  @Get('health')
  @ApiTags('health')
  @ApiOperation({ summary: 'Verificar estado del servidor' })
  @ApiResponse({ status: 200, description: 'Servidor activo' })
  healthCheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
