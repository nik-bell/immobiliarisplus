package com.novegruppo.immobiliarisplus.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponseDTO {

    private String token;
    private String email;
    private String role;

    public LoginResponseDTO() {
    }

    public LoginResponseDTO(String token, String email, String role) {
        this.token = token;
        this.email = email;
        this.role = role;
    }

}

