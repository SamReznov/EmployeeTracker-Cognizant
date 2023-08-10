package com.auth0.service.impl;

import com.auth0.dao.ProjectDao;
import com.auth0.dao.RoleDao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.Project;
import com.auth0.model.Role;
import com.auth0.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private ProjectDao projectDao;

    @Override
    public Role findByName(String name) {
        Role role = roleDao.findRoleByRoleName(name);
        return role;
    }

    @Override
    public Set<Role> getAllRoleByProject(long projectId) {
        Optional<Project> existingProject=projectDao.findById(projectId);
        if(existingProject.isPresent()) {
            return existingProject.get().getRoleSet();
        }
        else{
            throw new ResourceNotFoundException("We regret to inform you that we couldn't find any role with the specified project. Please review the project details.");
        }
    }


    @Override
    public String saveRole(Role role) {

        if(roleDao.findById(role.getRoleId()).isPresent()) {
            throw new ResourceNotFoundException("Oops! It seems like the role you're referring to already exists in our records.");
        }
        roleDao.save(role);
        return "Success! The role has been added to the database successfully.";
    }

    @Override
    public List<Role> getRoles() {
        return (List<Role>) roleDao.findAll();
    }

    @Override
    public Role getRoleById(long roleId) {
        Optional<Role> existingRole=roleDao.findById(roleId);
        if(existingRole.isPresent()){
            Role existRole=existingRole.get();
            return existRole;
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided role ID:"+roleId+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public Role updateRole(Role role){
        Optional<Role> existingRole=roleDao.findById(role.getRoleId());
        if(existingRole.isPresent()){
            Role existRole=existingRole.get();

            existRole.setRoleName(role.getRoleName());
            existRole.setEmployees(role.getEmployees());

            return roleDao.save(existRole);
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided role ID:"+role.getRoleId()+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public String deleteRole(long roleId) {
        Optional<Role> existingRole=roleDao.findById(roleId);
        if(existingRole.isPresent()){
            Role existRole=existingRole.get();
//            existRole.getProjectList().remove(this);
            roleDao.delete(existRole);
            return "Success! The role with ID : "+roleId+" has been successfully deleted from our records.";
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided role ID:"+roleId+"\nPlease double-check the ID and try again.");
        }
    }

    @Override
    public List<Employee> getAllEmployeesByRole(long roleId) {
        Optional<Role> existingRole=roleDao.findById(roleId);
        if(existingRole.isPresent()) {
            return existingRole.get().getEmployees();
        }
        else{
            throw new ResourceNotFoundException("We regret to inform you that we couldn't find any employee with the specified role. Please review the role details.");
        }
    }
}
