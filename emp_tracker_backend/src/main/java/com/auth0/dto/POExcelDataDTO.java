package com.auth0.dto;


import com.auth0.model.Employee;
import com.auth0.model.PO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class POExcelDataDTO {

    private double poNumber;

    private String poManager;

    private Date dateIssued;

    private Date expiryDate;

    private Date extension;

    private String accountName;

    public static List<POExcelDataDTO> convertPOToPOExcelDTO(List<PO> poList){
        List<POExcelDataDTO> poExcelDataDTOList=new ArrayList<>();
        poExcelDataDTOList=poList.stream().map(po -> {
            POExcelDataDTO poExcelDataDTO=new POExcelDataDTO();
            poExcelDataDTO.setPoNumber(po.getPoNumber());
            poExcelDataDTO.setPoManager(po.getPoManager());
            poExcelDataDTO.setDateIssued(po.getDateIssued());
            poExcelDataDTO.setExpiryDate(po.getExpiryDate());
            poExcelDataDTO.setExtension(po.getExtension());
            if(!Objects.isNull(po.getAccount())){
                poExcelDataDTO.setAccountName(po.getAccount().getAccName());
            }

            return poExcelDataDTO;
        }).collect(Collectors.toList());
        return poExcelDataDTOList;
    }

}
