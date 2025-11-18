package com.novegruppo.immobiliarisplus.services.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.stream.Collectors;
import java.util.List;
import java.util.Map;

import com.novegruppo.immobiliarisplus.dtos.PropertyValuationRequestDTO;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationResultDTO;
import com.novegruppo.immobiliarisplus.entities.*;
import com.novegruppo.immobiliarisplus.enums.ContactPreference;
import com.novegruppo.immobiliarisplus.enums.Floor;
import com.novegruppo.immobiliarisplus.enums.HeatingType;
import com.novegruppo.immobiliarisplus.enums.PropertyType;
import com.novegruppo.immobiliarisplus.repositories.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.novegruppo.immobiliarisplus.services.PropertyValuationService;
import com.novegruppo.immobiliarisplus.mappers.PropertyValuationMapper;
import com.novegruppo.immobiliarisplus.exceptions.ResourceNotFoundException;
import com.novegruppo.immobiliarisplus.dtos.PropertyValuationDTO;

@Transactional
@Service
public class PropertyValuationServiceImpl implements PropertyValuationService {

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

    public PropertyValuationServiceImpl(PropertyValuationRepository propertyValuationRepository,
                                        OwnerRepository ownerRepository,
                                        PropertyRepository propertyRepository,
                                        PropertyValuationMapper propertyValuationMapper,
                                        PricePerMqRepository pricePerMqRepository,
                                        AutoMailService autoMailService) {

        this.propertyValuationMapper = propertyValuationMapper;
        this.ownerRepository = ownerRepository;
        this.propertyRepository = propertyRepository;
        this.propertyValuationRepository = propertyValuationRepository;
        this.pricePerMqRepository = pricePerMqRepository;
        this.autoMailService = autoMailService;
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

    @Override
    public PropertyValuationResultDTO calculateAndSave(PropertyValuationRequestDTO request) {
        // 1. Validazione
        if (request.sizeMq() == null || request.sizeMq().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Superficie non valida");
        }
        if (request.ownerEmail() == null || request.ownerEmail().isBlank()) {
            throw new IllegalArgumentException("Email owner obbligatoria");
        }

        // 2. Crea/Recupera Owner
        Owner owner = ownerRepository.findByEmail(request.ownerEmail())
                .orElseGet(() -> {
                    Owner newOwner = new Owner();
                    newOwner.setName(request.ownerName());
                    newOwner.setSurname(request.ownerSurname());
                    newOwner.setEmail(request.ownerEmail());
                    newOwner.setPhone(request.ownerPhone());
                    newOwner.setContactPreference(ContactPreference.EMAIL);
                    newOwner.setIntakeDate(LocalDateTime.now());
                    return ownerRepository.save(newOwner);
                });

        // 3. Crea Property
        Property property = new Property();
        property.setOwner(owner);
        property.setType(PropertyType.valueOf(request.propertyType()));
        property.setSizeMq(request.sizeMq().intValue());
        property.setRooms(request.numberOfRooms());
        property.setBathrooms(request.numberOfBathrooms());
        property.setFloor(Floor.valueOf(request.floor()));
        property.setHeatingType(HeatingType.valueOf(request.heatingType()));
        property.setHasBalcony(Boolean.TRUE.equals(request.hasTerrace()));
        property.setHasElevator(Boolean.TRUE.equals(request.hasElevator()));
        property.setHasGarden(Boolean.TRUE.equals(request.hasGarden()));
        property.setHasBasement(Boolean.TRUE.equals(request.hasBasement()));
        property.setHasGarage(Boolean.TRUE.equals(request.hasGarage()));
        property.setCreatedAt(LocalDateTime.now());
        property = propertyRepository.save(property);

        // 4. Crea PropertyAddress
        PropertyAddress address = new PropertyAddress();
        address.setProperty(property);
        address.setStreet(request.address());
        address.setCity(request.city());
        address.setCap(request.zipCode());
        property = propertyRepository.save(property);

        // 5. Calcola valutazione
        BigDecimal basePerMq = resolveBasePrice(request.zipCode());
        if (basePerMq == null || basePerMq.compareTo(BigDecimal.ZERO) == 0) {
            throw new IllegalStateException("Nessun prezzo €/mq configurato per CAP/Città: " + request.zipCode());
        }

        BigDecimal conditionCoeff = CONDITION_COEFF.getOrDefault(request.condition(), BigDecimal.ONE);
        BigDecimal typeCoeff = TYPE_COEFF.getOrDefault(request.propertyType(), BigDecimal.ONE);
        BigDecimal heatingCoeff = HEATING_COEFF.getOrDefault(request.heatingType(), BigDecimal.ONE);

        BigDecimal extraCoeff = BigDecimal.ONE
                .add(Boolean.TRUE.equals(request.hasTerrace()) ? new BigDecimal("0.03") : BigDecimal.ZERO)
                .add(Boolean.TRUE.equals(request.hasElevator()) ? new BigDecimal("0.02") : BigDecimal.ZERO)
                .add(Boolean.TRUE.equals(request.hasGarden()) ? new BigDecimal("0.05") : BigDecimal.ZERO)
                .add(Boolean.TRUE.equals(request.hasBasement()) ? new BigDecimal("0.01") : BigDecimal.ZERO)
                .add(Boolean.TRUE.equals(request.hasGarage()) ? new BigDecimal("0.04") : BigDecimal.ZERO);

        BigDecimal estimatedValue = request.sizeMq()
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

        // 6. Salva PropertyValuation 
        PropertyValuation valuation = new PropertyValuation();
        valuation.setProperty(property);
        valuation.setEmployee(null);
        valuation.setEstimatedPriceMin(minValue.doubleValue());
        valuation.setEstimatedPriceMax(maxValue.doubleValue());
        valuation.setPricePerMq(basePerMq.doubleValue());
        valuation.setCreatedAt(LocalDateTime.now());
        propertyValuationRepository.save(valuation);

        // 7. Invia email (best effort - non blocca se fallisce)
        try {
            String subject = "Riepilogo valutazione immobile";
            String html = String.format("""
                <h3>Gentile %s %s,</h3>
                <p>Ecco il riepilogo della valutazione del tuo immobile:</p>
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
                    request.address(), request.city(), request.zipCode(),
                    request.propertyType(),
                    request.sizeMq().setScale(0, RoundingMode.HALF_UP),
                    request.condition(),
                    estimatedValue.toPlainString(),
                    minValue.toPlainString(), maxValue.toPlainString()
            );

            autoMailService.sendValuationSummary(owner.getEmail(), subject, html, null);
        } catch (Exception e) {
            // Log dell'errore ma non blocca la valutazione
            System.err.println("Errore invio email: " + e.getMessage());
        }

        // 8. Ritorna risultato
        return new PropertyValuationResultDTO(
                estimatedValue,
                minValue,
                maxValue,
                basePerMq,
                details
        );
    }

    private BigDecimal resolveBasePrice(String zipCode) {
        if (zipCode != null && !zipCode.isBlank()) {
            return pricePerMqRepository.findByZipCode(zipCode)
                    .map(PricePerMq::getPricePerMq)
                    .orElse(BigDecimal.ZERO);
        }
        return BigDecimal.ZERO;
    }
}