package com.auth0.service.impl;

import com.auth0.dao.AccountDao;
import com.auth0.exception.ResourceNotFoundException;
import com.auth0.model.Account;
import com.auth0.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDao accountDao;

    @Override
    public String saveAccount(Account account) {
        if(accountDao.findById(account.getAccountId()).isPresent()) {
            throw new ResourceNotFoundException("Oops! It seems like the account you're referring to already exists in our records.");
        }
        accountDao.save(account);
        return "Success! The account has been added to the database successfully.";

    }

    @Override
    public List<Account> getAccounts() {
        return accountDao.findAll();
    }

    @Override
    public Account getAccountById(double accountId) {
        Optional<Account> existingAccount=accountDao.findById(accountId);
        if(existingAccount.isPresent()){
            Account existAcc= existingAccount.get();
             return existAcc;
        }
        else{
            throw new ResourceNotFoundException("We're sorry, but no records were found for the specified account ID: "+accountId+"\nPlease verify the account ID.");
        }
    }

    @Override
    public Account updateAccount(Account account) {
        Optional<Account> existingAccount=accountDao.findById(account.getAccountId());
        if(existingAccount.isPresent()){
            Account existAcc= existingAccount.get();

            existAcc.setAccName(account.getAccName());
            existAcc.setAccountDetailsList(account.getAccountDetailsList());
            existAcc.setPoList(account.getPoList());

            return accountDao.save(existAcc);
        }
        else{
            throw new ResourceNotFoundException("We're sorry, but no records were found for the specified account ID: "+account.getAccountId()+"\nPlease verify the account ID.");
        }
    }

    @Override
    public String deleteAccount(double accountId) {
        Optional<Account> existingAccount=accountDao.findById(accountId);
        if(existingAccount.isPresent()){
            Account existAcc= existingAccount.get();
            accountDao.delete(existAcc);
            return "Success! The account ID: "+accountId+" has been deleted successfully from our records.";
        }
        else{
            throw new ResourceNotFoundException("We're sorry, but no records were found for the specified account ID: "+accountId+"\nPlease verify the account ID.");
        }
    }
}
