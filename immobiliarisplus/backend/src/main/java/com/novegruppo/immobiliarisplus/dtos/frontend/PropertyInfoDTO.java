cat > src/main/java/com/novegruppo/immobiliarisplus/dtos/frontend/PropertyInfoDTO.java <<'EOF'
package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyInfoDTO(
    String address,
    String zipCode,
    String city,
    String propertyType,
    String condition,
    Integer surfaceM2
) {}
EOF
