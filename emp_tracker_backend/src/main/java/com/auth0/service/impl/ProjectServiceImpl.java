package com.auth0.service.impl;

import com.auth0.dao.AccountDao;
import com.auth0.dao.ProjectDao;
import com.auth0.dao.RoleDao;
import com.auth0.dao.ServicesDao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.*;
import com.auth0.service.ProjectService;
import com.auth0.service.RoleService;
import com.auth0.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectDao projectDao;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private RoleService roleService;

    @Autowired
    private ServicesService servicesService;

    @Autowired
    private ServicesDao servicesDao;


    @Override
    public String saveProject(Project project) {
        if(projectDao.findById(project.getProjectId()).isPresent()) {
            throw new ResourceNotFoundException("Oops! It seems like the project you're referring to already exists in our records.");
        }
        projectDao.save(project);
        return "Success! The project has been added to the database successfully.";
    }

    @Override
    public List<Project> getProjects() {
        return projectDao.findAll();
    }

    @Override
    public Project getProjectById(long projectId) {
        Optional<Project> existingProject=projectDao.findById(projectId);
        if(existingProject.isPresent()){
            Project existProject=existingProject.get();
            return existProject;
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided project ID:"+projectId+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public Project updateProject(Project project) {
        Optional<Project> existingProject=projectDao.findById(project.getProjectId());
        if(existingProject.isPresent()) {
            Project existProject = existingProject.get();

            existProject.setProjectName(project.getProjectName());
            existProject.setEmployeeList(project.getEmployeeList());

            return projectDao.save(existProject);
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided project ID:"+project.getProjectId()+"\nPlease double-check the ID and try again.");
        }

    }

    @Override
    public String deleteProject(long projectId) {
        Optional<Project> existingProject=projectDao.findById(projectId);
        if(existingProject.isPresent()) {
            Project existProject = existingProject.get();
            projectDao.delete(existProject);
            return "Success! The project with ID : "+projectId+" has been successfully deleted from our records.";
        }else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided project ID:"+projectId+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public List<Employee> getAllEmployeeByProject(long projectId) {
        Optional<Project> existingProject=projectDao.findById(projectId);
        if(existingProject.isPresent()) {
            return existingProject.get().getEmployeeList();
        }
        else{
            throw new ResourceNotFoundException("We apologize, but we couldn't locate any employee associated with this project. Please verify the project details" );
        }

    }

    @Override
    public List<Project> getProjectByAccount(double accountId) {
        Optional<Account> existingAccount=accountDao.findById(accountId);
        if(existingAccount.isPresent()) {
            return existingAccount.get().getProjectList();
        }
        else{
            throw new ResourceNotFoundException("We apologize, but we couldn't locate any project associated with this account. Please verify the account details" );
        }
    }

//    @Override
//    public Project addRoleToProject(Project project) {
//        Project newProject=new Project();
//
//        Set<Role> roleSet = new HashSet<Role>(roleService.getAllRoleByProject(project.getProjectId()));
//        Optional<Project> existingProject=projectDao.findById(project.getProjectId());
//        roleSet.addAll(project
//                .getRoleSet()
//                .stream()
//                .map(role ->{
//                    Role role1=roleDao.findById(role.getRoleId()).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
//                    return role1;
//                }).collect(Collectors.toList()));
//
//        Set <Role> newRoleList = new HashSet<>(roleSet);
//
//
//        newProject=project;
//        newProject.setServicesSet(existingProject.get().getServicesSet());
//        newProject.setAccount(existingProject.get().getAccount());
//        newProject.setProjectName(existingProject.get().getProjectName());
//        newProject.setRoleSet(newRoleList);
//        return projectDao.save(newProject);
//
//    }
    @Override
    public Project updateAllValuesInProject(Project project) {
        Project newProject=new Project();

        Set<Role> updatedRoleSet = project.getRoleSet();
        Optional<Project> existingProject=projectDao.findById(project.getProjectId());
        updatedRoleSet.addAll(project
                .getRoleSet()
                .stream()
                .map(role ->{
                    Role role1=roleDao.findById(role.getRoleId()).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
                    return role1;
                }).collect(Collectors.toSet()));


        newProject=project;
        newProject.setServicesSet(addServiceToProject(project).getServicesSet());
        newProject.setServicesSet(project.getServicesSet());
        newProject.setAccount(existingProject.get().getAccount());
        newProject.setProjectName(project.getProjectName());
        newProject.setRoleSet(updatedRoleSet);
        return projectDao.save(newProject);

    }

    @Override
    public Project addServiceToProject(Project project) {
        Project newProject=new Project();

        Set<Services> updatedServicesSet= project.getServicesSet();
        Optional<Project> existingProject=projectDao.findById(project.getProjectId());

        updatedServicesSet.addAll(project
                .getServicesSet()
                .stream()
                .map(service ->{
                    Services services1=servicesDao.findById(service.getServiceId()).orElseThrow(() -> new ResourceNotFoundException("Service not found"));
                    return services1;
                }).collect(Collectors.toSet()));




        newProject=project;
        newProject.setAccount(existingProject.get().getAccount());
        newProject.setProjectName(existingProject.get().getProjectName());
        newProject.setServicesSet(updatedServicesSet);
        return projectDao.save(newProject);

    }
}

