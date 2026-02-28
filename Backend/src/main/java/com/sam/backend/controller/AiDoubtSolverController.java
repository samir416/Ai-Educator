// package com.sam.backend.controller;

// import org.springframework.web.bind.annotation.*;
// import org.springframework.http.*;
// import org.springframework.web.client.RestTemplate;
// import java.util.*;

// @RestController
// @RequestMapping("/api/ai")
// public class AiDoubtSolverController {

//     private final String API_KEY = "AIzaSyByHcuVwFRYEnu97DZLmTJUPgL4BcM2pAs"; // Get this from aistudio.google.com
//     private final String GEMINI_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY;

//     @PostMapping("/solve")
// public ResponseEntity<Map<String, String>> solveDoubt(@RequestBody Map<String, String> payload) {
//     try {
//         String userQuestion = payload.get("question");
//         System.out.println("--- NEW REQUEST RECEIVED ---");
//         System.out.println("User asked: " + userQuestion);

//         // Replace with your actual Gemini Key
//         String apiKey = "AIzaSyByHcuVwFRYEnu97DZLmTJUPgL4BcM2pAs"; 
//         String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey;

//         RestTemplate restTemplate = new RestTemplate();

//         // Gemini JSON structure
//         Map<String, Object> textPart = Map.of("text", userQuestion);
//         Map<String, Object> partList = Map.of("parts", List.of(textPart));
//         Map<String, Object> requestBody = Map.of("contents", List.of(partList));

//         ResponseEntity<Map> response = restTemplate.postForEntity(url, requestBody, Map.class);
        
//         // This line is crucial for debugging!
//         System.out.println("Gemini Raw Response: " + response.getBody());

//         List candidates = (List) response.getBody().get("candidates");
//         Map firstCandidate = (Map) candidates.get(0);
//         Map content = (Map) firstCandidate.get("content");
//         List parts = (List) content.get("parts");
//         Map firstPart = (Map) parts.get(0);
//         String aiAnswer = (String) firstPart.get("text");

//         return ResponseEntity.ok(Map.of("answer", aiAnswer, "sender", "bot"));

//     } catch (Exception e) {
//         // THIS WILL PRINT THE ACTUAL REASON IN YOUR TERMINAL
//         System.err.println("!!! JAVA CRASHED !!!");
//         e.printStackTrace(); 
//         return ResponseEntity.status(500).body(Map.of("answer", "Backend Error: " + e.getMessage()));
//     }
// }
// }
package com.sam.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:3000") // React frontend port
public class AiDoubtSolverController {

    // Inject API key from application.properties
    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String GEMINI_BASE_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=";
            

    @PostMapping("/solve")
    public ResponseEntity<Map<String, String>> solveDoubt(
            @RequestBody Map<String, String> payload) {

        try {

            String userQuestion = payload.get("question");

            if (userQuestion == null || userQuestion.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("answer", "Question cannot be empty"));
            }

            RestTemplate restTemplate = new RestTemplate();

            // Build Gemini request body
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("text", userQuestion);

            Map<String, Object> part = new HashMap<>();
            part.put("parts", List.of(textPart));

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(part));

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(requestBody, headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    GEMINI_BASE_URL + apiKey,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            Map<String, Object> body = response.getBody();

            // Handle API error safely
            if (body == null || body.containsKey("error")) {
                return ResponseEntity.status(500)
                        .body(Map.of("answer", "Gemini API Error"));
            }

            List<Map<String, Object>> candidates =
                    (List<Map<String, Object>>) body.get("candidates");

            if (candidates == null || candidates.isEmpty()) {
                return ResponseEntity.status(500)
                        .body(Map.of("answer", "No response from Gemini"));
            }

            Map<String, Object> content =
                    (Map<String, Object>) candidates.get(0).get("content");

            List<Map<String, Object>> parts =
                    (List<Map<String, Object>>) content.get("parts");

            String aiAnswer = (String) parts.get(0).get("text");

            return ResponseEntity.ok(
                    Map.of(
                            "answer", aiAnswer,
                            "sender", "bot"
                    )
            );

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(Map.of("answer", "Backend Error: " + e.getMessage()));
        }
    }
}