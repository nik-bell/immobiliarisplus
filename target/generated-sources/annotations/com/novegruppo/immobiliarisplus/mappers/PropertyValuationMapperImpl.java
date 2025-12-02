package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;
import com.novegruppo.immobiliarisplus.entities.Employee;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.entities.PropertyValuation;
import com.novegruppo.immobiliarisplus.enums.ValuationStatus;
import java.time.LocalDateTime;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:41+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class PropertyValuationMapperImpl implements PropertyValuationMapper {

    @Override
    public PropertyValuationDTO toDTO(PropertyValuation entity) {
        if ( entity == null ) {
            return null;
        }

        Integer propertyId = null;
        Integer employeeId = null;
        Integer id = null;
        Boolean improveProperty = null;
        Boolean exclusiveContract = null;
        ValuationStatus status = null;
        Double estimatedPriceMin = null;
        Double estimatedPriceMax = null;
        Double pricePerMq = null;
        Integer confidenceScore = null;
        String dataSource = null;
        String notes = null;
        LocalDateTime createdAt = null;

        propertyId = entityPropertyId( entity );
        employeeId = entityEmployeeId( entity );
        id = entity.getId();
        improveProperty = entity.getImproveProperty();
        exclusiveContract = entity.getExclusiveContract();
        status = entity.getStatus();
        estimatedPriceMin = entity.getEstimatedPriceMin();
        estimatedPriceMax = entity.getEstimatedPriceMax();
        pricePerMq = entity.getPricePerMq();
        confidenceScore = entity.getConfidenceScore();
        dataSource = entity.getDataSource();
        notes = entity.getNotes();
        createdAt = entity.getCreatedAt();

        PropertyValuationDTO propertyValuationDTO = new PropertyValuationDTO( id, propertyId, employeeId, improveProperty, exclusiveContract, status, estimatedPriceMin, estimatedPriceMax, pricePerMq, confidenceScore, dataSource, notes, createdAt );

        return propertyValuationDTO;
    }

    @Override
    public PropertyValuation fromCreate(PropertyValuationDTO dto) {
        if ( dto == null ) {
            return null;
        }

        PropertyValuation propertyValuation = new PropertyValuation();

        propertyValuation.setImproveProperty( dto.improveProperty() );
        propertyValuation.setExclusiveContract( dto.exclusiveContract() );
        propertyValuation.setStatus( dto.status() );
        propertyValuation.setNotes( dto.notes() );
        propertyValuation.setEstimatedPriceMin( dto.estimatedPriceMin() );
        propertyValuation.setEstimatedPriceMax( dto.estimatedPriceMax() );
        propertyValuation.setPricePerMq( dto.pricePerMq() );
        propertyValuation.setConfidenceScore( dto.confidenceScore() );
        propertyValuation.setDataSource( dto.dataSource() );

        return propertyValuation;
    }

    @Override
    public void updateEntityFromUpdate(PropertyValuationDTO dto, PropertyValuation entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.improveProperty() != null ) {
            entity.setImproveProperty( dto.improveProperty() );
        }
        if ( dto.exclusiveContract() != null ) {
            entity.setExclusiveContract( dto.exclusiveContract() );
        }
        if ( dto.status() != null ) {
            entity.setStatus( dto.status() );
        }
        if ( dto.notes() != null ) {
            entity.setNotes( dto.notes() );
        }
        if ( dto.estimatedPriceMin() != null ) {
            entity.setEstimatedPriceMin( dto.estimatedPriceMin() );
        }
        if ( dto.estimatedPriceMax() != null ) {
            entity.setEstimatedPriceMax( dto.estimatedPriceMax() );
        }
        if ( dto.pricePerMq() != null ) {
            entity.setPricePerMq( dto.pricePerMq() );
        }
        if ( dto.confidenceScore() != null ) {
            entity.setConfidenceScore( dto.confidenceScore() );
        }
        if ( dto.dataSource() != null ) {
            entity.setDataSource( dto.dataSource() );
        }
    }

    private Integer entityPropertyId(PropertyValuation propertyValuation) {
        if ( propertyValuation == null ) {
            return null;
        }
        Property property = propertyValuation.getProperty();
        if ( property == null ) {
            return null;
        }
        int id = property.getId();
        return id;
    }

    private Integer entityEmployeeId(PropertyValuation propertyValuation) {
        if ( propertyValuation == null ) {
            return null;
        }
        Employee employee = propertyValuation.getEmployee();
        if ( employee == null ) {
            return null;
        }
        Integer id = employee.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
