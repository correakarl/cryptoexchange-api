// src/modules/auth/services/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto) {
    // Verificar si el email ya existe
    const existingUser = await this.usersRepository.findOne({ 
      where: { email: registerDto.email } 
    });
    
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = new User(); // Usamos el constructor que genera UUID
    
    user.email = registerDto.email;
    user.password = hashedPassword;

    const savedUser = await this.usersRepository.save(user);
    const { password, ...result } = savedUser;
    return result;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({ 
      where: { email: loginDto.email } 
    });
    
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: TokenPayload = { 
      sub: user.id, // Ahora usa el UUID
      email: user.email 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserById(userId: string) { // Cambiado a string
    return this.usersRepository.findOne({ where: { id: userId } });
  }
}