package com.auth0.service;

import com.auth0.model.Employee;
import com.auth0.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {

    String saveRole(Role role);

    List<Role> getRoles();

    Role getRoleById(long roleId);

    Role updateRole(Role role);

    String deleteRole(long roleId);

    List<Employee> getAllEmployeesByRole(long roleId);

    Role findByName(String name);

    Set<Role> getAllRoleByProject(long projectId);
}
