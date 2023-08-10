package com.auth0.dao;

import com.auth0.model.AccountDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountDetailsDao extends JpaRepository<AccountDetails,String> {
}
