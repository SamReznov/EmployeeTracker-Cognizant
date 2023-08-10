package com.auth0.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;


@Getter
@Setter
@NoArgsConstructor

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @Column(name = "cts_emp_id")
    private long ctsEmpId;

    @Column(name = "emp_f_name", length = 60)
    private String empFirstName;

    @Column(name = "emp_l_name", length = 60)
    private String empLastName;

    @Column(name = "emp_email",length = 45)
    private String empEmail;

    @Column(name = "emp_phone")
    private Long empPhone=null;

    @Column(name = "emp_location", length = 45)
    private String empLocation;

    @Column(name="team_name",length = 60 )
    private String teamName;

    @Column(name = "emp_start_date")
    private Date empStartDate;

    @Column(name = "emp_end_date")
    private Date empEndDate;

    @Column(name = "project_site_location")
    private String projectSiteLocation;

    @ManyToOne
    @JoinColumn(name = "projectId")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "service_id")
    private Services service;

    @ManyToOne
    @JoinColumn(name = "esa_alpha_value")
    private EsaRateCard esaRateCard;

    @JsonIgnore
    @OneToOne(mappedBy = "employee",cascade = CascadeType.ALL)
    private AccountDetails accountDetails;


    @ManyToOne()
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "po_number")
    private PO po;

    @JsonIgnore
    @OneToOne(mappedBy = "employee",cascade = CascadeType.ALL)
    private User user;

}
