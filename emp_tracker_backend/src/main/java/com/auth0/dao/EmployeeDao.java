package com.auth0.dao;

import com.auth0.model.Employee;
import com.auth0.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EmployeeDao extends JpaRepository<Employee,Long> {

    Page<Employee> findByProject(Project project,Pageable page);
}
