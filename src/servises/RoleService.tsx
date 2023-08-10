import React from "react";

import axios from "axios";

 

const ROLE_API_BASE_URL="http://localhost:8080/api/role";

 

const ROLE_API_BASE_URL_TO_GET="http://localhost:8080/api/roles";

 

const headers={

 

    'Content-Type':'application/json'

 

}

 

class RoleService{

 

    getRole(){

        return axios.get(ROLE_API_BASE_URL_TO_GET);

    }

 

    getRoleById(id:number){

        return axios.get(`${ROLE_API_BASE_URL}/${id}`);

    }

    getRoleListByProject(id:number|undefined){

        return axios.get(`http://localhost:8080/api/project/${id}/roles`);

    }

 

    createRole(role: any){

        return axios.post(ROLE_API_BASE_URL,role);

    }

 

    updateRole(role:any){

        return axios.put(ROLE_API_BASE_URL,role);

    }

 

    deleteRole(id:number){

        return axios.delete(`${ROLE_API_BASE_URL}/${id}`);

    }

}

 

export default new RoleService