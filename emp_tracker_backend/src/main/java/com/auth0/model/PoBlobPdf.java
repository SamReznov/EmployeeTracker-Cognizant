package com.auth0.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "po_blob_pdf")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PoBlobPdf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;


    @Lob
    @Column(name = "pdf_file",length = 5000)
    private byte[] pdfData;
}