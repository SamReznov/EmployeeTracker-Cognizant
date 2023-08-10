package com.auth0.controller;

import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Employee;
import com.auth0.model.EsaRateCard;
import com.auth0.service.EsaRateCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EsaRateCardController {

    @Autowired
    private EsaRateCardService esaRateCardService;

    @PostMapping("/esa-rate-card")
    ResponseEntity<String> saveEsaRateCard(@RequestBody EsaRateCard esaRateCard){
        String message="";
        try {
            message = esaRateCardService.saveEsaRateCard(esaRateCard);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);
    }

    @GetMapping("/esa-rate-cards")
    ResponseEntity<List<EsaRateCard>> getAllEsaRateCards(){
        List<EsaRateCard> esaRateCardList=esaRateCardService.getEsaRateCards();
        return ResponseEntity.ok().body(esaRateCardList);
    }

    @GetMapping("esa-rate-card/{esaAlphaValue}")
    ResponseEntity<?> getEsaRateCardById(@PathVariable String esaAlphaValue){
        EsaRateCard existEsaRateCard=new EsaRateCard();
        try{
            existEsaRateCard=esaRateCardService.getEsaRateCardById(esaAlphaValue);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(existEsaRateCard);
    }

    @PutMapping("/esa-rate-card")
    ResponseEntity<?> updateEsaRateCard(@RequestBody EsaRateCard esaRateCard){
        EsaRateCard updatedEsaRateCard=new EsaRateCard();
        try{
            updatedEsaRateCard=esaRateCardService.updateEsaRateCard(esaRateCard);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(updatedEsaRateCard);
    }

    @DeleteMapping("/esa-rate-card/{esaAlphaValue}")
    ResponseEntity<String> deleteEsaRateCard(@PathVariable String esaAlphaValue){
        String message="";
        try{
            message=esaRateCardService.deleteEsaRateCard(esaAlphaValue);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(message);
    }

    @GetMapping("/esa-rate-card/{esaAlphaValue}/employees")
    ResponseEntity<List<Employee>> getAllEmployeesByEsaRateCardId(@PathVariable String esaAlphaValue){
        List<Employee> employeeList=esaRateCardService.getAllEmployeeByEsaRateCard(esaAlphaValue);
        return ResponseEntity.ok().body(employeeList);
    }

}
