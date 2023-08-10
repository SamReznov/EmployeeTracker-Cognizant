package com.auth0.dao;

import com.auth0.model.PO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PODao extends JpaRepository<PO,Double> {
}
