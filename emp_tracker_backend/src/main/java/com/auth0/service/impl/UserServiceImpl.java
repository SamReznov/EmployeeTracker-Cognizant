package com.auth0.service.impl;

import com.auth0.dao.EmployeeDao;
import com.auth0.dao.UserDao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.*;
import com.auth0.service.RoleService;
import com.auth0.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private EmployeeDao employeeDao;

    @Autowired
    UserServiceImpl userServiceImpl;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByEmail(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getAuthority(user));
    }

    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        });
        return authorities;
    }



    public List<User> findAll() {
        List<User> list = new ArrayList<>();
        userDao.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

//    @Override
//    public User findOne(String username) {
//        return userDao.findByUsername(username);
//    }

    @Override
    public User findOne(String username) {
        return userDao.findByEmail(username);
    }

    @Override
    public User findUserByEmployeeId(long ctsEmpId) {
        Optional<Employee> existingEmp=employeeDao.findById(ctsEmpId);
        if(existingEmp.isPresent()) {
            return existingEmp.get().getUser();
        }
        else{
            throw new ResourceNotFoundException("We apologize, but we couldn't locate any User associated with this Employee id. Please verify the employee details" );
        }
    }

    @Override
    public Employee findEmployeeByUser(String email) {
        User user = userDao.findByEmail(email);
        if(Objects.isNull(user)) {
            throw new ResourceNotFoundException("We apologize, but we couldn't locate any Employee associated with this email. Please verify the email details" );
        }
        return user.getEmployee();
    }

    @Override
    public String save(UserDto user) {

        User nUser = new User();


        Optional<Employee> employee=employeeDao.findById(user.getCtsEmpId());
        if(employee.isPresent()){


            User existingUser=findUserByEmployeeId(user.getCtsEmpId());
            if(Objects.isNull(existingUser)){
                nUser.setPassword(bcryptEncoder.encode(user.getPassword()));
                nUser.setEmployee(employee.get());
                nUser.setFirstName(user.getFirstName());
                nUser.setLastName(user.getLastName());
                nUser.setEmail(user.getEmail());

                Role role = new Role();
                Set<Role> roleSet = new HashSet<>();
                //roleSet.add(role);

                if(user.getEmail().split("@")[1].equals("coolbasket.in")){//function to set as project manager
                    role = roleService.findByName("Project Manger");
                    roleSet.add(role);
                }

                nUser.setRoles(roleSet);
                userDao.save(nUser);
                return user.getFirstName()+", Congratulations! Your registration has been successfully completed.";

            }else{
                throw new ResourceNotFoundException("Unfortunately, this employee ID has already been used for registration. Please provide a unique employee ID");
            }



        }else{
            throw new ResourceNotFoundException("We apologize, "+user.getFirstName()+", but we were unable to complete your registration as your ID was not found in our records.");
        }



    }


}