package com.scl.devnest.service;

import com.scl.devnest.dto.EmployeeDto;
import com.scl.devnest.entity.Employee;
import com.scl.devnest.exception.DataConflictException;
import com.scl.devnest.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public Page<EmployeeDto> getPage(Pageable pageable) {
        Page<Employee> page = repository.findAll(pageable);
        List<EmployeeDto> content = page.getContent().stream()
                .map(entity -> convertToDto(entity))
                .collect(Collectors.toList());

        return new PageImpl<>(content, page.getPageable(), page.getTotalElements());
    }

    public EmployeeDto findById(Long id) {
        Employee entity = findEntity(id);
        return convertToDto(entity);
    }

    public EmployeeDto add(EmployeeDto dto) {
        Employee entity = convertToEntity(dto, true);
        entity = repository.save(entity);
        return convertToDto(entity);
    }

    public EmployeeDto update(EmployeeDto dto) {
        Employee entity = convertToEntity(dto, false);
        entity = repository.save(entity);
        return convertToDto(entity);
    }

    public void delete(Long id) {
        Employee entity = findEntity(id);
        repository.delete(entity);
    }

    private Employee convertToEntity(EmployeeDto dto, boolean isNew) {
        Employee entity = isNew? new Employee() : findEntity(dto.getId());

        if((isNew && repository.existsByEmployeeId(dto.getEmployeeId()) ||
                (!isNew && repository.existsByEmployeeIdAndIdNot(dto.getEmployeeId(), dto.getId())))) {
            throw new DataConflictException("Employee already exists with Employee ID = " + dto.getEmployeeId());
        }

        if((isNew && repository.existsByEmailAddress(dto.getEmailAddress()) ||
                (!isNew && repository.existsByEmailAddressAndIdNot(dto.getEmailAddress(), dto.getId())))) {
            throw new DataConflictException("Employee already exists with email address = " + dto.getEmailAddress());
        }

        if((isNew && repository.existsByPhoneNumber(dto.getPhoneNumber()) ||
                (!isNew && repository.existsByPhoneNumberAndIdNot(dto.getPhoneNumber(), dto.getId())))) {
            throw new DataConflictException("Employee already exists with phone number = " + dto.getPhoneNumber());
        }

        entity.setName(dto.getName());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setEmailAddress(dto.getEmailAddress());
        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setDesignation(dto.getDesignation());

        return entity;
    }

    private EmployeeDto convertToDto(Employee entity) {
        return EmployeeDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .employeeId(entity.getEmployeeId())
                .emailAddress(entity.getEmailAddress())
                .phoneNumber(entity.getPhoneNumber())
                .designation(entity.getDesignation())
                .build();
    }

    private Employee findEntity(Long id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Could not find an employee with id = " + id));
    }
}
