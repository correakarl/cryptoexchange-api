# API para Plataforma de Criptomonedas

## 📝 Descripción

API REST para plataforma de compra/venta de criptomonedas con autenticación JWT, gestión de monedas fiduciarias y criptomonedas, y replicación histórica de datos.

## 🛠 Tecnologías Utilizadas

- **Backend**: NestJS
- **Autenticación**: JWT
- **Base de Datos**: PostgreSQL (SQLite para desarrollo)
- **ORM**: TypeORM
- **Documentación**: Swagger UI

## 📋 Requisitos

- Node.js v16+
- PostgreSQL v13+ o SQLite3
- npm o yarn

## 🚀 Instalación

## 1. Clonar el

```bash
git clone https://github.com/correakarl/cryptoexchange-api.git
cd cryptoexchange-api
```

## 2. Instalar dependencias

```bash
$ npm install
```

# 3. Configuración de entorno

Crear archivo .env basado en .env.example:

```
# General
NODE_ENV=development
PORT=3000

# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=crypto_platform

# JWT
JWT_SECRET=tu_super_secreto
JWT_EXPIRATION_TIME=3600
```

## 4. Iniciar servidor

```
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 5. Documentación API

Accede a la documentación interactiva en:
http://localhost:3000/docs
o en el puerto seleccionado

## 6. Autenticación

```
# 6.1 Registra tu cuenta de usuario en el swagger con el bloque de registro o prueba
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@ejemplo.com","password":"Password123"}'


# 6.2 Inicia sesión con la cuenta hasta tener respuesta con el token de autenticación ya sea en el swagger o
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@ejemplo.com","password":"Password123"}'
```

## 7. Crear monedas

Una vez obtenido el token usarlo en el authorize del swagger o copiarlo para usarlo en los endpoints mediante curl

## Listar monedas

```
curl -X GET http://localhost:3000/moneda \
  -H "Authorization: Bearer tu_token_jwt"
```

## Crear moneda

```
curl -X POST http://localhost:3000/moneda \
  -H "Authorization: Bearer tu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{"code":"USD","name":"Dólar Estadounidense","symbol":"$"}'
```

## Listar criptomonedas

```
# con filtro
curl -X GET "http://localhost:3000/criptomoneda?moneda=USD" \
  -H "Authorization: Bearer tu_token_jwt"

# sin filtro
curl -X GET "http://localhost:3000/criptomoneda" \
  -H "Authorization: Bearer tu_token_jwt"
```

## Crear criptomoneda

```
curl -X POST http://localhost:3000/criptomoneda \
  -H "Authorization: Bearer tu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{"code":"BTC","name":"Bitcoin","currentPrice":50000,"currencyId":"3fa85f64-5717-4562-b3fc-2c963f66afa6"}'
```

## 📬 Contacto

Si tienes dudas sobre el proyecto o deseas ver más funcionalidades implementadas:

📧 karl.correa.88@gmail.com  
🐱 [GitHub](https://github.com/correakarl/cryptoexchange-api)

---

> Este proyecto fue realizado como parte de la Prueba Técnica Frontend para **Banking Technologies Consulting, C.A.**
