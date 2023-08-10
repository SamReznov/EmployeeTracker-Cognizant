package com.auth0.service.impl;

import com.auth0.dao.POBlobDao;
import com.auth0.dao.PODao;
import com.auth0.exception.EmployeeNotFoundException;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.PO;
import com.auth0.model.POBlob;
import com.auth0.model.POBlobIdentity;
import com.auth0.model.Project;
import com.auth0.service.POBlobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class POBlobServiceImpl implements POBlobService {

    @Autowired
    private POBlobDao poBlobDao;

   @Autowired
   private PODao poDao;

//    @Override
//    public String savePOBlob(POBlob poBlob) {
//
////        if(poBlobDao.findById(poBlob.getRevisionNumber()).isPresent()) {
////            throw new ResourceNotFoundException("Oops! It seems like the PO blob you're referring to already exists in our records.");
////        }
//
//        if(poBlobDao.findById(poBlob.getPoBlobId()).isPresent()) {
//            throw new ResourceNotFoundException("Oops! It seems like the PO blob you're referring to already exists in our records.");
//        }
//        if(Objects.isNull(poBlob.getPoBlobId().getPo())){
//            poBlob.getPoBlobId().setPo(null);
//            poBlobDao.save(poBlob);
//            return "Congratulations! The PO blob has been added to our database successfully. However, it seems that no PO has been assigned to them.";
//        }else{
//            Optional<PO> po=poDao.findById(poBlob.getPoBlobId().getPo().getPoNumber());
//            if(po.isPresent()){
//                poBlob.getPoBlobId().setPo(po.get());
//            }else{
//                poBlob.getPoBlobId().setPo(null);
//                poBlobDao.save(poBlob);
//                throw new ResourceNotFoundException("Congratulations! The PO blob has been successfully added to our database. However, we couldn't find the PO in our records. Please ensure the PO details are accurate.");
//            }
//        }
//
//        poBlobDao.save(poBlob);
//        return "Success! The PO blob has been added to the database successfully.";
//
//    }

    @Override
    public List<POBlob> getPOBlobs() {
        return poBlobDao.findAll();
    }

    @Override
    public POBlob getPOBlobById(POBlobIdentity poBlobIdentity) {
        Optional<POBlob> existingPOBlob=poBlobDao.findById(poBlobIdentity);
        if(existingPOBlob.isPresent()){
            POBlob existPOBlob=existingPOBlob.get();
            return existPOBlob;
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided PO blob revision number: "+poBlobIdentity+"\nPlease double-check the number and try again.");
        }
    }

//    @Override
//    public POBlob updatePOBlob(POBlob poBlob) {
//        Optional<POBlob> existingPOBlob=poBlobDao.findById(poBlob.getPoBlobId());
//        if(existingPOBlob.isPresent()){
//            POBlob existPOBlob=existingPOBlob.get();
//
//            existPOBlob.setPoBlob(poBlob.getPoBlob());
////            if(Objects.isNull(poBlob.getPo())){
////                existPOBlob.setPo(null);
////                return poBlobDao.save(existPOBlob);
////            }
//            if(Objects.isNull(poBlob.getPoBlobId().getPo())){
//                existPOBlob.getPoBlobId().setPo(null);
//                return poBlobDao.save(existPOBlob);
//            }
//            else{
//                Optional<PO> po=poDao.findById(poBlob.getPoBlobId().getPo().getPoNumber());
//                if(po.isPresent()){
//                    existPOBlob.getPoBlobId().setPo(po.get());
//                }else{
//                    existPOBlob.getPoBlobId().setPo(null);
//                    poBlobDao.save(existPOBlob);
//                    throw new ResourceNotFoundException("Congratulations! The PO blob has been successfully updated to our database. However, we couldn't find the PO in our records. Please ensure the PO details are accurate.");
//                }
//            }
//
//            return poBlobDao.save(existPOBlob);
//        }
//        else{
//            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided PO blob revision number: "+poBlob.getPoBlobId()+"\n Please double-check the number and try again.");
//        }
//    }

    @Override
    public String deletePOBlob(POBlobIdentity poBlobIdentity) {
        Optional<POBlob> existingPOBlob=poBlobDao.findById(poBlobIdentity);
        if(existingPOBlob.isPresent()){
            POBlob existPOBlob=existingPOBlob.get();
            poBlobDao.delete(existPOBlob);
            return "Success! The PO blob with revision number: "+poBlobIdentity+" has been successfully deleted from our records.";
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided PO blob revision number: "+poBlobIdentity+"\n Please double-check the number and try again.");
        }
    }

//    @Override
//    public List<POBlobIdentity> getPOBlobsByPONumber(double poNumber) {
//        Optional<PO> existingPO=poDao.findById(poNumber);
//        if(existingPO.isPresent()) {
//            return existingPO.get().getPoBlobList();
//        }
//        else{
//            throw new ResourceNotFoundException("Oh no! It seems that there are no Purchase Order (PO) blobs associated with this PO number:" +poNumber+"\nPlease double-check the PO number");
//        }
//    }
}
