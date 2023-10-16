package com.scl.devnest.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeDto {

    private Long id;

    private String name;

    private String employeeId;

    private String emailAddress;

    private String phoneNumber;

    private String designation;
}
