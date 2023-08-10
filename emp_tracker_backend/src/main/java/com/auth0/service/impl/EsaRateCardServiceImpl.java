package com.auth0.service.impl;

import com.auth0.dao.EsaRateCardDao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.EsaRateCard;
import com.auth0.service.EsaRateCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EsaRateCardServiceImpl implements EsaRateCardService {

    @Autowired
    private EsaRateCardDao esaRateCardDao;

    @Override
    public String saveEsaRateCard(EsaRateCard esaRateCard) {
        if(esaRateCardDao.findById(esaRateCard.getEsaAlphanumericValue()).isPresent()) {
            throw new ResourceNotFoundException("Oops! It seems like the Esa Rate Card you're referring to already exists in our records.");
        }
        esaRateCardDao.save(esaRateCard);
        return "Success! The esa rate card has been added to the database successfully.";
    }

    @Override
    public List<EsaRateCard> getEsaRateCards() {
        return esaRateCardDao.findAll();
    }

    @Override
    public EsaRateCard getEsaRateCardById(String esaAlphaValue) {
        Optional<EsaRateCard> existingEsaRateCard=esaRateCardDao.findById(esaAlphaValue);
        if(existingEsaRateCard.isPresent()){
            EsaRateCard existEsaRateCard=existingEsaRateCard.get();
            return existEsaRateCard;
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided esa value:"+esaAlphaValue+"\nPlease double-check the value and try again.");
        }
    }

    @Override
    public EsaRateCard updateEsaRateCard(EsaRateCard esaRateCard) {
        Optional<EsaRateCard> existingEsaRateCard=esaRateCardDao.findById(esaRateCard.getEsaAlphanumericValue());
        if(existingEsaRateCard.isPresent()){
            EsaRateCard existEsaRateCard=existingEsaRateCard.get();

            existEsaRateCard.setEsaValue(esaRateCard.getEsaValue());
            existEsaRateCard.setEmployeeList(esaRateCard.getEmployeeList());
            return esaRateCardDao.save(existEsaRateCard);
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided esa value:"+esaRateCard.getEsaAlphanumericValue()+"\nPlease double-check the value and try again.");
        }
    }

    @Override
    public String deleteEsaRateCard(String esaAlphaValue) {
        Optional<EsaRateCard> existingEsaRateCard=esaRateCardDao.findById(esaAlphaValue);
        if(existingEsaRateCard.isPresent()){
            EsaRateCard existEsaRateCard=existingEsaRateCard.get();
            esaRateCardDao.delete(existEsaRateCard);
            return "Success! The esa rate card with value : "+esaAlphaValue+" has been successfully deleted from our records.";
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided esa value:"+esaAlphaValue+"\nPlease double-check the value and try again.");
        }
    }

    @Override
    public List<Employee> getAllEmployeeByEsaRateCard(String esaAlphaValue) {
        Optional<EsaRateCard> existingEsaRateCard=esaRateCardDao.findById(esaAlphaValue);
        if(existingEsaRateCard.isPresent()){
            return existingEsaRateCard.get().getEmployeeList();
        }else{
            throw new ResourceNotFoundException("We apologize, but we couldn't locate any employee associated with this esa rate value. Please verify the esa rate details" );
        }
    }
}
