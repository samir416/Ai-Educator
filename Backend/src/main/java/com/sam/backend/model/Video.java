package com.sam.backend.model;

import jakarta.persistence.*;

@Entity
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String script;

    private String audioPath;

    private String videoPath;

    private String title;     // ✅ NEW

    private String duration;  // ✅ NEW


    // ===== GETTERS & SETTERS =====

    public Long getId() {
        return id;
    }

    public String getScript() {
        return script;
    }

    public void setScript(String script) {
        this.script = script;
    }

    public String getAudioPath() {
        return audioPath;
    }

    public void setAudioPath(String audioPath) {
        this.audioPath = audioPath;
    }

    public String getVideoPath() {
        return videoPath;
    }

    public void setVideoPath(String videoPath) {
        this.videoPath = videoPath;
    }

    public String getTitle() {      // ✅ NEW
        return title;
    }

    public void setTitle(String title) {   // ✅ NEW
        this.title = title;
    }

    public String getDuration() {   // ✅ NEW
        return duration;
    }

    public void setDuration(String duration) {  // ✅ NEW
        this.duration = duration;
    }
}