// src/modules/auth/dto/register-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ 
    example: 'user@example.com',
    description: 'Debe ser un email válido y único en el sistema'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, {
    message: 'La contraseña debe contener al menos 1 mayúscula, 1 minúscula y 1 número'
  })
  @ApiProperty({ 
    example: 'Password123',
    description: 'Mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número'
  })
  password: string;
}