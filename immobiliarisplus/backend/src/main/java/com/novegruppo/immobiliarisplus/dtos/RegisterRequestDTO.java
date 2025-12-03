package com.novegruppo.immobiliarisplus.dtos;

import com.novegruppo.immobiliarisplus.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

// DTO for user registration requests.


@Setter
@Getter
public class RegisterRequestDTO {

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotNull(message = "Role is required")
    private UserRole role;

    // For owner registration, this can be null
    private Integer ownerId;

    // Parameterless constructor
    public RegisterRequestDTO() {
    }

    public RegisterRequestDTO(String email, String password, UserRole role, Integer ownerId) {
        this.email = email;
        this.password = password;
        this.role = role;
        this.ownerId = ownerId;
    }

}

