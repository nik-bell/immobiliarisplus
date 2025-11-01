# Git Commit Guidelines

A clear and consistent commit message style improves readability and makes collaboration easier.  
This guide is based on the **Conventional Commits** style.

---

## 1️⃣ Commit Types

| Type       | When to use                                  | Example                                         |
|------------|---------------------------------------------|-------------------------------------------------|
| **feat**   | New features                                | `feat: add user login functionality`          |
| **fix**    | Bug fixes                                   | `fix: correct null pointer error on signup`   |
| **docs**   | Documentation updates                        | `docs: update README with setup instructions` |
| **style**  | Formatting or styling changes (no code logic changes) | `style: format code with prettier` |
| **refactor** | Refactoring code without changing functionality | `refactor: simplify user validation logic` |
| **test**   | Adding or updating tests                     | `test: add unit tests for login service`      |
| **chore**  | Maintenance, build or config changes        | `chore: update dependencies`                  |

---

## 2️⃣ Commit Structure

<type>(<scope>): <short description>


- **type** → one of the types listed above  
- **scope** → optional, indicates the module or area of the code  
- **short description** → brief imperative sentence describing the change  

### Examples

feat(auth): add JWT token generation
fix(ui): correct button alignment on homepage
docs(readme): add instructions for Docker setup

---

## 3️⃣ Guidelines

- Keep the **subject line ≤ 50 characters**  
- Use **imperative mood**: Add, Fix, Update  
- Separate subject and body with a **blank line**  
- The body can explain **why** the change was made or give more details

### Example with body

feat(auth): add JWT token generation

Added JWT token generation in the authentication module to support stateless login.

---

## 4️⃣ Quick Tips

- Always commit **small, self-contained changes**  
- Avoid committing unrelated changes together  
- Use this style consistently for better collaboration
