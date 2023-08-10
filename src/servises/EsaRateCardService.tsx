import React from "react";

import axios from "axios";

 

const ESA_API_BASE_URL="http://localhost:8080/api/esa-rate-card";

 

const ESA_API_BASE_URL_TO_GET="http://localhost:8080/api/esa-rate-cards";

 

const headers={

 

    'Content-Type':'application/json'

 

}

 

class EsaRateCardService{

 

    getEsaRate(){

        return axios.get(ESA_API_BASE_URL_TO_GET);

    }

 

    getEsaRateById(esaValue:string){

        return axios.get(`${ESA_API_BASE_URL}/${esaValue}`);

    }

 

    createEsaRate(esa: any){

        return axios.post(ESA_API_BASE_URL,esa);

    }

 

    updateEsaRate(esa:any){

        return axios.put(ESA_API_BASE_URL,esa);

    }

 

    deleteEsaRate(esaValue:string){

        return axios.delete(`${ESA_API_BASE_URL}/${esaValue}`);

    }

}

 

export default new EsaRateCardService