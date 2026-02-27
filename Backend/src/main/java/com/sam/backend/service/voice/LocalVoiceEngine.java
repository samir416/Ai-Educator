package com.sam.backend.service.voice;

import java.io.File;
import java.nio.file.Files;

public class LocalVoiceEngine implements VoiceEngine {

    @Override
    public String generateAudio(String text) throws Exception {

        File folder = new File("generated_files");
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String fileName = "lecture_" + System.currentTimeMillis() + ".wav";
        File audioFile = new File(folder, fileName);

        // Save large script safely
        File tempFile = new File(folder, "temp_script.txt");
        Files.write(tempFile.toPath(), text.getBytes());

        String command =
                "Add-Type -AssemblyName System.Speech; " +
                "$speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; " +
                "$speak.Rate = -1; " +
                "$text = Get-Content '" + tempFile.getAbsolutePath() + "' -Raw; " +
                "$speak.SetOutputToWaveFile('" + audioFile.getAbsolutePath() + "'); " +
                "$speak.Speak($text);";

        ProcessBuilder builder = new ProcessBuilder(
                "powershell",
                "-Command",
                command
        );

        builder.redirectErrorStream(true);
        Process process = builder.start();

        int exitCode = process.waitFor();

        if (exitCode != 0 || !audioFile.exists()) {
            throw new RuntimeException("Audio generation failed");
        }

        return audioFile.getAbsolutePath();
    }
}