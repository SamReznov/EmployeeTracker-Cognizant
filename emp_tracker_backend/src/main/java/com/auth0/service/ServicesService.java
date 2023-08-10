package com.auth0.service;

import com.auth0.model.Employee;
import com.auth0.model.Role;
import com.auth0.model.Services;

import java.util.List;
import java.util.Set;

public interface ServicesService {

    String saveService(Services services);

    List<Services> getServices();

    Services getServiceById(double serviceId);

    Services updateServices(Services services);

    String deleteServices(double serviceId);

    List<Employee> getAllEmployeeByServices(double serviceId);

    Set<Services> getAllServiceByProject(long projectId);
}
