// src/modules/cryptocurrencies/controllers/cryptocurrencies.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CryptocurrenciesService } from '../services/cryptocurrencies.service';
import { CreateCryptocurrencyDto } from '../dto/create-cryptocurrency.dto';
import { UpdateCryptocurrencyDto } from '../dto/update-cryptocurrency.dto';
import { Cryptocurrency } from '../entities/cryptocurrency.entity';

@ApiTags('Criptomonedas')
@ApiBearerAuth()
@Controller('criptomoneda')
@UseGuards(JwtAuthGuard)
export class CryptocurrenciesController {
  constructor(
    private readonly cryptocurrenciesService: CryptocurrenciesService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear nueva criptomoneda',
    description: 'Crea una nueva criptomoneda asociada a una moneda existente',
  })
  @ApiBody({ type: CreateCryptocurrencyDto })
  @ApiResponse({
    status: 201,
    description: 'Criptomoneda creada exitosamente',
    type: Cryptocurrency,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Moneda asociada no encontrada',
  })
  async create(@Body() createCryptocurrencyDto: CreateCryptocurrencyDto) {
    return this.cryptocurrenciesService.create(createCryptocurrencyDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar criptomonedas',
    description: 'Obtiene todas las criptomonedas o filtra por código de moneda',
  })
  @ApiQuery({
    name: 'moneda',
    required: false,
    type: String,
    description: 'Código de moneda para filtrar (ej: USD, EUR)',
    example: 'USD',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de criptomonedas',
    type: [Cryptocurrency],
  })
  async findAll(@Query('moneda') currencyCode?: string) {
    if (currencyCode) {
      return this.cryptocurrenciesService.findAllByCurrency(currencyCode);
    }
    return this.cryptocurrenciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener criptomoneda por ID',
    description: 'Obtiene los detalles de una criptomoneda específica',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la criptomoneda (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles de la criptomoneda',
    type: Cryptocurrency,
  })
  @ApiResponse({
    status: 404,
    description: 'Criptomoneda no encontrada',
  })
  async findOne(@Param('id') id: string) {
    return this.cryptocurrenciesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar criptomoneda',
    description: 'Actualiza los datos de una criptomoneda existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la criptomoneda a actualizar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateCryptocurrencyDto })
  @ApiResponse({
    status: 200,
    description: 'Criptomoneda actualizada',
    type: Cryptocurrency,
  })
  @ApiResponse({
    status: 404,
    description: 'Criptomoneda o moneda asociada no encontrada',
  })
  async update(
    @Param('id') id: string,
    @Body() updateCryptocurrencyDto: UpdateCryptocurrencyDto,
  ) {
    return this.cryptocurrenciesService.update(id, updateCryptocurrencyDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar criptomoneda',
    description: 'Elimina una criptomoneda del sistema',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la criptomoneda a eliminar',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Criptomoneda eliminada',
  })
  @ApiResponse({
    status: 404,
    description: 'Criptomoneda no encontrada',
  })
  async remove(@Param('id') id: string) {
    return this.cryptocurrenciesService.remove(id);
  }
}