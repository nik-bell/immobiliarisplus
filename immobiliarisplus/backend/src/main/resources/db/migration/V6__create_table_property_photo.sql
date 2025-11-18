CREATE TABLE property_photo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    url VARCHAR(500),
    public_id VARCHAR(255),
    format VARCHAR(50),
    width INT,
    height INT,
    bytes BIGINT,
    is_primary BOOLEAN DEFAULT FALSE,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    version VARCHAR(50),
    alt_text VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_photo_property FOREIGN KEY (property_id)
        REFERENCES property(id) ON DELETE CASCADE
);
