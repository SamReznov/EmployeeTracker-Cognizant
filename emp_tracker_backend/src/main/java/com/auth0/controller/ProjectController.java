package com.auth0.controller;

import com.auth0.exception.EmployeeNotFoundException;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.Project;
import com.auth0.service.ProjectService;
import com.auth0.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @PostMapping("/project")
    ResponseEntity<String> saveProject(@RequestBody Project project){
        String message="";
        try {
            message = projectService.saveProject(project);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);
    }

    @GetMapping("/projects")
    ResponseEntity<List<Project>> getAllProjects(){
        List<Project> projectList=projectService.getProjects();
        return ResponseEntity.ok().body(projectList);
    }

    @GetMapping("project/{projectId}")
    ResponseEntity<?> getProjectById(@PathVariable long projectId){
        Project existProject;
        try{
            existProject=projectService.getProjectById(projectId);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(existProject);
    }

    @PutMapping("/project")
    ResponseEntity<?> updateProject(@RequestBody Project project){
        Project updatedProject;
        try{
            updatedProject=projectService.updateProject(project);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(updatedProject);
    }

    @DeleteMapping("/project/{projectId}")
    ResponseEntity<String> deleteProject(@PathVariable long projectId){
        String message="";
        try{
            message=projectService.deleteProject(projectId);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(message);
    }

    @GetMapping("/project/{projectId}/employees")
    ResponseEntity<?> getAllEmployeesByProjectId(@PathVariable long projectId){
        List<Employee> employeeList=new ArrayList<>();
        try{
            employeeList=projectService.getAllEmployeeByProject(projectId);

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(employeeList);
    }

    @GetMapping("/account/project")
    ResponseEntity<?> getAllProjectByAccount(Principal principal){
        Employee employee=userService.findEmployeeByUser(principal.getName());
        List<Project> projectList;
        try{
            projectList=projectService.getProjectByAccount(employee.getPo().getAccount().getAccountId());

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(projectList);
    }

    @PutMapping("/update-all-values-in-project")
    ResponseEntity<?> updateAllValuesInProject(@RequestBody Project project){
        Project newProject=new Project();
        try {
            newProject= projectService.updateAllValuesInProject(project);
        }
        catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Project>(newProject,HttpStatus.OK);

    }

    @PutMapping("/add-service-to-project")
    ResponseEntity<?> addServiceToProject(@RequestBody Project project){
        Project newProject=new Project();
        try {
            newProject= projectService.addServiceToProject(project);
        }
        catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<Project>(newProject,HttpStatus.OK);

    }




}
