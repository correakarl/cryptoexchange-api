import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async register(createUserDto: any): Promise<{ accessToken: string }> {
        const { email, password } = createUserDto;
        const existingUser = await this.userRepository.findOne({ where: { email } });

        if (existingUser) {
            throw new UnauthorizedException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ email, password: hashedPassword });
        await this.userRepository.save(user);

        return this.generateToken(user);
    }

    async login(loginAuthDto: any): Promise<{ accessToken: string }> {
        const { email, password } = loginAuthDto;
        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return this.generateToken(user);
    }

    private generateToken(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}