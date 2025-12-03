package com.novegruppo.immobiliarisplus.services.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Map;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationResultDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyContactDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyInfoDTO;
import com.novegruppo.immobiliarisplus.dtos.frontend.PropertyDetailsDTO;
import com.novegruppo.immobiliarisplus.entities.*;
import com.novegruppo.immobiliarisplus.enums.*;
import com.novegruppo.immobiliarisplus.repositories.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;
import com.novegruppo.immobiliarisplus.services.AutoMailService;
import com.novegruppo.immobiliarisplus.mappers.PropertyValuationMapper;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;

@Transactional
@Service
public class PropertyValuationServiceImpl implements PropertyValuationService {

    // Valuation coefficients based on property attributes

    private static final Map<String, BigDecimal> CONDITION_COEFF = Map.of(
            "NEW", new BigDecimal("1.20"),
            "BRAND_NEW", new BigDecimal("1.30"),
            "RECENTLY_RENOVATED", new BigDecimal("1.15"),
            "GOOD_CONDITION", new BigDecimal("1.00"),
            "TO_RENOVATE", new BigDecimal("0.75")
    );

    private static final Map<String, BigDecimal> TYPE_COEFF = Map.of(
            "APARTMENT", new BigDecimal("1.00"),
            "HOUSE", new BigDecimal("1.10"),
            "VILLA", new BigDecimal("1.30"),
            "STUDIO", new BigDecimal("0.85"),
            "OFFICE", new BigDecimal("0.90")
    );

    private static final Map<String, BigDecimal> HEATING_COEFF = Map.of(
            "CENTRAL", new BigDecimal("0.95"),
            "AUTONOMOUS", new BigDecimal("1.00"),
            "NONE", new BigDecimal("0.80")
    );

    private final PropertyValuationMapper propertyValuationMapper;
    private final OwnerRepository ownerRepository;
    private final PropertyRepository propertyRepository;
    private final PropertyValuationRepository propertyValuationRepository;
    private final PricePerMqRepository pricePerMqRepository;
    private final AutoMailService autoMailService;
    private final PropertyAddressRepository propertyAddressRepository;

    public PropertyValuationServiceImpl(PropertyValuationRepository propertyValuationRepository,
                                        OwnerRepository ownerRepository,
                                        PropertyRepository propertyRepository,
                                        PropertyValuationMapper propertyValuationMapper,
                                        PricePerMqRepository pricePerMqRepository,
                                        AutoMailService autoMailService,
                                        PropertyAddressRepository propertyAddressRepository) {

        this.propertyValuationMapper = propertyValuationMapper;
        this.ownerRepository = ownerRepository;
        this.propertyRepository = propertyRepository;
        this.propertyValuationRepository = propertyValuationRepository;
        this.pricePerMqRepository = pricePerMqRepository;
        this.autoMailService = autoMailService;
        this.propertyAddressRepository = propertyAddressRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public List<PropertyValuationDTO> findAll() {
        return propertyValuationRepository.findAll()
                .stream()
                .map(propertyValuationMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyValuationDTO findById(Integer integer) {
        PropertyValuation entity = propertyValuationRepository.findById(integer)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyValuation non trovata con id=" + integer));
        return propertyValuationMapper.toDTO(entity);
    }

    @Override
    public PropertyValuationDTO create(PropertyValuationDTO propertyValuationDTO) {
        throw new UnsupportedOperationException("Usa calculateAndSave per valutazioni automatiche");
    }

    @Override
    public PropertyValuationDTO update(Integer integer, PropertyValuationDTO propertyValuationDTO) {
        throw new UnsupportedOperationException("Valutazioni automatiche non modificabili");
    }

    @Override
    public void delete(Integer integer) {
        if (!propertyValuationRepository.existsById(integer)) {
            throw new ResourceNotFoundException("PropertyValuation non trovata con id=" + integer);
        }
        propertyValuationRepository.deleteById(integer);
    }

    // Core method to calculate and save property valuation
    @Override
    public PropertyValuationResultDTO calculateAndSave(PropertyValuationRequestDTO request) {
        // Extract nested objects for easier access
        PropertyInfoDTO propertyInfo = request.property();
        PropertyDetailsDTO propertyDetails = request.details();
        PropertyContactDTO propertyContact = request.contact();



        // 1. Validation input
        if (propertyInfo.surfaceM2() == null || propertyInfo.surfaceM2() <= 0) {
            throw new IllegalArgumentException("Superficie non valida");
        }
        if (propertyContact.email() == null || propertyContact.email().isBlank()) {
            throw new IllegalArgumentException("Email owner obbligatoria");
        }

        // 2. Create/retrieve Owner
        Owner owner = ownerRepository.findByEmail(propertyContact.email())
                .orElseGet(() -> {
                    Owner newOwner = new Owner();
                    newOwner.setName(propertyContact.name());
                    newOwner.setSurname(propertyContact.surname());
                    newOwner.setEmail(propertyContact.email());
                    newOwner.setPhone(propertyContact.phone());
                    newOwner.setContactPreference(ContactPreference.EMAIL);
                    newOwner.setIntakeDate(LocalDateTime.now());
                    return ownerRepository.save(newOwner);
                });

        // 3. Create and save Property
        Property property = new Property();
        property.setOwner(owner);
        property.setStatus(com.novegruppo.immobiliarisplus.enums.PropertyStatus.valueOf(propertyInfo.condition()));
        property.setType(PropertyType.valueOf(propertyInfo.propertyType()));
        property.setSizeMq(propertyInfo.surfaceM2());
        property.setRooms(propertyDetails.rooms());
        property.setBathrooms(propertyDetails.bathrooms());
        property.setFloors(propertyDetails.floor());
        property.setHeatingType(HeatingType.AUTONOMOUS);
        property.setEnergyClass(EnergyClass.G); // Default
        property.setDescription("Immobile inserito tramite valutazione automatica"); // Default
        property.setHasBalcony(Boolean.TRUE.equals(propertyDetails.features().terrazzo()));
        property.setHasElevator(Boolean.TRUE.equals(propertyDetails.features().ascensore()));
        property.setHasGarden(Boolean.TRUE.equals(propertyDetails.features().giardino()));
        property.setHasBasement(Boolean.TRUE.equals(propertyDetails.features().cantina()));
        property.setHasGarage(Boolean.TRUE.equals(propertyDetails.features().garage()));
        property.setCreatedAt(LocalDateTime.now());
        property = propertyRepository.save(property);

        // 4. Create and save PropertyAddress
        PropertyAddress address = new PropertyAddress();
        address.setProperty(property);
        address.setStreet(propertyInfo.address());
        address.setCity(propertyInfo.city());
        address.setCap(propertyInfo.zipCode());
        address.setProvince(deriveProvinceFromCity(propertyInfo.city())); // Campo obbligatorio
        propertyAddressRepository.save(address);

        // 5. Calculate valuation by coefficients and base price by CAP
        BigDecimal basePerMq = resolveBasePrice(propertyInfo.zipCode());
        if (basePerMq == null || basePerMq.compareTo(BigDecimal.ZERO) == 0) {
            throw new IllegalStateException("Nessun prezzo €/mq configurato per CAP/Città: " + propertyInfo.zipCode());
        }

        BigDecimal conditionCoeff = CONDITION_COEFF.getOrDefault(propertyInfo.condition(), BigDecimal.ONE);
        BigDecimal typeCoeff = TYPE_COEFF.getOrDefault(propertyInfo.propertyType(), BigDecimal.ONE);
        BigDecimal heatingCoeff = HEATING_COEFF.getOrDefault("AUTONOMOUS", BigDecimal.ONE); // Default

        BigDecimal extraCoeff = BigDecimal.ONE
                .add(Boolean.TRUE.equals(propertyDetails.features().terrazzo()) ? new BigDecimal("0.03") : BigDecimal.ZERO)
                .add(Boolean.TRUE.equals(propertyDetails.features().ascensore()) ? new BigDecimal("0.02") : BigDecimal.ZERO)
                .add(Boolean.TRUE.equals(propertyDetails.features().giardino()) ? new BigDecimal("0.05") : BigDecimal.ZERO)
                .add(Boolean.TRUE.equals(propertyDetails.features().cantina()) ? new BigDecimal("0.01") : BigDecimal.ZERO)
                .add(Boolean.TRUE.equals(propertyDetails.features().garage()) ? new BigDecimal("0.04") : BigDecimal.ZERO);

        BigDecimal surfaceM2Decimal = new BigDecimal(propertyInfo.surfaceM2());
        BigDecimal estimatedValue = surfaceM2Decimal
                .multiply(basePerMq)
                .multiply(conditionCoeff)
                .multiply(typeCoeff)
                .multiply(heatingCoeff)
                .multiply(extraCoeff)
                .setScale(2, RoundingMode.HALF_UP);

        BigDecimal minValue = estimatedValue.multiply(new BigDecimal("0.93")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal maxValue = estimatedValue.multiply(new BigDecimal("1.07")).setScale(2, RoundingMode.HALF_UP);

        String details = String.format(
                "Base: €%.2f/mq | Condizioni: %.2f | Tipo: %.2f | Riscaldamento: %.2f | Extra: %.2f",
                basePerMq, conditionCoeff, typeCoeff, heatingCoeff, extraCoeff
        );

        // 6. Save Property valuation
        PropertyValuation valuation = new PropertyValuation();
        valuation.setProperty(property);
        valuation.setEmployee(null);
        valuation.setEstimatedPriceMin(minValue.doubleValue());
        valuation.setEstimatedPriceMax(maxValue.doubleValue());
        valuation.setPricePerMq(basePerMq.doubleValue());
        valuation.setStatus(ValuationStatus.NEW);
        valuation.setNotes(null);
        valuation.setCreatedAt(LocalDateTime.now());
        propertyValuationRepository.save(valuation);

        // 7. Send email (best effort - catch exceptions to avoid blocking)
        try {
            String subject = "Riepilogo valutazione immobile";
            String html = String.format("""
                <h3>Gentile %s %s,</h3>
                <p>Ecco il riepilogo della valutazione del suo immobile:</p>
                <ul>
                  <li><strong>Indirizzo:</strong> %s, %s %s</li>
                  <li><strong>Tipologia:</strong> %s</li>
                  <li><strong>Superficie:</strong> %s mq</li>
                  <li><strong>Condizioni:</strong> %s</li>
                  <li><strong>Valore stimato:</strong> € %s</li>
                  <li><strong>Range:</strong> € %s - € %s</li>
                </ul>
                <p>Grazie per aver scelto ImmobiliarisPlus!</p>
                """,
                    owner.getName(), owner.getSurname(),
                    propertyInfo.address(), propertyInfo.city(), propertyInfo.zipCode(),
                    propertyInfo.propertyType(),
                    surfaceM2Decimal.setScale(0, RoundingMode.HALF_UP),
                    propertyInfo.condition(),
                    estimatedValue.toPlainString(),
                    minValue.toPlainString(), maxValue.toPlainString()
            );

            autoMailService.sendValuationSummary(owner.getEmail(), subject, html, null);
        } catch (Exception e) {
            // error during email sending - log and continue
            System.err.println("Errore invio email: " + e.getMessage());
        }

        // 8. Return result DTO
        return new PropertyValuationResultDTO(
                estimatedValue,
                minValue,
                maxValue,
                basePerMq,
                details
        );
    }

    // Helper method to get base price per square meter by zip code
    private BigDecimal resolveBasePrice(String zipCode) {
        if (zipCode != null && !zipCode.isBlank()) {
            return pricePerMqRepository.findByZipCode(zipCode)
                    .map(PricePerMq::getPricePerMq)
                    .orElse(BigDecimal.ZERO);
        }
        return BigDecimal.ZERO;
    }

    // Helper method to derive province code from city name
    private String deriveProvinceFromCity(String city) {
        if (city == null || city.isBlank()) {
            return "N/A";
        }

        // Simple mapping for demonstration; in real scenarios, use a proper lookup
        return switch (city.toLowerCase()) {
            case "asti" -> "AT";
            case "alessandria" -> "AL";
            case "torino" -> "TO";
            case "cuneo" -> "CN";

            default -> city.substring(0, Math.min(2, city.length())).toUpperCase();
        };
    }


    // Assign an employee to a valuation
    @Override
    public PropertyValuationDTO assignEmployee(Integer valuationId, Integer employeeId) {
        PropertyValuation entity = propertyValuationRepository.findById(valuationId)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyValuation non trovata con id=" + valuationId));
        if (employeeId != null) {
            Employee employee = new Employee();
            employee.setId(employeeId);
            entity.setEmployee(employee);

            // If status is NOT_ASSIGNED, change it automatically to NEW
            if (entity.getStatus() == ValuationStatus.NOT_ASSIGNED) {
                entity.setStatus(ValuationStatus.NEW);
            }
        } else {
            entity.setEmployee(null); // if already assigned, unassign employee
        }
        propertyValuationRepository.save(entity);
        return propertyValuationMapper.toDTO(entity);
    }

    // Update the status of a valuation
    @Override
    public PropertyValuationDTO updateStatus(Integer valuationId, ValuationStatus status) {
        PropertyValuation entity = propertyValuationRepository.findById(valuationId)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyValuation non trovata con id=" + valuationId));
        entity.setStatus(status);
        propertyValuationRepository.save(entity);
        return propertyValuationMapper.toDTO(entity);
    }

    // Update the notes of a valuation
    @Override
    public PropertyValuationDTO updateNotes(Integer valuationId, String notes) {
        PropertyValuation entity = propertyValuationRepository.findById(valuationId)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyValuation non trovata con id=" + valuationId));
        entity.setNotes(notes);
        propertyValuationRepository.save(entity);
        return propertyValuationMapper.toDTO(entity);
    }

    // Update the final price of a valuation
    @Override
    public PropertyValuationDTO updateFinalPrice(Integer valuationId, Double finalPrice) {
        if (finalPrice == null || finalPrice <= 0) {
            throw new IllegalArgumentException("Final price deve essere positivo");
        }
        PropertyValuation entity = propertyValuationRepository.findById(valuationId)
                .orElseThrow(() -> new ResourceNotFoundException("PropertyValuation non trovata con id=" + valuationId));
        entity.setValuationFinal(finalPrice);
        propertyValuationRepository.save(entity);
        return propertyValuationMapper.toDTO(entity);
    }
}
