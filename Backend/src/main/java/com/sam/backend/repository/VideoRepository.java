package com.sam.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sam.backend.model.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {

}