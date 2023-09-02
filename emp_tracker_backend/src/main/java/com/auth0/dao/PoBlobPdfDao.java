package com.auth0.dao;

import com.auth0.model.PoBlobPdf;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PoBlobPdfDao extends JpaRepository<PoBlobPdf,Long> {


    Optional<PoBlobPdf> findByName(String fileName);
}
