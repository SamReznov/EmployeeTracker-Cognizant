package com.auth0.service.impl;

import com.auth0.dao.POBlobDataDao;
import com.auth0.dao.PODao;
import com.auth0.dto.LineItemDTO;
import com.auth0.dto.POBlobDataDTO;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.PO;
import com.auth0.model.POBlobData;
import com.auth0.service.POBlobDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class POBlobDataServiceImpl implements POBlobDataService {

    @Autowired
    private POBlobDataDao poBlobDao;

   @Autowired
   private PODao poDao;

    @Override
    public String savePOBlob(POBlobDataDTO poBlobDataDTO) {

        Optional<PO> po=poDao.findById(poBlobDataDTO.getPoNumber());
        if(po.isPresent()){
            List<LineItemDTO> lineItemDTOList=poBlobDataDTO.getLineItemDTOList();
            for(int i=0;i<lineItemDTOList.size();i++){
                POBlobData poBlobData=new POBlobData();
                poBlobData.setPo(po.get());
                poBlobData.setRevisionDate(poBlobDataDTO.getRevisionDate());
                poBlobData.setRevisionNumber(poBlobDataDTO.getRevisionNumber());
                poBlobData.setTotalAmount(poBlobDataDTO.getTotalAmount());
                LineItemDTO lineItemDTO=lineItemDTOList.get(i);
                poBlobData.setLineItemNumber(lineItemDTO.getLineItemNumber());
                poBlobData.setDescription(lineItemDTO.getDescription());
                poBlobData.setExtension(lineItemDTO.getExtension());
                poBlobData.setDeliveryDate(lineItemDTO.getDeliveryDate());
                poBlobData.setTax(lineItemDTO.getTax());
                poBlobDao.save(poBlobData);
            }
        }else{
            throw new ResourceNotFoundException("The Purchase Order (PO) number you provided is not currently in our records. Please proceed to add this new PO to our records for processing.");
        }



        return "Success! The PO blob has been added to the database successfully.";

    }

    @Override
    public List<POBlobData> getPOBlobs() {
        return poBlobDao.findAll();
    }

    @Override
    public POBlobData getPOBlobById(long id) {
        Optional<POBlobData> existingPOBlobData=poBlobDao.findById(id);
        if(existingPOBlobData.isPresent()){
            POBlobData existPOBlobData=existingPOBlobData.get();
            return existPOBlobData;
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided PO blb id : "+id+"\nPlease double-check the id and try again.");
        }
    }

//    @Override
//    public POBlobData updatePOBlob(POBlobDataDTO poBlobDataDTO) {
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
    public String deletePOBlob(long id) {
        Optional<POBlobData> existingPOBlob=poBlobDao.findById(id);
        if(existingPOBlob.isPresent()){
            POBlobData existPOBlob=existingPOBlob.get();
            poBlobDao.delete(existPOBlob);
            return "Success! The PO blob with id: "+id+" has been successfully deleted from our records.";
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided PO blob id : "+id+"\n Please double-check the id and try again.");
        }
    }

    @Override
    public List<POBlobData> getPOBlobsByPONumber(double poNumber) {
        Optional<PO> existingPO=poDao.findById(poNumber);
        if(existingPO.isPresent()) {
            return existingPO.get().getPoDataList();
        }
        else{
            throw new ResourceNotFoundException("Oh no! It seems that there are no Purchase Order (PO) blobs associated with this PO number:" +poNumber+"\nPlease double-check the PO number");
        }
    }
}
