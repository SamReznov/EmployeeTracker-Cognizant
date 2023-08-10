package com.auth0.controller;

import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.Role;
import com.auth0.model.Services;
import com.auth0.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ServicesController {

    @Autowired
    private ServicesService servicesService;

    @PostMapping("/service")
    ResponseEntity<String> saveService(@RequestBody Services service){
        String message="";
        try {
            message = servicesService.saveService(service);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);
    }

    @GetMapping("/services")
    ResponseEntity<List<Services>> getAllServices(){
        List<Services> servicesList=servicesService.getServices();
        return ResponseEntity.ok().body(servicesList);
    }

    @GetMapping("service/{serviceId}")
    ResponseEntity<?> getServiceById(@PathVariable double serviceId){
        Services existService=new Services();
        try{
            existService=servicesService.getServiceById(serviceId);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(existService);
    }

    @PutMapping("/service")
    ResponseEntity<?> updateService(@RequestBody Services services){
        Services updatedService=new Services();
        try{
            updatedService=servicesService.updateServices(services);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(updatedService);
    }

    @DeleteMapping("/service/{serviceId}")
    ResponseEntity<String> deleteService(@PathVariable double serviceId){
        String message="";
        try{
            message=servicesService.deleteServices(serviceId);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(message);
    }

    @GetMapping("/service/{serviceId}/employees")
    ResponseEntity<List<Employee>> getAllEmployeesByServiceId(@PathVariable double serviceId){
        List<Employee> employeeList=servicesService.getAllEmployeeByServices(serviceId);
        return ResponseEntity.ok().body(employeeList);
    }

    @GetMapping("/project/{projectId}/services")
    ResponseEntity<?> getAllServicesByProject(@PathVariable long projectId){
        Set<Services> servicesList=new HashSet<>();
        try{
            servicesList=servicesService.getAllServiceByProject(projectId);

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(servicesList);
    }

}
