import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CurrenciesService } from '../services/currencies.service';
import { CreateCurrencyDto } from '../dto/create-currency.dto';
import { UpdateCurrencyDto } from '../dto/update-currency.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Currency } from '../entities/currency.entity';

@ApiTags('Monedas Fiduciarias')
@ApiBearerAuth()
@Controller('moneda') // Usamos el endpoint especificado en la prueba
@UseGuards(JwtAuthGuard)
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva moneda' })
  @ApiResponse({
    status: 201,
    description: 'Moneda creada exitosamente',
    type: Currency,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 409, description: 'El código de moneda ya existe' })
  create(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currenciesService.create(createCurrencyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las monedas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de monedas obtenida',
    type: [Currency],
  })
  findAll() {
    return this.currenciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una moneda por ID' })
  @ApiResponse({
    status: 200,
    description: 'Moneda encontrada',
    type: Currency,
  })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada' })
  findOne(@Param('id') id: string) {
    return this.currenciesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una moneda' })
  @ApiResponse({
    status: 200,
    description: 'Moneda actualizada',
    type: Currency,
  })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada' })
  update(@Param('id') id: string, @Body() updateCurrencyDto: UpdateCurrencyDto) {
    return this.currenciesService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una moneda' })
  @ApiResponse({ status: 200, description: 'Moneda eliminada' })
  @ApiResponse({ status: 404, description: 'Moneda no encontrada' })
  remove(@Param('id') id: string) {
    return this.currenciesService.remove(id);
  }
}