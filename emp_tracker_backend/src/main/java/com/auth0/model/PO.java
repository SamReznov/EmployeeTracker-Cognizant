package com.auth0.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "po")
public class PO {

    @Id
    private double poNumber;

    @Column(name = "po_manager",length =45 )
    private String poManager;

    @Column(name = "date_issued")
    private Date dateIssued;

    @Column(name = "expiry_date")
    private Date expiryDate;

    @Column(name = "extension")
    private Date extension;

    @JsonIgnore
    @OneToMany(mappedBy = "po")
    private List<Employee> employeeList=new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "po", cascade = CascadeType.ALL)
    private List<POBlobData> poDataList=new ArrayList<>();

//   @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @PreRemove
    private void preRemove(){
        for(Employee employee: employeeList){
            employee.setPo(null);
        }
    }


}
