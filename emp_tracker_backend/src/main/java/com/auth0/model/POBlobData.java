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
public class POBlobData {

//    @EmbeddedId
//    private POBlobIdentity poBlobId;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(name = "line_item_number")
   private double lineItemNumber;

    @Column(name = "line_item_desc")
    private String description;

    @Column(name = "extension")
    private String extension;

    @Column(name = "delivery_date")
    private Date deliveryDate;

    @Column(name = "tax")
    private String tax;

    @Column(name = "revision_date")
    private Date revisionDate;

    @Column(name = "revision_number")
    private long revisionNumber;

    @Column(name = "total_amount")
    private double totalAmount;

//    @Column(name = "line_item_start_date")
//    private Date lineItemStartDate;
//
//    @Column(name = "line_item_end_date")
//    private Date lineItemEndDate;
//
//    @Column(name = "line_item_value")
//    private double lineItemValue;

    @ManyToOne
    @JoinColumn(name = "po")
    private PO po;


}
