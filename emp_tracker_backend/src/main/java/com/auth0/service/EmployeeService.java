package com.auth0.service;

import com.auth0.model.Employee;
import com.auth0.model.EmployeeResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface EmployeeService{

    String saveEmployee(Employee employee);

    List<Employee> getEmployees();

    Employee getEmployeeById(long empId);

    Employee updateEmployee(Employee employee);

    String deleteEmployee(long empId);

//    Employee addRoleToEmployee(Employee employee);

    long totalEmployee();

    Page<Employee> findAllByPage(int pageNo);

    Page<Employee> findAllEmployeeByProject(long projectId,int pageNo);




}
