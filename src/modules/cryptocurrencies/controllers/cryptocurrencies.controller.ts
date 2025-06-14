// src/modules/cryptocurrencies/controllers/cryptocurrencies.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CryptocurrenciesService } from '../services/cryptocurrencies.service';
import { CreateCryptocurrencyDto } from '../dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from '../dto/update-cryptocurrency.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { Cryptocurrency } from '../entities/cryptocurrency.entity';

@ApiTags('Criptomonedas')
@ApiBearerAuth()
@Controller('criptomoneda') // Usamos el nombre exacto del requerimiento
@UseGuards(JwtAuthGuard)
export class CryptocurrenciesController {
  constructor(private readonly cryptocurrenciesService: CryptocurrenciesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva criptomoneda' })
  @ApiResponse({
    status: 201,
    description: 'Criptomoneda creada exitosamente',
    type: Cryptocurrency,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Moneda asociada no encontrada' })
  create(@Body() createCryptocurrencyDto: CreateCryptocurrencyDto) {
    return this.cryptocurrenciesService.create(createCryptocurrencyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las criptomonedas' })
  @ApiQuery({
    name: 'moneda',
    required: false,
    description: 'Filtrar por código de moneda (ej: USD)',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de criptomonedas',
    type: [Cryptocurrency],
  })
  findAll(@Query('moneda') currencyCode?: string) {
    return this.cryptocurrenciesService.findAll(currencyCode);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una criptomoneda por ID' })
  @ApiResponse({
    status: 200,
    description: 'Criptomoneda encontrada',
    type: Cryptocurrency,
  })
  @ApiResponse({ status: 404, description: 'Criptomoneda no encontrada' })
  findOne(@Param('id') id: string) {
    return this.cryptocurrenciesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una criptomoneda' })
  @ApiResponse({
    status: 200,
    description: 'Criptomoneda actualizada',
    type: Cryptocurrency,
  })
  @ApiResponse({ status: 404, description: 'Criptomoneda no encontrada' })
  update(
    @Param('id') id: string,
    @Body() updateCryptocurrencyDto: UpdateCryptocurrencyDto,
  ) {
    return this.cryptocurrenciesService.update(id, updateCryptocurrencyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una criptomoneda' })
  @ApiResponse({ status: 200, description: 'Criptomoneda eliminada' })
  @ApiResponse({ status: 404, description: 'Criptomoneda no encontrada' })
  remove(@Param('id') id: string) {
    return this.cryptocurrenciesService.remove(id);
  }
}