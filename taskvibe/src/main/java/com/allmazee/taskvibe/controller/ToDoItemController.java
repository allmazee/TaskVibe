package com.allmazee.taskvibe.controller;

import com.allmazee.taskvibe.model.ToDoItem;
import com.allmazee.taskvibe.service.ToDoItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class ToDoItemController {
    @Autowired
    private final ToDoItemService service;

    @PostMapping
    public ResponseEntity<ToDoItem> create(@RequestBody ToDoItem toDoItem) {
        return ResponseEntity.ok(service.createToDoItem(toDoItem));
    }

    @GetMapping
    public ResponseEntity<List<ToDoItem>> getAll() {
        return ResponseEntity.ok(service.getAllToDoItems());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDoItem> getById(@PathVariable Long id) {
        return service.getToDoItemById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ToDoItem> update(@PathVariable Long id, @RequestBody ToDoItem toDoItem) {
        return service.updateToDoItem(id, toDoItem)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ToDoItem> deleteTodoItem(@PathVariable Long id) {
        if (service.deleteToDoItem(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
