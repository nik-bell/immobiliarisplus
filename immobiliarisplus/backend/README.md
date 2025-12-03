<div align="center">

# Backend - Immobiliaris Plus

### Laboratorio Integrato NoveGruppo

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)

[English version 🇬🇧](#backend---immobiliaris-plus-1)

</div>

---

## Team

| Membro | Ruolo                         | GitHub Name  |
|--------|-------------------------------|--------------|
| **Nesma Abd El Aziz** | Backend Developer             | [NesmaAbd](https://github.com/NesmaAbd) |
| **Nicolas Bellotti** | Backend Developer - referente | [nik-bell](https://github.com/nik-bell) |
| **Maria Cernat** | Backend Developer             | [mariacernat](https://github.com/mariacernat) |

> **Mentor** : Vincent Franciosa | [V1n5Fr4n](https://github.com/V1n5Fr4n)

---

## Indice

- [Descrizione del Portale](#-descrizione-del-portale)
- [Architettura e Approccio Tecnico](#-architettura-e-approccio-tecnico)
- [Stack Tecnologico](#-stack-tecnologico)
- [Requisiti di Sistema](#-requisiti-di-sistema)
- [Installazione e Configurazione](#-installazione-e-configurazione)
- [Avvio del Progetto](#-avvio-del-progetto)
- [Struttura del Progetto](#-struttura-del-progetto)
- [API Endpoints](#-api-endpoints)
- [Database e Migrazioni](#-database-e-migrazioni)
- [Docker](#-docker)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Best Practices](#-best-practices)

---

## ◆ Descrizione del Portale

**Immobiliaris Plus** è un portale immobiliare completo sviluppato per gestire proprietà, contratti esclusivi, valutazioni immobiliari e notifiche utente. Il sistema offre funzionalità avanzate per agenzie immobiliari, proprietari e potenziali acquirenti.

### Caratteristiche Principali

<table>
<tr>
<td>

**Core Features**
- **Gestione Proprietà**: CRUD completo per immobili con indirizzi
- **Gestione Utenti**: Autenticazione JWT con ruoli (Admin, Employee, Owner, User)
- **Contratti Esclusivi**: Gestione contratti tra proprietari e agenzia
- **Valutazione Immobili**: Sistema di valutazione automatica basato su prezzi medi al metro quadro
- **Dashboard Role-Based**: Dashboard differenziate per Admin e Agente con visualizzazione valutazioni filtrate
- **Azioni Role-Based**: Operazioni CRUD con permessi specifici per ruolo (Admin, Agent)
- **Assegnazione Agente**: Funzionalità di assegnazione agenti alle valutazioni (solo Admin)
- **Aggiornamento Valore Finale**: Modifica del valore finale di valutazione da parte degli agenti assegnati

</td>
<td>

**Technical Features**
- **Riepilogo Email**: Invio automatico email tramite Brevo SMTP
- **Sicurezza**: Spring Security con JWT tokens
- **Monitoring**: Actuator endpoints per monitoraggio applicazione
- **Database**: MySQL con Flyway migrations

</td>
</tr>
</table>

### Implementazioni Future

Le seguenti funzionalità sono pianificate per le prossime versioni dell'applicazione:

####  Automazione e Integrazione
- **API Validazione Indirizzi**: Integrazione con servizi esterni (Google Maps API, HERE API) per validazione e normalizzazione automatica degli indirizzi
- **API Calcolo Valutazione Automatico**: Sistema avanzato di valutazione basato su algoritmi di machine learning e dati di mercato real-time
- **Assegnazione Automatica Agente**: Algoritmo di distribuzione intelligente delle valutazioni agli agenti disponibili con load balancing

####  Gestione Utenti e Sicurezza
- **Password Temporanea via Email**: Generazione e invio automatico di credenziali temporanee ai proprietari per primo accesso
- **Dashboard Proprietari**: Interfaccia dedicata per proprietari con visualizzazione stato valutazioni e contratti

####  Gestione Documentale
- **Upload/Download Documenti**: Sistema di gestione file per contratti, documenti catastali e certificazioni
- **Upload/Download Foto Immobili**: Galleria fotografica per ogni proprietà con supporto per immagini
- **Repository Cloud**: Integrazione con storage cloud per archiviazione sicura

####  Notifiche e Comunicazioni
- **Notifiche Dashboard**: Sistema di notifiche real-time per aggiornamenti su valutazioni e assegnazioni
- **Notifiche Push**: Integrazione con servizi di push notification per aggiornamenti tempestivi
- **Invio Contratti via Portale**: Funzionalità per caricamento e invio contratti direttamente dalla piattaforma

>  **Nota**: Le implementazioni future sono soggette a valutazione di fattibilità tecnica e prioritizzazione in base ai requisiti di business.

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

**DOWNLOAD**:
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

**DOWNLOAD**:
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
git clone https://github.com/nik-bell/immobiliarisplus.git
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

### SETUP: Scelta Rapida del Metodo di Avvio

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

#### Processo di Avvio

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

Guida completa Docker: [Docker-guide](https://github.com/nik-bell/immobiliarisplus/blob/9163f3ee477ec41f8342dbf74099617cdc6dfa57/immobiliarisplus/docs/docker-guide.md)

---

### Opzione 2: Avvio Completamente Locale (Sviluppo)

> **Nota**: Per questa opzione serve MySQL installato localmente sulla porta 3306.

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

#### Procedura Avvio Rapido

```bash
# 1. Avviare database Docker
docker compose up database

# 2. In un altro terminale, avviare backend locale
cd backend
mvn spring-boot:run
```

**Backend disponibile su:** `http://localhost:8080`

> **Configurazione**: Nessuna modifica necessaria - porta 3307 già configurata



</details>

> ◆ **Importante**: Il backend è ora operativo, ma per utilizzare l'applicazione completa è necessario avviare anche il **frontend**.  
> Per istruzioni dettagliate sull'installazione e l'avvio del frontend React, consultare il [README](https://github.com/nik-bell/immobiliarisplus/blob/9163f3ee477ec41f8342dbf74099617cdc6dfa57/immobiliarisplus/frontend/README.md) del frontend.

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

### Endpoint Configuration

<table>
<tr>
<td>

**Esecuzione Locale**
```
http://localhost:8080
```
`mvn spring-boot:run`

</td>
<td>

**Esecuzione Docker**
```
http://localhost:8081
```
`docker compose up`

</td>
</tr>
</table>

---

### Authentication Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Registrazione nuovo utente | No |
| POST | `/api/auth/login` | Login utente | No |
| POST | `/api/auth/forgot-password` | Richiesta reset password | No |
| POST | `/api/auth/reset-password` | Reset password con token | No |

###  User Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/api/users` | Lista utenti | Sì (ADMIN) |
| GET | `/api/users/{id}` | Dettaglio utente | Sì (ADMIN) |
| PUT | `/api/users/{id}` | Aggiorna utente | Sì (ADMIN) |
| DELETE | `/api/users/{id}` | Elimina utente | Sì (ADMIN) |
| GET | `/api/users/me` | Profilo utente corrente | Sì |

### Property Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|--------------------------|
| GET | `/api/properties` | Lista proprietà | Sì                       |
| GET | `/api/properties/{id}` | Dettaglio proprietà | Sì                       |
| POST | `/api/properties` | Crea proprietà | Sì (EMPLOYEE)            |
| PUT | `/api/properties/{id}` | Aggiorna proprietà | Sì (ADMIN)               |
| DELETE | `/api/properties/{id}` | Elimina proprietà | Sì (ADMIN)               |
| GET | `/api/properties/search` | Ricerca proprietà | Sì                       |

### Owner Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|--------------------------|
| GET | `/api/owners` | Lista proprietari | Sì (EMPLOYEE)            |
| GET | `/api/owners/{id}` | Dettaglio proprietario | Sì (EMPLOYEE)            |
| POST | `/api/owners` | Crea proprietario | Sì (EMPLOYEE)            |
| PUT | `/api/owners/{id}` | Aggiorna proprietario | Sì (EMPLOYEE)            |
| DELETE | `/api/owners/{id}` | Elimina proprietario | Sì (ADMIN)               |

### Employee Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|--------------------------|
| GET | `/api/employees` | Lista dipendenti | Sì (ADMIN)               |
| GET | `/api/employees/{id}` | Dettaglio dipendente | Sì (ADMIN)               |
| POST | `/api/employees` | Crea dipendente | Sì (ADMIN)               |
| PUT | `/api/employees/{id}` | Aggiorna dipendente | Sì (ADMIN)               |
| DELETE | `/api/employees/{id}` | Elimina dipendente | Sì (ADMIN)               |

### Property Valuation Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|--------------------------|
| GET | `/api/valuations` | Lista valutazioni | Sì (EMPLOYEE)            |
| GET | `/api/valuations/{id}` | Dettaglio valutazione | Sì (EMPLOYEE)            |
| POST | `/api/valuations` | Crea valutazione | Sì (EMPLOYEE)            |
| PUT | `/api/valuations/{id}` | Aggiorna valutazione | Sì (EMPLOYEE)            |

###  Notification Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/api/notifications` | Lista notifiche utente | Sì |
| GET | `/api/notifications/{id}` | Dettaglio notifica | Sì |
| PUT | `/api/notifications/{id}/read` | Marca come letta | Sì |

### Actuator Endpoints

| Method | Endpoint | Descrizione | Autenticazione Richiesta |
|--------|----------|-------------|---------------|
| GET | `/actuator/health` | Health check | No |
| GET | `/actuator/info` | Informazioni app | No |
| GET | `/actuator/metrics` | Metriche | Sì (ADMIN) |

### Esempio Richiesta con JWT

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
   - Campi: id, owner_id (FK), title, description, type, status, price, surface, rooms, bathrooms, floors, created_at
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

1. **Version Control**: Utilizzare Git con branching model (feature branches, develop, main)
2. **Code Reviews**: Richiedere PR reviews prima del merge
3. **Commit Messages**: Scrivere messaggi chiari e descrittivi
4. **Testing**: Scrivere test unitari e di integrazione per nuove funzionalità
5. **Documentation**: Aggiornare README e commenti codice
6. **Continuous Integration**: Configurare CI/CD per build e test automatici

### Security Guidelines

1. **Da evitare nei commit**:
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

Linee guida per il team: [Documentazione](https://github.com/nik-bell/immobiliarisplus/tree/9163f3ee477ec41f8342dbf74099617cdc6dfa57/immobiliarisplus/docs)

---

## Supporto

Per problemi non risolti da questo README:

1. **Controllare logs**: `docker compose logs backend`
2. **Issue tracker**: [GitHub Issues](https://github.com/nik-bell/immobiliarisplus/issues)
3. **Contattare il team**: support@9gruppo.it

Link utili:
- [Documentazione Ufficiale Spring Boot](https://spring.io/projects/spring-boot)
- [Documentazione Ufficiale Docker](https://docs.docker.com/)
- [Documentazione Ufficiale MySQL](https://dev.mysql.com/doc/)
- [Documentazione Ufficiale Flyway](https://flywaydb.org/documentation/)
- [Documentazione Ufficiale MapStruct](https://mapstruct.org/documentation/stable/reference/html/)
- [Documentazione Ufficiale Lombok](https://projectlombok.org/features/all)
- [Documentazione Ufficiale JWT](https://jwt.io/introduction/)
- [Documentazione Ufficiale Brevo SMTP](https://www.brevo.com/en/smtp/)
- [Documentazione Ufficiale Maven](https://maven.apache.org/guides/index.html)

---

## Progetto Didattico

Questo progetto è stato sviluppato a **scopo esclusivamente didattico** nell'ambito del corso di **Laboratorio Integrato**.

### ITS ICT Academy Piemonte

<div align="center">

**[ITS ICT Piemonte - Fondazione](https://www.its-ictpiemonte.it/)**

*Istituto Tecnico Superiore per le Tecnologie dell'Informazione e della Comunicazione*

📍 **Sede**: Via Jacopo Durandi, 10 - 10144 Torino  
📧 **Email**: info@its-ictpiemonte.it  
🌐 **Web**: [www.its-ictpiemonte.it](https://www.its-ictpiemonte.it/)  
📱 **LinkedIn**: [ITS ICT Piemonte](https://www.linkedin.com/school/its-ict-piemonte/)

</div>

### Scopo del Progetto

Questo repository contiene il codice sorgente sviluppato durante il percorso formativo per:
- Apprendimento di tecnologie moderne (Spring Boot, React, Docker)
- Sviluppo di competenze full-stack
- Applicazione di best practices di sviluppo software
- Lavoro di gruppo e metodologie agile

### Licenza

**Progetto Educativo - Non per uso commerciale**

© 2025 - Immobiliaris Plus Team  
Sviluppato per ITS ICT Academy Piemonte

Questo progetto è rilasciato sotto licenza MIT per scopi didattici e di apprendimento.

---


**Revisione** Dicembre 2025 · **Backend** 0.0.1-SNAPSHOT · **Spring Boot** 3.5.7 · **Java** 17

---

---

<div align="center">

# Backend - Immobiliaris Plus

### Integrated Laboratory NoveGruppo

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)

[Back to Italian 🇮🇹](#backend---immobiliaris-plus)

</div>

---

## Team

| Member | Role                         | GitHub Name  |
|--------|------------------------------|--------------|
| **Nesma Abd El Aziz** | Backend Developer             | [NesmaAbd](https://github.com/NesmaAbd) |
| **Nicolas Bellotti** | Backend Developer - Lead | [nik-bell](https://github.com/nik-bell) |
| **Maria Cernat** | Backend Developer             | [mariacernat](https://github.com/mariacernat) |

> **Mentor**: Vincent Franciosa | [V1n5Fr4n](https://github.com/V1n5Fr4n)

---

## Table of Contents

- [Portal Description](#-portal-description)
- [Architecture and Technical Approach](#-architecture-and-technical-approach)
- [Technology Stack](#-technology-stack)
- [System Requirements](#-system-requirements)
- [Installation and Configuration](#-installation-and-configuration)
- [Starting the Project](#-starting-the-project)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Database and Migrations](#-database-and-migrations)
- [Docker](#-docker)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Best Practices](#-best-practices)

---

## ◆ Portal Description

**Immobiliaris Plus** is a comprehensive real estate portal developed to manage properties, exclusive contracts, property valuations, and user notifications. The system offers advanced features for real estate agencies, owners, and potential buyers.

### Main Features

<table>
<tr>
<td>

**Core Features**
- **Property Management**: Complete CRUD for properties with addresses
- **User Management**: JWT authentication with roles (Admin, Employee, Owner, User)
- **Exclusive Contracts**: Contract management between owners and agency
- **Property Valuation**: Automatic valuation system based on average prices per square meter
- **Role-Based Dashboard**: Differentiated dashboards for Admin and Agent with filtered valuations view
- **Role-Based Actions**: CRUD operations with role-specific permissions (Admin, Agent)
- **Agent Assignment**: Agent assignment functionality for valuations (Admin only)
- **Final Value Update**: Final valuation value modification by assigned agents

</td>
<td>

**Technical Features**
- **Email Summary**: Automatic email sending via Brevo SMTP
- **Security**: Spring Security with JWT tokens
- **Monitoring**: Actuator endpoints for application monitoring
- **Database**: MySQL with Flyway migrations

</td>
</tr>
</table>

### Future Implementations

The following features are planned for upcoming versions:

#### Automation and Integration
- **Address Validation API**: Integration with external services (Google Maps API, HERE API) for automatic address validation and normalization
- **Automatic Valuation Calculation API**: Advanced valuation system based on machine learning algorithms and real-time market data
- **Automatic Agent Assignment**: Intelligent valuation distribution algorithm to available agents with load balancing

#### User Management and Security
- **Temporary Password via Email**: Automatic generation and sending of temporary credentials to owners for first login
- **Owner Dashboard**: Dedicated interface for owners with valuation and contract status view

#### Document Management
- **Document Upload/Download**: File management system for contracts, cadastral documents, and certifications
- **Property Photo Upload/Download**: Photo gallery for each property with HD image support
- **Cloud Repository**: Integration with cloud storage (AWS S3, Azure Blob Storage) for secure archiving

#### Notifications and Communications
- **Dashboard Notifications**: Real-time notification system for valuation and assignment updates
- **Push Notifications**: Integration with push notification services for timely updates
- **Contract Sending via Portal**: Functionality for uploading, digital signing, and sending contracts directly from the platform

> **Note**: Future implementations are subject to technical feasibility evaluation and prioritization based on business requirements.

---

## ◆ Architecture and Technical Approach

### Architectural Pattern

The backend is developed following **Layered Architecture** with separation of concerns:

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

### Applied Design Principles

1. **Separation of Concerns (SoC)**: Each layer has well-defined responsibilities
2. **Dependency Injection**: Spring IoC container manages dependencies
3. **DTO Pattern**: Use of Data Transfer Objects to decouple API from entities
4. **Repository Pattern**: Abstraction for data access
5. **RESTful API Design**: Endpoints follow REST principles
6. **Security by Design**: Authentication and authorization on all sensitive endpoints

### Main Components

#### 1. **Controllers (Presentation Layer)**
Handle HTTP requests and return JSON responses.

- `AuthController`: Authentication (login, registration, password reset)
- `PropertyController`: Property management
- `UserController`: User and profile management
- `OwnerController`: Owner-specific operations
- `EmployeeController`: Agency employee management
- `PropertyValuationController`: Property valuation and automated calculation

#### 2. **Services (Business Logic Layer)**
Contain core business logic and orchestration between different layers.

- `AuthService`: Authentication and authorization logic
- `PropertyService`: Property-related business rules
- `UserService`: User management
- `PropertyValuationService`: Automatic valuation calculation and result persistence

#### 3. **Repositories (Data Access Layer)**
Interface directly with the database via Spring Data JPA.

- `PropertyRepository`
- `UserRepository`
- `OwnerRepository`
- `EmployeeRepository`
- `PropertyValuationRepository`

#### 4. **Entities (Domain Model)**
Represent database tables:

- `Property`, `PropertyAddress`, `PropertyPhoto`, `PropertyDoc`
- `User`, `Owner`, `Employee`
- `ExclusiveContract`
- `PropertyValuation`
- `Notification`

#### 5. **DTOs (Data Transfer Objects)**
Used for input/output data:

- `PropertyDTO`, `PropertyValuationDTO`
- `UserDTO`, `OwnerDTO`, `EmployeeDTO`
- `LoginRequestDTO`, `RegisterRequestDTO`

#### 6. **Mappers (MapStruct)**
Automatic mapping between entities and DTOs:

- `PropertyMapper`
- `UserMapper`
- `PropertyValuationMapper`

---

## ◆ Technology Stack

### Core Framework
- **Java**: 17 (LTS)
- **Spring Boot**: 3.5.7
  - Spring Data JPA
  - Spring Security
  - Spring Validation
  - Spring Mail

### Database
- **MySQL**: 8.0.36
- **Flyway**: 10.22.1 (database migrations)

### Security
- **JWT** (JSON Web Tokens): Authentication and authorization
- **BCrypt**: Password hashing

### Libraries and Tools
- **Lombok**: Code reduction (getters, setters, constructors)
- **MapStruct**: Automatic DTO-Entity mapping
- **Actuator**: Application monitoring and health checks
- **Maven**: Dependency and build management

### Email Service
- **Brevo SMTP** (formerly Sendinblue): Automatic email sending for valuations and notifications

### DevOps
- **Docker**: Application containerization
- **Docker Compose**: Multi-container orchestration

---

## ◆ System Requirements

### Development Environment
- **Java Development Kit (JDK)**: 17 or higher
- **Maven**: 3.8+
- **MySQL**: 8.0+ (or via Docker)
- **IDE**: IntelliJ IDEA, Eclipse, or VSCode with Java extensions
- **Git**: Version control

### Production Environment
- **Docker**: 20.10+
- **Docker Compose**: 2.0+

---

## ◆ Installation and Configuration

### 1. Clone the Repository

```bash
git clone https://github.com/nik-bell/immobiliarisplus.git
cd immobiliarisplus/backend
```

### 2. Database Configuration

The project is configured to use **MySQL on port 3307** (Docker).

Create `application.properties` file in `src/main/resources`:

```properties
spring.application.name=immobiliarisplus

# Database
spring.datasource.url=jdbc:mysql://localhost:3307/immobiliarisplus
spring.datasource.username=user
spring.datasource.password=secret

# Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

# Flyway
spring.flyway.enabled=true
spring.flyway.baseline-on-migrate=true

# CORS
spring.web.cors.allowed-origins=http://localhost:5173
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true

# JWT
jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

#### Database Configuration Table

| **Environment** | **Port** | **Connection URL** |
|---------------|---------|-------------------|
| **Local MySQL** | 3306 | `jdbc:mysql://localhost:3306/immobiliarisplus` |
| **Docker MySQL** | 3307 | `jdbc:mysql://localhost:3307/immobiliarisplus` |

> **IMPORTANT**: The current configuration points to `localhost:3307` (Docker). For completely local execution, change port to `3306`.

### 3. Email Configuration (Optional)

For automatic email sending via Brevo:

```properties
spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=your-brevo-username
spring.mail.password=your-brevo-password
app.mail.from=your-verified-email@domain.com
```

### 4. Install Dependencies

```bash
mvn clean install
```

---

## ◆ Starting the Project

### Option 1: Complete Execution with Docker (Recommended)

Start database and backend together:

```bash
docker compose up --build
```

**Services available:**

| **Service** | **URL/Port** | **Description** |
|-------------|--------------|-----------------|
| **Backend API** | `http://localhost:8081` | Main REST API |
| **MySQL Database** | `localhost:3307` | Database server |
| **Health Check** | `http://localhost:8081/actuator/health` | Application status |

<details>
<summary><strong>Details: How Docker Compose Works</strong></summary>

The `docker-compose.yml` defines two services:

1. **database**: MySQL 8.0.36 container
2. **backend**: Spring Boot application

When you run `docker compose up`:
- The MySQL database starts on port 3307
- Flyway automatically runs migrations
- The backend starts and connects to the database
- The application is accessible at `http://localhost:8081`

To stop everything:
```bash
docker compose down
```

</details>

### Option 2: Local Execution (Backend Only)

<details>
<summary><strong>Manual Backend Execution</strong></summary>

**Prerequisites:**
- MySQL running locally on port 3306 or 3307
- Database `immobiliarisplus` created

#### A. Via Maven

```bash
mvn spring-boot:run
```

#### B. Via JAR file

```bash
mvn clean package -DskipTests
java -jar target/immobiliarisplus-0.0.1-SNAPSHOT.jar
```

**Backend available at:** `http://localhost:8080`

> **Configuration**: No modification needed - port 3307 already configured

> **Important**: The backend is now operational, but to use the complete application you need to start the **frontend** as well.  
> For detailed instructions on frontend installation and startup, see file [README](https://github.com/nik-bell/immobiliarisplus/blob/3d08ce7d0bdc4dd51e00bfa94054f404ef70e801/immobiliarisplus/frontend/README.md).

</details>

### Option 3: Mixed Execution (Database Docker + Local Backend)

<details>
<summary><strong>Hybrid Execution</strong></summary>

Useful for development with hot-reload:

```bash
# 1. Start only the database with Docker
docker compose up database

# 2. In another terminal, start local backend
cd backend
mvn spring-boot:run
```

**Backend available at:** `http://localhost:8080`

> **Configuration**: No modification needed - port 3307 already configured

</details>

---

## ◆ Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── novegruppo/
│   │   │           └── immobiliarisplus/
│   │   │               ├── controllers/       # REST Controllers
│   │   │               ├── services/          # Business Logic
│   │   │               │   └── impl/          # Service Implementations
│   │   │               ├── repositories/      # JPA Repositories
│   │   │               ├── entities/          # JPA Entities
│   │   │               ├── dtos/              # Data Transfer Objects
│   │   │               ├── mappers/           # MapStruct Mappers
│   │   │               ├── config/            # Spring Configuration
│   │   │               ├── security/          # JWT & Security
│   │   │               ├── enums/             # Enumerations
│   │   │               ├── exceptions/        # Custom Exceptions
│   │   │               └── ImmobiliarisplusApplication.java  # Main Class
│   │   └── resources/
│   │       ├── application.properties         # Main Configuration
│   │       └── db/
│   │           └── migration/                 # Flyway SQL Scripts
│   └── test/
│       └── java/                              # Unit & Integration Tests
├── target/                                    # Compiled Files (ignored by Git)
├── pom.xml                                    # Maven Dependencies
├── Dockerfile                                 # Docker Image
└── README.md                                  # This File
```

---

## ◆ API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | User registration | No |
| `POST` | `/api/auth/login` | User login | No |
| `POST` | `/api/auth/forgot-password` | Password reset request | No |
| `POST` | `/api/auth/reset-password` | Reset password with token | No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/users/me` | Get current user profile | Yes (JWT) |
| `GET` | `/api/users` | Get all users | Yes (ADMIN) |
| `GET` | `/api/users/{id}` | Get user by ID | Yes (ADMIN) |
| `PUT` | `/api/users/{id}` | Update user | Yes (ADMIN) |
| `DELETE` | `/api/users/{id}` | Delete user | Yes (ADMIN) |

### Property Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/properties` | Get all properties | No |
| `GET` | `/api/properties/{id}` | Get property by ID | No |
| `POST` | `/api/properties` | Create new property | Yes (EMPLOYEE) |
| `PUT` | `/api/properties/{id}` | Update property | Yes (EMPLOYEE) |
| `DELETE` | `/api/properties/{id}` | Delete property | Yes (ADMIN) |

### Owner Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/owners` | Get all owners | Yes (EMPLOYEE) |
| `GET` | `/api/owners/{id}` | Get owner by ID | Yes (EMPLOYEE) |
| `POST` | `/api/owners` | Create new owner | Yes (EMPLOYEE) |
| `PUT` | `/api/owners/{id}` | Update owner | Yes (EMPLOYEE) |
| `DELETE` | `/api/owners/{id}` | Delete owner | Yes (ADMIN) |

### Employee Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/employees` | Get all employees | Yes (ADMIN) |
| `GET` | `/api/employees/{id}` | Get employee by ID | Yes (ADMIN) |
| `POST` | `/api/employees` | Create new employee | Yes (ADMIN) |
| `PUT` | `/api/employees/{id}` | Update employee | Yes (ADMIN) |
| `DELETE` | `/api/employees/{id}` | Delete employee | Yes (ADMIN) |

### Property Valuation Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/valuations/calculate` | Calculate and save automatic valuation | No |
| `GET` | `/api/valuations/dashboard` | Get valuations list (filtered by role) | Yes (ADMIN/AGENT) |
| `GET` | `/api/valuations/dashboard/{id}` | Get valuation detail | Yes (ADMIN/AGENT) |
| `PATCH` | `/api/valuations/dashboard/{id}` | Update valuation (assign agent, status, notes, final value) | Yes (ADMIN/AGENT) |
| `DELETE` | `/api/valuations/dashboard/{id}` | Delete valuation | Yes (ADMIN) |

#### Dashboard Endpoints Details

**GET `/api/valuations/dashboard`**
- **ADMIN**: sees all valuations
- **AGENT**: sees only valuations assigned to them
- Returns: list with `id`, `createdAt`, `propertyAddress`, `propertyType`, `ownerName`, `assignedAgent`, `valuationFinal`, `status`

**GET `/api/valuations/dashboard/{id}`**
- **ADMIN**: can view any valuation
- **AGENT**: can view only valuations assigned to them
- Returns: complete detail with property info, owner contact, valuation range, final value, status, notes

**PATCH `/api/valuations/dashboard/{id}`**
- **ADMIN**: can modify all valuations (assign agent, status, notes, final value)
- **AGENT**: can modify only valuations assigned to them (status, notes, final value)
- Supported fields: `employeeId`, `status`, `notes`, `valuationFinal`
- Returns: updated detail

**DELETE `/api/valuations/dashboard/{id}`**
- **ADMIN only**: can delete any valuation
- Returns: 204 No Content

### Monitoring Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/actuator/health` | Application health check | No |
| `GET` | `/actuator/info` | Application information | No |

---

## ◆ Database and Migrations

### Flyway

The project uses **Flyway** for automatic database migration management.

#### Migration Files

Migrations are located in `src/main/resources/db/migration/`:

```
db/migration/
├── V1__create_table_owner.sql
├── V2__create_table_user.sql
├── V3__create_table_employee.sql
├── V4__create_table_property.sql
├── V5__create_table_property_address.sql
├── V6__create_table_property_photo.sql
├── V7__create_table_property_docs.sql
├── V8__create_table_property_valuation.sql
├── V9__create_table_exclusive_contract.sql
├── V10__create_table_notifications.sql
├── V11__create_table_user_tokens.sql
├── V12__insert_into_owner.sql
├── V13__insert_into_user.sql
├── V14__insert_into_employee.sql
├── V15__insert_into_property.sql
├── V16__insert_into_exclusive_contract.sql
├── V17__create_table_avg_price_mq.sql
├── V18__insert_into_avg_price_mq.sql
├── V19__insert_into_property_address.sql
├── V20__insert_into_property_valuation.sql
└── V21__add_valuation_final_column.sql
```

#### Flyway Commands

```bash
# Run migrations
mvn flyway:migrate

# Check migration status
mvn flyway:info

# Clean database (deletes all data)
mvn flyway:clean
```

### Main Tables

1. **owner**: Property owners
2. **user**: System users (linked to owners or employees)
3. **employee**: Agency employees (Admin, Agent)
4. **property**: Properties for sale/rent
5. **property_address**: Property addresses
6. **property_photo**: Property photos
7. **property_doc**: Property documents
8. **property_valuation**: Automatic valuations
9. **exclusive_contract**: Exclusive contracts
10. **notifications**: System notifications
11. **user_tokens**: Password reset tokens
12. **avg_price_mq**: Average prices per square meter (for automatic valuations)

---

## ◆ Docker

### Dockerfile

The `Dockerfile` uses a **multi-stage build** to optimize image size:

1. **Build stage**: Compiles application with Maven
2. **Runtime stage**: Creates lightweight image with only JRE and JAR

```dockerfile
# Build stage
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
RUN adduser -D appuser
USER appuser
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Docker Compose

The `docker-compose.yml` orchestrates database and backend:

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
      - "3307:3306"
    volumes:
      - mysqldata:/var/lib/mysql

  backend:
    container_name: immobiliarisplus-be
    restart: always
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8081:8080"
    depends_on:
      - database
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://database:3306/immobiliarisplus
      SPRING_DATASOURCE_USERNAME: user
      SPRING_DATASOURCE_PASSWORD: secret

volumes:
  mysqldata:
```

### Useful Docker Commands

```bash
# Start all services
docker compose up

# Start with rebuild
docker compose up --build

# Start in background
docker compose up -d

# Stop all services
docker compose down

# View logs
docker compose logs backend
docker compose logs database

# Enter backend container
docker exec -it immobiliarisplus-be sh

# Enter database container
docker exec -it immobiliarisplus-db bash

# View running containers
docker ps

# Remove volumes (deletes database data)
docker compose down -v
```

---

## ◆ Testing

### Run Tests

```bash
# All tests
mvn test

# Specific test class
mvn test -Dtest=PropertyServiceTest

# Skip tests during build
mvn clean package -DskipTests
```

### Test Structure

```
src/test/java/com/novegruppo/immobiliarisplus/
├── controllers/          # Controller Tests
├── services/             # Service Tests
├── repositories/         # Repository Tests
└── integration/          # Integration Tests
```

---

## ◆ Troubleshooting

### Common Issues

#### 1. Port 8081 already in use

**Error:**
```
Port 8081 is already allocated
```

**Solution:**
```bash
# Find process using port
lsof -i :8081  # macOS/Linux
netstat -ano | findstr :8081  # Windows

# Kill process or change port in docker-compose.yml
```

#### 2. Connection error to MySQL

**Error:**
```
Communications link failure
```

**Solution:**
- Verify MySQL is running: `docker ps`
- Check port 3307 is available
- Verify credentials in `application.properties`

#### 3. Flyway migration error

**Error:**
```
Flyway migration failed
```

**Solution:**
```bash
# View migration status
mvn flyway:info

# Repair failed migration
mvn flyway:repair

# Clean and restart (deletes data)
mvn flyway:clean
mvn flyway:migrate
```

#### 4. JWT token invalid

**Error:**
```
401 Unauthorized
```

**Solution:**
- Verify token is included in `Authorization: Bearer <token>` header
- Verify token hasn't expired (default: 24h)
- Check JWT secret is correctly configured

#### 5. CORS error

**Error:**
```
CORS policy: No 'Access-Control-Allow-Origin' header
```

**Solution:**
Update `application.properties`:
```properties
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
```

---

## ◆ Best Practices

### Code

1. **Layered Architecture**: Maintain separation between controllers, services, and repositories
2. **DTOs**: Always use DTOs for input/output, never expose entities directly
3. **Validation**: Use Bean Validation annotations (`@NotNull`, `@Email`, `@Size`)
4. **Exception Handling**: Use custom exceptions and `@ControllerAdvice` for centralized management
5. **Logging**: Use appropriate levels (DEBUG, INFO, WARN, ERROR)

### Security

1. **Never commit**:
   - `application.properties` with real credentials
   - JWT secrets
   - Database credentials

2. **Use**:
   - Environment variables for sensitive data
   - `.gitignore` for local configuration files
   - BCrypt for password hashing
   - JWT with expiration time

### Code Quality

1. **Lombok**: Reduce boilerplate code
2. **MapStruct**: Automatic DTO-Entity mapping
3. **Validation**: Bean Validation on DTOs
4. **Exception Handling**: Centralized management with `@ControllerAdvice`
5. **Logging**: Appropriate levels (DEBUG, INFO, WARN, ERROR)

Team guidelines: [Documentation](https://github.com/nik-bell/immobiliarisplus/tree/9163f3ee477ec41f8342dbf74099617cdc6dfa57/immobiliarisplus/docs)

---

## Supporto

For issues not resolved by this README:

1. **Control logs**: `docker compose logs backend`
2. **Issue tracker**: [GitHub Issues](https://github.com/nik-bell/immobiliarisplus/issues)
3. **Contact team**: support@9gruppo.it

Links:
- [Documentazione Ufficiale Spring Boot](https://spring.io/projects/spring-boot)
- [Documentazione Ufficiale Docker](https://docs.docker.com/)
- [Documentazione Ufficiale MySQL](https://dev.mysql.com/doc/)
- [Documentazione Ufficiale Flyway](https://flywaydb.org/documentation/)
- [Documentazione Ufficiale MapStruct](https://mapstruct.org/documentation/stable/reference/html/)
- [Documentazione Ufficiale Lombok](https://projectlombok.org/features/all)
- [Documentazione Ufficiale JWT](https://jwt.io/introduction/)
- [Documentazione Ufficiale Brevo SMTP](https://www.brevo.com/en/smtp/)
- [Documentazione Ufficiale Maven](https://maven.apache.org/guides/index.html)


---

## Educational Project

This project was developed for **exclusively educational purposes** as part of the **Integrated Laboratory** course.

### ITS ICT Academy Piemonte

<div align="center">

**[ITS ICT Piemonte - Foundation](https://www.its-ictpiemonte.it/)**

*Higher Technical Institute for Information and Communication Technologies*

📍 **Location**: Via Jacopo Durandi, 10 - 10144 Turin  
📧 **Email**: info@its-ictpiemonte.it  
🌐 **Web**: [www.its-ictpiemonte.it](https://www.its-ictpiemonte.it/)  
📱 **LinkedIn**: [ITS ICT Piemonte](https://www.linkedin.com/school/its-ict-piemonte/)

</div>

### Project Purpose

This repository contains source code developed during the training program for:
- Learning modern technologies (Spring Boot, React, Docker)
- Developing full-stack skills
- Applying software development best practices
- Team work and agile methodologies

### License

**Educational Project - Not for commercial use**

© 2025 - Immobiliaris Plus Team  
Developed for ITS ICT Academy Piemonte

This project is released under MIT license for educational and learning purposes.

---

**Revision** December 2025 · **Backend** 0.0.1-SNAPSHOT · **Spring Boot** 3.5.7 · **Java** 17

