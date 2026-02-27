package com.sam.backend.service.video;

public interface VideoEngine {

    String generateVideo(String audioPath, int targetMinutes) throws Exception;

}