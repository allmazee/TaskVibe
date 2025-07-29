package com.allmazee.taskvibe.repository;

import com.allmazee.taskvibe.model.ToDoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {
    List<ToDoItem> findByUserUsername(String username);
    Optional<ToDoItem> findByIdAndUserUsername(Long id, String username);
}