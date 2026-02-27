package com.sam.backend.service.ai;

public class ScriptEnhancerService {

    public String enhanceScript(String originalText, String userName, String lectureTitle) {

        if (originalText == null || originalText.trim().isEmpty()) {
            return "No content provided.";
        }

        String welcome = "Hello " + userName +
                ", welcome to this lecture on " + lectureTitle +
                ". I am your AI instructor, and today we will understand this topic step by step. ";

        String outro = " I hope this explanation helped you understand the topic clearly. " +
                "See you in the next lecture.";

        return welcome + originalText + outro;
    }
}   