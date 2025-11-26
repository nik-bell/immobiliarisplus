package com.novegruppo.immobiliarisplus.services.impl;

import com.novegruppo.immobiliarisplus.services.AutoMailService;
import jakarta.annotation.Nullable;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class AutoMailServiceImpl implements AutoMailService {
    private final JavaMailSender mailSender;
    private final String from;

    public AutoMailServiceImpl(JavaMailSender mailSender,
                               @Value("${app.mail.from}") String from) {
        this.mailSender = mailSender;
        this.from = from;
    }

    @Override
    public void sendValuationSummary(String to, String subject, String htmlBody, @Nullable String replyTo) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
            helper.setFrom(from);
            helper.setTo(to);              // Qui puoi usare un Firefox Relay
            helper.setSubject(subject);
            helper.setText(htmlBody, true); // true = HTML
            if (replyTo != null && !replyTo.isBlank()) {
                helper.setReplyTo(replyTo); // facoltativo: può essere un alias Relay
            }
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Errore invio email", e);
        }
    }
}
