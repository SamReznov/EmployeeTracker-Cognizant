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
@Table(name = "services")
public class Services {

    @Id
    private double serviceId;

    @Column(name = "service_name")
    private String serviceName;

    @JsonIgnore
    @OneToMany(mappedBy = "service")
    private List<Employee> employeeList=new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "servicesSet")
    private Set<Project> projectSet=new HashSet<>();

    @PreRemove
    public void preRemove(){
        for (Employee employee : employeeList) {
            employee.setService(null);
        }
        for (Project project : projectSet) {
            project.getServicesSet().remove(this);
        }
    }


}
