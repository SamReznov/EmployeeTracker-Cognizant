package com.auth0.service;

import com.auth0.model.AccountDetails;

import java.util.List;

public interface AccountDetailsService {

    String saveAccountDetails(AccountDetails accountDetails);

    List<AccountDetails> getAccountDetails();

    AccountDetails getAccountDetailsById(String currentAccountEmployeeId);

    AccountDetails updateAccountDetails(AccountDetails accountDetails);

    String deleteAccountDetails(String currentAccountEmployeeId);
}
