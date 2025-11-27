package com.novegruppo.immobiliarisplus.services;

public interface AutoMailService {
    void sendValuationSummary(String to, String subject, String htmlBody, String replyTo);
}
