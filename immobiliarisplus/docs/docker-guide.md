# 🐳 Guida Docker – Avviare il Progetto in Locale

[English version 🇬🇧](#-docker-guide--run-the-project-locally)

Questa guida ti spiega come **avviare l’intero progetto (app + database)** usando Docker e Docker Compose, **senza dover 
installare MySQL o configurare nulla manualmente**.


## Architettura

Il progetto è composto da:

- **MySQL** (database)
- **Spring Boot Application** (contenuto in un file `.jar`)

Tutto è gestito da **Docker Compose**. Se non hai mai usato Docker, segui le istruzioni passo passo 


## Requisiti

- **Docker Desktop** installato:  
  [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- **Docker Compose** è già incluso in Docker Desktop

Per verificare che Docker sia installato:

```bash
docker -v
docker compose version
```


## Avviare il progetto

1. Apri il terminale nella root del progetto
2. Lancia il comando:

```bash
docker compose up --build
```

Questo farà:

1. scaricare l’immagine MySQL
2. costruire l’immagine del backend (usando il Dockerfile)
3. avviare i due container

> Le volte successive puoi usare solo `docker compose up` se non hai fatto modifiche nel codice.


## Accesso alle porte

| Servizio | Porta locale              | Descrizione            |
|----------|---------------------------|------------------------|
| app      | `http://localhost:8081`   | L'app Spring Boot      |
| database | `localhost:3307`          | Porta esposta di MySQL |


## Credenziali database

Nel container MySQL:

- Database: `immobiliarisplus`
- Utente: `user`
- Password: `secret`
- Root password: `supersecret`

Spring Boot si collega automaticamente al DB tramite queste variabili (vedi `docker-compose.yml`).


## Spegnere i container

Per fermare tutto:

```bash
docker compose down
```

Questo spegne ed elimina i container (ma mantiene i dati del database grazie al volume `mysqldata`).


## Dove vengono salvati i dati?
I dati del database MySQL sono salvati in un volume Docker chiamato `mysqldata`.
Anche se spegni i container, i dati restano.

Per rimuovere tutto (⚠️ anche i dati!):

```bash
docker compose down -v
```

## Problemi Comuni

### Errore di porta occupata

> "Port 8081 is already in use"

Chiudi altri programmi che usano quella porta (o modifica `docker-compose.yml`)

### Modifiche al codice non visibili

Hai cambiato il codice Java ma l’app non si aggiorna?
 
Ricompila l’immagine:

```bash
docker compose up --build
```


## Cosa fa il `Dockerfile`

Il Dockerfile crea un’immagine del backend:

1. **Compila il progetto** Java usando Maven
2. **Costruisce un'immagine leggera** con solo il .jar finale
3. Espone la porta `8080` (che Docker Compose poi mappa su `8081`)


## Com’è fatto il `docker-compose.yml`

Il file `docker-compose.yml` definisce **due servizi**:

### 🔹 `db` – Database MySQL

```yaml
db:
  container_name: db
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
```

- `container_name: db` — nome assegnato al container per identificarlo facilmente.
- `image: mysql:8.0.36` — immagine ufficiale MySQL, versione 8.0.36.
- `restart: always` — Docker riavvia automaticamente il container se si arresta inaspettatamente.
- `environment` — variabili d’ambiente per configurare MySQL:

    - `MYSQL_DATABASE`: nome del database creato automaticamente all’avvio.
    - `MYSQL_ROOT_PASSWORD`: password per l’utente root di MySQL.
    - `MYSQL_USER` e `MYSQL_PASSWORD`: credenziali di un utente standard per l’applicazione.
- `ports` — mappa la porta 3306 interna del container sulla porta 3307 del computer locale, così puoi connetterti al 
            database via `localhost:3307`.
- `volumes` — monta un volume Docker persistente `mysqldata` per salvare i dati del database e non perderli anche se il 
              container viene spento o rimosso.

### 🔹 `app` – Applicazione Spring Boot

```yaml
app:
  container_name: app
  restart: always
  build:
    context: .
    dockerfile: Dockerfile
  ports:
    - "8081:8080"
  depends_on:
    - db
  environment:
    SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/immobiliarisplus
    SPRING_DATASOURCE_USERNAME: user
    SPRING_DATASOURCE_PASSWORD: secret
```

- `container_name: app` — nome del container per riconoscere facilmente il servizio.
- `restart: always` — Docker riavvia automaticamente il container se si arresta inaspettatamente.
- `build` — indica di costruire l’immagine Docker dal `Dockerfile` presente nella directory corrente (`.`).
- `ports` — mappa la porta 8080 interna del container alla porta 8081 del computer locale.
- `depends_on` — fa partire il container `app` solo dopo che il container `db` è avviato.
- `environment` — variabili d’ambiente per configurare la connessione al database MySQL:

    - `SPRING_DATASOURCE_URL` — URL JDBC per collegarsi al database `qua_la_zampa` nel container `db`.
    - `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD` — credenziali per accedere al database.

## Comandi Utili

| Comando                       | Descrizione                   |
|-------------------------------|-------------------------------|
| `docker compose up`	        | Avvia i container             |
| `docker compose up --build`	| Ricostruisce e avvia          |
| `docker compose down`         | Ferma tutto                   |
| `docker ps`	                | Mostra i container attivi     |
| `docker logs app`	            | Vedi i log dell'app           |
| `docker exec -it db bash`	    | Entra nel container MySQL     |

##

Per dubbi o errori, chiedi al team. Tutto può essere risolto 

---

# 🐳 Docker Guide – Run the Project Locally

[Go back to Italian 🇮🇹](#-guida-docker--avviare-il-progetto-in-locale)

This guide explains how to run the entire project (app + database) using Docker and Docker Compose, without having to install MySQL or configure anything manually.


## Architecture

The project consists of:

- **MySQL** (database)
- **Spring Boot Application** (packaged as a `.jar` file)

Everything is managed by **Docker Compose**. If you have never used Docker, follow the step-by-step instructions below 


## Requirements

- **Docker Desktop** installed:  
  https://www.docker.com/products/docker-desktop/
- **Docker Compose** is already included in Docker Desktop

To verify that Docker is installed:

```bash
docker -v
docker compose version
```


## Start the project

1. Open a terminal at the project root
2. Run the command:

```bash
docker compose up --build
```

This will:

1. pull the MySQL image
2. build the backend image (using the Dockerfile)
3. start both containers

> Next runs can use `docker compose up` if you haven't changed the code.


## Port access

| Service  | Local port               | Description            |
|----------|--------------------------|------------------------|
| app      | `http://localhost:8081`  | Spring Boot app        |
| database | `localhost:3307`         | Exposed MySQL port     |


## Database credentials

Inside the MySQL container:

- Database: `immobiliarisplus`
- User: `user`
- Password: `secret`
- Root password: `supersecret`

Spring Boot connects to the DB automatically via these environment variables (see `docker-compose.yml`).


## Stop the containers

To stop everything:

```bash
docker compose down
```

This stops and removes the containers (but keeps the database data thanks to the `mysqldata` volume).


## Where are the data stored?
MySQL database data are stored in a Docker volume named `mysqldata`.
Even if you stop the containers, the data remain.

To remove everything (⚠️ including the data!):

```bash
docker compose down -v
```

## Common issues

### Port already in use

> "Port 8081 is already in use"

Close other programs that use that port (or change `docker-compose.yml`).

### Code changes not visible

You changed Java code but the app didn't update?

Rebuild the image:

```bash
docker compose up --build
```


## What the `Dockerfile` does

The Dockerfile creates a backend image:

1. **Compiles** the Java project using Maven
2. **Builds a lightweight image** with only the final `.jar`
3. Exposes port `8080` (which Docker Compose maps to `8081`)


## How `docker-compose.yml` is structured

The `docker-compose.yml` file defines **two services**:

### 🔹 `db` – MySQL Database

```yaml
db:
  container_name: db
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
```

- `container_name: db` — container name to identify it easily.
- `image: mysql:8.0.36` — official MySQL image, version 8.0.36.
- `restart: always` — Docker automatically restarts the container if it stops unexpectedly.
- `environment` — environment variables to configure MySQL:

    - `MYSQL_DATABASE`: name of the database created automatically at startup.
    - `MYSQL_ROOT_PASSWORD`: password for the MySQL root user.
    - `MYSQL_USER` and `MYSQL_PASSWORD`: credentials for a standard application user.
- `ports` — maps container internal port 3306 to host port 3307 so you can connect via `localhost:3307`.
- `volumes` — mounts a persistent Docker volume `mysqldata` to store database data and avoid losing them even if the container is stopped or removed.

### 🔹 `app` – Spring Boot Application

```yaml
app:
  container_name: app
  restart: always
  build:
    context: .
    dockerfile: Dockerfile
  ports:
    - "8081:8080"
  depends_on:
    - db
  environment:
    SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/immobiliarisplus
    SPRING_DATASOURCE_USERNAME: user
    SPRING_DATASOURCE_PASSWORD: secret
```

- `container_name: app` — container name to recognize the service easily.
- `restart: always` — Docker automatically restarts the container if it stops unexpectedly.
- `build` — tells Docker to build the image from the `Dockerfile` in the current directory (`.`).
- `ports` — maps container internal port 8080 to host port 8081.
- `depends_on` — starts the `app` container only after the `db` container has started.
- `environment` — environment variables to configure the MySQL connection:

    - `SPRING_DATASOURCE_URL` — JDBC URL to connect to the `immobiliarisplus` database inside the `db` container.
    - `SPRING_DATASOURCE_USERNAME` and `SPRING_DATASOURCE_PASSWORD` — credentials to access the database.

## Useful commands

| Command                        | Description                 |
|--------------------------------|-----------------------------|
| `docker compose up`            | Start the containers        |
| `docker compose up --build`    | Rebuild and start           |
| `docker compose down`          | Stop everything             |
| `docker ps`                    | Show active containers      |
| `docker logs app`              | View the app logs           |
| `docker exec -it db bash`      | Enter the MySQL container   |

##

If you have questions or issues, ask the team. Everything can be solved
