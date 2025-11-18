
CREATE TABLE property_docs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT NOT NULL,
    file_name VARCHAR(255),
    file_data LONGBLOB,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_docs_property FOREIGN KEY (property_id)
       REFERENCES property(id) ON DELETE CASCADE
);