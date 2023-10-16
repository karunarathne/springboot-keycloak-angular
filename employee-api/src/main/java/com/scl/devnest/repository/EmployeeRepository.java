package com.scl.devnest.repository;

import com.scl.devnest.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    public abstract Optional<Employee> findByEmployeeId(String employeeId);

    public abstract boolean existsByEmployeeId(String employeeId);

    public abstract boolean existsByEmployeeIdAndIdNot(String employeeId, Long id);

    public abstract boolean existsByEmailAddress(String emailAddress);

    public abstract boolean existsByEmailAddressAndIdNot(String emailAddress, Long id);

    public abstract boolean existsByPhoneNumber(String phoneNumber);

    public abstract boolean existsByPhoneNumberAndIdNot(String phoneNumber, Long id);
}
