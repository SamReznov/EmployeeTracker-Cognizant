package com.auth0.controller;

import com.auth0.config.TokenProvider;
import com.auth0.dao.UserDao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.*;
import com.auth0.service.UserService;
import com.auth0.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider jwtTokenUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserServiceImpl userServiceImpl;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> generateToken(@RequestBody LoginUser loginUser) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUser.getUsername(),
                        loginUser.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken(authentication);
        User user = userServiceImpl.findOne(loginUser.getUsername());
        return ResponseEntity.ok(new AuthToken(token,loginUser.getUsername(),user.getEmail()));
    }

    @RequestMapping(value="/register", method = RequestMethod.POST)
    ResponseEntity<?> saveUser(@RequestBody UserDto user){
            String message;
        try{
            message=userService.save(user);

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(message);
    }


    @GetMapping("/{empId}/user")
    ResponseEntity<?> getUserByEmployeeId(@PathVariable long empId){
        User user=new User();
        try{
            user=userService.findUserByEmployeeId(empId);

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/current-employee")
    ResponseEntity<?> getEmployeeByEmail(Principal principal){
        Employee employee=new Employee();
        try{
            employee=userService.findEmployeeByUser(principal.getName());

        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(employee);
    }











    @PreAuthorize("hasRole('Project Manger')")
    @RequestMapping(value="/adminping", method = RequestMethod.GET)
    public String adminPing(){
        return "Only Admins Can Read This";
    }


    @RequestMapping(value="/userping", method = RequestMethod.GET)
    public String userPing(){
        return "Any User Can Read This";
    }

    @GetMapping("/current-user")
    public String getLoggedInUser(Principal principal){
        return principal.getName();
    }

}
