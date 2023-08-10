package com.auth0.dao;

import com.auth0.model.EsaRateCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EsaRateCardDao extends JpaRepository<EsaRateCard,String> {
}
