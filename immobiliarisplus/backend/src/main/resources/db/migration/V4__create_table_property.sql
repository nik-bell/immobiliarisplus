CREATE TABLE property (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    status ENUM('NEW', 'BRAND_NEW', 'RECENTLY_RENOVATED', 'GOOD_CONDITION', 'TO_RENOVATE'),
    type ENUM('APARTMENT', 'HOUSE', 'VILLA', 'STUDIO', 'OFFICE'),
    size_mq INT,
    rooms INT,
    bathrooms INT,
    floor ENUM('GROUND', 'RAISED_GROUND', 'FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH_PLUS'),
    heating_type ENUM('CENTRAL', 'AUTONOMOUS', 'NONE'),
    energy_class ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G'),
    description TEXT,
    terrace BOOLEAN DEFAULT FALSE,
    elevator BOOLEAN DEFAULT FALSE,
    box_auto BOOLEAN DEFAULT FALSE,
    garden BOOLEAN DEFAULT FALSE,
    basement BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_property_owner FOREIGN KEY (owner_id)
      REFERENCES owner(id) ON DELETE CASCADE
);
