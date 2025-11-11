CREATE TABLE exclusive_contract (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    contract_url VARCHAR(500),
    status ENUM('ACTIVE', 'EXPIRED', 'PENDING') DEFAULT 'PENDING',
    signed_at DATETIME,
    expiration_date DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_contract_property FOREIGN KEY (property_id)
        REFERENCES property(id) ON DELETE CASCADE
);