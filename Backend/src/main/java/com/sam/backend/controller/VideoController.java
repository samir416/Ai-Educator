package com.sam.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import com.sam.backend.model.Video;
import com.sam.backend.repository.VideoRepository;
import com.sam.backend.service.voice.*;
import com.sam.backend.service.ai.ScriptEnhancerService;
import com.sam.backend.service.video.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class VideoController {

    private final VideoRepository videoRepository;

    public VideoController(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    // ================= UPDATED ENDPOINT =================

    @PostMapping("/generate")
    public Video generate(
            @RequestParam("file") MultipartFile file,
            @RequestParam("duration") String durationPreference) {

        Video video = new Video();
        // ================= MULTIPLE FILE SIZE VALIDATION =================

        if (file.getSize() > 10 * 1024 * 1024) {
            throw new RuntimeException("File size exceeds 10MB limit.");
        }

        try {

            // ================= FILE SIZE LIMIT (NEW ADDED - MAX 10MB) =================

            long maxSize = 10 * 1024 * 1024; // 10MB

            if (file.getSize() > maxSize) {
                throw new RuntimeException("PDF exceeds maximum allowed size of 10MB.");
            }

            // ================= PDF PAGE LIMIT VALIDATION =================

            PDDocument document = PDDocument.load(file.getInputStream());
            int totalPages = document.getNumberOfPages();

            if (totalPages > 20) {
                document.close();
                throw new RuntimeException("PDF exceeds maximum allowed limit of 20 pages.");
            }

            // ================= EXTRACT TEXT FROM PDF =================

            PDFTextStripper stripper = new PDFTextStripper();
            String originalScript = stripper.getText(document);
            if (originalScript == null || originalScript.trim().length() < 50) {
                throw new RuntimeException(
                        "PDF must contain readable text. Diagram-only or image-only files are not allowed.");
            }
            document.close();

            if (originalScript == null || originalScript.trim().isEmpty()) {
                throw new RuntimeException("Script cannot be empty");
            }

            video.setScript(originalScript);

            // ===== 1️⃣ SMART TITLE =====
            String title = detectSmartTitle(originalScript);
            video.setTitle(title);

            // ===== 2️⃣ WORD COUNT ANALYSIS =====
            int wordCount = originalScript.trim().split("\\s+").length;
            double readingMinutes = wordCount / 140.0;

            int targetMinutes;

            switch (durationPreference) {
                case "SHORT":
                    targetMinutes = 10 + (int) (Math.random() * 6); // 10-15
                    break;
                case "MEDIUM":
                    targetMinutes = 20 + (int) (Math.random() * 11); // 20-30
                    break;
                case "LONG":
                    targetMinutes = 40 + (int) (Math.random() * 21); // 40-60
                    break;
                default:
                    targetMinutes = 15;
            }

            // ===== 3️⃣ INTELLIGENT AUTO ADJUST =====
            if (readingMinutes < 2) {
                targetMinutes = 15;
            }

            // ===== 4️⃣ DEEP LECTURE BUILD =====
            String expandedScript = generateDeepLecture(originalScript, targetMinutes);

            // ===== 5️⃣ ADD INTRO + OUTRO =====
            ScriptEnhancerService enhancer = new ScriptEnhancerService();
            expandedScript = enhancer.enhanceScript(expandedScript, "Samir", title);

            // ===== 6️⃣ AUDIO GENERATION =====
            VoiceEngine voiceEngine = new LocalVoiceEngine();
            String audioPath = voiceEngine.generateAudio(expandedScript);

            // ===== 7️⃣ VIDEO GENERATION (UPDATED) =====
            VideoEngine videoEngine = new SimpleVideoEngine();
            String videoPath = videoEngine.generateVideo(audioPath, targetMinutes);

            // ===== CLEAN FILE NAME =====
            String cleanedVideoPath = cleanFileName(videoPath);

            // ===== 8️⃣ SAVE DATA =====
            video.setScript(expandedScript);
            video.setAudioPath(audioPath);
            video.setVideoPath(cleanedVideoPath);
            video.setDuration(String.valueOf(targetMinutes) + " Minutes");

        } catch (Exception e) {

            e.printStackTrace();
            video.setAudioPath("FAILED");
            video.setVideoPath("FAILED");
        }

        return videoRepository.save(video);
    }

    // ========================= TITLE DETECTION =========================

    private String detectSmartTitle(String content) {

        if (content == null || content.trim().isEmpty()) {
            return "AI Generated Lecture";
        }

        String[] lines = content.split("\n");

        for (String line : lines) {
            String trimmed = line.trim();

            if (trimmed.toLowerCase().startsWith("topic:")
                    || trimmed.toLowerCase().startsWith("title:")) {

                return trimmed.substring(trimmed.indexOf(":") + 1).trim();
            }
        }

        for (String line : lines) {
            String trimmed = line.trim();
            if (!trimmed.isEmpty()) {

                String[] words = trimmed.split("\\s+");

                if (words.length <= 10) {
                    return trimmed;
                } else {
                    return String.join(" ",
                            words[0], words[1], words[2],
                            words[3], words[4], words[5]) + "...";
                }
            }
        }

        return "AI Generated Lecture";
    }

    public static String cleanFileName(String fileName) {

        int dotIndex = fileName.lastIndexOf(".");
        if (dotIndex == -1)
            return fileName;

        String nameWithoutExtension = fileName.substring(0, dotIndex);
        String extension = fileName.substring(dotIndex);

        nameWithoutExtension = nameWithoutExtension.replaceAll("[^a-zA-Z ]", "");
        nameWithoutExtension = nameWithoutExtension.trim().replaceAll("\\s+", " ");

        return nameWithoutExtension + extension;
    }

    private String generateDeepLecture(String content, int targetMinutes) {

        int targetWordCount = targetMinutes * 150;

        StringBuilder lecture = new StringBuilder();
        lecture.append(content).append(" ");

        int currentWordCount = lecture.toString().split("\\s+").length;

        while (currentWordCount < targetWordCount) {

            lecture.append(
                    "In advanced enterprise environments, this concept integrates with cloud architecture, distributed computing, automation pipelines, cybersecurity frameworks and large-scale system design. ");

            currentWordCount = lecture.toString().split("\\s+").length;
        }

        return lecture.toString();
    }

    public static void main(String[] args) {

        String original = "AI_and_Future_of_Technology_Content (1).pdf";

        String cleaned = cleanFileName(original);

        System.out.println("Original: " + original);
        System.out.println("Cleaned: " + cleaned);
    }
}