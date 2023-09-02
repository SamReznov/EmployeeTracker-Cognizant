package com.auth0.dao;


import com.auth0.model.POBlobData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface POBlobDataDao extends JpaRepository<POBlobData, Long> {

}
