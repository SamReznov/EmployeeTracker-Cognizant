package com.auth0.service;



import com.auth0.model.PO;
import com.auth0.model.POBlob;
import com.auth0.model.POBlobIdentity;

import java.util.List;

public interface POBlobService {

//    String savePOBlob(POBlob poBlob);

    List<POBlob> getPOBlobs();

    POBlob getPOBlobById(POBlobIdentity poBlobIdentity);

//    POBlob updatePOBlob(POBlob poBlob);

    String deletePOBlob(POBlobIdentity poBlobIdentity);

    //get all po blobs by poNumber
//    List<POBlobIdentity> getPOBlobsByPONumber(double poNumber);
}
