package com.example.demo;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.example.demo.domain.Todo;
import com.example.demo.repository.Todorepository;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class JpaMappingTest {
    
    private final String content = "내용";

    @Autowired
    private Todorepository todorepository;

    @Autowired
    private TestEntityManager testEntityManager;

    private Todo getSaved() {
        Todo todo = Todo.builder()
                    .content(content)
                    .createdDateTime(LocalDateTime.now())
                    .build();
        return testEntityManager.persist(todo);
    }

    @Test
    public void test_get() {
        // GIVEN
        Todo todo = getSaved();
        System.out.println("=========================");
        System.out.println(todo.getId());
        System.out.println(todo.getContent());
        System.out.println(todo.getIsComplete());
        System.out.println(todo.getCreatedDateTime());
        System.out.println("=========================");
        Long id = todo.getId();
        
        // WHEN
        Todo savedTodo = todorepository.getOne(id);
        
        // THEN
        assertThat(savedTodo.getContent()).isEqualTo(content);
        assertThat(savedTodo.getContent()).isEqualTo(todo.getContent());
    }
    
    @Test
    public void test_save() {
        // GIVEN
        Todo todo = Todo.builder()
                        .content("내용1")
                        .isComplete(true)
                        .createdDateTime(LocalDateTime.now())
                        .build();
        
        // WHEN
        Todo savedTodo = todorepository.save(todo);
        System.out.println("=========================");
        System.out.println(savedTodo.getId());
        System.out.println(savedTodo.getContent());
        System.out.println(savedTodo.getIsComplete());
        System.out.println(savedTodo.getCreatedDateTime());
        System.out.println("=========================");
        
        // THEN
        assertThat(savedTodo.getId()).isGreaterThan(0);
        assertThat(savedTodo.getContent()).isEqualTo("내용1");
        assertThat(savedTodo.getIsComplete()).isEqualTo(true);
    }
    
    @Test
    public void test_delete() {
        // GIVEN
        Todo todo = getSaved();
        System.out.println("=========================");
        System.out.println(todo.getId());
        System.out.println(todo.getContent());
        System.out.println(todo.getIsComplete());
        System.out.println(todo.getCreatedDateTime());
        System.out.println("=========================");
        Long id = todo.getId();
        
        // WHEN
        todorepository.deleteById(id);
        
        // THEN
        assertThat(testEntityManager.find(Todo.class, id)).isNull();
    }
}

