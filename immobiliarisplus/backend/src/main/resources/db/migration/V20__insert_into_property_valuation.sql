-- Insert property valuations with coherent data
INSERT INTO property_valuation (property_id, employee_id, improve_property, exclusive_contract, status, notes, estimated_price_min, estimated_price_max, price_per_mq, confidence_score, data_source, created_at) VALUES
    -- Valutazione 1: Appartamento di Luca Rossi (property 1), assegnato ad Agent One
    (1, 8, FALSE, TRUE, 'IN_PROGRESS', 'Valutazione in corso per appartamento in centro. Cliente interessato a vendita rapida.', 180000.00, 210000.00, 2200.00, 85, 'Analisi comparativa mercato locale', '2025-03-16 10:30:00'),

    -- Valutazione 2: Villetta di Maria Bianchi (property 2), assegnato ad Agent Two
    (2, 9, TRUE, TRUE, 'CONFIRMED', 'Proprietà confermata. Cliente accetta contratto esclusiva e servizio migliora casa.', 280000.00, 320000.00, 2500.00, 90, 'Perizia immobiliare certificata', '2025-03-17 14:15:00'),

    -- Valutazione 3: Villa da ristrutturare di Giovanni Verdi (property 3), non ancora assegnato
    (3, NULL, TRUE, TRUE, 'NOT_ASSIGNED', 'Richiesta valutazione per villa da ristrutturare. In attesa di assegnazione agente.', 350000.00, 450000.00, 1600.00, 70, 'Stima preliminare da portale immobiliare', '2025-03-18 09:00:00'),

    -- Valutazione 4: Studio di Francesca Russo (property 4), assegnato ad Agent Three
    (4, 10, FALSE, TRUE, 'AWAITING_CLIENT_RESPONSE', 'Valutazione completata. In attesa risposta cliente per contratto esclusiva.', 95000.00, 115000.00, 2100.00, 88, 'Analisi comparativa mercato locale', '2025-03-19 11:45:00'),

    -- Valutazione 5: Ufficio di Alessandro Ferrari (property 5), assegnato ad Agent Four
    (5, 11, FALSE, TRUE, 'CONFIRMED', 'Cliente conferma valutazione e procede con pubblicazione annuncio.', 220000.00, 250000.00, 2300.00, 92, 'Perizia immobiliare certificata', '2025-03-20 15:20:00'),

    -- Valutazione 6: Appartamento di Chiara Gallo (property 6), valutazione rifiutata
    (6, NULL, FALSE, TRUE, 'REJECTED', 'Cliente non accetta la valutazione proposta. Ritiene il prezzo troppo basso.', 160000.00, 185000.00, 2200.00, 82, 'Analisi comparativa mercato locale', '2025-03-21 08:30:00');

