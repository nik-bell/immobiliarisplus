<div align="center">

# Backend - Immobiliaris Plus

### Laboratorio Integrato Gruppo 9

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)

</div>

---

## Team

| Membro | Ruolo | GitHub Name |
|--------|-------|-------|
| **Nesma Abd El Aziz** | Backend Developer | **NesmaAbd**
| **Nicolas Bellotti** | Backend Developer | **nik-bell**
| **Maria Cernat** | Backend Developer | **mariacernat**

> **Mentor** : Vincent Franciosa | V1n5Fr4n

---

## Indice

- [Descrizione del Progetto](#descrizione-del-progetto)
- [Architettura e Approccio Tecnico](#architettura-e-approccio-tecnico)
- [Stack Tecnologico](#stack-tecnologico)
- [Requisiti di Sistema](#requisiti-di-sistema)
- [Installazione e Configurazione](#installazione-e-configurazione)
- [Avvio del Progetto](#avvio-del-progetto)
- [Struttura del Progetto](#struttura-del-progetto)
- [API Endpoints](#api-endpoints)
- [Database e Migrazioni](#database-e-migrazioni)
- [Docker](#docker)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

---

## ◆ Descrizione del Progetto

**Immobiliaris Plus** è un portale immobiliare completo sviluppato per gestire proprietà, contratti esclusivi, valutazioni immobiliari e notifiche utente. Il sistema offre funzionalità avanzate per agenzie immobiliari, proprietari e potenziali acquirenti.

### Caratteristiche Principali

<table>
<tr>
<td width="50%">

**Core Features**
- **Gestione Proprietà**: CRUD completo per immobili con supporto foto e documenti
- **Gestione Utenti**: Autenticazione JWT con ruoli (Admin, Employee, Owner, User)
- **Contratti Esclusivi**: Gestione contratti tra proprietari e agenzia
- **Valutazione Immobili**: Sistema di valutazione automatica basato su prezzi medi al metro quadro

</td>
<td width="50%">

**Technical Features**
- **Notifiche Email**: Invio automatico email tramite Brevo SMTP
- **Sicurezza**: Spring Security con JWT tokens
- **Monitoring**: Actuator endpoints per monitoraggio applicazione
- **Database**: MySQL con Flyway migrations

</td>
</tr>
</table>

---

## ◆ Architettura e Approccio Tecnico

### Pattern Architetturale

Il backend è sviluppato seguendo l'**architettura a strati (Layered Architecture)** con separazione delle responsabilità:

```
┌─────────────────────────────────────┐
│      Presentation Layer             │
│   (Controllers / REST API)          │
├─────────────────────────────────────┤
│      Business Logic Layer           │
│         (Services)                  │
├─────────────────────────────────────┤
│      Data Access Layer              │
│    (Repositories / JPA)             │
├─────────────────────────────────────┤
│      Database Layer                 │
│         (MySQL 8.0)                 │
└─────────────────────────────────────┘
```

### Principi di Design Applicati

1. **Separation of Concerns (SoC)**: Ogni layer ha responsabilità ben definite
2. **Dependency Injection**: Spring IoC container gestisce le dipendenze
3. **DTO Pattern**: Utilizzo di Data Transfer Objects per disaccoppiare API da entità
4. **Repository Pattern**: Astrazione per l'accesso ai dati
5. **RESTful API Design**: Endpoint seguono principi REST
6. **Security by Design**: Autenticazione e autorizzazione su tutti gli endpoint sensibili

### Componenti Principali

#### 1. **Controllers (Presentation Layer)**
Gestiscono le richieste HTTP e restituiscono le risposte JSON.

- `AuthController`: Autenticazione (login, registrazione, password reset)
- `PropertyController`: Gestione immobili
- `UserController`: Gestione utenti e profili
- `OwnerController`: Operazioni specifiche per proprietari
- `EmployeeController`: Gestione dipendenti agenzia
- `PropertyValuationController`: Valutazioni immobiliari
- `ExclusiveContractController`: Contratti esclusivi
- `NotificationController`: Gestione notifiche

#### 2. **Services (Business Logic Layer)**
Implementano la logica di business dell'applicazione.

- `AuthService`: Logica autenticazione e gestione token JWT
- `PropertyService`: Business logic per immobili
- `UserService`: Gestione utenti e permessi
- `AutoMailService`: Invio email automatiche
- `PricePerMqService`: Calcolo prezzi medi al mq

#### 3. **Repositories (Data Access Layer)**
Interfacce JPA per l'accesso al database.

- Estensione di `JpaRepository<Entity, ID>`
- Query personalizzate con `@Query` annotation
- Supporto per query derivate dai nomi dei metodi

#### 4. **Entities (Domain Model)**
Rappresentazione delle tabelle del database.

- `User`: Utente del sistema
- `Owner`: Proprietario immobili
- `Employee`: Dipendente agenzia
- `Property`: Immobile
- `PropertyAddress`: Indirizzo immobile
- `PropertyPhoto`: Foto immobile
- `PropertyDocs`: Documenti immobile
- `PropertyValuation`: Valutazione immobile
- `ExclusiveContract`: Contratto esclusivo
- `Notification`: Notifica utente
- `UserToken`: Token per reset password
- `PricePerMq`: Prezzo medio al mq per zona

#### 5. **DTOs (Data Transfer Objects)**
Oggetti per trasferimento dati tra client e server, disaccoppiati dalle entità.

#### 6. **Mappers**
Utilizzo di **MapStruct** per conversione automatica Entity ↔ DTO.

#### 7. **Security**
- `SecurityConfig`: Configurazione Spring Security
- `JwtTokenProvider`: Generazione e validazione JWT tokens
- `CustomUserDetailsService`: Caricamento dettagli utente per autenticazione
- Filtri di sicurezza per validazione token su ogni richiesta

#### 8. **Configuration**
- `CorsConfig`: Configurazione CORS per frontend
- `application.properties`: Configurazione centralizzata

### Database Design

Il database segue i principi di **normalizzazione** (3NF) con:

- **Integrità referenziale**: Foreign keys tra tabelle correlate
- **Flyway Migrations**: Versionamento schema database
- **Naming Conventions**: Snake_case per tabelle e colonne
- **Indexes**: Su colonne frequentemente interrogate

### Migration Strategy (Flyway)

Le migrazioni database sono gestite con Flyway:

```
V1__create_table_owner.sql
V2__create_table_user.sql
V3__create_table_employee.sql
V4__create_table_property.sql
V5__create_table_property_address.sql
V6__create_table_property_photo.sql
V7__create_table_property_docs.sql
V8__create_table_property_valuation.sql
V9__create_table_exclusive_contract.sql
V10__create_table_notifications.sql
V11__create_table_user_tokens.sql
V17__create_table_avg_price_mq.sql
V12__insert_into_owner.sql
V13__insert_into_user.sql
V14__insert_into_employee.sql
V15__insert_into_property.sql
V16__insert_into_exclusive_contract.sql
V18__insert_into_avg_price_mq.sql
```

### Security Implementation

#### JWT Authentication Flow

```
1. User invia credenziali → POST /api/auth/login
2. Backend valida credenziali
3. Backend genera JWT token (validity: 24h)
4. Client salva token (localStorage/sessionStorage)
5. Ogni richiesta include header: Authorization: Bearer <token>
6. Filter intercetta richiesta e valida token
7. Se valido → processa richiesta
   Se invalido → 401 Unauthorized
```

#### Password Security
- Hashing con **BCrypt** (Spring Security)
- Nessuna password in chiaro nel database
- Reset password tramite token temporaneo via email

---

## ◆ Stack Tecnologico

<table>
<tr>
<td width="33%">

### Backend Framework
```
Java 17 (LTS)
Spring Boot 3.5.7
├── Spring Web
├── Spring Data JPA
├── Spring Security
├── Spring Actuator
├── Spring DevTools
├── Spring Validation
└── Spring Mail
```

</td>
<td width="33%">

### Database & ORM
```
MySQL 8.0.36
Flyway Migrations
Hibernate/JPA
MapStruct 1.5.5
Lombok
```

### Build & Deploy
```
Maven 3.9+
Docker
Docker Compose
```

</td>
<td width="34%">

### Security
```
JWT (jjwt 0.11.5)
BCrypt Hashing
Spring Security
```

### Email Service
```
Brevo SMTP
Spring Mail
```

### Monitoring
```
Actuator Endpoints
Health Checks
Metrics
```

</td>
</tr>
</table>

---

## ◆ Requisiti di Sistema

<table>
<tr>
<td width="50%">

### Opzione 1: Esecuzione Locale

#### Software Richiesto
| Componente | Versione | Verifica |
|------------|----------|----------|
| **JDK** | 17+ | `java -version` |
| **Maven** | 3.9+ | `mvn -version` |
| **MySQL** | 8.0+ | `mysql --version` |

**[DOWNLOAD]**:
- [Oracle JDK](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) / [OpenJDK](https://adoptium.net/)
- [Maven](https://maven.apache.org/download.cgi)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

</td>
<td width="50%">

### Opzione 2: Docker (Consigliata)

#### Software Richiesto
| Componente | Versione | Verifica |
|------------|----------|----------|
| **Docker Desktop** | 4.0+ | `docker --version` |
| **Docker Compose** | Incluso | `docker compose version` |

**[DOWNLOAD]**:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

</td>
</tr>
</table>

### Requisiti Hardware Minimi

| Componente | Minimo | Consigliato |
|------------|--------|-------------|
| **RAM** | 4 GB | 8 GB |
| **Disco** | 2 GB | 5 GB |
| **CPU** | Dual-core | Quad-core |

---

## ◆ Installazione e Configurazione

### 1. Clone del Repository

```bash
git clone <repository-url>
cd immobiliarisplus
```

### 2. Configurazione Variabili d'Ambiente

#### File: `backend/src/main/resources/application.properties`

Configurare i seguenti parametri:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3307/immobiliarisplus
spring.datasource.username=user
spring.datasource.password=secret

# JWT Configuration
jwt.secret=<your-base64-encoded-secret>
jwt.expiration=86400000  # 24 hours in milliseconds

# Email Configuration (Brevo SMTP)
spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=<your-brevo-username>
spring.mail.password=<your-brevo-password>
app.mail.from=<verified-sender-email>

# CORS Configuration
spring.web.cors.allowed-origins=http://localhost:5173
```

#### Generare JWT Secret

```bash
# Linux/Mac
echo -n 'your-super-secret-key-at-least-256-bits-long' | base64

# Windows PowerShell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('your-super-secret-key-at-least-256-bits-long'))
```

### 3. Setup Database

Il backend supporta diverse configurazioni database a seconda del metodo di esecuzione:

#### Configurazione Porte Database

| Scenario | Porta MySQL | Configurazione application.properties |
|----------|-------------|---------------------------------------|
| **MySQL Locale** | 3306 | `jdbc:mysql://localhost:3306/immobiliarisplus` |
| **MySQL Docker** | 3307 | `jdbc:mysql://localhost:3307/immobiliarisplus` |
| **Backend Docker** | 3306 | `jdbc:mysql://database:3306/immobiliarisplus` |

> **IMPORTANTE**: La configurazione attuale punta a `localhost:3307` (Docker). Per esecuzione completamente locale, modificare la porta a `3306`.

#### Opzione A: MySQL Locale (Porta 3306)

**1. Installare MySQL 8.0+**
- Download: [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

**2. Avviare MySQL**
```bash
# Windows (MySQL Service)
net start MySQL80

# Linux/Mac
sudo systemctl start mysql
# o
sudo service mysql start
```

**3. Creare Database**
```sql
CREATE DATABASE immobiliarisplus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON immobiliarisplus.* TO 'user'@'localhost';
FLUSH PRIVILEGES;
```

**4. Modificare `application.properties`**
```properties
# Cambiare porta da 3307 a 3306
spring.datasource.url=jdbc:mysql://localhost:3306/immobiliarisplus
```

#### Opzione B: MySQL Docker + Backend Locale (Porta 3307)

**1. Avviare solo il container database**
```bash
docker compose up database
```

**2. Lasciare configurazione attuale** (porta 3307)
```properties
# Configurazione già corretta per Docker database
spring.datasource.url=jdbc:mysql://localhost:3307/immobiliarisplus
```

**3. Backend locale**
```bash
cd backend
mvn spring-boot:run
```

> **Nota**: Questa opzione è raccomandata per sviluppo locale senza installare MySQL

### 4. Installazione Dipendenze

```bash
cd backend
mvn clean install
```

Questo comando:
- Scarica tutte le dipendenze Maven
- Compila il progetto
- Esegue i test (se presenti)
- Crea il file JAR eseguibile

---

## ◆ Avvio del Progetto

### [SETUP] Scelta Rapida del Metodo di Avvio

<table>
<tr>
<th>Metodo</th>
<th>Backend</th>
<th>Database</th>
<th>Porte</th>
<th>Configurazione</th>
</tr>
<tr>
<td><b>1. Docker Compose</b><br/><i>(Produzione)</i></td>
<td>Docker</td>
<td>Docker</td>
<td>BE: 8081<br/>DB: 3307</td>
<td>[OK] Pronta</td>
</tr>
<tr>
<td><b>2. Completamente Locale</b></td>
<td>Locale</td>
<td>MySQL</td>
<td>BE: 8080<br/>DB: 3306</td>
<td>[!] Modifica porta</td>
</tr>
<tr>
<td><b>3. Ibrido</b><br/><i>(Sviluppo)</i></td>
<td>Locale</td>
<td>Docker</td>
<td>BE: 8080<br/>DB: 3307</td>
<td>[OK] Pronta</td>
</tr>
</table>

---

### Opzione 1: Avvio con Docker Compose (Consigliato per Produzione)

Il modo più semplice per avviare l'intero stack (backend + database):

```bash
# Dalla root del progetto
cd immobiliarisplus
docker compose up --build
```

#### [PROCESS] Processo di Avvio

```mermaid
graph LR
    A[Docker Compose] --> B[MySQL 8.0.36]
    A --> C[Build Backend]
    C --> D[Maven Compile]
    D --> E[Docker Image]
    E --> F[Container Backend]
    B --> G[Flyway Migrations]
    F --> H[Backend API :8081]
```

<details>
<summary><b>Servizi Disponibili</b></summary>

| Servizio | URL | Descrizione |
|----------|-----|-------------|
| **Backend API** | `http://localhost:8081` | REST API principale |
| **Database MySQL** | `localhost:3307` | Database server |
| **Health Check** | `http://localhost:8081/actuator/health` | Stato applicazione |

</details>

<details>
<summary><b>Comandi Docker Compose</b></summary>

```bash
# Avvio in background
docker compose up -d

# Visualizza logs
docker compose logs -f backend
docker compose logs -f database

# Stop containers
docker compose down

# Stop e rimozione volumi (reset database)
docker compose down -v

# Rebuild solo backend
docker compose up --build backend
```

</details>

---

### Opzione 2: Avvio Completamente Locale (Sviluppo)

> **[!] Nota**: Per questa opzione serve MySQL installato localmente sulla porta 3306.

<details>
<summary><b>Pre-requisiti e Configurazione</b></summary>

#### Checklist Pre-requisiti
- [ ] MySQL installato e avviato (porta 3306)
- [ ] Database `immobiliarisplus` creato
- [ ] `application.properties` modificato (porta 3306)

Modificare `backend/src/main/resources/application.properties`:

```properties
# Cambiare da porta 3307 (Docker) a 3306 (locale)
spring.datasource.url=jdbc:mysql://localhost:3306/immobiliarisplus
```

#### Avvio con Maven

```bash
cd backend
mvn spring-boot:run
```

#### Avvio con JAR

```bash
cd backend
mvn clean package -DskipTests
java -jar target/immobiliarisplus-0.0.1-SNAPSHOT.jar
```

#### Avvio con IDE (IntelliJ IDEA / Eclipse)

1. Importare il progetto Maven
2. Configurare JDK 17
3. Eseguire `ImmobiliarisplusApplication.java` (main class)

**Backend disponibile su:** `http://localhost:8080`

> **Differenza porte**:
> - **Locale**: `http://localhost:8080` (porta di default Spring Boot)
> - **Docker**: `http://localhost:8081` (configurata in docker-compose.yml)

### Opzione 3: Backend Locale + Database Docker (Consigliato per Sviluppo)

> **Soluzione ibrida raccomandata**: Non richiede installazione MySQL locale, permettendo sviluppo rapido del backend.

#### Caratteristiche
- Installazione MySQL locale non richiesta
- Hot reload del backend con DevTools
- Database persistente con Docker
- Configurazione predefinita (porta 3307)

#### [QUICK START] Procedura Avvio Rapido

```bash
# 1. Avviare database Docker
docker compose up database

# 2. In un altro terminale, avviare backend locale
cd backend
mvn spring-boot:run
```

[OK] **Backend disponibile su:** `http://localhost:8080`

> **Configurazione**: Nessuna modifica necessaria - porta 3307 già configurata

</details>

---

## ◆ Struttura del Progetto

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── novegruppo/
│   │   │           └── immobiliarisplus/
│   │   │               ├── config/                 # Configurazioni Spring
│   │   │               │   ├── CorsConfig.java
│   │   │               │   └── SecurityConfig.java
│   │   │               ├── controllers/            # REST Controllers
│   │   │               │   ├── AuthController.java
│   │   │               │   ├── PropertyController.java
│   │   │               │   ├── UserController.java
│   │   │               │   ├── OwnerController.java
│   │   │               │   ├── EmployeeController.java
│   │   │               │   ├── PropertyValuationController.java
│   │   │               │   ├── ExclusiveContractController.java
│   │   │               │   ├── NotificationController.java
│   │   │               │   ├── PropertyAddressController.java
│   │   │               │   ├── PropertyPhotoController.java
│   │   │               │   ├── PropertyDocsController.java
│   │   │               │   ├── PricePerMqController.java
│   │   │               │   └── UserTokenController.java
│   │   │               ├── dtos/                   # Data Transfer Objects
│   │   │               │   ├── request/
│   │   │               │   └── response/
│   │   │               ├── entities/               # JPA Entities
│   │   │               │   ├── User.java
│   │   │               │   ├── Owner.java
│   │   │               │   ├── Employee.java
│   │   │               │   ├── Property.java
│   │   │               │   ├── PropertyAddress.java
│   │   │               │   ├── PropertyPhoto.java
│   │   │               │   ├── PropertyDocs.java
│   │   │               │   ├── PropertyValuation.java
│   │   │               │   ├── ExclusiveContract.java
│   │   │               │   ├── Notification.java
│   │   │               │   ├── UserToken.java
│   │   │               │   └── PricePerMq.java
│   │   │               ├── enums/                  # Enumerations
│   │   │               ├── exceptions/             # Custom Exceptions
│   │   │               ├── mappers/                # MapStruct Mappers
│   │   │               ├── repositories/           # JPA Repositories
│   │   │               ├── security/               # Security Components
│   │   │               │   ├── JwtTokenProvider.java
│   │   │               │   ├── CustomUserDetailsService.java
│   │   │               │   └── JwtAuthenticationFilter.java
│   │   │               ├── services/               # Business Logic Services
│   │   │               │   ├── AuthService.java
│   │   │               │   ├── PropertyService.java
│   │   │               │   ├── UserService.java
│   │   │               │   ├── AutoMailService.java
│   │   │               │   ├── PricePerMqService.java
│   │   │               │   └── impl/               # Service Implementations
│   │   │               └── ImmobiliarisplusApplication.java
│   │   └── resources/
│   │       ├── application.properties              # Configurazione principale
│   │       ├── db/
│   │       │   └── migration/                      # Flyway Migrations
│   │       │       ├── V1__create_table_owner.sql
│   │       │       ├── V2__create_table_user.sql
│   │       │       └── ... (altri script SQL)
│   │       └── static/                             # File statici (se necessari)
│   └── test/
│       └── java/                                   # Test unitari e integrazione
├── target/                                         # Compilato (generato)
├── .gitattributes
├── Dockerfile                                      # Docker image definition
├── mvnw                                            # Maven Wrapper (Unix)
├── mvnw.cmd                                        # Maven Wrapper (Windows)
├── pom.xml                                         # Maven configuration
└── README.md                                       # Questa documentazione
```

---

## ◆ API Endpoints

### [BASE URL] Endpoint Configuration

<table>
<tr>
<td width="50%">

**Esecuzione Locale**
```
http://localhost:8080
```
`mvn spring-boot:run`

</td>
<td width="50%">

**Esecuzione Docker**
```
http://localhost:8081
```
`docker compose up`

</td>
</tr>
</table>

---

### [AUTH] Authentication Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registrazione nuovo utente | No |
| POST | `/api/auth/login` | Login utente | No |
| POST | `/api/auth/forgot-password` | Richiesta reset password | No |
| POST | `/api/auth/reset-password` | Reset password con token | No |

### [USER] User Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Lista utenti | Sì (ADMIN) |
| GET | `/api/users/{id}` | Dettaglio utente | Sì |
| PUT | `/api/users/{id}` | Aggiorna utente | Sì |
| DELETE | `/api/users/{id}` | Elimina utente | Sì (ADMIN) |
| GET | `/api/users/me` | Profilo utente corrente | Sì |

### [PROPERTY] Property Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/api/properties` | Lista proprietà | No |
| GET | `/api/properties/{id}` | Dettaglio proprietà | No |
| POST | `/api/properties` | Crea proprietà | Sì (EMPLOYEE) |
| PUT | `/api/properties/{id}` | Aggiorna proprietà | Sì (EMPLOYEE) |
| DELETE | `/api/properties/{id}` | Elimina proprietà | Sì (ADMIN) |
| GET | `/api/properties/search` | Ricerca proprietà | No |

### [OWNER] Owner Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/api/owners` | Lista proprietari | Sì (EMPLOYEE) |
| GET | `/api/owners/{id}` | Dettaglio proprietario | Sì |
| POST | `/api/owners` | Crea proprietario | Sì (EMPLOYEE) |
| PUT | `/api/owners/{id}` | Aggiorna proprietario | Sì |
| DELETE | `/api/owners/{id}` | Elimina proprietario | Sì (ADMIN) |

### [EMPLOYEE] Employee Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/api/employees` | Lista dipendenti | Sì (ADMIN) |
| GET | `/api/employees/{id}` | Dettaglio dipendente | Sì |
| POST | `/api/employees` | Crea dipendente | Sì (ADMIN) |
| PUT | `/api/employees/{id}` | Aggiorna dipendente | Sì (ADMIN) |
| DELETE | `/api/employees/{id}` | Elimina dipendente | Sì (ADMIN) |

### [VALUATION] Property Valuation Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/api/valuations` | Lista valutazioni | Sì (EMPLOYEE) |
| GET | `/api/valuations/{id}` | Dettaglio valutazione | Sì |
| POST | `/api/valuations` | Crea valutazione | Sì (EMPLOYEE) |
| PUT | `/api/valuations/{id}` | Aggiorna valutazione | Sì (EMPLOYEE) |

### [NOTIFICATION] Notification Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/api/notifications` | Lista notifiche utente | Sì |
| GET | `/api/notifications/{id}` | Dettaglio notifica | Sì |
| PUT | `/api/notifications/{id}/read` | Marca come letta | Sì |

### [MONITORING] Actuator Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/actuator/health` | Health check | No |
| GET | `/actuator/info` | Informazioni app | No |
| GET | `/actuator/metrics` | Metriche | Sì (ADMIN) |

### [EXAMPLE] Esempio Richiesta con JWT

<details>
<summary><b>Clicca per vedere esempio completo</b></summary>

#### Step 1: Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

#### Step 2: Risposta con Token
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": 1,
  "email": "user@example.com",
  "role": "USER"
}
```

#### Step 3: Richiesta Autenticata
```bash
curl -X GET http://localhost:8081/api/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

</details>

---

## ◆ Database e Migrazioni

### Schema Database

Il database è strutturato con le seguenti tabelle principali:

#### Core Tables

1. **users** - Utenti del sistema
   - Campi: id, email, password (bcrypt), role, created_at, updated_at
   - Ruoli: ADMIN, EMPLOYEE, OWNER, USER

2. **owners** - Proprietari immobili
   - Campi: id, user_id (FK), first_name, last_name, phone, address
   - Relazione: One-to-One con users

3. **employees** - Dipendenti agenzia
   - Campi: id, user_id (FK), first_name, last_name, position, hire_date
   - Relazione: One-to-One con users

4. **properties** - Immobili
   - Campi: id, owner_id (FK), title, description, type, status, price, surface, rooms, bathrooms, floor, created_at
   - Relazione: Many-to-One con owners

5. **property_addresses** - Indirizzi immobili
   - Campi: id, property_id (FK), street, city, province, region, zip_code, country
   - Relazione: One-to-One con properties

6. **property_photos** - Foto immobili
   - Campi: id, property_id (FK), url, is_main, order_index
   - Relazione: Many-to-One con properties

7. **property_docs** - Documenti immobili
   - Campi: id, property_id (FK), title, url, type, upload_date
   - Relazione: Many-to-One con properties

8. **property_valuations** - Valutazioni immobiliari
   - Campi: id, property_id (FK), employee_id (FK), valuation_date, estimated_value, notes
   - Relazione: Many-to-One con properties, employees

9. **exclusive_contracts** - Contratti esclusivi
   - Campi: id, property_id (FK), owner_id (FK), employee_id (FK), start_date, end_date, commission_percentage, status
   - Relazione: Many-to-One con properties, owners, employees

10. **notifications** - Notifiche utente
    - Campi: id, user_id (FK), title, message, type, is_read, created_at
    - Relazione: Many-to-One con users

11. **user_tokens** - Token reset password
    - Campi: id, user_id (FK), token, expiry_date, used
    - Relazione: Many-to-One con users

12. **avg_price_mq** - Prezzi medi al mq
    - Campi: id, city, province, region, property_type, avg_price, year
    - Utilizzo: Calcolo valutazioni automatiche

### Flyway Migrations

Le migrazioni seguono il naming pattern: `V{version}__{description}.sql`

#### Ordine di Esecuzione

```sql
V1  → Crea tabella owners
V2  → Crea tabella users
V3  → Crea tabella employees
V4  → Crea tabella properties
V5  → Crea tabella property_addresses
V6  → Crea tabella property_photos
V7  → Crea tabella property_docs
V8  → Crea tabella property_valuations
V9  → Crea tabella exclusive_contracts
V10 → Crea tabella notifications
V11 → Crea tabella user_tokens
V17 → Crea tabella avg_price_mq
V12 → Inserisce dati sample owners
V13 → Inserisce dati sample users
V14 → Inserisce dati sample employees
V15 → Inserisce dati sample properties
V16 → Inserisce dati sample contracts
V18 → Inserisce dati sample prezzi mq
```

### Gestione Migrazioni

#### Verifica Stato Migrazioni

```bash
mvn flyway:info
```

#### Esecuzione Manuale Migrazioni

```bash
mvn flyway:migrate
```

#### Rollback (Clean + Migrate)

```bash
# ATTENZIONE: Cancella tutti i dati!
mvn flyway:clean
mvn flyway:migrate
```

#### Reset Database Completo (Docker)

```bash
docker compose down -v
docker compose up --build
```

### Creazione Nuova Migrazione

1. Creare file in `src/main/resources/db/migration/`
2. Naming: `V{next_version}__descriptive_name.sql`
3. Esempio: `V19__add_property_energy_class.sql`

```sql
-- V19__add_property_energy_class.sql
ALTER TABLE properties
ADD COLUMN energy_class VARCHAR(2) AFTER bathrooms;

UPDATE properties
SET energy_class = 'C'
WHERE energy_class IS NULL;
```

4. Riavviare applicazione (Flyway esegue automaticamente)

---

## ◆ Docker

### Dockerfile (Multi-Stage Build)

Il Dockerfile utilizza un approccio **multi-stage** per ottimizzare l'immagine finale:

#### Stage 1: Builder
- Utilizza `maven:3.9-eclipse-temurin-17`
- Copia `pom.xml` e scarica dipendenze (layer cachato)
- Copia sorgenti e compila con `mvn clean package`

#### Stage 2: Runtime
- Utilizza `eclipse-temurin:17-jre-alpine` (immagine leggera)
- Copia solo il JAR compilato dallo stage builder
- Crea utente non-root per sicurezza
- Espone porta 8080
- Avvia applicazione con `java -jar`

**Benefici:**
- Immagine finale più leggera (~200MB vs ~700MB con JDK)
- Build più veloce con cache delle dipendenze
- Maggiore sicurezza (JRE only, non-root user)

### Docker Compose Configuration

```yaml
services:
  database:
    container_name: immobiliarisplus-db
    image: mysql:8.0.36
    restart: always
    environment:
      MYSQL_DATABASE: immobiliarisplus
      MYSQL_ROOT_PASSWORD: supersecret
      MYSQL_USER: user
      MYSQL_PASSWORD: secret
    ports:
      - "3307:3306"  # Host:Container
    volumes:
      - mysqldata:/var/lib/mysql  # Persistenza dati

  backend:
    container_name: immobiliarisplus-be
    restart: always
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8081:8080"  # Host:Container
    depends_on:
      - database
    environment:
      # Override application.properties
      SPRING_DATASOURCE_URL: jdbc:mysql://database:3306/immobiliarisplus
      SPRING_DATASOURCE_USERNAME: user
      SPRING_DATASOURCE_PASSWORD: secret

volumes:
  mysqldata:  # Volume persistente per MySQL
```

### Comandi Docker Utili

#### Build e Deploy

```bash
# Build e avvio completo
docker compose up --build

# Avvio in detached mode
docker compose up -d

# Rebuild solo backend
docker compose up --build backend

# Rebuild solo database
docker compose up --build database
```

#### Gestione Containers

```bash
# Lista containers attivi
docker compose ps

# Stop containers
docker compose stop

# Start containers esistenti
docker compose start

# Restart containers
docker compose restart

# Stop e rimozione containers
docker compose down

# Stop e rimozione containers + volumi (ATTENZIONE: cancella dati!)
docker compose down -v
```

#### Logs e Debugging

```bash
# Logs tutti i servizi
docker compose logs

# Logs specifico servizio
docker compose logs backend
docker compose logs database

# Follow logs in real-time
docker compose logs -f backend

# Logs ultimi 100 righe
docker compose logs --tail=100 backend

# Accesso shell container backend
docker compose exec backend sh

# Accesso shell container database
docker compose exec database bash

# Connessione MySQL da container
docker compose exec database mysql -u user -psecret immobiliarisplus
```

#### Pulizia

```bash
# Rimozione containers stopped
docker compose rm

# Rimozione immagini non utilizzate
docker image prune

# Rimozione volumi non utilizzati
docker volume prune

# Pulizia completa sistema Docker
docker system prune -a --volumes
```

### Environment Variables

Variabili d'ambiente configurabili in `docker-compose.yml`:

```yaml
environment:
  # Database
  SPRING_DATASOURCE_URL: jdbc:mysql://database:3306/immobiliarisplus
  SPRING_DATASOURCE_USERNAME: user
  SPRING_DATASOURCE_PASSWORD: secret
  
  # JWT
  JWT_SECRET: your-base64-secret
  JWT_EXPIRATION: 86400000
  
  # Email
  SPRING_MAIL_USERNAME: your-brevo-username
  SPRING_MAIL_PASSWORD: your-brevo-password
  APP_MAIL_FROM: your-sender-email
  
  # CORS
  SPRING_WEB_CORS_ALLOWED_ORIGINS: http://localhost:5173,https://production-domain.com
```

### Networking

I container comunicano tramite rete Docker interna:

- Backend → Database: `jdbc:mysql://database:3306/...` (utilizza nome servizio)
- Host → Backend: `http://localhost:8081` (porta Docker mappata: 8081:8080)
- Host → Database: `localhost:3307` (porta Docker mappata: 3307:3306)

> **Spiegazione porte Docker**:
> - Il backend interno utilizza porta 8080, mappata su 8081 dell'host
> - Il database interno utilizza porta 3306, mappata su 3307 dell'host
> - Questo mapping evita conflitti con servizi locali esistenti

---

## ◆ Testing

### Esecuzione Test

```bash
# Tutti i test
mvn test

# Test specifico
mvn test -Dtest=ClassNameTest

# Skip test durante build
mvn clean package -DskipTests
```

### Test Coverage

```bash
mvn jacoco:report
# Report disponibile in: target/site/jacoco/index.html
```

---

## ◆ Troubleshooting

### Problemi Comuni e Soluzioni

#### 1. **Errore: "Port 8080 already in use"**

**Causa**: Un'altra applicazione sta usando la porta 8080 (solo per esecuzione locale).

> **Nota**: Questo errore si verifica solo durante l'esecuzione **locale** del backend. Con Docker Compose, il backend utilizza la porta 8081 esterna.

**Soluzioni**:

```bash
# Opzione 1: Identificare e fermare processo
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>

# Opzione 2: Cambiare porta in application.properties
server.port=8090

# Opzione 3: Usare Docker (porta 8081)
docker compose up
```

---

#### 2. **Errore: "Unable to connect to MySQL"**

**Causa**: MySQL non raggiungibile o credenziali errate.

**Diagnosi**:

```bash
# Verifica MySQL sia attivo
# Windows
net start | findstr MySQL

# Linux/Mac
sudo systemctl status mysql

# Test connessione
mysql -h localhost -P 3307 -u user -psecret immobiliarisplus
```

**Soluzioni**:

```bash
# Avvia MySQL
# Windows
net start MySQL80

# Linux/Mac
sudo systemctl start mysql

# Verifica credenziali in application.properties
spring.datasource.url=jdbc:mysql://localhost:3307/immobiliarisplus
spring.datasource.username=user
spring.datasource.password=secret

# Con Docker (soluzione più semplice)
docker compose up database
```

---

#### 3. **Errore: "Flyway migration failed"**

**Causa**: Schema database inconsistente o migrazione corrotta.

**Soluzioni**:

```bash
# Opzione 1: Reset completo database (ATTENZIONE: cancella dati!)
docker compose down -v
docker compose up --build

# Opzione 2: Flyway repair
mvn flyway:repair

# Opzione 3: Manuale
docker compose exec database mysql -u user -psecret
DROP DATABASE immobiliarisplus;
CREATE DATABASE immobiliarisplus;
exit
docker compose restart backend
```

---

#### 4. **Errore: "JWT token invalid or expired"**

**Causa**: Token scaduto o secret JWT errato.

**Soluzioni**:

```bash
# 1. Verificare JWT_SECRET in application.properties
jwt.secret=<correct-base64-secret>
jwt.expiration=86400000

# 2. Rifare login per ottenere nuovo token

# 3. Verificare header Authorization
Authorization: Bearer <token>  # NO virgolette, NO spazi extra
```

---

#### 5. **Errore: "CORS policy blocked"**

**Causa**: Frontend su origine diversa non autorizzata.

**Soluzione**:

```properties
# application.properties
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

O in `CorsConfig.java`:

```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173", "https://your-domain.com")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
```

---

#### 6. **Errore: "Docker build failed"**

**Causa**: Errori di compilazione Maven o problema Dockerfile.

**Diagnosi**:

```bash
# Build locale per vedere errori dettagliati
cd backend
mvn clean package

# Log dettagliati Docker
docker compose build --no-cache backend
```

**Soluzioni**:

```bash
# Pulisci cache Maven locale
mvn clean

# Pulisci cache Docker
docker builder prune

# Rebuild completo
docker compose build --no-cache
docker compose up
```

---

#### 7. **Errore: "Email not sent"**

**Causa**: Configurazione SMTP errata o credenziali Brevo invalide.

**Verifiche**:

```properties
# application.properties
spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=<correct-brevo-username>
spring.mail.password=<correct-brevo-api-key>
app.mail.from=<verified-sender@example.com>  # DEVE essere verificato su Brevo
```

**Test SMTP**:

```bash
# Test connessione SMTP
telnet smtp-relay.brevo.com 587

# Verificare API key su Brevo Dashboard
https://app.brevo.com/settings/keys/api
```

---

#### 8. **Errore: "OutOfMemoryError" o applicazione lenta**

**Causa**: Risorse insufficienti o configurazione JVM non ottimale.

**Soluzioni**:

```bash
# Aumentare memoria heap Java
java -Xms512m -Xmx2048m -jar app.jar

# In Dockerfile
ENTRYPOINT ["java", "-Xms512m", "-Xmx1024m", "-jar", "app.jar"]

# Docker Compose - limitare risorse
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 2G
        reservations:
          memory: 512M
```

---

#### 9. **Errore: "Dependencies download failed"**

**Causa**: Problema connessione Maven Central o proxy.

**Soluzioni**:

```bash
# Retry download
mvn clean install -U

# Pulisci repository locale
rm -rf ~/.m2/repository/*
mvn clean install

# Configurare proxy (se necessario) in ~/.m2/settings.xml
<proxies>
  <proxy>
    <host>proxy.example.com</host>
    <port>8080</port>
  </proxy>
</proxies>
```

---

#### 10. **Errore: "MapStruct mapper not generated"**

**Causa**: Annotation processor non configurato correttamente.

**Soluzione**:

```bash
# Rebuild completo
mvn clean compile

# Verificare generazione mappers in target/generated-sources/annotations

# Se mancano, verificare pom.xml:
<annotationProcessorPaths>
    <path>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct-processor</artifactId>
        <version>1.5.5.Final</version>
    </path>
</annotationProcessorPaths>
```

---

#### 11. **Problema: Database non persiste dati dopo restart**

**Causa**: Volume Docker non configurato o cancellato.

**Soluzione**:

```bash
# Verificare volume esista
docker volume ls | grep mysqldata

# Se mancante, ricreare
docker compose down
docker compose up

# NON utilizzare flag -v per preservare i dati
# ERRATO: docker compose down -v
# CORRETTO: docker compose down
```

---

### Debug Mode

#### Abilitare Debug Logging

```properties
# application.properties
logging.level.root=INFO
logging.level.com.novegruppo.immobiliarisplus=DEBUG
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

#### Remote Debugging (IDE)

```bash
# Avvio con debug attivo
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 -jar app.jar

# Configurare IDE:
# IntelliJ: Run → Edit Configurations → + → Remote JVM Debug
# Host: localhost
# Port: 5005
```

---

### Performance Tuning

#### Ottimizzazione JPA/Hibernate

```properties
# application.properties
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
spring.jpa.properties.hibernate.jdbc.batch_versioned_data=true
```

#### Connection Pooling

```properties
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

---

### Log Files Location

```bash
# Logs applicazione (se configurati)
backend/logs/application.log

# Docker logs
docker compose logs backend > backend.log
```

---

### Health Check URLs

```bash
# Application health
# Docker (porta 8081)
curl http://localhost:8081/actuator/health

# Locale (porta 8080)
curl http://localhost:8080/actuator/health

# Database connectivity
curl http://localhost:8081/actuator/health/db

# Detailed health
curl http://localhost:8081/actuator/health?details=true
```

---

## ◆ Best Practices

### Development Guidelines

1. **Branch Naming**: `feature/nome-feature`, `bugfix/nome-bug`, `hotfix/nome-fix`
2. **Commit Messages**: Semantici e descrittivi (es: `feat: add property search endpoint`)
3. **Code Review**: Almeno un reviewer prima del merge
4. **Testing**: Scrivere test per nuove funzionalità
5. **Documentation**: Aggiornare README e commenti per cambiamenti significativi

### Security Guidelines

1. **Mai committare**:
   - Password in chiaro
   - API keys
   - JWT secrets
   - Credenziali database

2. **Utilizzare**:
   - Variabili d'ambiente per dati sensibili
   - `.gitignore` per file di configurazione locali
   - BCrypt per password hashing
   - JWT con expiration time

### Code Quality

1. **Lombok**: Ridurre boilerplate code
2. **MapStruct**: Mapping automatico DTO-Entity
3. **Validation**: Bean Validation su DTOs
4. **Exception Handling**: Gestione centralizzata con `@ControllerAdvice`
5. **Logging**: Livelli appropriati (DEBUG, INFO, WARN, ERROR)

---

## Supporto

Per problemi non risolti da questo README:

1. **Controllare logs**: `docker compose logs backend`
2. **Issue tracker**: [Link al repository]
3. **Team contact**: [Email del team]

---

## Licenza

Progetto sviluppato per **Laboratorio Integrato - Gruppo 9**

© 2025 - Immobiliaris Plus Team

---

**Ultima revisione**: Novembre 2025
**Versione Backend**: 0.0.1-SNAPSHOT
**Spring Boot**: 3.5.7
**Java**: 17
