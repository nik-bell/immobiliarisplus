# Git Workflow - Guida per il Team

[Go to English version 🇬🇧](#git-workflow---team-guide)

Questa guida spiega come lavorare correttamente con Git e GitHub nel nostro progetto, **senza mai fare modifiche 
direttamente su `main`**. Tutto il lavoro deve essere fatto su branch separati e poi inviato tramite Pull Request (PR).


## Clonare il repository (solo la prima volta)

```bash
git clone https://github.com/tuo-username/nome-repo.git
cd nome-repo
```


## Aggiornare il progetto

Prima di iniziare a lavorare, assicurati sempre di avere l’ultima versione del branch `main`:

```bash
git checkout main
git pull origin main
```


## Creare un nuovo branch

Crea un branch descrittivo partendo da `main`, ad esempio per una nuova funzionalità o un bug fix:

```bash
git checkout -b feature/nome-funzionalita
```

Esempi di nomi:

- `feature/login-utente`
- `fix/errore-navbar`
- `docs/aggiorna-readme`

### Convenzioni per il naming dei branch

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


## Lavorare nel branch
Dopo aver fatto modifiche nel codice:

```bash
git add .
git commit -m "Breve descrizione delle modifiche"
```

### Convenzioni per i messaggi di commit

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


## Inviare il branch su GitHub

```bash
git push origin nome-del-branch
```


## Aprire una Pull Request (PR)

1. Vai sul **repository GitHub**.
2. Trova il tuo **branch** e clicca su **"Compare & pull request"**.
3. Assicurati che la **pull request (PR)** sia da **nome-del-branch → main**.
4. Scrivi una **breve descrizione** e invia la **PR**.
5. Chiedi una **review** a un membro del **team**.


## Dopo il merge della PR

Dopo che la tua PR è stata accettata e unita in `main`:

```bash
git checkout main
git pull origin main
```

Se vuoi iniziare un’altra task, **crea un nuovo branch partendo da `main` aggiornato**.


## Regole Importanti

1. ❌ Non lavorare mai direttamente su `main`
2. ✅ Ogni funzionalità o fix deve stare nel suo branch
3. ✅ Ogni modifica va inviata con una PR
4. ✅ Mantieni i branch e i messaggi di commit chiari e leggibili
5. ✅ Fai pull regolarmente da main per evitare conflitti


## Esempio completo

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

Per qualsiasi dubbio, chiedi al team.

---

# Git Workflow - Team Guide

[Back to Italian 🇮🇹](#git-workflow---guida-per-il-team)

This guide explains how to work correctly with Git and GitHub in our project, **never making changes directly on `main`**. All work must be done on separate branches and then submitted via Pull Request (PR).

## Clone the repository (first time only)

```bash
git clone https://github.com/your-username/repo-name.git
cd repo-name
```

## Update the project

Before starting to work, always make sure you have the latest version of the `main` branch:

```bash
git checkout main
git pull origin main
```

## Create a new branch

Create a descriptive branch starting from `main`, for example for a new feature or a bug fix:

```bash
git checkout -b feature/feature-name
```

Examples of names:

- `feature/user-login`
- `fix/navbar-bug`
- `docs/update-readme`

### Branch naming conventions

Use these prefixes to keep order and clarity:

- `feature/` — for new features (e.g., `feature/user-login`)
- `fix/` — for bug fixes (e.g., `fix/broken-navbar`)
- `docs/` — for documentation changes (e.g., `docs/update-readme`)
- `test/` — for test additions or changes
- `chore/` — for maintenance, configuration, or general tasks without code changes (e.g., `chore/update-dependencies`)

Tips:

- Use short but descriptive names, separating words with `-`
- Avoid spaces and special characters

## Work on the branch

After making changes in the code:

```bash
git add .
git commit -m "Short description of changes"
```

### Commit message conventions

To keep messages clear and consistent, follow these guidelines:

- Use imperative form, for example:
  - `Add` instead of `Added` or `Adding`
  - `Fix` instead of `Fixed`
- Start the message with a prefix indicating the type of change, for example:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for formatting changes without altering code behavior
  - `refactor:` for restructurings without new features or fixes
  - `test:` for test additions or changes
- Keep the message short (max 50 characters) and descriptive

### Examples of correct commit messages

- `feat: add OAuth login`
- `fix: correct navbar bug`
- `docs: update installation guide`

## Push the branch to GitHub

```bash
git push origin branch-name
```

## Open a Pull Request (PR)

1. Go to the **GitHub repository**.
2. Find your **branch** and click **"Compare & pull request"**.
3. Make sure the **pull request (PR)** is from **branch-name → main**.
4. Write a **brief description** and submit the **PR**.
5. Request a **review** from a **team** member.

## After the PR merge

After your PR is accepted and merged into `main`:

```bash
git checkout main
git pull origin main
```

If you want to start another task, **create a new branch from the updated `main`**.

## Important rules

1. ❌ Never work directly on `main`
2. ✅ Each feature or fix must be in its own branch
3. ✅ Every change must be submitted via PR
4. ✅ Keep branches and commit messages clear and readable
5. ✅ Pull regularly from `main` to avoid conflicts

## Complete example

```bash
git checkout main
git pull origin main

git checkout -b feature/contact-form
# Edit files...

git add .
git commit -m "Create contact form"
git push origin feature/contact-form

# Then open the PR on GitHub
```

For any doubt, ask the team.
