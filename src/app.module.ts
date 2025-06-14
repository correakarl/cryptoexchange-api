// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './core/config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';
import { CryptocurrenciesModule } from './modules/cryptocurrencies/cryptocurrencies.module';
import { HistoryModule } from './modules/history/history.module';
import { ScheduleModule } from '@nestjs/schedule';
import { validateDatabaseConfig } from './core/validators/database-config.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
      validate: validateDatabaseConfig, // Validación personalizada
    }),
    ScheduleModule.forRoot(),
    DatabaseModule.forRoot(), // Inicializa el módulo de base de datos
    AuthModule,
    CurrenciesModule,
    CryptocurrenciesModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}