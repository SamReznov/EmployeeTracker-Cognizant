package com.auth0.dto;

import com.auth0.model.*;

import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class EmployeeExcelDataDTO {


    private long ctsEmpId;

    private String empFirstName;

    private String empLastName;

    private String empEmail;

    private Long empPhone=null;

    private String empLocation;

    private String teamName;

    private Date empStartDate;

    private Date empEndDate;

    private String projectSiteLocation;

    private String projectName;

    private String serviceName;

    private String esaRateCardValue;

    private String accountName;

    private String roleName;

    private double poNumber;


    public static List<EmployeeExcelDataDTO> convertEmployeeToEmployeeExcelDTO(List<Employee> employeeList){
        List<EmployeeExcelDataDTO> employeeExcelDataDTOList=new ArrayList<>();
        employeeExcelDataDTOList=employeeList.stream().map(employee -> {
            EmployeeExcelDataDTO employeeExcelDataDTO=new EmployeeExcelDataDTO();
            employeeExcelDataDTO.setCtsEmpId(employee.getCtsEmpId());
            employeeExcelDataDTO.setEmpFirstName(employee.getEmpFirstName());
            employeeExcelDataDTO.setEmpLastName(employee.getEmpLastName());
            employeeExcelDataDTO.setEmpEmail(employee.getEmpEmail());
            employeeExcelDataDTO.setEmpPhone(employee.getEmpPhone());
            employeeExcelDataDTO.setEmpLocation(employee.getEmpLocation());
            employeeExcelDataDTO.setTeamName(employee.getTeamName());
            employeeExcelDataDTO.setEmpStartDate(employee.getEmpStartDate());
            employeeExcelDataDTO.setEmpEndDate(employee.getEmpEndDate());
            employeeExcelDataDTO.setProjectSiteLocation(employee.getProjectSiteLocation());
            if(!Objects.isNull(employee.getProject())){
                employeeExcelDataDTO.setProjectName(employee.getProject().getProjectName());
            }
            if(!Objects.isNull(employee.getService())){
                employeeExcelDataDTO.setServiceName(employee.getService().getServiceName());
            }
            if(!Objects.isNull(employee.getEsaRateCard())){
                employeeExcelDataDTO.setEsaRateCardValue(employee.getEsaRateCard().getEsaAlphanumericValue());
            }
            if(!Objects.isNull(employee.getRole())){
                employeeExcelDataDTO.setRoleName(employee.getRole().getRoleName());
            }
            if(!Objects.isNull(employee.getPo())){
                employeeExcelDataDTO.setPoNumber(employee.getPo().getPoNumber());
                if(!Objects.isNull(employee.getPo().getAccount())){
                    employeeExcelDataDTO.setAccountName(employee.getPo().getAccount().getAccName());
                }

            }



            return employeeExcelDataDTO;
        }).collect(Collectors.toList());
        return employeeExcelDataDTOList;
    }
}
