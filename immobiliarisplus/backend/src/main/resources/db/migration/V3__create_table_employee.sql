CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    phone VARCHAR(55) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT uk_employee_user_id UNIQUE (user_id),
    FOREIGN KEY (user_id) REFERENCES user(id)

);