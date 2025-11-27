package com.novegruppo.immobiliarisplus.services;

import org.springframework.web.multipart.MultipartFile;

import com.novegruppo.immobiliarisplus.dtos.PropertyDocsDTO;

public interface PropertyDocsService extends CrudService<PropertyDocsDTO, PropertyDocsDTO, PropertyDocsDTO, Integer> {

    PropertyDocsDTO upload(Integer propertyId, MultipartFile file);

    Object download(Integer id);
}

