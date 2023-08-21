import React, { Component } from 'react'

import axios from 'axios'




const EMPLOYEE_API_BASE_URL_TO_GET="http://localhost:8080/api/employees";

const EMPLOYEE_API_BASE_URL="http://localhost:8080/api/employee";




const headers={

    'Content-Type':'application/json'

}




class EmployeeService{

 

    getEmployee(){
        return axios.get(EMPLOYEE_API_BASE_URL_TO_GET);
    }




    createEmployee(employee: any){

        return axios.post(EMPLOYEE_API_BASE_URL,employee,{
            headers:headers
        });

    }




    getEmployeeById(id:number){
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${id}`);
    }




   async updateEmployee(employee:any){
        return await axios.put(EMPLOYEE_API_BASE_URL,employee);
    }




    deleteEmployee(id:number){
        console.log("----"+id);
        console.log(`${EMPLOYEE_API_BASE_URL}/${id}`);
        axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`);
    }

    async getTotalNoOfEmployee(){
        return await axios.get(`${EMPLOYEE_API_BASE_URL}/total`)
    }

    async getEmployeeByPage(pageNo:number,projectId:number){
        return await axios.get(`http://localhost:8080/api/project/${projectId}/employee?pageNo=${pageNo}`);
    }

    async searchEmployeeByTheirName(pageNo:number,name:string){
        return await axios.get(`http://localhost:8080/api/employeeSearch/${name}?pageNo=${pageNo}`)
    }
   

}

export default new EmployeeService