import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthAuthGuard } from './modules/auth/strategies/jwt-auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    DatabaseModule,
    AuthModule,    // Proporciona servicios de autenticación
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthAuthGuard,
    },
  ],

})
export class AppModule { }