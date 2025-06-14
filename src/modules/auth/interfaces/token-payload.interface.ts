// src/modules/auth/interfaces/token-payload.interface.ts

/**
 * Interfaz que define la estructura del payload del token JWT
 * 
 * @property sub - Subject (identificador del usuario)
 * @property email - Email del usuario (puede usarse para identificación)
 * @property iat - Issued at (timestamp de creación del token)
 * @property exp - Expiration (timestamp de expiración del token)
 */
export interface TokenPayload {
  sub: string;    // ID del usuario
  email: string;  // Email del usuario
  iat?: number;   // Fecha de creación (automático)
  exp?: number;   // Fecha de expiración (automático)
}