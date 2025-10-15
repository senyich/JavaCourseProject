package com.japancats.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello JapanCats! Server is working!";
    }

    @GetMapping("/cars")
    public String cars() {
        return "Cars endpoint would be here";
    }
}