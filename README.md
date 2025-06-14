<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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


### 1. Clonar el repositorio


### 2. Instalar dependencias
```bash
$ npm install
```

### 3. Configuración de entorno
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

### 4. Iniciar servidor
```
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

### 5. Documentación API
Accede a la documentación interactiva en:
http://localhost:3000/docs 
o en el puerto seleccionado

### 6. Autenticación
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

### 7. Crear monedas
Una vez obtenido el token usarlo en el authorize del swagger o copiarlo para usarlo en los endpoints mediante curl

# Listar monedas
```
curl -X GET http://localhost:3000/moneda \
  -H "Authorization: Bearer tu_token_jwt"
```

# Crear moneda
```
curl -X POST http://localhost:3000/moneda \
  -H "Authorization: Bearer tu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{"code":"USD","name":"Dólar Estadounidense","symbol":"$"}'
```

# Listar criptomonedas
```
# con filtro
curl -X GET "http://localhost:3000/criptomoneda?moneda=USD" \
  -H "Authorization: Bearer tu_token_jwt"

# sin filtro
curl -X GET "http://localhost:3000/criptomoneda" \
  -H "Authorization: Bearer tu_token_jwt"
```

# Crear criptomoneda
```
curl -X POST http://localhost:3000/criptomoneda \
  -H "Authorization: Bearer tu_token_jwt" \
  -H "Content-Type: application/json" \
  -d '{"code":"BTC","name":"Bitcoin","currentPrice":50000,"currencyId":"3fa85f64-5717-4562-b3fc-2c963f66afa6"}'
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
