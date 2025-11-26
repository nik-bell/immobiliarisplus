package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.NotificationDTO;
import com.novegruppo.immobiliarisplus.services.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    // Costruttore con injection del service
    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Lista di tutte le notifiche
    @GetMapping
    public List<NotificationDTO> list() {
        return notificationService.findAll();
    }

    // Dettaglio notifica tramite ID
    @GetMapping("/{id}")
    public NotificationDTO getById(@PathVariable Integer id) {
        return notificationService.findById(id);
    }

    // Creazione nuova notifica
    @PostMapping
    public ResponseEntity<NotificationDTO> create(@RequestBody NotificationDTO dto) {
        NotificationDTO created = notificationService.create(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    // Aggiornamento notifica
    @PutMapping("/{id}")
    public NotificationDTO update(@PathVariable Integer id, @RequestBody NotificationDTO dto) {
        return notificationService.update(id, dto);
    }

    // Eliminazione notifica
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        notificationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
