package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Sort;

import org.springframework.stereotype.Service;

import com.example.demo.domain.Todo;
import com.example.demo.repository.Todorepository;

@Service
public class Todoservices implements Todoservice{

    @Autowired
    private Todorepository todorepository;

    @Override
    public List<Todo> getTodos(Sort sort) throws Exception {
            return todorepository.findAll(sort);
    }

    @Override
    public void postTodo(Todo todo) throws Exception {
        todorepository.save(todo);
    }

    @Override
    public void deleteTodo(Long Id) throws Exception {
        todorepository.deleteById(Id);
    }

    @Override
    public Todo findTodoById(Long Id) throws Exception {
        return todorepository.findById(Id).orElse(new Todo());
    }
}
