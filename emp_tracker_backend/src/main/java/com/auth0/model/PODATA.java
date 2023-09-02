package com.auth0.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "po_data")
public class PODATA {

//    @EmbeddedId
//    private POBlobIdentity poBlobId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(name = "line_item_number")
   private double lineItemNumber;

    @Column(name = "line_item_desc")
    private String lineItemDesc;

    @Column(name = "line_item_start_date")
    private Date lineItemStartDate;

    @Column(name = "line_item_end_date")
    private Date lineItemEndDate;

    @Column(name = "total_amount")
    private double totalAmount;

    @Column(name = "line_item_value")
    private double lineItemValue;



    @ManyToOne
    @JoinColumn(name = "po")
    private PO po;


}
