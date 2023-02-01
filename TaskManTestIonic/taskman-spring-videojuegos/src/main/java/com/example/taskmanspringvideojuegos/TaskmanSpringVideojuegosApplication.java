package com.example.taskmanspringvideojuegos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class TaskmanSpringVideojuegosApplication implements CommandLineRunner {

    @Autowired
    public BCryptPasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(TaskmanSpringVideojuegosApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        System.out.println(passwordEncoder.encode(("1234")));
    }
}
