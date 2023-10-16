package com.scl.devnest.advice;

import com.scl.devnest.exception.DataConflictException;
import com.scl.devnest.exception.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEntityNotFound(EntityNotFoundException ex) {
        Map<String, String> result = new HashMap<>(){{
            put("errorMessage", ex.getMessage());
        }};

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
    }

    @ExceptionHandler(DataConflictException.class)
    public ResponseEntity<Map<String, String>> handleDataConflict(DataConflictException ex) {
        Map<String, String> result = new HashMap<>(){{
            put("errorMessage", ex.getMessage());
        }};

        return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
    }
}
