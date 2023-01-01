package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.Todo;

public interface Todorepository extends JpaRepository<Todo, Long>{
    
}
