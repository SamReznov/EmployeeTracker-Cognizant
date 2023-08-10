package com.auth0.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class POBlobIdentity implements Serializable {

    private double revisionNumber;

    @Column(name = "line_item")
    private double lineItem;

//    @ManyToOne
//    @JoinColumn(name = "po")
//    private PO po;
}
