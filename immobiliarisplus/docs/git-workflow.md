# 🧬 Git Workflow - Guida per il Team

Questa guida spiega come lavorare correttamente con Git e GitHub nel nostro progetto, **senza mai fare modifiche 
direttamente su `main`**. Tutto il lavoro deve essere fatto su branch separati e poi inviato tramite Pull Request (PR).


## 📦 Clonare il repository (solo la prima volta)

```bash
git clone https://github.com/tuo-username/nome-repo.git
cd nome-repo
```


## 🔄 Aggiornare il progetto

Prima di iniziare a lavorare, assicurati sempre di avere l’ultima versione del branch `main`:

```bash
git checkout main
git pull origin main
```


## 🌿 Creare un nuovo branch

Crea un branch descrittivo partendo da `main`, ad esempio per una nuova funzionalità o un bug fix:

```bash
git checkout -b feature/nome-funzionalita
```

Esempi di nomi:

- `feature/login-utente`
- `fix/errore-navbar`
- `docs/aggiorna-readme`

### 📛 Convenzioni per il naming dei branch

Usa questi prefissi per mantenere ordine e chiarezza:

- `feature/` — per nuove funzionalità (es. `feature/user-login`)

- `fix/` — per correzioni di bug (es. `fix/broken-navbar`)

- `docs/` — per modifiche alla documentazione (es. `docs/update-readme`)

- `test/` — per aggiunte o modifiche ai test

- `chore/` — per attività di manutenzione, configurazioni o task generali senza modifiche al codice 
             (es. `chore/update-dependencies`)

Consigli:

- Usa nomi brevi ma descrittivi, separando parole con il trattino -
- Evita spazi e caratteri speciali


## 🛠️ Lavorare nel branch
Dopo aver fatto modifiche nel codice:

```bash
git add .
git commit -m "Breve descrizione delle modifiche"
```

### 📝 Convenzioni per i messaggi di commit

Per mantenere i messaggi chiari e uniformi, segui queste linee guida:

- Usa la forma all’infinito (imperativo), ad esempio:

    - `Add` invece di `Added` o `Adding`
    - `Fix` invece di `Fixed`

- Inizia il messaggio con un prefisso che indica il tipo di modifica, ad esempio:

    - `feat:` per nuove funzionalità
    - `fix:` per correzioni di bug
    - `docs:` per modifiche alla documentazione
    - `style:` per modifiche di formattazione senza cambiare il codice
    - `refactor:` per ristrutturazioni senza nuove funzionalità o fix
    - `test:` per aggiunta o modifica di test

- Il messaggio deve essere breve (max 50 caratteri) e descrittivo

### Esempi di messaggi di commit corretti

- `feat: add OAuth login`
- `fix: correct navbar bug`
- `docs: update installation guide`


## ⬆️ Inviare il branch su GitHub

```bash
git push origin nome-del-branch
```


## 🚀 Aprire una Pull Request (PR)

1. Vai sul **repository GitHub**.
2. Trova il tuo **branch** e clicca su **"Compare & pull request"**.
3. Assicurati che la **pull request (PR)** sia da **nome-del-branch → main**.
4. Scrivi una **breve descrizione** e invia la **PR**.
5. Chiedi una **review** a un membro del **team**.


## 🔁 Dopo il merge della PR

Dopo che la tua PR è stata accettata e unita in `main`:

```bash
git checkout main
git pull origin main
```

Se vuoi iniziare un’altra task, **crea un nuovo branch partendo da `main` aggiornato**.


## ❗Regole Importanti

1. ❌ Non lavorare mai direttamente su `main`
2. ✅ Ogni funzionalità o fix deve stare nel suo branch
3. ✅ Ogni modifica va inviata con una PR
4. ✅ Mantieni i branch e i messaggi di commit chiari e leggibili
5. ✅ Fai pull regolarmente da main per evitare conflitti


## 🧠 Esempio completo

```bash
git checkout main
git pull origin main

git checkout -b feature/form-contatti
# Modifico i file...

git add .
git commit -m "Creazione form contatti"
git push origin feature/form-contatti

# Poi apri la PR su GitHub
```

Per qualsiasi dubbio, chiedi al team. 💬