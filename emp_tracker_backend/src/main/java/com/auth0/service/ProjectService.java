package com.auth0.service;

import com.auth0.model.Employee;
import com.auth0.model.Project;

import java.util.List;

public interface ProjectService {

    String saveProject(Project project);

    List<Project> getProjects();

    Project getProjectById(long projectId);

    Project updateProject(Project project);

    String deleteProject(long projectId);

    List<Employee> getAllEmployeeByProject(long projectId);

    List<Project> getProjectByAccount(double accountId);

    Project updateAllValuesInProject(Project project);

    Project addServiceToProject(Project project);

}
