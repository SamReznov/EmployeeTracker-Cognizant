package com.auth0.dao;

import com.auth0.model.Services;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicesDao extends JpaRepository<Services,Double>{
}
