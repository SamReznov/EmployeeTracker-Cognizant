package com.auth0.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class POBlobDataDTO {

    private Date revisionDate;

    private long revisionNumber;

    private double totalAmount;

    private MultipartFile file;

    List<LineItemDTO> lineItemDTOList=new ArrayList<>();

    private double poNumber;
}
