package com.sam.backend.service.voice;

public interface VoiceEngine {
    String generateAudio(String text) throws Exception;
}