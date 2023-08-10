import React from "react";

import axios from "axios";

import { accountInterface } from "../dataIntefaces/interfaces";

 

const ACC_API_BASE_URL="http://localhost:8080/api/account";

 

const ACC_API_BASE_URL_TO_GET="http://localhost:8080/api/accounts";

 

const headers={

 

    'Content-Type':'application/json'

 

}

 

class AccountService{

 

    getAccount(){

        return axios.get(ACC_API_BASE_URL_TO_GET);

    }

 

    getAccountById(id:number){

        return axios.get(`${ACC_API_BASE_URL}/${id}`);

    }

 

    createAccount(account: accountInterface){

        return axios.post(ACC_API_BASE_URL,account);

    }

 

    updateAccount(account:any){

        return axios.put(ACC_API_BASE_URL,account);

    }

 

    deleteAccount(id:number){

        return axios.delete(`${ACC_API_BASE_URL}/${id}`);

    }

}

 

export default new AccountService