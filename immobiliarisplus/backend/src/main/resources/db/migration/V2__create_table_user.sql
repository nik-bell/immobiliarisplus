CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    email VARCHAR(255),
    password_hash VARCHAR(255),
    role ENUM('ADMIN', 'AGENT', 'OWNER') DEFAULT 'OWNER',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_owner FOREIGN KEY (owner_id)
      REFERENCES owner(id) ON DELETE SET NULL
);