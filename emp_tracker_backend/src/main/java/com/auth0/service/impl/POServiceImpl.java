package com.auth0.service.impl;

import com.auth0.dao.PODao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.PO;
import com.auth0.service.POService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class POServiceImpl implements POService {

    @Autowired
    private PODao poDao;

    @Override
    public String savePO(PO po) {
        if(poDao.findById(po.getPoNumber()).isPresent()) {
            throw new ResourceNotFoundException("Oops! It seems like the PO you're referring to already exists in our records.");
        }
        poDao.save(po);
        return "Success! The PO has been added to the database successfully.";

    }

    @Override
    public List<PO> getPOs() {
        return poDao.findAll();
    }

    @Override
    public PO getPOById(double poNumber) {
        Optional<PO> existingPO = poDao.findById(poNumber);
        if (existingPO.isPresent()) {
            PO existPO = existingPO.get();
            return existPO;
        } else {
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided PO number : " + poNumber + "\nPlease double-check the number and try again.");
        }
    }

    @Override
    public PO updatePO(PO po) {
        Optional<PO> existingPO=poDao.findById(po.getPoNumber());
        if(existingPO.isPresent()){
            PO existPO=existingPO.get();

            existPO.setPoManager(po.getPoManager());
            existPO.setDateIssued(po.getDateIssued());
            existPO.setExpiryDate(po.getExpiryDate());
            existPO.setExtension(po.getExtension());
            existPO.setEmployeeList(po.getEmployeeList());
            existPO.setAccount(po.getAccount());
            existPO.setPoBlobList(po.getPoBlobList());


            return poDao.save(existPO);
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided PO number : "+po.getPoNumber()+"\nPlease double-check the number and try again.");
        }
    }

    @Override
    public String deletePO(double poNumber) {
        Optional<PO> existingPO=poDao.findById(poNumber);
        if(existingPO.isPresent()){
            PO existPO=existingPO.get();

            poDao.delete(existPO);
            return "Success! The PO with number : "+poNumber+" has been successfully deleted from our records.";
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided PO number : "+poNumber+"\nPlease double-check the number and try again.");
        }
    }

    @Override
    public List<Employee> getAllEmployeeByPONumber(double poNumber) {
        Optional<PO> existingPO=poDao.findById(poNumber);
        if(existingPO.isPresent()) {
            return existingPO.get().getEmployeeList();
        }
        else{
            throw new ResourceNotFoundException("We apologize, but we couldn't locate any employee associated with this PO. Please verify the po details");
        }
    }

    @Override
    public Page<PO> findAllPoByPage(int pageNo) {
        Pageable pageable= PageRequest.of(pageNo-1,5);
        Page<PO> poPage=poDao.findAll(pageable);
        return poPage;
    }
}
