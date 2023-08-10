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
@Table(name = "role")
public class Role {

    @Id
    private long roleId;

    @Column(name = "role_name")
    private String roleName;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @OneToMany(mappedBy = "role")
    private List<Employee> employees=new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "roleSet")
    private Set<Project> projectSet=new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private List<User> userList=new ArrayList<>();

    @PreRemove
    public void preRemove(){

        for (Employee employee : employees) {
            employee.setRole(null);
        }
        for (Project project : projectSet) {
            project.getRoleSet().remove(this);
        }

        for (User user : userList) {
            user.getRoles().remove(this);
        }

    }

}
}
