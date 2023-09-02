package com.auth0.service;




import com.auth0.dto.POBlobDataDTO;
import com.auth0.model.POBlobData;

import java.util.List;

public interface POBlobDataService {

    String savePOBlob(POBlobDataDTO poBlobDataDTO);

    List<POBlobData> getPOBlobs();

    POBlobData getPOBlobById(long id);

//    POBlobData updatePOBlob(POBlobDataDTO poBlobDataDTO);

    String deletePOBlob(long id);

    //get all po blobs by poNumber
    List<POBlobData> getPOBlobsByPONumber(double poNumber);
}
