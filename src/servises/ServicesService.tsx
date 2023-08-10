import React from "react";

import axios from "axios";

 

const SERVICE_API_BASE_URL="http://localhost:8080/api/service";

 

const SERVICE_API_BASE_URL_TO_GET="http://localhost:8080/api/services";

 

const headers={

 

    'Content-Type':'application/json'

 

}

 

class ServicesService{

 

    getService(){

        return axios.get(SERVICE_API_BASE_URL_TO_GET);

    }

 

    getServiceById(id:number){

        return axios.get(`${SERVICE_API_BASE_URL}/${id}`);

    }

    getServiceListByProject(id:number|undefined){

        return axios.get(`http://localhost:8080/api/project/${id}/services`);

    }

 

    createService(service: any){

        return axios.post(SERVICE_API_BASE_URL,service);

    }

 

    updateService(service:any){

        return axios.put(SERVICE_API_BASE_URL,service);

    }

 

    deleteService(id:number){

        return axios.delete(`${SERVICE_API_BASE_URL}/${id}`);

    }

}

 

export default new ServicesService