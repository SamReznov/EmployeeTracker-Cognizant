package com.auth0.dao;

import com.auth0.model.Employee;
import com.auth0.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EmployeeDao extends JpaRepository<Employee,Long> {

    Page<Employee> findByProject(Project project,Pageable page);

    List<Employee> findByProject(Project project);
    Page<Employee> findByEmpFirstNameContaining(String name,Pageable page);

    List<Employee> findByEmpFirstNameContaining(String name);

    Page<Employee> findByProjectAndEmpFirstNameContaining(Project project,String name,Pageable page);

    List<Employee> findByProjectAndEmpFirstNameContaining(Project project, String name);
}
