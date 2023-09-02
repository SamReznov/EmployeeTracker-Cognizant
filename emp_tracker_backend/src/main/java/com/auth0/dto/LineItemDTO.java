package com.auth0.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
public class LineItemDTO {
    private String id;
    private double lineItemNumber;
    private String description;
    private String extension;
    private Date deliveryDate;
    private String tax;

}
