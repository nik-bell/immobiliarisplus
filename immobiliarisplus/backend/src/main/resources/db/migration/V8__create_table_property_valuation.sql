CREATE TABLE property_valuation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    employee_id INT,
    improve_property BOOLEAN DEFAULT FALSE,
    exclusive_contract BOOLEAN DEFAULT FALSE,
    priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
    estimated_price_min DECIMAL(12,2),
    estimated_price_max DECIMAL(12,2),
    price_per_mq DECIMAL(10,2),
    confidence_score INT,
    data_source VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_valuation_property FOREIGN KEY (property_id)
        REFERENCES property(id) ON DELETE CASCADE,
    CONSTRAINT fk_valuation_employee FOREIGN KEY (employee_id)
        REFERENCES employee(id) ON DELETE SET NULL
);
