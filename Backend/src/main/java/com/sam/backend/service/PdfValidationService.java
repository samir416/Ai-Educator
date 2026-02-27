package com.sam.backend.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public class PdfValidationService {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private static final int MAX_WORDS = 9000;

    public String validateAndExtract(MultipartFile file) throws Exception {

        // 1️⃣ File size check
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new Exception("File exceeds 1 hour video limit (Max 10MB allowed)");
        }

        // 2️⃣ Extract text
        InputStream inputStream = file.getInputStream();
        PDDocument document = PDDocument.load(inputStream);

        PDFTextStripper stripper = new PDFTextStripper();
        String text = stripper.getText(document);

        document.close();

        // 3️⃣ Basic text validation
        if (text == null || text.trim().isEmpty()) {
            throw new Exception("PDF contains no readable text.");
        }

        // 4️⃣ Word count
        String[] words = text.trim().split("\\s+");
        int wordCount = words.length;

        if (wordCount < 200) {
            throw new Exception("PDF must contain meaningful text content.");
        }

        // 5️⃣ Trim if more than 9000 words (1 hour limit)
        if (wordCount > MAX_WORDS) {
            StringBuilder trimmedText = new StringBuilder();
            for (int i = 0; i < MAX_WORDS; i++) {
                trimmedText.append(words[i]).append(" ");
            }
            text = trimmedText.toString();
        }

        return text;
    }

    // 6️⃣ Code detection (basic)
    public boolean containsCode(String text) {

        return text.contains("public class") ||
               text.contains("{") ||
               text.contains("}") ||
               text.contains(";") ||
               text.contains("int ") ||
               text.contains("String ");
    }
}