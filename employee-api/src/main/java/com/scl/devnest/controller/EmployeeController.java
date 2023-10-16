package com.scl.devnest.controller;

import com.scl.devnest.dto.EmployeeDto;
import com.scl.devnest.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService service;

    @GetMapping
    public ResponseEntity<Page<EmployeeDto>> getPage(@PageableDefault Pageable pageable) {
        Page<EmployeeDto> result = service.getPage(pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> findById(@PathVariable("id") Long id) {
        EmployeeDto result = service.findById(id);
        return ResponseEntity.ok(result);
    }

    @PostMapping
    public ResponseEntity<Void> add(@RequestBody EmployeeDto dto) {
        EmployeeDto result = service.add(dto);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/employees/" + result.getEmployeeId()));
        return ResponseEntity.status(HttpStatus.CREATED).headers(headers).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @RequestBody EmployeeDto dto) {
        dto.setId(id);
        EmployeeDto result = service.update(dto);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
