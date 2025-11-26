package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.UserTokenDTO;
import com.novegruppo.immobiliarisplus.services.UserTokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/user-tokens")
public class UserTokenController {

    private final UserTokenService userTokenService;

    public UserTokenController(UserTokenService userTokenService) {
        this.userTokenService = userTokenService;
    }

    @GetMapping
    public List<UserTokenDTO> list() {
        return userTokenService.findAll();
    }

    @GetMapping("/{id}")
    public UserTokenDTO getById(@PathVariable Integer id) {
        return userTokenService.findById(id);
    }

    @PostMapping
    public ResponseEntity<UserTokenDTO> create(@RequestBody UserTokenDTO dto) {
        UserTokenDTO created = userTokenService.create(dto);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(created.id()).toUri();
        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public UserTokenDTO update(@PathVariable Integer id, @RequestBody UserTokenDTO dto) {
        return userTokenService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        userTokenService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

