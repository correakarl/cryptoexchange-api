import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from '../../../core/decorators/public.decorator';

@ApiTags('Auth') // Agrupa los endpoints en Swagger
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public() // Decorador personalizado para excluir de la protección JWT
    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 409, description: 'El email ya está registrado' })
    @ApiBody({ type: RegisterUserDto })
    async register(@Body() registerDto: RegisterUserDto) {
        return this.authService.register(registerDto);
    }

    @Public()
    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({
        status: 200,
        description: 'Token JWT generado',
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string',
                    description: 'Token JWT para autenticación en endpoints protegidos',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTYxNTY5NjIwMCwiZXhwIjoxNjE1NzAyNjAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                }
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    @ApiBody({ type: LoginUserDto })
    async login(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }
}