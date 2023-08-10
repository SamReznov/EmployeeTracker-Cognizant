package com.auth0.controller;

import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.Role;
import com.auth0.service.RoleService;
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
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/role")
    ResponseEntity<String> saveRole(@RequestBody Role role){

        String message="";
        try {
            message = roleService.saveRole(role);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);
    }

    @GetMapping("/roles")
    ResponseEntity<List<Role>> getAllRoles(){
        List<Role> roleList=roleService.getRoles();
        return ResponseEntity.ok().body(roleList);
    }

    @GetMapping("/role/{roleId}")
    ResponseEntity<?> getRoleById(@PathVariable long roleId){
        Role existRole=new Role();
        try{
            existRole=roleService.getRoleById(roleId);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(existRole);

    }

    @PutMapping("/role")
    ResponseEntity<?> updateRole(@RequestBody Role role){
        Role existRole=new Role();
        try{
            existRole=roleService.updateRole(role);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(existRole);

    }

    @DeleteMapping("/role/{roleId}")
    ResponseEntity<String> deleteRole(@PathVariable long roleId){
        String message="";
        try{
            message=roleService.deleteRole(roleId);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(message);


    }

    @GetMapping("/role/{roleId}/employees")
    ResponseEntity<?> getAllRolesForEmployee(@PathVariable long roleId){
        List<Employee> employeeList=new ArrayList<>();
        try{
            employeeList=roleService.getAllEmployeesByRole(roleId);

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(employeeList);
    }

    @GetMapping("/project/{projectId}/roles")
    ResponseEntity<?> getAllRolesByProject(@PathVariable long projectId){
        Set<Role> roleList=new HashSet<>();
        try{
            roleList=roleService.getAllRoleByProject(projectId);

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(roleList);
    }
}
