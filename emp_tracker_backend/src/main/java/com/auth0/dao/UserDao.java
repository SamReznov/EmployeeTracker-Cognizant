package com.auth0.dao;

import com.auth0.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<User, Long> {
//    User findByUsername(String username);
    User findByEmail(String email);
}
