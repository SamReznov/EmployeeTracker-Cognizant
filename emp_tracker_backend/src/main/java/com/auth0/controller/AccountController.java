package com.auth0.controller;


import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Account;
import com.auth0.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class AccountController {

    @Autowired
    private AccountService accountService;


    @PostMapping("/account")
    ResponseEntity<String> saveAccount(@RequestBody Account account){
        String message="";
        try {
            message = accountService.saveAccount(account);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<String>(message,HttpStatus.OK);


    }

    @GetMapping("/accounts")
    ResponseEntity<List<Account>> getAllAccounts(){
        List accountList=accountService.getAccounts();
        return ResponseEntity.ok().body(accountList);
    }

    @GetMapping("account/{accountId}")
    ResponseEntity<?> getAccountById(@PathVariable double accountId){
        Account existAccount=new Account();
        try{
            existAccount=accountService.getAccountById(accountId);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(existAccount);

    }

    @PutMapping("/account")
    ResponseEntity<?> updateAccount(@RequestBody Account account){
        Account updatedAccount=new Account();
        try{
            updatedAccount=accountService.updateAccount(account);
        }catch (ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(updatedAccount);

    }

    @DeleteMapping("/account/{accountId}")
    ResponseEntity<String> deleteAccount(@PathVariable double accountId){
        String message="";
        try{
            message=accountService.deleteAccount(accountId);
        }catch(ResourceNotFoundException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok().body(message);

    }


}

