#  Java Spring Boot - Coding Style Guide
 [English version 🇬🇧](#java-spring-boot---coding-style-guide-english-version)

Questa guida descrive le convenzioni di stile da seguire nel nostro progetto Java Spring Boot.

L’obiettivo è mantenere il codice leggibile, uniforme e facile da mantenere.


##  Linguaggio del codice

Tutto il codice, inclusi nomi di classi, variabili, metodi e commenti, deve essere scritto in **inglese**.  
Questo facilita la collaborazione con sviluppatori esterni e l’utilizzo di librerie e strumenti internazionali.


## 1. Formattazione del codice

- Usa **indentazione a 4 spazi**, non tab (a meno che il tab sia configurato a 4 spazi, vedi nota più sotto)  
- Mantieni una **lunghezza massima delle righe di 120 caratteri**  
- Apri le parentesi `{` sulla stessa riga della dichiarazione  
- Usa uno spazio dopo `if`, `for`, `while`, `switch` prima della parentesi di apertura

```java
if (condition) {
    // codice qui
}
```

### Indentazione: perché preferire gli spazi rispetto ai tab?

#### Uniformità tra editor:
Ogni editor o IDE può mostrare i tab con larghezze diverse (2, 4 o 8 spazi).  
Questo può causare disallineamenti se i membri del team hanno impostazioni diverse.

#### Coerenza nel versionamento:
Usando gli spazi, tutti vedono la stessa indentazione indipendentemente dall’editor usato,  
rendendo le differenze (diff) più leggibili e pulite.

#### Standard di settore:
Molte guide di stile, come la Google Java Style Guide, raccomandano l’uso degli spazi per una formattazione uniforme.

#### Evitare mischiamenti:
Mischiare tab e spazi può causare errori di indentazione difficili da individuare.  
Scegliere gli spazi e mantenerli aiuta a prevenire questi problemi.

> **Nota:**  
> I tab non sono sbagliati, e possono essere usati se **tutti** nel team hanno il tab configurato a 4 spazi,  
> così da mantenere una visualizzazione uniforme.


## 2. Nomi delle classi e package

- **Classi** in *PascalCase* (es. `UserController`, `OrderService`)  
- **Package** in lettere minuscole, separate da punti (es. `com.company.project.controller`)  
- Non usare underscore o trattini nei nomi di classi o package


## 3. Nomi di variabili e metodi

- Usa *camelCase* (es. `userRepository`, `calculateTotal()`)  
- I nomi devono essere significativi e descrittivi, evita abbreviazioni troppo criptiche  
- I metodi devono essere verbi o frasi verbali (es. `saveUser()`, `getOrderById()`)


## 4. Costanti

- Costanti statiche finali in **MAIUSCOLO_SEPARATE_DA_UNDERSCORE**  
- Es: `public static final int MAX_SIZE = 50;`


## 5. Commenti

- Usa commenti solo per spiegare “perché” e non “cosa” fa il codice  
- Usa Javadoc per classi pubbliche, metodi e API  
- Mantieni i commenti aggiornati

Esempio Javadoc:

```java
/**
 * Retrieves a user from the database given the ID.
 * @param id the user's ID
 * @return the found user or null if not found
 */
public User getUserById(Long id) {
    // implementation
}
```


## 6. Gestione delle eccezioni

- Usa eccezioni specifiche  
- Evita di catturare eccezioni generiche come `Exception` o `Throwable` a meno che non sia strettamente necessario  
- Logga sempre le eccezioni quando le catturi


## 7. Spring Boot specifico

- Usa **Dependency Injection** tramite annotazioni `@Autowired` o costruttore (preferibile)  
- Annotazioni `@Service`, `@Repository`, `@Controller`, `@RestController` devono essere usate correttamente  
- Configura le proprietà nel file `application.properties` o `application.yml`, evita valori hardcoded nel codice  
- Segui le convenzioni di naming Spring per metodi e bean


## 8. Struttura del progetto

Organizza i file in package chiari e separati per funzionalità, ad esempio:

```bash
src/main/java/com/company/project/
├── controller
├── services
├── repos
├── entities
└── config
```

## 9. Test

- Scrivi test unitari e di integrazione usando JUnit e Mockito  
- I nomi dei test devono essere chiari e descrivere cosa testano  
- Esempio: `shouldReturnUserWhenIdExists()`


## 10. Best Practices generali

- Evita duplicazione di codice (DRY - Don't Repeat Yourself)  
- Scrivi metodi brevi e con una sola responsabilità (Single Responsibility Principle)  
- Usa `Optional` per valori che potrebbero essere assenti  
- Mantieni il codice semplice e leggibile

---

---

#  Java Spring Boot - Coding Style Guide (English Version)

[Go back to Italian 🇮🇹](#java-spring-boot---coding-style-guide)

This guide describes the style conventions to be followed in our Java Spring Boot project.

The goal is to keep the code readable, consistent, and easy to maintain.


##  Code language

All code, including class names, variables, methods, and comments, must be written in **English**.  
This facilitates collaboration with external developers and the use of international libraries and tools.


## 1. Code formatting

- Use **4 spaces indentation**, not tabs (unless the tab is configured to 4 spaces, see the note below)  
- Keep a **maximum line length of 120 characters**  
- Place opening braces `{` on the same line as the declaration  
- Use a space after `if`, `for`, `while`, `switch` before the opening parenthesis

```java
if (condition) {
    // code here
}
```

### Indentation: why prefer spaces over tabs?

#### Consistency across editors:
Each editor or IDE can render tabs with different widths (2, 4, or 8 spaces).  
This can cause misalignment if team members have different settings.

#### Consistency in version control:
Using spaces ensures everyone sees the same indentation regardless of the editor used,  
making diffs more readable and clean.

#### Industry standards:
Many style guides, such as the Google Java Style Guide, recommend using spaces for uniform formatting.

#### Avoid mixing:
Mixing tabs and spaces can cause indentation issues that are hard to spot.  
Choosing spaces and sticking to them helps prevent these problems.

> **Note:**  
> Tabs are not inherently wrong and can be used if **everyone** on the team has tabs configured to 4 spaces,  
> so that the visual result remains consistent.


## 2. Class and package names

- **Classes** in *PascalCase* (e.g., `UserController`, `OrderService`)  
- **Packages** in lowercase, separated by dots (e.g., `com.company.project.controller`)  
- Do not use underscores or hyphens in class or package names


## 3. Variable and method names

- Use *camelCase* (e.g., `userRepository`, `calculateTotal()`)  
- Names must be meaningful and descriptive; avoid overly cryptic abbreviations  
- Methods should be verbs or verb phrases (e.g., `saveUser()`, `getOrderById()`)


## 4. Constants

- Static final constants in **UPPER_SNAKE_CASE**  
- Example: `public static final int MAX_SIZE = 50;`


## 5. Comments

- Use comments to explain “why”, not “what” the code does  
- Use Javadoc for public classes, methods, and APIs  
- Keep comments up to date

Javadoc example:

```java
/**
 * Retrieves a user from the database by ID.
 * @param id the user's ID
 * @return the found user or null if not found
 */
public User getUserById(Long id) {
    // implementation
}
```


## 6. Exception handling

- Use specific exceptions  
- Avoid catching generic exceptions like `Exception` or `Throwable` unless strictly necessary  
- Always log exceptions when you catch them


## 7. Spring Boot specifics

- Use **Dependency Injection** via `@Autowired` annotations or constructor injection (preferred)  
- Use `@Service`, `@Repository`, `@Controller`, `@RestController` appropriately  
- Configure properties in `application.properties` or `application.yml`, avoid hard-coded values in code  
- Follow Spring naming conventions for methods and beans


## 8. Project structure

Organize files into clear, feature-oriented packages, for example:

```bash
src/main/java/com/company/project/
├── controller
├── services
├── repos
├── entities
└── config
```

## 9. Tests

- Write unit and integration tests using JUnit and Mockito  
- Test names must be clear and describe what they verify  
- Example: `shouldReturnUserWhenIdExists()`


## 10. General Best Practices

- Avoid code duplication (DRY - Don't Repeat Yourself)  
- Write short methods with a single responsibility (Single Responsibility Principle)  
- Use `Optional` for values that may be absent  
- Keep the code simple and readable
