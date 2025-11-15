package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.OwnerDTO;
import com.novegruppo.immobiliarisplus.entities.Owner;

public class OwnerMapper {

    public static OwnerDTO toDTO(Owner owner) {
        return new OwnerDTO(
                owner.getId(),
                owner.getFullName(),
                owner.getEmail(),
                owner.getPhone()
        );
    }
}
