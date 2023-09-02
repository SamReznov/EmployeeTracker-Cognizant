package com.auth0.service.impl;

import com.auth0.dao.PoBlobPdfDao;
import com.auth0.model.PoBlobPdf;
import com.auth0.service.PoBlobPdfService;
import com.auth0.util.PoBlobPdfUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class PoBlobPdfServiceImpl implements PoBlobPdfService {

    @Autowired
    private PoBlobPdfDao poBlobPdfDao;

    public String uploadImage(MultipartFile file) throws IOException {

        PoBlobPdf pdfData = poBlobPdfDao.save(PoBlobPdf.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .pdfData(PoBlobPdfUtils.compressImage(file.getBytes())).build());
        if (pdfData != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }
        return null;
    }
}
