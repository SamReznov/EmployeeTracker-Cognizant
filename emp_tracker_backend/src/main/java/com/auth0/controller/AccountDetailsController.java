package com.auth0.controller;

import com.auth0.exception.EmployeeNotFoundException;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.AccountDetails;
import com.auth0.model.Employee;
import com.auth0.service.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AccountDetailsController {

    @Autowired
    private AccountDetailsService accountDetailsService;

    @PostMapping("/account-detail")
    ResponseEntity<?> saveAccountDetails(@RequestBody AccountDetails accountDetails){
        String message = "";
        try {
            message = accountDetailsService.saveAccountDetails(accountDetails);
        }
        catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        catch(Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);

    }

    @GetMapping("/account-details")
    ResponseEntity<List<AccountDetails>> getAllAccountDetails(){
        List<AccountDetails> accountDetailsList=accountDetailsService.getAccountDetails();
        return ResponseEntity.ok().body(accountDetailsList);
    }

    @GetMapping("/account-detail/{currentAccountEmployeeId}")
    ResponseEntity<?> getAccountDetailsById(@PathVariable String currentAccountEmployeeId){
        AccountDetails existAccountDetails=new AccountDetails();
        try{
            existAccountDetails=accountDetailsService.getAccountDetailsById(currentAccountEmployeeId);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(existAccountDetails);
    }

    @PutMapping("/account-detail")
    ResponseEntity<?> updateAccountDetails(@RequestBody AccountDetails accountDetails){
        AccountDetails updatedAccountDetails=new AccountDetails();
        try{
            updatedAccountDetails=accountDetailsService.updateAccountDetails(accountDetails);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(updatedAccountDetails);
    }

    @DeleteMapping("/account-detail/{currentAccountEmployeeId}")
    ResponseEntity<String> deleteAccountDetails(@PathVariable String currentAccountEmployeeId){
        String message="";
        try {
            message = accountDetailsService.deleteAccountDetails(currentAccountEmployeeId);
        }
        catch(EmployeeNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);
    }
}
