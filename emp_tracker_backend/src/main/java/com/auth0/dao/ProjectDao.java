package com.auth0.dao;

import com.auth0.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectDao extends JpaRepository<Project,Long> {
//    List<Project> findByAccount(double accountId);
}
