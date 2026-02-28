package com.sam.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000")
public class AiDoubtSolverController {

    @PostMapping("/solve")
    public ResponseEntity<Map<String, String>> solveDoubt(@RequestBody Map<String, String> payload) {
        String question = payload.get("question").toLowerCase();
        String answer;

        // Simple Rule-Based Logic (The "Mock AI")
        if (question.contains("hello") || question.contains("hi")) {
            answer = "Hello! I am your AI Educator. What subject are we studying today?";
        } else if (question.contains("java")) {
            answer = "Java is a high-level, class-based, object-oriented programming language. Need a code example?";
        } else if (question.contains("react")) {
            answer = "React is a JavaScript library for building user interfaces. It uses a virtual DOM to stay fast!";
        } else if (question.contains("help")) {
            answer = "I can help with Java, Spring Boot, or React. Just ask a specific question!";
        } else {
            answer = "That's an interesting question about '" + question + "'. While I'm in offline mode, I can't give a full detailed answer, but I'm connected to your backend!";
        }

        // Add a 1-second delay to simulate AI processing
        try { Thread.sleep(1000); } catch (InterruptedException e) { e.printStackTrace(); }

        Map<String, String> response = new HashMap<>();
        response.put("answer", answer);
        response.put("sender", "bot");

        return ResponseEntity.ok(response);
    }
}