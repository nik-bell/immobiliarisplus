package com.novegruppo.immobiliarisplus.repository;

import com.novegruppo.immobiliarisplus.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}
