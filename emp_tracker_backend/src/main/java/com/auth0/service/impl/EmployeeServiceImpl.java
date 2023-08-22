package com.auth0.service.impl;

import com.auth0.dao.EmployeeDao;
import com.auth0.dao.ProjectDao;
import com.auth0.exception.EmployeeNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.Project;
import com.auth0.service.EmployeeService;
import com.auth0.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    @Autowired
    private ProjectDao projectDao;

    @Autowired
    private ProjectService projectService;

    @Override
    public String saveEmployee(Employee employee){
        if(employeeDao.findById(employee.getCtsEmpId()).isPresent()) {
            throw new EmployeeNotFoundException("Oops! It seems like the employee you're referring to already exists in our records.");
        }
        if(Objects.isNull(employee.getProject())){
            employee.setProject(null);
            employeeDao.save(employee);
            return "Congratulations! The employee has been added to our database successfully. However, it seems that no project has been assigned to them.";
        }else{
            Optional<Project> project= projectDao.findById(employee.getProject().getProjectId());
            if(project.isPresent()) {
                employee.setProject(project.get());
            }else{
                employee.setProject(null);
                employeeDao.save(employee);
                return "Congratulations! The employee has been successfully added to our database. However, we couldn't find the project in our records. Please ensure the project details are accurate.";
            }
         }
         employeeDao.save(employee);
         return "Success! The employee has been added to the database successfully.";
    }




    @Override
    public List<Employee> getEmployees() {
        List<Employee> employeeList=employeeDao.findAll();
        return employeeList;
    }

    @Override
    public Employee getEmployeeById(long empId) {
        Optional<Employee> existingEmployee=employeeDao.findById(empId);
        if(existingEmployee.isPresent()){
            Employee existEmp=existingEmployee.get();
            return existEmp;
        }
        else{
            throw new EmployeeNotFoundException("Oops! We couldn't find any records matching the provided employee ID:"+empId+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public Employee updateEmployee(Employee employee) {
        Optional<Employee> existingEmployee=employeeDao.findById(employee.getCtsEmpId());
        if(existingEmployee.isPresent()){

            Employee existEmp=existingEmployee.get();
            existEmp=employee;

            if(Objects.isNull(employee.getProject())){
                employee.setProject(null);
                return employeeDao.save(employee);
            }else{
                Optional<Project>  project= projectDao.findById(employee.getProject().getProjectId());
                if(project.isPresent()) {
                    existEmp.setProject(project.get());
                }else {
                    existEmp.setProject(null);
                    employeeDao.save(existEmp);
                    throw new EmployeeNotFoundException("Congratulations! The employee has been successfully updated to the database. However, we couldn't find the project in our records. Please ensure the project details are accurate.");
                }
                return employeeDao.save(existEmp);
            }
        }else{
            throw new EmployeeNotFoundException("Oops! We couldn't find any records matching the provided employee ID:"+employee.getCtsEmpId()+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public String deleteEmployee(long empId) {
        Optional<Employee> existingEmployee=employeeDao.findById(empId);
        if(existingEmployee.isPresent()) {
            Employee existEmp = existingEmployee.get();
            employeeDao.delete(existEmp);
            return "Success! The employee with ID: "+empId+" has been successfully deleted from our records.";
        }else{
            throw new EmployeeNotFoundException("Oops! We couldn't find any records matching the provided employee ID:"+empId+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public long totalEmployee() {
        return employeeDao.count();
    }

    @Override
    public Page<Employee> findAllByPage(int pageNo) {
        Pageable pageable= PageRequest.of(pageNo-1,5);
        Page<Employee> employeePage=employeeDao.findAll(pageable);
        return employeePage;
    }

    @Override
    public Page<Employee> findAllEmployeeByProject(long projectId,int pageNo) {
        if(projectId==0){
            Page<Employee> employeePage=findAllByPage(pageNo);
            return employeePage;
        }
        Optional<Project> project=projectDao.findById(projectId);
        if(project.isPresent()) {
            Pageable pageable = PageRequest.of(pageNo - 1, 5);
            Page<Employee> employeePage=employeeDao.findByProject(project.get(), pageable);
            if(employeePage.getContent().size()>0){
                return employeePage;
            }else{
                throw new EmployeeNotFoundException("We apologize, but we couldn't locate any employee associated with this project. Please verify the project details" );
            }

        }else{
            throw new EmployeeNotFoundException("Oops! We couldn't find any records matching the provided project ID:"+projectId+"\nPlease double-check the ID and try again.");
        }
    }

    public Page<Employee> searchEmployeeByTheirName(String name ,int pageNo){
        if(name == ""){
            throw new EmployeeNotFoundException("We apologize, but name provided is an empty string" );
        }
        else{
            Pageable pageable = PageRequest.of(pageNo -1,5);
            Page<Employee> employeePage = employeeDao.findByEmpFirstNameContaining(name,pageable);
            if(employeePage.getContent().size()>0){
                return employeePage;
            }else{
                throw new EmployeeNotFoundException("We apologize, but we couldn't locate any employee associated with this name. Please verify the employee details" );
            }
        }

    }

    @Override
    public Page<Employee> findAllEmployeeByProjectAndName(long projectId, String name, int pageNo) {
        if(projectId==0){
            Pageable pageable = PageRequest.of(pageNo - 1, 5);
            Page<Employee> employeePage=employeeDao.findByEmpFirstNameContaining(name,pageable);
            return employeePage;
        }
        Optional<Project> project=projectDao.findById(projectId);
        if(project.isPresent()) {
            Pageable pageable = PageRequest.of(pageNo - 1, 5);
            Page<Employee> employeePage=employeeDao.findByProjectAndEmpFirstNameContaining(project.get(),name,pageable);
            if(employeePage.getContent().size()>0){
                return employeePage;
            }else{
                throw new EmployeeNotFoundException("We apologize, but we couldn't locate any employee associated with this project. Please verify the project details" );
            }

        }else{
            throw new EmployeeNotFoundException("Oops! We couldn't find any records matching the provided project ID:"+projectId+"\nPlease double-check the ID and try again.");
        }

    }


//    @Override
//    public Employee addRoleToEmployee(Employee employee) {
//        Employee newEmployee=new Employee();
//        newEmployee.setCtsEmpId(employee.getCtsEmpId());
//        newEmployee.setEmpFirstName(employee.getEmpFirstName());
//        newEmployee.setEmpLastName(employee.getEmpLastName());
//        newEmployee.setEmpEmail(employee.getEmpEmail());
//        newEmployee.setEmpPhone(employee.getEmpPhone());
//        newEmployee.setEmpLocation(employee.getEmpLocation());
//        newEmployee.setEmpStartDate(employee.getEmpStartDate());
//        newEmployee.setEmpEndDate(employee.getEmpEndDate());
//        newEmployee.setTeamName(employee.getTeamName());
//
//        newEmployee.getRoles()
//                .addAll(employee
//                        .getRoles()
//                        .stream()
//                        .map(role ->{
//                            Role role1=roleDao.findById(role.getRoleId()).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
//                            role1.getEmployees().add(newEmployee);
//                            return role1;
//                        }).collect(Collectors.toList()));
//        return employeeDao.save(newEmployee);
//        return employee;
//    }



}



