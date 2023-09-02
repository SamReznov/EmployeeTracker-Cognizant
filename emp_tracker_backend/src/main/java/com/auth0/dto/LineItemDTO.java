package com.auth0.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class LineItemDTO {
    private String id;
    private String lineItemNumber;
    private String description;
    private String deliveryDate;
    private String tax;

}
