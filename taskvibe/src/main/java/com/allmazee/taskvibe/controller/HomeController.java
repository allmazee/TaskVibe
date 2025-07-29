package com.allmazee.taskvibe.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Welcome to TaskVibe API. Use /swagger-ui.html for API documentation.";
    }
}