package com.auth0.service;


import com.auth0.model.Employee;
import com.auth0.model.User;
import com.auth0.model.UserDto;

import java.util.List;

public interface UserService {
    String save(UserDto user);
    List<User> findAll();
    User findOne(String username);

    User findUserByEmployeeId(long ctsEmpId);

    Employee findEmployeeByUser(String email);
}
