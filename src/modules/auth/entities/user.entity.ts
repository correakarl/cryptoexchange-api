// src/modules/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único del usuario (UUID)',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string; // Cambiado a string para UUID

  @Column({ unique: true })
  @Index() // Índice para mejor performance en búsquedas
  @ApiProperty({
    description: 'Email del usuario (único)',
    example: 'user@example.com'
  })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Fecha de creación del usuario' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Fecha de última actualización' })
  updatedAt: Date;

  // Constructor para generar UUID automáticamente
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}