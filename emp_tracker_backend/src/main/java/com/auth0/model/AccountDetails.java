package com.auth0.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "account_details")
public class AccountDetails {

    @Id
    private String currentAccEmpId;

    @Column(name = "current_acc_email")
    private String currentAccEmail;


    @Column(name = "old_acc_emp_id")
    private String oldAccEmpId;

    @Column(name = "old_acc_email")
    private String oldAccEmail;


    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    @OneToOne
    @JoinColumn(name = "cts_emp_id")
    private Employee employee;
}
