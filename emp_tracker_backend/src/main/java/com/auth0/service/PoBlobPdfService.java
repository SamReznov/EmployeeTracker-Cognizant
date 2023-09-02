package com.auth0.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface PoBlobPdfService {

    String uploadImage(MultipartFile file) throws IOException;
}
