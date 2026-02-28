package com.sam.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This tells Java to share the 'generated_files' folder with your React app
        registry.addResourceHandler("/generated_files/**")
                .addResourceLocations("file:generated_files/");
    }
}