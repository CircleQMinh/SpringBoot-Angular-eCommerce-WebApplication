package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByUserId(Long id);

    List<Event> findByUserIdAndAndDateBetween(Long id, LocalDate Start, LocalDate End);
}
