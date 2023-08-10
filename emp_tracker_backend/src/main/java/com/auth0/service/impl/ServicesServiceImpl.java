package com.auth0.service.impl;

import com.auth0.dao.ProjectDao;
import com.auth0.dao.ServicesDao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.Project;
import com.auth0.model.Services;
import com.auth0.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ServicesServiceImpl implements ServicesService {

    @Autowired
    private ServicesDao servicesDao;

    @Autowired
    private ProjectDao projectDao;

    @Override
    public String saveService(Services services) {
        if(servicesDao.findById(services.getServiceId()).isPresent()) {
            throw new ResourceNotFoundException("Oops! It seems like the service you're referring to already exists in our records.");
        }
        servicesDao.save(services);
        return "Success! The service has been added to the database successfully.";
    }

    @Override
    public List<Services> getServices() {
        return servicesDao.findAll();
    }

    @Override
    public Services getServiceById(double serviceId) {
        Optional<Services> existingService=servicesDao.findById(serviceId);
        if(existingService.isPresent()){
            Services existService=existingService.get();
            return existService;
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided service ID:"+serviceId+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public Services updateServices(Services services) {
        Optional<Services> existingService=servicesDao.findById(services.getServiceId());
        if(existingService.isPresent()) {
            Services existService= existingService.get();

            existService.setServiceName(services.getServiceName());
            existService.setEmployeeList(services.getEmployeeList());

            return servicesDao.save(existService);
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided service ID:"+services.getServiceId()+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public String deleteServices(double serviceId) {
        Optional<Services> existingService=servicesDao.findById(serviceId);
        if(existingService.isPresent()){
            Services existService=existingService.get();
            servicesDao.delete(existService);
            return "Success! The service with ID : "+serviceId+" has been successfully deleted from our records.";
        }else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided service ID:"+serviceId+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public List<Employee> getAllEmployeeByServices(double serviceId) {
        Optional<Services> existingService=servicesDao.findById(serviceId);
        if(existingService.isPresent()) {
            return existingService.get().getEmployeeList();
        }
        else{
            throw new ResourceNotFoundException("We apologize, but we couldn't locate any employee associated with this service. Please verify the service details" );
        }
    }

    @Override
    public Set<Services> getAllServiceByProject(long projectId) {
        Optional<Project> existingProject=projectDao.findById(projectId);
        if(existingProject.isPresent()) {
            return existingProject.get().getServicesSet();
        }
        else{
            throw new ResourceNotFoundException("We regret to inform you that we couldn't find any service with the specified project. Please review the project details.");
        }
    }
}
