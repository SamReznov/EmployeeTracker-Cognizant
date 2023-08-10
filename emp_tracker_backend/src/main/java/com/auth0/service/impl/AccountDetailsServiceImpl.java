package com.auth0.service.impl;

import com.auth0.dao.AccountDao;
import com.auth0.dao.AccountDetailsDao;
import com.auth0.dao.EmployeeDao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Account;
import com.auth0.model.AccountDetails;
import com.auth0.service.AccountDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountDetailsServiceImpl implements AccountDetailsService {

    @Autowired
    private AccountDetailsDao accountDetailsDao;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private EmployeeDao employeeDao;

    @Override
    public String saveAccountDetails(AccountDetails accountDetails) {
        if(accountDetailsDao.findById(accountDetails.getCurrentAccEmpId()).isPresent()) {
            throw new ResourceNotFoundException("Oops! It seems like the account details you're referring to already exists in our records.");
        }
        Optional<Account> account=accountDao.findById(accountDetails.getAccount().getAccountId());
        if(account.isPresent()) {
            accountDetails.setAccount(account.get());
        }else{
            accountDetails.setAccount(null);
            accountDetailsDao.save(accountDetails);
            return "Congratulations! The account has been successfully added to our database. However, we couldn't find the account in our records. Please ensure the project details are accurate.";
        }
        accountDetailsDao.save(accountDetails);
        return "Success! The account details has been added to the database successfully.";
    }

    @Override
    public List<AccountDetails> getAccountDetails() {
        return accountDetailsDao.findAll();
    }

    @Override
    public AccountDetails getAccountDetailsById(String currentAccountEmployeeId) {
        Optional<AccountDetails> existingAccountDetails=accountDetailsDao.findById(currentAccountEmployeeId);
        if(existingAccountDetails.isPresent()){
            AccountDetails existAccountDetails=existingAccountDetails.get();
            return existAccountDetails;
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided account details current account employee id: "+currentAccountEmployeeId+"\nPlease double-check the id and try again.");
        }
    }

    @Override
    public AccountDetails updateAccountDetails(AccountDetails accountDetails) {
        Optional<AccountDetails> existingAccountDetails=accountDetailsDao.findById(accountDetails.getCurrentAccEmpId());
        if(existingAccountDetails.isPresent()){
            AccountDetails existAccountDetails=existingAccountDetails.get();

            existAccountDetails=accountDetails;
            Optional<Account> account=accountDao.findById(accountDetails.getAccount().getAccountId());
            if(account.isPresent()) {
                existAccountDetails.setAccount(account.get());
            }else {
                existAccountDetails.setAccount(null);
                return accountDetailsDao.save(existAccountDetails);
            }
            return accountDetailsDao.save(existAccountDetails);
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided account details current account employee id: "+accountDetails.getCurrentAccEmpId()+"\nPlease double-check the id and try again.");
        }
    }

    @Override
    public String deleteAccountDetails(String currentAccountEmployeeId) {
        Optional<AccountDetails> existingAccountDetails=accountDetailsDao.findById(currentAccountEmployeeId);
        if(existingAccountDetails.isPresent()){
            AccountDetails existAccountDetails=existingAccountDetails.get();
            accountDetailsDao.delete(existAccountDetails);
            return "Success! The account details with ID: "+currentAccountEmployeeId+" has been successfully deleted from our records.";
        }
        else{
            throw new ResourceNotFoundException("Oops! We couldn't find any records matching the provided account details current account employee id: "+currentAccountEmployeeId+"\nPlease double-check the id and try again.");
        }
    }
}
