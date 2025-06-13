import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
    async register(@Body() createUserDto: CreateUserDto): Promise<any> {
        const result = await this.authService.register(createUserDto);
        return {
            statusCode: HttpStatus.CREATED,
            message: 'User registered successfully',
            ...result,
        };
    }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({ status: 200, description: 'Login exitoso' })
    async login(@Body() loginAuthDto: LoginAuthDto): Promise<any> {
        const result = await this.authService.login(loginAuthDto);
        return {
            statusCode: HttpStatus.OK,
            message: 'Login successful',
            ...result,
        };
    }
}