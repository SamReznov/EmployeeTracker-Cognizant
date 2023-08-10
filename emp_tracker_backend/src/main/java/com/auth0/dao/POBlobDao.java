package com.auth0.dao;

import com.auth0.model.PO;
import com.auth0.model.POBlob;
import com.auth0.model.POBlobIdentity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface POBlobDao extends JpaRepository<POBlob, POBlobIdentity> {

}
