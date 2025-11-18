CREATE TABLE property_address (
    property_id INT PRIMARY KEY,
    street VARCHAR(255) NOT NULL ,
    city VARCHAR(100) NOT NULL,
    CAP VARCHAR(10) NOT NULL,
    province VARCHAR(50) NOT NULL,
    latitude FLOAT,
    longitude FLOAT,
    zone_score INT,
    CONSTRAINT fk_address_property FOREIGN KEY (property_id)
      REFERENCES property(id) ON DELETE CASCADE
);