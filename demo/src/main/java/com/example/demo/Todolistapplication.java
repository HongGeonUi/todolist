package com.example.demo;

import java.time.LocalDateTime;
import java.util.stream.IntStream;
 
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
 
import com.example.demo.domain.Todo;
import com.example.demo.repository.Todorepository;
 
@SpringBootApplication
public class Todolistapplication {
    public static void main(String[] args){
        SpringApplication.run(Todolistapplication.class, args);
    }

    /* @Bean
    public CommandLineRunner runner(Todorepository todorepository) throws Exception {
        return (args) -> {
            IntStream.rangeClosed(1, 10).forEach(index -> todorepository.save(Todo.builder()
                .content("2023년 목표" + index)
                .createdDateTime(LocalDateTime.now())
                .isComplete(false)
                .build())
            );
        };
    } */
}
