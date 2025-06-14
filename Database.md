# Estructura de Base de Datos - Plataforma de Criptomonedas

## Diagrama Entidad-Relación

```mermaid
erDiagram
    USER ||--o{ CURRENCY : creates
    USER ||--o{ CRYPTOCURRENCY : creates
    CURRENCY ||--o{ CRYPTOCURRENCY : "1-n"
    CURRENCY ||--o{ CURRENCY_HISTORY : "1-n"
    CRYPTOCURRENCY ||--o{ CRYPTOCURRENCY_HISTORY : "1-n"

    USER {
        uuid id PK
        string email UK
        string password
        datetime createdAt
        datetime updatedAt
    }

    CURRENCY {
        uuid id PK
        string(3) code UK
        string name
        string symbol
        datetime createdAt
        datetime updatedAt
    }

    CRYPTOCURRENCY {
        uuid id PK
        string code UK
        string name
        decimal(18,8) currentPrice
        uuid currencyId FK
        datetime createdAt
        datetime updatedAt
    }

    CURRENCY_HISTORY {
        uuid id PK
        uuid originalId
        string code
        string name
        string symbol
        datetime validFrom
        datetime validTo
    }

    CRYPTOCURRENCY_HISTORY {
        uuid id PK
        uuid originalId
        string code
        string name
        decimal(18,8) price
        string currencyCode
        datetime validFrom
        datetime validTo
    }
    
```

### Descripcion detallada de las tablas

# Tabla User
```
CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);
```

# Tabla Currency
```
CREATE TABLE "currency" (
  "id" uuid PRIMARY KEY,
  "code" varchar(3) UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "symbol" varchar NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now()
);
```


# Tabla Criptocurrency
```
CREATE TABLE "cryptocurrency" (
  "id" uuid PRIMARY KEY,
  "code" varchar(10) UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "currentPrice" decimal(18,8) NOT NULL,
  "currencyId" uuid NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT now(),
  "updatedAt" timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY ("currencyId") REFERENCES "currency" ("id") ON DELETE CASCADE
);
```



# Tabla Currency History
```
CREATE TABLE "currency_history" (
  "id" uuid PRIMARY KEY,
  "originalId" uuid NOT NULL,
  "code" varchar(3) NOT NULL,
  "name" varchar NOT NULL,
  "symbol" varchar NOT NULL,
  "validFrom" timestamptz NOT NULL,
  "validTo" timestamptz,
  FOREIGN KEY ("originalId") REFERENCES "currency" ("id")
);
```



# Tabla Criptocurrency History
```
CREATE TABLE "cryptocurrency_history" (
  "id" uuid PRIMARY KEY,
  "originalId" uuid NOT NULL,
  "code" varchar(10) NOT NULL,
  "name" varchar NOT NULL,
  "price" decimal(18,8) NOT NULL,
  "currencyCode" varchar(3) NOT NULL,
  "validFrom" timestamptz NOT NULL,
  "validTo" timestamptz,
  FOREIGN KEY ("originalId") REFERENCES "cryptocurrency" ("id")
);
```
