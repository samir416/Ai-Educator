package com.sam.backend.service.video;

public class DurationHelper {

    public static int calculateRequiredWords(int durationMinutes) {
        int avgWordsPerMinute = 140;
        return durationMinutes * avgWordsPerMinute;
    }

    public static int countWords(String text) {
        return text.trim().split("\\s+").length;
    }

    public static String adjustScriptToDuration(String text, int durationMinutes) {

        int requiredWords = calculateRequiredWords(durationMinutes);
        int currentWords = countWords(text);

        if (currentWords > requiredWords) {
            return text.substring(0, Math.min(text.length(), requiredWords * 6));
        }

        if (currentWords < requiredWords) {
            return text + "\n\nAdditional explanation added to match duration preference.";
        }

        return text;
    }
}