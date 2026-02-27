package com.sam.backend.service.video;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

public class SimpleVideoEngine implements VideoEngine {

    @Override
    public String generateVideo(String audioPath, int targetMinutes) throws Exception {

        File projectRoot = new File(System.getProperty("user.dir"));
        File folder = new File(projectRoot, "generated_files");

        if (!folder.exists()) {
            folder.mkdirs();
        }

        File audioFile = new File(audioPath);
        if (!audioFile.exists()) {
            throw new RuntimeException("Audio file not found: " + audioPath);
        }

        File avatarFile = new File(folder, "avatar.png");
        if (!avatarFile.exists()) {
            throw new RuntimeException("avatar.png missing");
        }

        String videoName = "video_" + System.currentTimeMillis() + ".mp4";
        File videoFile = new File(folder, videoName);

        String ffmpegPath = "C:\\ffmpeg-8.0.1-full_build\\bin\\ffmpeg.exe";

        int durationInSeconds = targetMinutes * 60;

        ProcessBuilder videoBuilder = new ProcessBuilder(
                ffmpegPath,
                "-y",
                "-loop", "1",
                "-i", avatarFile.getAbsolutePath(),
                "-i", audioFile.getAbsolutePath(),
                "-c:v", "libx264",
                "-preset", "ultrafast",
                "-tune", "stillimage",
                "-pix_fmt", "yuv420p",
                "-c:a", "aac",
                "-t", String.valueOf(durationInSeconds), // STRICT LIMIT
                videoFile.getAbsolutePath());

        videoBuilder.directory(projectRoot);
        videoBuilder.redirectErrorStream(true);

        Process process = videoBuilder.start();

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream()));

        while (reader.readLine() != null) {
            // optional: print for debugging
        }

        int exitCode = process.waitFor();

        if (exitCode != 0) {
            throw new RuntimeException("Video creation failed");
        }

        return "/generated_files/" + videoName;
    }
}