package com.qminh.shoppingwebapp.repo;

import com.qminh.shoppingwebapp.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByUserId(Long id);

    Page<Event> findByUserIdAndAndDateBetweenOrderByDateAscTimeAsc(Long id, LocalDate Start, LocalDate End, Pageable pageable);
}
