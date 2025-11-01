# 🐳 Guida Docker – Avviare il Progetto in Locale

Questa guida ti spiega come **avviare l’intero progetto (app + database)** usando Docker e Docker Compose, **senza dover 
installare MySQL o configurare nulla manualmente**.


## 🧱 Architettura

Il progetto è composto da:

- 🐘 **MySQL** (database)
- 🚀 **Spring Boot Application** (contenuto in un file `.jar`)

Tutto è gestito da **Docker Compose**. Se non hai mai usato Docker, segui le istruzioni passo passo 👇


## 🔧 Requisiti

- **Docker Desktop** installato:  
  [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- **Docker Compose** è già incluso in Docker Desktop

Per verificare che Docker sia installato:

```bash
docker -v
docker compose version
```


## ▶️ Avviare il progetto

1. Apri il terminale nella root del progetto
2. Lancia il comando:

```bash
docker compose up --build
```

Questo farà:

1. scaricare l’immagine MySQL
2. costruire l’immagine del backend (usando il Dockerfile)
3. avviare i due container

> 🔁 Le volte successive puoi usare solo `docker compose up` se non hai fatto modifiche nel codice.


## 🌐 Accesso alle porte

| Servizio | Porta locale              | Descrizione            |
|----------|---------------------------|------------------------|
| app      | `http://localhost:8081`   | L'app Spring Boot      |
| database | `localhost:3307`          | Porta esposta di MySQL |


## 🗂️ Credenziali database

Nel container MySQL:

- Database: `immobiliarisplus`
- Utente: `user`
- Password: `secret`
- Root password: `supersecret`

Spring Boot si collega automaticamente al DB tramite queste variabili (vedi `docker-compose.yml`).


## 🛑 Spegnere i container

Per fermare tutto:

```bash
docker compose down
```

Questo spegne ed elimina i container (ma mantiene i dati del database grazie al volume `mysqldata`).


## 💾 Dove vengono salvati i dati?
I dati del database MySQL sono salvati in un volume Docker chiamato `mysqldata`.
Anche se spegni i container, i dati restano.

Per rimuovere tutto (⚠️ anche i dati!):

```bash
docker compose down -v
```

## 🐞 Problemi Comuni

### ❌ Errore di porta occupata

> "Port 8081 is already in use"

👉 Chiudi altri programmi che usano quella porta (o modifica `docker-compose.yml`)

### ❌ Modifiche al codice non visibili

Hai cambiato il codice Java ma l’app non si aggiorna?

👉 Ricompila l’immagine:

```bash
docker compose up --build
```


## 📦 Cosa fa il `Dockerfile`

Il Dockerfile crea un’immagine del backend:

1. **Compila il progetto** Java usando Maven
2. **Costruisce un'immagine leggera** con solo il .jar finale
3. Espone la porta `8080` (che Docker Compose poi mappa su `8081`)


## 📄 Com’è fatto il `docker-compose.yml`

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

## 📚 Comandi Utili

| Comando                       | Descrizione                   |
|-------------------------------|-------------------------------|
| `docker compose up`	        | Avvia i container             |
| `docker compose up --build`	| Ricostruisce e avvia          |
| `docker compose down`         | Ferma tutto                   |
| `docker ps`	                | Mostra i container attivi     |
| `docker logs app`	            | Vedi i log dell'app           |
| `docker exec -it db bash`	    | Entra nel container MySQL     |

##

Per dubbi o errori, chiedi al team. Tutto può essere risolto 💬
