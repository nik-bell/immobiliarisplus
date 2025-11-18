package com.novegruppo.immobiliarisplus.services;

import java.util.List;

public interface CrudService<CreateDTO, UpdateDTO, ReadDTO, ID> {
    List<ReadDTO> findAll();
    ReadDTO findById(ID id);
    ReadDTO create(CreateDTO dto);
    ReadDTO update(ID id, UpdateDTO dto);
    void delete(ID id);
}
