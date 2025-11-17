package com.novegruppo.immobiliarisplus.controllers;

import com.novegruppo.immobiliarisplus.dtos.PropertyDocsDTO;
import com.novegruppo.immobiliarisplus.services.PropertyDocsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/property-docs")
public class PropertyDocsController {

    private final PropertyDocsService propertyDocsService;

    public PropertyDocsController(PropertyDocsService propertyDocsService) {
        this.propertyDocsService = propertyDocsService;
    }

    @GetMapping
    public List<PropertyDocsDTO> list() {
        return propertyDocsService.findAll();
    }

    @GetMapping("/{id}")
    public PropertyDocsDTO getById(@PathVariable Integer id) {
        return propertyDocsService.findById(id);
    }

    @PostMapping
    public ResponseEntity<PropertyDocsDTO> create(@RequestBody PropertyDocsDTO dto) {
        PropertyDocsDTO created = propertyDocsService.create(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(created.id())
                .toUri();

        return ResponseEntity.created(location).body(created);
    }

    @PutMapping("/{id}")
    public PropertyDocsDTO update(@PathVariable Integer id, @RequestBody PropertyDocsDTO dto) {
        return propertyDocsService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        propertyDocsService.delete(id);
        return ResponseEntity.noContent().build();
    }

    //   Upload Documento (pdf o immagine)

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PropertyDocsDTO> uploadDocument(
            @RequestParam("propertyId") Integer propertyId,
            @RequestParam("file") MultipartFile file
    ) {
        PropertyDocsDTO uploaded = propertyDocsService.upload(propertyId, file);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(uploaded.id())
                .toUri();

        return ResponseEntity.created(location).body(uploaded);
    }

    //   Download Documento

    @GetMapping("/{id}/download")
    public ResponseEntity<Object> downloadDocument(@PathVariable Integer id) {

        var fileData = propertyDocsService.download(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + ((PropertyDocsDTO) fileData).fileName() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(((PropertyDocsDTO) fileData).bytes());
    }
}
