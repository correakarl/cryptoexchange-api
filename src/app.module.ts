// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './core/config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';
import { CryptocurrenciesModule } from './modules/cryptocurrencies/cryptocurrencies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    DatabaseModule.forRoot(),
    AuthModule,
    CurrenciesModule,
    CryptocurrenciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}