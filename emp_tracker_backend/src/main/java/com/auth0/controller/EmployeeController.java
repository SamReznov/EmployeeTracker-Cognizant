package com.auth0.controller;

import com.auth0.dao.EmployeeDao;
import com.auth0.dao.ProjectDao;
import com.auth0.exception.EmployeeNotFoundException;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ProjectDao projectDao;

    @Autowired
    private EmployeeDao employeeDao;

    @PostMapping("/employee")
    ResponseEntity<?> saveEmployee(@RequestBody Employee employee){
        System.out.println(employee);
        String message = "";
        try {
            message = employeeService.saveEmployee(employee);
        }
        catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);

    }


    @GetMapping("/employees")
    ResponseEntity<List<Employee>> getAllEmployees(){
        List employeeList=employeeService.getEmployees();
        return ResponseEntity.ok().body(employeeList);
    }

    @GetMapping("/employee/{empId}")
    ResponseEntity<?> getEmployeeById(@PathVariable long empId){
        Employee existEmployee;
        try{
            existEmployee=employeeService.getEmployeeById(empId);
        }catch(EmployeeNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(existEmployee);
    }

    @PutMapping("/employee")
    ResponseEntity<?> updateEmployee(@RequestBody Employee employee){
        System.out.println(employee);
        Employee updatedEmployee;
        try {
            updatedEmployee= employeeService.updateEmployee(employee);
        }
        catch(EmployeeNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Employee>(updatedEmployee,HttpStatus.OK);
    }

    @DeleteMapping("/employee/{empId}")
    ResponseEntity<String> deleteEmployee(@PathVariable long empId){
        String message="";
        try {
            message = employeeService.deleteEmployee(empId);
        }
        catch(EmployeeNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);
    }

//    @PostMapping("/add-role-to-employee")
//    ResponseEntity<?> addRoleToEmployee(@RequestBody Employee employee){
//
//        Employee employee1=new Employee();
//        try {
//            employee1= employeeService.addRoleToEmployee(employee);
//        }
//        catch(ResourceNotFoundException e){
//            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//        catch(Exception e) {
//            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
//        }
//        return new ResponseEntity<Employee>(employee1,HttpStatus.OK);
//
//    }

    @GetMapping("/employee/total")
    ResponseEntity<Long> getTotalEmployee() {
        long count = employeeService.totalEmployee();
        return ResponseEntity.ok().body(count);
    }

    @GetMapping("/employee")
    ResponseEntity<Page<Employee>> getTotalEmployeeByPage(
            @RequestParam(value="pageNo") int pageNo
    ){
        Page<Employee> employeePage=employeeService.findAllByPage(pageNo);
        return ResponseEntity.ok().body(employeePage);
    }

    @GetMapping("/project/{projectId}/employee")
    ResponseEntity<?> getEmployeeByProject(@PathVariable long projectId,
    @RequestParam(value="pageNo", defaultValue = "1") int pageNo
    ){
        Page<Employee> employeePage;
        try{
            employeePage=employeeService.findAllEmployeeByProject(projectId,pageNo);
        }catch(EmployeeNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(employeePage);
    }

    @GetMapping("/employeeSearch/{employeeName}")
    ResponseEntity<?> searchEmployeeByName(@PathVariable(value = "employeeName") String name,@RequestParam(value = "pageNo",defaultValue = "1") int pageNo){
        Page<Employee> employeePage;
        try{
            employeePage=employeeService.searchEmployeeByTheirName(name,pageNo);
        }catch(EmployeeNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(employeePage);
    }


    @GetMapping("/project/{projectId}/emp")
    ResponseEntity<?> getEmployeeByProjectAndName(@PathVariable long projectId,
                                           @RequestParam(value="pageNo", defaultValue = "1") int pageNo,
                                           @RequestParam(value="name", defaultValue = " ") String name
    ){
        Page<Employee> employeePage;
        try{
            employeePage=employeeService.findAllEmployeeByProjectAndName(projectId,name,pageNo);
        }catch(EmployeeNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(employeePage);
    }

}
