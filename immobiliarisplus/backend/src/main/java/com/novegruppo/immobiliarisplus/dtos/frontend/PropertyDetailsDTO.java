cat > src/main/java/com/novegruppo/immobiliarisplus/dtos/frontend/PropertyDetailsDTO.java <<'EOF'
package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyDetailsDTO(
    Integer rooms,
    Integer bathrooms,
    String floor,
    PropertyFeaturesDTO features
) {}
EOF
