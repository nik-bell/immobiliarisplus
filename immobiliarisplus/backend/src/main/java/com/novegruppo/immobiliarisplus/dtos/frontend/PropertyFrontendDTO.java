cat > src/main/java/com/novegruppo/immobiliarisplus/dtos/frontend/PropertyFrontendDTO.java <<'EOF'
package com.novegruppo.immobiliarisplus.dtos.frontend;

public record PropertyFrontendDTO(
    PropertyInfoDTO property,
    PropertyDetailsDTO details,
    PropertyContactDTO contact
) {}
EOF
