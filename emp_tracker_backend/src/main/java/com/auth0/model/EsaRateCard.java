package com.auth0.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "esa_rate_card")
public class EsaRateCard {

    @Id
    private String esaAlphanumericValue;

    @Column(name = "esa_value")
    private double esaValue;

    @JsonIgnore
    @OneToMany(mappedBy = "esaRateCard", cascade = CascadeType.ALL)
    private List<Employee> employeeList=new ArrayList<>();
}
