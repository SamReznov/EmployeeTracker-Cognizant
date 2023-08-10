package com.auth0.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "project")
public class Project {

    @Id
    private long projectId;

    @Column(name = "project_name")
    private String projectName;


    @ManyToOne
    @JoinColumn(name = "accountId")
    private Account account;

    @JsonIgnore
    @OneToMany(mappedBy = "project")
    private List<Employee> employeeList=new ArrayList<>();

    @ManyToMany()
    private Set<Role> roleSet=new HashSet<>();


    @ManyToMany()
    private Set<Services> servicesSet=new HashSet<>();

    @PreRemove
    private void preRemove(){
        for(Employee employee: employeeList){
            employee.setProject(null);
        }
    }



}
