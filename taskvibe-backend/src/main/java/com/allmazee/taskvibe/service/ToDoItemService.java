package com.allmazee.taskvibe.service;

import com.allmazee.taskvibe.model.ToDoItem;
import com.allmazee.taskvibe.model.User;
import com.allmazee.taskvibe.repository.ToDoItemRepository;
import com.allmazee.taskvibe.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ToDoItemService {
    @Autowired
    private ToDoItemRepository toDoItemRepository;
    @Autowired
    private UserRepository userRepository;

    public ToDoItem createToDoItem(ToDoItem toDoItem) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        toDoItem.setCreatedAt(LocalDateTime.now());
        toDoItem.setUser(user);
        return toDoItemRepository.save(toDoItem);
    }

    public Optional<ToDoItem> getToDoItemById(Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return toDoItemRepository.findByIdAndUserUsername(id, username);
    }

    public List<ToDoItem> getAllToDoItems() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return toDoItemRepository.findByUserUsername(username);
    }

    public Optional<ToDoItem> updateToDoItem(Long id, ToDoItem toDoItem) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<ToDoItem> item = toDoItemRepository.findByIdAndUserUsername(id, username);
        if (item.isPresent()) {
            ToDoItem itemToUpdate = item.get();
            itemToUpdate.setTitle(toDoItem.getTitle());
            itemToUpdate.setDescription(toDoItem.getDescription());
            return Optional.of(toDoItemRepository.save(itemToUpdate));
        }
        return Optional.empty();
    }

    public boolean deleteToDoItem(Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<ToDoItem> item = toDoItemRepository.findByIdAndUserUsername(id, username);
        if (item.isPresent()) {
            toDoItemRepository.delete(item.get());
            return true;
        }
        return false;
    }
}