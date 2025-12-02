package com.novegruppo.immobiliarisplus.mappers;

import com.novegruppo.immobiliarisplus.dtos.ExclusiveContractDTO;
import com.novegruppo.immobiliarisplus.entities.ExclusiveContract;
import com.novegruppo.immobiliarisplus.entities.Property;
import com.novegruppo.immobiliarisplus.enums.ContractStatus;
import com.novegruppo.immobiliarisplus.enums.ExclusiveContractStatus;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoField;
import javax.annotation.processing.Generated;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeConstants;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-12-01T00:59:41+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.17 (Microsoft)"
)
@Component
public class ExclusiveContractMapperImpl implements ExclusiveContractMapper {

    private final DatatypeFactory datatypeFactory;

    public ExclusiveContractMapperImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

    @Override
    public ExclusiveContractDTO toDTO(ExclusiveContract entity) {
        if ( entity == null ) {
            return null;
        }

        Integer propertyId = null;
        Integer id = null;
        String contractUrl = null;
        ContractStatus status = null;
        LocalDate signedAt = null;
        LocalDate expirationDate = null;

        propertyId = entityPropertyId( entity );
        id = entity.getId();
        contractUrl = entity.getContractUrl();
        status = exclusiveContractStatusToContractStatus( entity.getStatus() );
        signedAt = xmlGregorianCalendarToLocalDate( localDateTimeToXmlGregorianCalendar( entity.getSignedAt() ) );
        expirationDate = xmlGregorianCalendarToLocalDate( localDateTimeToXmlGregorianCalendar( entity.getExpirationDate() ) );

        ExclusiveContractDTO exclusiveContractDTO = new ExclusiveContractDTO( id, propertyId, contractUrl, status, signedAt, expirationDate );

        return exclusiveContractDTO;
    }

    @Override
    public ExclusiveContract fromCreate(ExclusiveContractDTO dto) {
        if ( dto == null ) {
            return null;
        }

        ExclusiveContract exclusiveContract = new ExclusiveContract();

        exclusiveContract.setContractUrl( dto.contractUrl() );
        exclusiveContract.setStatus( contractStatusToExclusiveContractStatus( dto.status() ) );
        exclusiveContract.setSignedAt( xmlGregorianCalendarToLocalDateTime( localDateToXmlGregorianCalendar( dto.signedAt() ) ) );
        exclusiveContract.setExpirationDate( xmlGregorianCalendarToLocalDateTime( localDateToXmlGregorianCalendar( dto.expirationDate() ) ) );

        return exclusiveContract;
    }

    @Override
    public void updateEntityFromUpdate(ExclusiveContractDTO dto, ExclusiveContract entity) {
        if ( dto == null ) {
            return;
        }

        if ( dto.contractUrl() != null ) {
            entity.setContractUrl( dto.contractUrl() );
        }
        if ( dto.status() != null ) {
            entity.setStatus( contractStatusToExclusiveContractStatus( dto.status() ) );
        }
        if ( dto.signedAt() != null ) {
            entity.setSignedAt( xmlGregorianCalendarToLocalDateTime( localDateToXmlGregorianCalendar( dto.signedAt() ) ) );
        }
        if ( dto.expirationDate() != null ) {
            entity.setExpirationDate( xmlGregorianCalendarToLocalDateTime( localDateToXmlGregorianCalendar( dto.expirationDate() ) ) );
        }
    }

    private XMLGregorianCalendar localDateToXmlGregorianCalendar( LocalDate localDate ) {
        if ( localDate == null ) {
            return null;
        }

        return datatypeFactory.newXMLGregorianCalendarDate(
            localDate.getYear(),
            localDate.getMonthValue(),
            localDate.getDayOfMonth(),
            DatatypeConstants.FIELD_UNDEFINED );
    }

    private XMLGregorianCalendar localDateTimeToXmlGregorianCalendar( LocalDateTime localDateTime ) {
        if ( localDateTime == null ) {
            return null;
        }

        return datatypeFactory.newXMLGregorianCalendar(
            localDateTime.getYear(),
            localDateTime.getMonthValue(),
            localDateTime.getDayOfMonth(),
            localDateTime.getHour(),
            localDateTime.getMinute(),
            localDateTime.getSecond(),
            localDateTime.get( ChronoField.MILLI_OF_SECOND ),
            DatatypeConstants.FIELD_UNDEFINED );
    }

    private static LocalDate xmlGregorianCalendarToLocalDate( XMLGregorianCalendar xcal ) {
        if ( xcal == null ) {
            return null;
        }

        return LocalDate.of( xcal.getYear(), xcal.getMonth(), xcal.getDay() );
    }

    private static LocalDateTime xmlGregorianCalendarToLocalDateTime( XMLGregorianCalendar xcal ) {
        if ( xcal == null ) {
            return null;
        }

        if ( xcal.getYear() != DatatypeConstants.FIELD_UNDEFINED
            && xcal.getMonth() != DatatypeConstants.FIELD_UNDEFINED
            && xcal.getDay() != DatatypeConstants.FIELD_UNDEFINED
            && xcal.getHour() != DatatypeConstants.FIELD_UNDEFINED
            && xcal.getMinute() != DatatypeConstants.FIELD_UNDEFINED
        ) {
            if ( xcal.getSecond() != DatatypeConstants.FIELD_UNDEFINED
                && xcal.getMillisecond() != DatatypeConstants.FIELD_UNDEFINED ) {
                return LocalDateTime.of(
                    xcal.getYear(),
                    xcal.getMonth(),
                    xcal.getDay(),
                    xcal.getHour(),
                    xcal.getMinute(),
                    xcal.getSecond(),
                    Duration.ofMillis( xcal.getMillisecond() ).getNano()
                );
            }
            else if ( xcal.getSecond() != DatatypeConstants.FIELD_UNDEFINED ) {
                return LocalDateTime.of(
                    xcal.getYear(),
                    xcal.getMonth(),
                    xcal.getDay(),
                    xcal.getHour(),
                    xcal.getMinute(),
                    xcal.getSecond()
                );
            }
            else {
                return LocalDateTime.of(
                    xcal.getYear(),
                    xcal.getMonth(),
                    xcal.getDay(),
                    xcal.getHour(),
                    xcal.getMinute()
                );
            }
        }
        return null;
    }

    private Integer entityPropertyId(ExclusiveContract exclusiveContract) {
        if ( exclusiveContract == null ) {
            return null;
        }
        Property property = exclusiveContract.getProperty();
        if ( property == null ) {
            return null;
        }
        int id = property.getId();
        return id;
    }

    protected ContractStatus exclusiveContractStatusToContractStatus(ExclusiveContractStatus exclusiveContractStatus) {
        if ( exclusiveContractStatus == null ) {
            return null;
        }

        ContractStatus contractStatus;

        switch ( exclusiveContractStatus ) {
            case ACTIVE: contractStatus = ContractStatus.ACTIVE;
            break;
            case EXPIRED: contractStatus = ContractStatus.EXPIRED;
            break;
            case PENDING: contractStatus = ContractStatus.PENDING;
            break;
            default: throw new IllegalArgumentException( "Unexpected enum constant: " + exclusiveContractStatus );
        }

        return contractStatus;
    }

    protected ExclusiveContractStatus contractStatusToExclusiveContractStatus(ContractStatus contractStatus) {
        if ( contractStatus == null ) {
            return null;
        }

        ExclusiveContractStatus exclusiveContractStatus;

        switch ( contractStatus ) {
            case ACTIVE: exclusiveContractStatus = ExclusiveContractStatus.ACTIVE;
            break;
            case EXPIRED: exclusiveContractStatus = ExclusiveContractStatus.EXPIRED;
            break;
            case PENDING: exclusiveContractStatus = ExclusiveContractStatus.PENDING;
            break;
            default: throw new IllegalArgumentException( "Unexpected enum constant: " + contractStatus );
        }

        return exclusiveContractStatus;
    }
}
