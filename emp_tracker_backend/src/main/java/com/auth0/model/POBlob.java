package com.auth0.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "po_blob")
public class POBlob {

    @EmbeddedId
    private POBlobIdentity poBlobId;

    @Column(name = "po_blob",length = 45)
    private String poBlob;

//    @Column(name = "line_item")
//    private double lineItem;

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
