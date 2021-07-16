package com.qminh.shoppingwebapp.controller;

import com.qminh.shoppingwebapp.model.Event;
import com.qminh.shoppingwebapp.repo.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class EventController {
    @Autowired
    private EventRepository eventRepository;


    @GetMapping("/getEvent")
    List<Event> getEventById(@RequestParam(defaultValue = "1") Long id) {
        List<Event> list = eventRepository.findByUserId(id);
        list.forEach(event -> {
            event.getUser().setPassword("");
        });
        return list;
    }

    @GetMapping("/event/getEventOfUser")
    Page<Event> getEventByIdAndBetween(@RequestParam(defaultValue = "1") Long id,
                                       @RequestParam(defaultValue = "") String from,
                                       @RequestParam(defaultValue = "") String to,
                                       @RequestParam(defaultValue = "1") int pageNumber,
                                       @RequestParam(defaultValue = "7") int pageSize) {
        Page<Event> page;
        LocalDate dateFrom = LocalDate.parse(from);
        LocalDate dateTo = LocalDate.parse(to);
        page=eventRepository.findByUserIdAndAndDateBetweenOrderByDateAscTimeAsc(id,dateFrom,dateTo, PageRequest.of(pageNumber-1,pageSize));
        return page;
    }

    @PostMapping("/event/saveEvent")
    public Map<String, String> saveEvent(@RequestBody Event event) {

        Map<String, String> map = new HashMap<>();
        try {
            eventRepository.save(event);
            map.put("succes", "true");
        } catch (Exception e) {
            map.put("succes", "false");
            map.put("error", e.getMessage());
        }
        return map;
    }

}
