package com.auth0.service;

import com.auth0.model.Employee;

import org.springframework.data.domain.Page;


import java.util.List;

public interface EmployeeService{

    String saveEmployee(Employee employee);

    List<Employee> getEmployees();

    Employee getEmployeeById(long empId);

    Employee updateEmployee(Employee employee,String name);

    String deleteEmployee(long empId,String name);

//    Employee addRoleToEmployee(Employee employee);

    long totalEmployee();

    Page<Employee> findAllByPage(int pageNo);


    Page<Employee> searchEmployeeByTheirName(String name,int pageNo);

    Page<Employee> findAllEmployeeByProjectAndName(long projectId,String name,int pageNo);




}
