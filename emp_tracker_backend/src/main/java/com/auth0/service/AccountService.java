package com.auth0.service;

import com.auth0.model.Account;

import java.util.List;

public interface AccountService {

    String saveAccount(Account account);

    List<Account> getAccounts();

    Account getAccountById(double accountId);

    Account updateAccount(Account account);

    String deleteAccount(double accountId);
}
