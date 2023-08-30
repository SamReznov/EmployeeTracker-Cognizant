package com.auth0.service.impl;

import com.auth0.controller.Auth0TestController;
import com.auth0.dao.EmployeeDao;
import com.auth0.dao.ProjectDao;
import com.auth0.exception.EmployeeNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.Project;
import com.auth0.service.EmployeeService;
import com.auth0.service.ProjectService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.*;


@Service
public class EmployeeServiceImpl implements EmployeeService {

    private static final Logger LOGGER = LogManager.getLogger(EmployeeServiceImpl.class);

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
    public Employee updateEmployee(Employee employee,String name) {
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
                Map<String,String> map=compareTwoEmployeeObject(employee,existingEmployee.get());
                LOGGER.info("Employee details for ID "+ employee.getCtsEmpId()+" have been successfully updated by "+name+":\n "+map);
                return employeeDao.save(existEmp);
            }
        }else{
            throw new EmployeeNotFoundException("Oops! We couldn't find any records matching the provided employee ID:"+employee.getCtsEmpId()+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public String deleteEmployee(long empId,String name) {
        Optional<Employee> existingEmployee=employeeDao.findById(empId);
        if(existingEmployee.isPresent()) {
            Employee existEmp = existingEmployee.get();
            employeeDao.delete(existEmp);
            LOGGER.info("Employee with ID "+empId+" has been successfully deleted from our records, with the deletion authorized by "+name);
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



    public Page<Employee> searchEmployeeByTheirName(String name ,int pageNo){
        if(name== ""){
            throw new EmployeeNotFoundException("We apologize, but  provided is an empty string" );
        }
        else{
            Pageable pageable = PageRequest.of(pageNo -1,5);
            Page<Employee> employeePage = employeeDao.findByEmpFirstNameContaining(name,pageable);
            if(employeePage.getContent().size()>0){
                return employeePage;
            }else{
                throw new EmployeeNotFoundException("We apologize, but we couldn't locate any employee associated with this . Please verify the employee details" );
            }
        }

    }

    @Override
    public Page<Employee> findAllEmployeeByProjectAndName(long projectId, String name, int pageNo) {
        if(projectId == 0 && !name.equals("")){
            Pageable pageable = PageRequest.of(pageNo - 1, 5);
            Page<Employee> employeePage=employeeDao.findByEmpFirstNameContaining(name,pageable);
            if(employeePage.getContent().size()>0){
                return employeePage;
            }
            else{
                throw new EmployeeNotFoundException("Apologies, but there are no records of an employee named "+name+" in our system. Please verify the name.");
            }

        }
        else if(projectId == 0 && name.equals("")){

            Page<Employee> employeePage=findAllByPage(pageNo);
            if(employeePage.getContent().size()>0){
                return employeePage;
            }else{
                throw new EmployeeNotFoundException("Currently, there are no employees to display. The list is empty at the moment.");
            }
        }

        else if(projectId != 0 && name.equals("")) {
            Pageable pageable = PageRequest.of(pageNo - 1, 5);
            Optional<Project> project=projectDao.findById(projectId);
            Page<Employee> employeePage = employeeDao.findByProject(project.get(),pageable);
            if(employeePage.getContent().size()>0){
                return employeePage;
            }
            else{
                throw new EmployeeNotFoundException("At the moment, there are no employees associated with this project. The list is currently empty.");
            }

        }
        else{
            Optional<Project> project=projectDao.findById(projectId);
            if(project.isPresent()) {
                Pageable pageable = PageRequest.of(pageNo - 1, 5);
                Page<Employee> employeePage=employeeDao.findByProjectAndEmpFirstNameContaining(project.get(),name,pageable);
                if(employeePage.getContent().size()>0){
                    return employeePage;
                }else{
                    throw new EmployeeNotFoundException("We apologize, but there are no records of an employee named "+name+" associated with the project "+project.get().getProjectName()+". Please double-check the details");
                }
            }
            else{
                throw new EmployeeNotFoundException("Oops! We couldn't find any records matching the provided project ID:"+projectId+"\nPlease double-check the ID and try again.");
            }
        }


    }

    public static Map<String,String> compareTwoEmployeeObject(Employee employee1,Employee employee2){
        Map<String,String> map=new HashMap<>();


        if(!employee1.getEmpFirstName().equals(employee2.getEmpFirstName())){
            map.put("First Name",employee1.getEmpFirstName());
        }
        if(!employee1.getEmpLastName().equals(employee2.getEmpLastName())){
            map.put("Last Name",employee1.getEmpLastName());
        }
        if(!employee1.getEmpEmail().equals(employee2.getEmpEmail())){
            map.put("Email",employee1.getEmpEmail());
        }
        if(!employee1.getEmpPhone().equals(employee2.getEmpPhone())){
            map.put("Phone",String.valueOf(employee1.getEmpPhone()));
        }
        if(!employee1.getEmpLocation().equals(employee2.getEmpLocation())){
            map.put("Location",employee1.getEmpLocation());
        }
        if(!employee1.getEmpStartDate().equals(employee2.getEmpStartDate())){
            map.put("Start Date",String.valueOf(employee1.getEmpStartDate()));
        }
        if(!employee1.getEmpEndDate().equals(employee2.getEmpEndDate())){
            map.put("End Date",String.valueOf(employee1.getEmpEndDate()));
        }
        if(!employee1.getTeamName().equals(employee2.getTeamName())){
            map.put("Team Name",employee1.getTeamName());
        }
        if(!employee1.getProject().getProjectName().equals(employee2.getProject().getProjectName())){
            map.put("Project",employee1.getProject().getProjectName());
        }
        if(!employee1.getRole().getRoleName().equals(employee2.getRole().getRoleName())){
            map.put("Role",employee1.getRole().getRoleName());
        }
        if(!employee1.getService().getServiceName().equals(employee2.getService().getServiceName())){
            map.put("Service",employee1.getService().getServiceName());
        }
        if(!(employee1.getPo().getPoNumber()==(employee2.getPo().getPoNumber()))){
            map.put("PO Number",String.valueOf(employee1.getPo().getPoNumber()));
        }
        if(!employee1.getEsaRateCard().getEsaAlphanumericValue().equals(employee2.getEsaRateCard().getEsaAlphanumericValue())){
            map.put("ESA Rate",String.valueOf(employee1.getEsaRateCard().getEsaAlphanumericValue()));
        }
        if(!employee1.getProjectSiteLocation().equals(employee2.getProjectSiteLocation())){
            map.put("Project Site Location",employee1.getProjectSiteLocation());
        }

        return map;
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



