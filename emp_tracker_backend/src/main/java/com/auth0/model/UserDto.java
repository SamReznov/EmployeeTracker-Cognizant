package com.auth0.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private String firstName;

    private String lastName;

    private long ctsEmpId;
    private String password;
    private String email;


//    public User getUserFromDto(){
//        User user = new User();
//        user.setFirstName(firstName);
//        user.setLastName(lastName);
//        user.setCtsEmpId(ctsEmpId);
//        user.setPassword(password);
//        user.setEmail(email);
//
//        return user;
//    }
}
