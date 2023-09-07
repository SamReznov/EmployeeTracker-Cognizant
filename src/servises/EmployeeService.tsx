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




   async updateEmployee(employee:any,token:any){
        return await axios.put(EMPLOYEE_API_BASE_URL,employee,{
            headers:
                {
                   
                    'Authorization':'Bearer'+token
                   
                }
            });
    }




    deleteEmployee(id:number,token:any){
        console.log("----"+id);
        console.log(`${EMPLOYEE_API_BASE_URL}/${id}`);
        axios.delete(`${EMPLOYEE_API_BASE_URL}/${id}`,{
            headers:
                {
                   
                    'Authorization':'Bearer'+token
                   
                }
            });
    }

    async getTotalNoOfEmployee(){
        return await axios.get(`${EMPLOYEE_API_BASE_URL}/total`)
    }

     getEmployeeByProjectAndNamePage(pageNo:number,projectId:number,name:string){
        console.log("---"+name+"----"+projectId +"---")
        return  axios.get(`http://localhost:8080/api/project/${projectId}/emp?pageNo=${pageNo}&name=${name}`);
    }

    getEmployeeByProjectAndNameForExcelData(projectId:number,name:string){
        console.log("---"+name+"----"+projectId +"---")
        return  axios.get(`http://localhost:8080/api/project/${projectId}/emp_for_excel_data?name=${name}`);
    }

    // async searchEmployeeByTheirName(pageNo:number,name:string){
    //     return await axios.get(`http://localhost:8080/api/employeeSearch/${name}?pageNo=${pageNo}`)
    // }
   

}

export default new EmployeeService